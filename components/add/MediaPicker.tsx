import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

type MediaPickerProps = {
  onClose: () => void;
};

const MediaPicker: React.FC<MediaPickerProps> = ({ onClose }) => {
  return (
    <View className="flex-1 bg-white">
      {/* Close button */}
      <TouchableOpacity
        onPress={onClose}
        className="absolute top-4 right-4 bg-gray-200 px-3 py-1 rounded z-10"
      >
        <Text>Close</Text>
      </TouchableOpacity>

      {/* Placeholder for your image picker */}
      <Text className="text-center mt-20 text-xl">Media Picker Content</Text>
    </View>
  );
};

export default MediaPicker;
