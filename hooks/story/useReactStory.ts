import {
  likeStory as likeStoryAPI,
  unlikeStory as unlikeStoryAPI,
} from "@/services/storyService";
import { useStoryStore } from "@/stores/StoryStore";

export const handleLikeStory = async (
  storyId: string,
  email: string
): Promise<void> => {
  try {
    const updatedLikes: GLike[] = await likeStoryAPI(storyId, email);

    useStoryStore.setState((state) => {
      const updatedStories = state.userStories.map((story) =>
        story.id === storyId
          ? {
              ...story,
              likes: updatedLikes,
            }
          : story
      );

      return { userStories: updatedStories };
    });
  } catch (error) {
    console.error("[handleLikeStory] Failed to like story:", error);
    throw error;
  }
};

export const handleUnlikeStory = async (
  storyId: string,
  email: string
): Promise<void> => {
  try {
    const updatedLikes: GLike[] = await unlikeStoryAPI(storyId, email);

    useStoryStore.setState((state) => {
      const updatedStories = state.userStories.map((story) =>
        story.id === storyId
          ? {
              ...story,
              likes: updatedLikes,
            }
          : story
      );

      return { userStories: updatedStories };
    });
  } catch (error) {
    console.error("[handleUnlikeStory] Failed to unlike story:", error);
    throw error;
  }
};
