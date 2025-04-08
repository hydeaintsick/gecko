"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import Cookies from "js-cookie";

export type Plant = {
  id: string;
  latinName: string;
  customName?: string;
  image?: string | null;
  notes?: string;
  lastWatered?: string | null;
};

type PlantStore = {
  plants: Plant[];
  addPlant: (plant: Plant) => void;
  updatePlant: (id: string, plant: Partial<Plant>) => void;
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
      addPlant: (plant) =>
        set((state) => ({ plants: [...state.plants, plant] })),
      updatePlant: (id, updatedPlant) =>
        set((state) => ({
          plants: state.plants.map((plant) =>
            plant.id === id ? { ...plant, ...updatedPlant } : plant
          ),
        })),
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
