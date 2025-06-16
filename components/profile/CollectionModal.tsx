import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native";
import { useTheme } from "@/context/ThemeContext";
import * as ImagePicker from "expo-image-picker";
import { Feather } from "@expo/vector-icons";

export const NewCollectionModal = ({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) => {
  const { colorScheme } = useTheme();
  const [name, setName] = useState("");
  const [imageUri, setImageUri] = useState("");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleNewCollectionSubmit = () => {
    console.log("Submitted new collection:", { name, imageUri });
  };

  if (!visible) return null;

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View
        className="flex-1 items-center justify-center bg-black/80 px-4"
        style={{ elevation: 20 }}
      >
        <View
          className={`w-full max-w-md rounded-2xl p-5 shadow-lg ${
            colorScheme === "light" ? "bg-white" : "bg-gray-900"
          }`}
        >
          <Text
            className={`mb-4 text-center text-xl font-semibold ${
              colorScheme === "light" ? "text-black" : "text-white"
            }`}
          >
            Create New Collection
          </Text>

          <TextInput
            placeholder="Collection name"
            placeholderTextColor={colorScheme === "light" ? "#999" : "#888"}
            value={name}
            onChangeText={setName}
            className={`mb-4 rounded-lg border px-4 py-3 text-base ${
              colorScheme === "light"
                ? "border-gray-300 text-black"
                : "border-gray-700 text-white"
            }`}
          />

          <TouchableOpacity
            onPress={pickImage}
            className={`mb-4 h-36 items-center justify-center rounded-lg border ${
              colorScheme === "light"
                ? "border-gray-300"
                : "border-gray-700 bg-gray-800"
            }`}
          >
            {imageUri ? (
              <Image
                source={{ uri: imageUri }}
                className="h-full w-full rounded-md"
                resizeMode="cover"
              />
            ) : (
              <View className="items-center">
                <Feather
                  name="image"
                  size={24}
                  color={colorScheme === "light" ? "#262626" : "#ffffff"}
                />
                <Text
                  className={`mt-2 ${
                    colorScheme === "light" ? "text-gray-600" : "text-gray-400"
                  }`}
                >
                  Select Cover Image
                </Text>
              </View>
            )}
          </TouchableOpacity>

          <View className="mt-2 flex-row justify-end gap-x-3">
            <TouchableOpacity
              onPress={onClose}
              className={`rounded-lg px-4 py-2 ${
                colorScheme === "light" ? "bg-gray-200" : "bg-gray-700"
              }`}
            >
              <Text
                className={`${
                  colorScheme === "light" ? "text-black" : "text-white"
                }`}
              >
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleNewCollectionSubmit}
              disabled={!name}
              className={`rounded-lg px-4 py-2 ${
                !name
                  ? "bg-gray-400"
                  : colorScheme === "light"
                  ? "bg-blue-500"
                  : "bg-blue-600"
              }`}
            >
              <Text className="text-white font-medium">Create</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
