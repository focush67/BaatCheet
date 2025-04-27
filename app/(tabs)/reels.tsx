import { View, Text } from "react-native";
import React from "react";
import { useTheme } from "@/context/ThemeContext";
const Reels = () => {
  const { colorScheme } = useTheme();
  return (
    <View
      className={`flex-1 ${
        colorScheme === "light" ? "bg-gray-50" : "bg-black"
      }`}
    >
      <Text
        className={`${colorScheme === "light" ? "text-black" : "text-white"}`}
      >
        Reels
      </Text>
    </View>
  );
};

export default Reels;
