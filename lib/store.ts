"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import Cookies from "js-cookie";
import axios from "axios";
import { API_URL } from "./api";

export type Plant = {
  id: string;
  latinName: string;
  birthDate?: string;
  customName?: string;
  image?: string | null;
  notes?: string;
  lastWatered?: string | null;
};

type PlantStore = {
  plants: Plant[];
  fetchPlants: () => Promise<void>;
  addPlant: (plant: Plant) => Promise<boolean>;
  updatePlant: (id: string, plant: Partial<Plant>) => Promise<boolean>;
  deletePlant: (id: string) => void;
};

type AuthState = {
  token: string | null;
  isConnected: boolean;
  login: (token: string) => void;
  logout: () => void;
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
                latinName: p.latin,
                customName: p.name,
                image: p.preview,
                notes: p.note,
                lastWatered: null,
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
            name: plant.customName,
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
            name: updatedPlant.customName,
          },
          { headers: { Authorization: `Bearer ${Cookies.get("gecko_token")}` } }
        );
        console.log("res:", res);
        return !!res?.data?.plant;
      },
      deletePlant: (id) =>
        set((state) => ({
          plants: state.plants.filter((plant) => plant.id !== id),
        })),
    }),
    {
      name: "gecko-plant-storage",
    }
  )
);

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      isConnected: false,
      login: (token: string) => {
        Cookies.set("gecko_token", token, { expires: 365 });
        set({ token, isConnected: true });
      },
      logout: () => {
        Cookies.remove("gecko_token");
        set({ token: null, isConnected: false });
      },
      initialize: () => {
        const token = Cookies.get("gecko_token");
        if (token) {
          set({ token, isConnected: true });
        }
      },
    }),
    {
      name: "gecko-auth-store",
      skipHydration: true, // on ignore localStorage
    }
  )
);
