import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export const ProfileActions = ({
  isFollowing,
  toggleFollow,
}: {
  isFollowing: boolean;
  toggleFollow: () => void;
}) => {
  return (
    <View className="flex-row mt-4 px-4 space-x-2 gap-x-2">
      <TouchableOpacity
        className={`flex-1 py-1.5 rounded ${
          isFollowing ? "bg-gray-200" : "bg-gray-100"
        }`}
        onPress={toggleFollow}
      >
        <Text className="text-center font-medium">
          {isFollowing ? "Following" : "Edit Profile"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity className="flex-1 py-1.5 bg-gray-100 rounded">
        <Text className="text-center font-medium">Share Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity className="p-2 bg-gray-100 rounded items-center justify-center">
        <Ionicons name="person-add-outline" size={16} />
      </TouchableOpacity>
    </View>
  );
};
