import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const StoryHeader = ({
  currentStory,
  onClose,
}: {
  currentStory: GStory;
  onClose: () => void;
}) => {
  return (
    <View className="absolute top-8 px-4 w-full flex-row justify-between items-center z-50">
      <View className="flex-row items-center">
        {currentStory.owner?.profilePicture && (
          <Image
            source={{ uri: currentStory.owner.profilePicture }}
            className="w-[30px] h-[30px] rounded-full mr-2"
          />
        )}
        <Text className="text-white font-semibold">
          {currentStory.owner?.username || "Unknown user"}
        </Text>
      </View>
      <TouchableOpacity onPress={onClose}>
        <Ionicons name="close" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default StoryHeader;
