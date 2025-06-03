import { useTheme } from "@/context/ThemeContext";
import { useUser } from "@clerk/clerk-expo";
import React, { memo } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
export const Story = memo(({ story, onPress }: StoryProps) => {
  const { colorScheme } = useTheme();
  const { user } = useUser();
  const isYourStory =
    story.owner.email === user?.emailAddresses?.[0].emailAddress;
  const hasUnseen = true;

  const profilePicture = story.owner.profilePicture || "";

  return (
    <TouchableOpacity
      className="flex-1 px-1 items-center mr-[10px]"
      onPress={onPress}
    >
      <View
        className={`w-20 h-20 rounded-full justify-center items-center relative border-2 ${
          hasUnseen ? "border-[#E1306C]" : "border-[#C7C7CC]"
        }`}
      >
        <Image
          source={{ uri: profilePicture }}
          className="w-20 h-20 rounded-full"
        />
      </View>

      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        className={`text-xs mt-1 max-w-20 ${
          colorScheme === "light" ? "text-[#262626]" : "text-[#F5F5F5]"
        } ${isYourStory ? "font-bold" : ""}`}
      >
        {isYourStory ? "Your Story" : story.owner.username}
      </Text>
    </TouchableOpacity>
  );
});
