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
        collectionsFetched.map((collection) => {
          if (collection.posts && collection.posts.length > 0) {
            console.log(
              `Post Saved in Collection ${collection.title}`,
              collection.posts
            );
          }
        });
        set({ collections: collectionsFetched });
      },

      updateCollection: (
        newCollectionId: string | null,
        postId: string,
        oldCollectionId: string | null
      ) => {
        set((state) => {
          const collectionsAfterRemoval = oldCollectionId
            ? state.collections.map((collection) =>
                collection.id === oldCollectionId
                  ? {
                      ...collection,
                      posts: collection.posts.filter(
                        (p) => p.post.id !== postId
                      ),
                    }
                  : collection
              )
            : state.collections;

          const updatedCollections = newCollectionId
            ? collectionsAfterRemoval.map((collection) =>
                collection.id === newCollectionId
                  ? {
                      ...collection,
                      posts: [...collection.posts, { post: { id: postId } }],
                    }
                  : collection
              )
            : collectionsAfterRemoval;

          return { collections: updatedCollections };
        });
      },

      getCollectionForPost: (postId: string) => {
        const collections = get().collections;
        const collection = collections.find((c) =>
          c.posts.some((postObj) => postObj.post.id === postId)
        );
        console.log(
          `[STATE] Collection inside selector for Post ${postId}`,
          collection
        );
        return collection ? collection.id : null;
      },

      addNewCollection(collection) {
        const existingCollections = get().collections;
        const existence = existingCollections.some(
          (cl) => cl.id === collection.id
        );
        if (existence) {
          return;
        }
        set({
          collections: [...get().collections, collection],
        });
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
