import { View, Text } from "react-native";
import React from "react";
import { useTheme } from "@/context/ThemeContext";
const Statistics = ({
  posts,
  followers,
  following,
}: {
  posts: string | number;
  followers: string;
  following: string;
}) => {
  const { colorScheme } = useTheme();
  return (
    <View className="flex-1 flex-row justify-evenly ml-2">
      <View className="items-center">
        <Text
          className={`font-bold ${
            colorScheme === "light" ? "text-gray-800" : "text-gray-50"
          }`}
        >
          {posts}
        </Text>
        <Text
          className={`${
            colorScheme === "light" ? "text-gray-500" : "text-gray-200"
          } text-xs mt-0.5`}
        >
          Posts
        </Text>
      </View>
      <View className="items-center">
        <Text
          className={`font-bold ${
            colorScheme === "light" ? "text-gray-800" : "text-gray-50"
          }`}
        >
          {followers}
        </Text>
        <Text
          className={`${
            colorScheme === "light" ? "text-gray-500" : "text-gray-200"
          } text-xs mt-0.5`}
        >
          Followers
        </Text>
      </View>
      <View className="items-center">
        <Text
          className={`font-bold ${
            colorScheme === "light" ? "text-gray-800" : "text-gray-50"
          }`}
        >
          {following}
        </Text>
        <Text
          className={`${
            colorScheme === "light" ? "text-gray-500" : "text-gray-200"
          } text-xs mt-0.5`}
        >
          Following
        </Text>
      </View>
    </View>
  );
};

export default Statistics;
