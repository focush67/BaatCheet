import { MaterialIcons } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface ImagePickerProps {
  onImageSelected: (uri: string) => void;
  selectedImage: string | null;
  theme: "light" | "dark";
}

const ImagePicker: React.FC<ImagePickerProps> = ({
  onImageSelected,
  selectedImage,
  theme,
}) => {
  const pickImage = async () => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access media library is required!");
        return;
      }

      const media = await MediaLibrary.getAssetsAsync({
        mediaType: MediaLibrary.MediaType.photo,
        first: 50,
        sortBy: MediaLibrary.SortBy.creationTime,
      });

      if (media.assets.length > 0) {
        onImageSelected(media.assets[0].uri);
      } else {
        alert("No images found in your gallery");
      }
    } catch (error) {
      console.error("Error picking image:", error);
      alert("Failed to pick image");
    }
  };

  return (
    <TouchableOpacity onPress={pickImage} className="items-center mb-4">
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
              Add Cover
            </Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ImagePicker;
