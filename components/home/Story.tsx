import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { memo } from "react";

const Story = memo(
  ({
    story,
    handleStoryPress,
  }: {
    story: UserStory;
    handleStoryPress: (_: number) => void;
  }) => {
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
            className="w-20 h-20 rounded-full border-2 border-white"
          />
        </View>
        <Text
          className={`text-xs mt-1 ${
            story.id === 1 ? "font-bold" : "font-normal"
          }`}
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
