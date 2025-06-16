import { getAllPosts } from "@/services/postService";
import { mapPostToPostCard } from "@/utils/misc";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const usePostStore = create<ZPostStore>()(
  persist(
    (set, get) => ({
      mappedPosts: [],
      setMappedPosts: async (email: string) => {
        const allPosts: GPost[] = await getAllPosts(email);
        const mapped = allPosts.map((post) => mapPostToPostCard(post, email));
        set({ mappedPosts: mapped });
      },
      toggleLike: (id) => {
        set((state) => ({
          mappedPosts: state.mappedPosts.map((p) => {
            if (p.id !== id) return p;
            const isNowLiked = !p.isLiked;
            const likes = isNowLiked ? p.likes + 1 : p.likes - 1;
            return {
              ...p,
              isLiked: isNowLiked,
              likes: likes < 0 ? 0 : likes,
            };
          }),
        }));
      },

      toggleBookmark: (id) =>
        set((state) => ({
          mappedPosts: state.mappedPosts.map((post) =>
            post.id === id
              ? { ...post, isBookmarked: !post.isBookmarked }
              : post
          ),
        })),

      reset: () => {
        usePostStore.persist.clearStorage();
        usePostStore.setState({ mappedPosts: [] });
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
