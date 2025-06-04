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
      likeStory: (storyId, user) => {
        set((state) => {
          const userStories = state.userStories.map((userStory) => {
            if (userStory.id !== storyId) return userStory;
            const isAlreadyLiked = userStory.likes.some(
              (like) => like.owner.email === user.email
            );

            const updatedLikes = isAlreadyLiked
              ? userStory.likes.filter(
                  (like) => like.owner.email !== user.email
                )
              : [
                  ...userStory.likes,
                  {
                    id: Date.now().toString(),
                    ownerId: user.id,
                    owner: user,
                  },
                ];
            return { ...userStory, likes: updatedLikes };
          });
          return { userStories };
        });
      },

      unlikeStory: (storyId, user) => {
        set((state) => {
          const updatedStories = state.userStories.map((story) => {
            if (story.id !== storyId) return story;

            const updatedLikes = story.likes.filter(
              (like) => like.owner.email !== user.email
            );

            return { ...story, likes: updatedLikes };
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
