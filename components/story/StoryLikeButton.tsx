import { TouchableOpacity } from "react-native";
import React from "react";
import {
  handleLikeStory,
  handleUnlikeStory,
} from "@/hooks/story/useReactStory";
import { Ionicons } from "@expo/vector-icons";

const StoryLikeButton = ({
  isLiked,
  currentStory,
  email,
}: {
  isLiked: boolean;
  currentStory: GStory;
  email: string;
}) => {
  return (
    <TouchableOpacity
      onPress={() =>
        currentStory &&
        (!isLiked
          ? handleLikeStory(currentStory.id, email)
          : handleUnlikeStory(currentStory.id, email))
      }
    >
      <Ionicons
        name={isLiked ? "heart" : "heart-outline"}
        size={28}
        color={isLiked ? "#ff3040" : "white"}
      />
    </TouchableOpacity>
  );
};

export default StoryLikeButton;
