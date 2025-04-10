// lib/idbStorage.ts
import { createStore, get, set, del } from "idb-keyval";

export const getIDBStorage = () => {
  if (typeof window === "undefined") {
    return undefined;
  }

  const { createStore, get, set, del } = require("idb-keyval");
  const geckoStore = createStore("gecko-db", "plant-store");

  return {
    getItem: (name: string) => get(name, geckoStore),
    setItem: (name: string, value: any) => set(name, value, geckoStore),
    removeItem: (name: string) => del(name, geckoStore),
  };
};
