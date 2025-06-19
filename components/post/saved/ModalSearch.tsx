import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface SearchBarProps {
  isDarkMode: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ isDarkMode }) => {
  return (
    <View
      className={`flex-row items-center rounded-lg px-3 py-2 mb-4 ${
        isDarkMode ? "bg-gray-700" : "bg-gray-100"
      }`}
    >
      <Ionicons
        name="search"
        size={20}
        color={isDarkMode ? "#9ca3af" : "#6b7280"}
        className="mr-2"
      />
      <Text className={`${isDarkMode ? "text-gray-300" : "text-gray-500"}`}>
        Search
      </Text>
    </View>
  );
};

export default SearchBar;
