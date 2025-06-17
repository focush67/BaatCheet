import { getCollectionsForUser } from "@/services/postService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useSavedStore = create<ZSavedStore>()(
  persist(
    (set, get) => ({
      collections: [],

      setCollections: async (email: string) => {
        const collectionsFetched: ZCollection[] = await getCollectionsForUser(
          email
        );
        console.log("Fetched in Saved", collectionsFetched);
        set({ collections: collectionsFetched });
      },

      reset: () => {
        useSavedStore.persist.clearStorage();
        useSavedStore.setState({ collections: [] });
      },
    }),

    {
      name: "saved-storage",
      storage: {
        getItem: async (name) => {
          const value = await AsyncStorage.getItem(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: async (name, value) => {
          await AsyncStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: async (name) => {
          await AsyncStorage.removeItem(name);
        },
      },
    }
  )
);
