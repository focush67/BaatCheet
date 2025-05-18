import { useTheme } from "@/context/ThemeContext";
import React, { memo } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export const Story = memo(({ story, onPress }: StoryPress) => {
  const { colorScheme } = useTheme();
  const isYourStory = story.id === 1;
  const hasUnseen = story.hasUnseenStory;
  return (
    <TouchableOpacity
      className="flex-1 px-1 items-center mr-[10px]"
      onPress={() => onPress(story.id)}
    >
      <View
        className={`w-20 h-20 rounded-full justify-center items-center relative border-2 ${
          hasUnseen ? "border-[#E1306C]" : "border-[#C7C7CC]"
        }`}
      >
        <Image
          source={{ uri: story.avatar || story.image }}
          className="w-20 h-20 rounded-full"
        />
        {isYourStory && (
          <View className="absolute bottom-0 right-0 w-5 h-5 bg-[#0095F6] rounded-full border-2 border-white items-center justify-center">
            <Text className="text-white text-xs font-bold">+</Text>
          </View>
        )}
      </View>

      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        className={`text-xs mt-1 max-w-20 ${
          colorScheme === "light" ? "text-[#262626]" : "text-[#F5F5F5]"
        } ${isYourStory ? "font-bold" : ""}`}
      >
        {isYourStory ? "Your Story" : story.username}
      </Text>
    </TouchableOpacity>
  );
});
