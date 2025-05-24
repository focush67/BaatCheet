import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as Linking from "expo-linking";
import React from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";

const ImagePickerComponent: React.FC<HighlightImagePickerProps> = ({
  onImageSelected,
  selectedImage,
  theme,
}) => {
  const pickImage = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission required",
          "Please enable photo library permissions to select images",
          [
            { text: "Cancel" },
            { text: "Open Settings", onPress: () => Linking.openSettings() },
          ]
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        onImageSelected(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "Failed to pick image");
    }
  };

  return (
    <View className="items-center mb-4">
      <TouchableOpacity onPress={pickImage}>
        <View
          className={`w-24 h-24 rounded-full border-2 ${
            theme === "light" ? "border-gray-300" : "border-gray-600"
          } items-center justify-center`}
        >
          {selectedImage ? (
            <Image
              source={{ uri: selectedImage }}
              className="w-full h-full rounded-full"
            />
          ) : (
            <>
              <MaterialIcons
                name="add-a-photo"
                size={28}
                color={theme === "light" ? "#888" : "#aaa"}
              />
              <Text
                className={`mt-2 text-sm ${
                  theme === "light" ? "text-gray-500" : "text-gray-400"
                }`}
              >
                Add Photo
              </Text>
            </>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ImagePickerComponent;
