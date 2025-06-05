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
    await likeStoryAPI(storyId, email);
    useStoryStore.getState().toggleLike(storyId, email);
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
    await unlikeStoryAPI(storyId, email);
    useStoryStore.getState().toggleLike(storyId, email);
  } catch (error) {
    console.error("[handleUnlikeStory] Failed to unlike story:", error);
    throw error;
  }
};
