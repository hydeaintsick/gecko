"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import Cookies from "js-cookie";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { API_URL } from "./api";
import { getIDBStorage } from "./idb-storage";

const idbStorage = getIDBStorage();

export type Memory = {
  id: string;
  title: string;
  image: string | null;
  date: string;
};

export type Plant = {
  id: string;
  latinName: string;
  birthDate?: string;
  customName?: string;
  image?: string | null;
  notes?: string;
  emoji?: string;
  memories?: Memory[];
  lastWatered?: string | null;
};

type PlantStore = {
  plants: Plant[];
  fetchPlants: () => Promise<void>;
  addPlant: (plant: Plant) => Promise<boolean>;
  updatePlant: (id: string, plant: Partial<Plant>) => Promise<boolean>;
  deletePlant: (id: string) => Promise<boolean>;
};

type AuthState = {
  user: UserSession | null;
  token: string | null;
  isConnected: boolean;
  login: (token: string) => Promise<boolean>;
  logout: () => void;
  initialize: () => Promise<boolean>;
};

type UserSession = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

export const usePlantStore = create<PlantStore>()(
  persist(
    (set) => ({
      plants: [],
      fetchPlants: async () => {
        try {
          const res = await axios.get<Plant[]>(API_URL + "/plants", {
            headers: { Authorization: `Bearer ${Cookies.get("gecko_token")}` },
          });

          if (res?.data?.length > 0) {
            set({
              plants: res.data.map((p: any) => ({
                id: p.id,
                birthDate: p.birthDate,
                latinName: p.latin,
                customName: p.name,
                image: p.preview,
                notes: p.note,
                emoji: p.emoji,
                lastWatered: null,
                memories: p.memories.map((m: any) => ({
                  id: m?.id || uuidv4(),
                  title: m?.title || "",
                  image: m?.image || null,
                  date: m?.date || new Date().toJSON(),
                })),
              })),
            });
          } else {
            set({ plants: [] });
          }
        } catch (err) {
          console.error("Erreur lors du fetch des plantes :", err);
          set({ plants: [] });
        }
      },
      addPlant: async (plant) => {
        set((state) => ({ plants: [...state.plants, plant] }));
        const res = await axios.post(
          `${API_URL}/plant`,
          {
            latin: plant.latinName,
            preview: plant.image,
            birthDate: plant.birthDate,
            note: plant.notes,
            emoji: plant.emoji,
            name: plant.customName,
            memories: plant?.memories || [],
          },
          { headers: { Authorization: `Bearer ${Cookies.get("gecko_token")}` } }
        );
        return !!res?.data?.plant;
      },
      updatePlant: async (id, updatedPlant) => {
        set((state) => ({
          plants: state.plants.map((plant) =>
            plant.id === id ? { ...plant, ...updatedPlant } : plant
          ),
        }));
        const res = await axios.put(
          `${API_URL}/plant/${id}`,
          {
            latin: updatedPlant.latinName,
            preview: updatedPlant.image,
            birthDate: updatedPlant.birthDate,
            note: updatedPlant.notes,
            emoji: updatedPlant.emoji,
            name: updatedPlant.customName,
            memories: updatedPlant?.memories || [],
          },
          { headers: { Authorization: `Bearer ${Cookies.get("gecko_token")}` } }
        );
        return !!res?.data?.plant;
      },
      deletePlant: async (id) => {
        set((state) => ({
          plants: state.plants.filter((plant) => plant.id !== id),
        }));

        const res = await axios.delete(`${API_URL}/plant/${id}`, {
          headers: { Authorization: `Bearer ${Cookies.get("gecko_token")}` },
        });

        return res?.data?.code === 200;
      },
      addMemory: async (id: string, memory: Memory) => {
        set((state) => ({
          plants: state.plants.map((plant) =>
            plant.id === id
              ? {
                  ...plant,
                  memories: [...(plant.memories || []), memory],
                }
              : plant
          ),
        }));
      },
      updateMemory(id: string, memoryId: string, updatedMemory: Memory) {
        set((state) => ({
          plants: state.plants.map((plant) =>
            plant.id === id
              ? {
                  ...plant,
                  memories: plant.memories?.map((memory) =>
                    memory.id === memoryId ? updatedMemory : memory
                  ),
                }
              : plant
          ),
        }));
      },
      deleteMemory(id: string, memoryId: string) {
        set((state) => ({
          plants: state.plants.map((plant) =>
            plant.id === id
              ? {
                  ...plant,
                  memories: plant.memories?.filter(
                    (memory) => memory.id !== memoryId
                  ),
                }
              : plant
          ),
        }));
      },
    }),
    {
      name: "gecko-plant-storage",
      storage: idbStorage,
      partialize: (state) => ({
        plants: state.plants, // on ne garde QUE les données sérialisables
      }),
    }
  )
);

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isConnected: false,
      login: async (token: string) => {
        Cookies.set("gecko_token", token, { expires: 365 });
        set({ token, isConnected: true });

        const res = await axios.get(`${API_URL}/session`, {
          headers: { Authorization: `Bearer ${Cookies.get("gecko_token")}` },
        });

        if (res?.data?.code === 200) {
          set({ user: res.data.user });
          return true;
        }

        return false;
      },
      logout: () => {
        Cookies.remove("gecko_token");
        set({ token: null, isConnected: false });
      },
      initialize: async () => {
        const token = Cookies.get("gecko_token");
        if (token) {
          set({ token, isConnected: true });
          const res = await axios.get(`${API_URL}/session`, {
            headers: { Authorization: `Bearer ${Cookies.get("gecko_token")}` },
          });

          if (res?.data?.code === 200) {
            set({ user: res.data.user });
            return true;
          }
        }
        return false;
      },
    }),
    {
      name: "gecko-auth-store",
      skipHydration: true, // on ignore localStorage
    }
  )
);
