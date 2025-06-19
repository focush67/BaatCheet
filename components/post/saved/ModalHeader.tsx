import React from "react";
import { View, Text } from "react-native";

interface ModalHeaderProps {
  title: string;
  isDarkMode: boolean;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({ title, isDarkMode }) => {
  return (
    <View className="items-center mb-4">
      <View
        className={`w-10 h-1 rounded-full ${
          isDarkMode ? "bg-gray-600" : "bg-gray-300"
        } mb-3`}
      />
      <Text
        className={`text-lg font-semibold ${
          isDarkMode ? "text-white" : "text-black"
        }`}
      >
        {title}
      </Text>
    </View>
  );
};

export default ModalHeader;
