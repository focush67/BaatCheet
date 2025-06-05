import { getStories } from "@/services/storyService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useStoryStore = create<ZStoriesState>()(
  persist(
    (set, get) => ({
      userStories: [],
      fetchUserStories: async () => {
        const stories = await getStories();
        set({ userStories: stories });
      },

      toggleLike: (storyId: string, userEmail: string) => {
        set((state) => {
          const updatedStories = state.userStories.map((story) => {
            if (story.id !== storyId) return story;

            const isLiked = story.likes.some(
              (like) => like.owner.email === userEmail
            );

            const updatedLikes = isLiked
              ? story.likes.filter((like) => like.owner.email !== userEmail)
              : [
                  ...story.likes,
                  {
                    id: Date.now().toString(),
                    ownerId: userEmail,
                    owner: { email: userEmail },
                  } as GLike,
                ];

            return {
              ...story,
              likes: updatedLikes,
            };
          });

          return { userStories: updatedStories };
        });
      },

      replyToStory: (storyId, comment) => {
        set((state) => {
          const updatedStories = state.userStories.map((story) => {
            if (story.id !== storyId) return story;
            return {
              ...story,
              comments: [...story.comments, comment],
            };
          });
          return { userStories: updatedStories };
        });
      },

      reset: () => {
        useStoryStore.persist.clearStorage();
        useStoryStore.setState({ userStories: [] });
      },
    }),
    {
      name: "stories-storage",
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

export const useStoryById = (id: string): GStory | undefined =>
  useStoryStore((state) => state.userStories.find((story) => story.id === id));
