import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

export const MessageSearch = () => {
  const { colorScheme } = useTheme();
  const isDark = colorScheme === "dark";
  return (
    <TouchableOpacity className="flex-row items-center mx-4 mt-3 px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-800">
      <Ionicons
        name="search"
        size={18}
        color={isDark ? "#ccc" : "#888"}
        className="mr-2"
      />
      <Text className="text-gray-500 dark:text-gray-400">Search</Text>
    </TouchableOpacity>
  );
};
