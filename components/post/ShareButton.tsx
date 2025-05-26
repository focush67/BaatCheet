import { useTheme } from "@/context/ThemeContext";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity } from "react-native";

const ShareButton = ({ post }: { post: PostCard }) => {
  const { colorScheme } = useTheme();

  return (
    <TouchableOpacity
      className={`w-8 h-8 rounded-full justify-center items-center ${
        colorScheme === "light" ? "bg-white" : "bg-gray-900"
      }`}
    >
      <Feather
        name="send"
        size={24}
        color={colorScheme === "light" ? "#262626" : "#ffffff"}
      />
    </TouchableOpacity>
  );
};

export default ShareButton;
