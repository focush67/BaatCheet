import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export const ProfileActions = ({
  self,
  isFollowing,
  toggleFollow,
}: {
  self: boolean;
  isFollowing: boolean;
  toggleFollow: () => void;
}) => {
  return (
    <View className="flex-row mt-4 px-4 gap-x-2">
      {self ? (
        <>
          <TouchableOpacity className="flex-1 py-2 rounded-full border border-gray-300 bg-white">
            <Text className="text-center font-medium text-black text-sm">
              Edit Profile
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 py-2 rounded-full border border-gray-300 bg-white">
            <Text className="text-center font-medium text-black text-sm">
              Share Profile
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity
            className={`flex-1 py-2 rounded-full border ${
              isFollowing
                ? "bg-white border-gray-300"
                : "bg-blue-500 border-blue-500"
            }`}
            onPress={toggleFollow}
          >
            <Text
              className={`text-center font-medium text-sm ${
                isFollowing ? "text-black" : "text-white"
              }`}
            >
              {isFollowing ? "Following" : "Follow"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-1 py-2 rounded-full border border-gray-300 bg-white">
            <Text className="text-center font-medium text-black text-sm">
              Share
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="w-10 h-10 rounded-full border border-gray-300 bg-white items-center justify-center">
            <Ionicons name="person-add-outline" size={18} color="black" />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};
