import { useTheme } from "@/context/ThemeContext";
import React from "react";
import { Text, View } from "react-native";

export const Statistics = ({
  posts,
  followers,
  following,
}: ProfileStatistics) => {
  const { colorScheme } = useTheme();
  return (
    <View className="flex-1 flex-row justify-evenly ml-2">
      <View className="items-center">
        <Text
          className={`font-bold text-lg ${
            colorScheme === "light" ? "text-gray-800" : "text-gray-50"
          }`}
        >
          {posts}
        </Text>
        <Text
          className={`${
            colorScheme === "light" ? "text-gray-500" : "text-gray-200"
          } text-md mt-0.5`}
        >
          Posts
        </Text>
      </View>
      <View className="items-center">
        <Text
          className={`font-bold text-lg ${
            colorScheme === "light" ? "text-gray-800" : "text-gray-50"
          }`}
        >
          {followers}
        </Text>
        <Text
          className={`${
            colorScheme === "light" ? "text-gray-500" : "text-gray-200"
          } text-md mt-0.5`}
        >
          Followers
        </Text>
      </View>
      <View className="items-center">
        <Text
          className={`font-bold text-lg ${
            colorScheme === "light" ? "text-gray-800" : "text-gray-50"
          }`}
        >
          {following}
        </Text>
        <Text
          className={`${
            colorScheme === "light" ? "text-gray-500" : "text-gray-200"
          } text-md mt-0.5`}
        >
          Following
        </Text>
      </View>
    </View>
  );
};
