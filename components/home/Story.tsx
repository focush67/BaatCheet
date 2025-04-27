import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { memo } from "react";
import { useTheme } from "@/context/ThemeContext";

const Story = memo(
  ({
    story,
    handleStoryPress,
  }: {
    story: UserStory;
    handleStoryPress: (_: number) => void;
  }) => {
    const { colorScheme } = useTheme();
    return (
      <TouchableOpacity
        key={story.id}
        className="items-center mr-4"
        onPress={() => handleStoryPress(story.id)}
      >
        <View
          className={`rounded-full p-0.5 ${
            story.hasUnseenStory
              ? "bg-gradient-to-tr from-yellow-400 to-pink-500"
              : "bg-gray-200"
          }`}
        >
          <Image
            source={{ uri: story.image }}
            className="w-20 h-20 rounded-full border-2"
          />
        </View>
        <Text
          className={`text-sm mt-1 ${
            story.id === 1 ? "font-bold" : "font-normal"
          } ${colorScheme === "light" ? "text-gray-800" : "text-gray-50"}`}
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{ maxWidth: 64 }}
        >
          {story.id === 1 ? "Your Story" : story.username}
        </Text>
      </TouchableOpacity>
    );
  }
);

export default Story;
