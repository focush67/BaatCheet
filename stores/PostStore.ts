import { samplePosts } from "@/constants/data";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const usePostStore = create<ZPostStore>()(
  persist(
    (set, get) => ({
      posts: samplePosts,

      setPosts: () => set({ posts: samplePosts }),

      toggleLike: (id) =>
        set((state) => ({
          posts: state.posts.map((p) => {
            if (p.id !== id) return p;
            const isNowLiked = !p.isLiked;
            const likes = isNowLiked ? p.likes + 1 : p.likes - 1;
            return {
              ...p,
              isLiked: isNowLiked,
              likes: likes < 0 ? 0 : likes,
            };
          }),
        })),

      toggleBookmark: (id) =>
        set((state) => ({
          posts: state.posts.map((post) =>
            post.id === id
              ? { ...post, isBookmarked: !post.isBookmarked }
              : post
          ),
        })),

      reset: () => {
        usePostStore.persist.clearStorage();
        usePostStore.setState({ posts: [] });
      },
    }),

    {
      name: "post-storage",
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
