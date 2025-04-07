"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export type Plant = {
  id: string
  latinName: string
  customName?: string
  image?: string | null
  notes?: string
  lastWatered?: string | null
}

type PlantStore = {
  plants: Plant[]
  addPlant: (plant: Plant) => void
  updatePlant: (id: string, plant: Partial<Plant>) => void
  deletePlant: (id: string) => void
}

export const usePlantStore = create<PlantStore>()(
  persist(
    (set) => ({
      plants: [],
      addPlant: (plant) => set((state) => ({ plants: [...state.plants, plant] })),
      updatePlant: (id, updatedPlant) =>
        set((state) => ({
          plants: state.plants.map((plant) => (plant.id === id ? { ...plant, ...updatedPlant } : plant)),
        })),
      deletePlant: (id) =>
        set((state) => ({
          plants: state.plants.filter((plant) => plant.id !== id),
        })),
    }),
    {
      name: "gecko-plant-storage",
    },
  ),
)

