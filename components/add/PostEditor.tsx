import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function PostEditor() {
  const navigation = useNavigation();
  const route = useRoute();
  const { selectedImage } = route.params as { selectedImage: string };
  const [description, setDescription] = useState<string>("");
  const [tags, setTags] = useState("");

  const handlePublish = async () => {
    try {
      const postData = {
        imageUri: selectedImage,
        description,
        tags: tags.split(",").map((t) => t.trim()),
        timestamp: new Date().toISOString(),
      };
      console.log(`Publishing post:`, postData);
      Alert.alert("Post Published", "Your post has been successfully uploaded");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Failed to Publish Post");
      console.error(error);
    }
  };

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-xl font-semibold mb-2">Preview</Text>
      <Image
        source={{ uri: selectedImage }}
        className="w-full h-64 rounded-xl mb-4"
        resizeMode="cover"
      />

      <TextInput
        placeholder="Write a description..."
        value={description}
        onChangeText={setDescription}
        className="border p-2 mb-4 rounded"
        multiline
      />

      <TextInput
        placeholder="Tag people (comma separated)"
        value={tags}
        onChangeText={setTags}
        className="border p-2 mb-4 rounded"
      />

      <TouchableOpacity
        className="bg-blue-500 p-4 rounded items-center"
        onPress={handlePublish}
      >
        <Text className="text-white font-bold text-base">Publish Post</Text>
      </TouchableOpacity>
    </View>
  );
}
