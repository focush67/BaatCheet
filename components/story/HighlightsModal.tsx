import React from "react";
import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import ImagePicker from "./ImagePicker";

const HighlightModal: React.FC<HighlightModalProps> = ({
  visible,
  onClose,
  onSubmit,
  theme,
  highlightName,
  setHighlightName,
  selectedImage,
  setSelectedImage,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/50 px-6">
        <View
          className={`rounded-lg p-6 w-full max-w-sm ${
            theme === "light" ? "bg-white" : "bg-gray-900"
          }`}
        >
          <Text
            className={`text-lg font-bold mb-4 ${
              theme === "light" ? "text-black" : "text-white"
            }`}
          >
            New Highlight
          </Text>

          <ImagePicker
            onImageSelected={setSelectedImage}
            selectedImage={selectedImage}
            theme={theme}
          />

          <TextInput
            placeholder="Highlight name"
            placeholderTextColor={theme === "light" ? "#888" : "#aaa"}
            value={highlightName}
            onChangeText={setHighlightName}
            className={`p-3 rounded-lg mb-6 ${
              theme === "light"
                ? "bg-gray-100 text-black"
                : "bg-gray-800 text-white"
            }`}
          />

          <View className="flex-row items-center justify-end gap-x-4">
            <TouchableOpacity onPress={onClose}>
              <Text
                className={`font-medium ${
                  theme === "light" ? "text-gray-600" : "text-gray-300"
                }`}
              >
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onSubmit}
              className={`px-4 py-2 rounded-lg ${
                !highlightName || !selectedImage ? "bg-blue-300" : "bg-blue-500"
              }`}
              disabled={!highlightName || !selectedImage}
            >
              <Text className="text-white font-medium">Create</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default HighlightModal;
