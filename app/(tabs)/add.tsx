import { View, Text } from "react-native";
import React from "react";
import { useTheme } from "@/context/ThemeContext";
const Add = () => {
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
        Add
      </Text>
    </View>
  );
};

export default Add;
