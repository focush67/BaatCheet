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

      toggleBookmark: (id) => {
        console.group(`[toggleBookmark] Debugging for post ${id}`);

        // Log current state before any changes
        console.log(
          "Current state.mappedPosts:",
          JSON.stringify(get().mappedPosts, null, 2)
        );

        const previousState = get().mappedPosts.find((post) => post.id === id);
        console.log("Previous State for post:", {
          id: id,
          isBookmarked: previousState?.isBookmarked,
          postExists: !!previousState,
        });

        // Perform the state update
        set((state) => {
          console.log("State update function executing for post:", id);
          const updatedPosts = state.mappedPosts.map((post) =>
            post.id === id
              ? { ...post, isBookmarked: !post.isBookmarked }
              : post
          );

          console.log(
            "Posts after update:",
            JSON.stringify(updatedPosts, null, 2)
          );
          return { mappedPosts: updatedPosts };
        });

        // Verify the state after update
        const newState = get().mappedPosts.find((post) => post.id === id);
        console.log("New State for post:", {
          id: id,
          isBookmarked: newState?.isBookmarked,
        });

        // Verify the entire state structure
        console.log(
          "Complete state after update:",
          JSON.stringify(get(), null, 2)
        );
        console.groupEnd();
      },

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
