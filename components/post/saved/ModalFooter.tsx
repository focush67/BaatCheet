import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ModalFooterProps {
  isDarkMode: boolean;
  onPress: () => void;
}

const ModalFooter: React.FC<ModalFooterProps> = ({ isDarkMode, onPress }) => {
  return (
    <TouchableOpacity
      className={`flex-row items-center justify-center py-3 rounded-lg ${
        isDarkMode ? "bg-blue-600" : "bg-blue-500"
      }`}
      onPress={onPress}
    >
      <Ionicons name="add" size={24} color="white" className="mr-2" />
      <Text className="text-white font-semibold">New Collection</Text>
    </TouchableOpacity>
  );
};

export default ModalFooter;
