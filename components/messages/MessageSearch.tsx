import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
const MessageSearch = ({ isDark }: { isDark: boolean }) => {
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

export default MessageSearch;
