import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity } from "react-native";
const SaveButton = ({
  isBookmarked,
  setIsBookmarked,
}: {
  isBookmarked: boolean;
  setIsBookmarked: (_: boolean) => void;
}) => {
  const { colorScheme } = useTheme();
  return (
    <TouchableOpacity
      onPress={() => setIsBookmarked(!isBookmarked)}
      className={`w-8 h-8 rounded-full justify-center items-center ${
        colorScheme === "light" ? "bg-white" : "bg-gray-900"
      }`}
    >
      <Ionicons
        name={isBookmarked ? "bookmark" : "bookmark-outline"}
        size={26}
        color={colorScheme === "light" ? "#262626" : "#ffffff"}
      />
    </TouchableOpacity>
  );
};

export default SaveButton;
