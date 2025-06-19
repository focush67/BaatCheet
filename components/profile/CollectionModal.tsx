import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  ActivityIndicator,
} from "react-native";
import { useTheme } from "@/context/ThemeContext";
import * as ImagePicker from "expo-image-picker";
import { Feather } from "@expo/vector-icons";
import { useUser } from "@clerk/clerk-expo";
import { uploadFileWrapper } from "@/utils/upload";
import { createNewCollection } from "@/services/postService";
import { useSavedStore } from "@/stores/SavedStore";
import Toast from "react-native-toast-message";

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
  const [loading, setLoading] = useState(false);
  const addNewCollection = useSavedStore((state) => state.addNewCollection);
  const { user } = useUser();

  if (!user) return null;

  useEffect(() => {
    if (!visible) {
      setName("");
      setImageUri("");
    }
  }, [visible]);

  const [email] = useState(user.emailAddresses[0].emailAddress);

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

  const handleNewCollectionSubmit = async () => {
    try {
      setLoading(true);
      const uploadResult = await uploadFileWrapper({
        selectedImage: imageUri,
        user: email,
        setLoading,
        folder: "collections",
        identifier: "collection",
        purpose: "saves",
      });
      if (!uploadResult) {
        console.warn(`Upload may have failed. Please check logs`);
        Toast.show({
          type: "error",
          text1: "Image upload failed",
          text2: "Please try again.",
        });

        return;
      }
      const response = await createNewCollection(
        email,
        uploadResult.publicUrl,
        name
      );

      addNewCollection(response);

      Toast.show({
        type: "success",
        text1: "Collection created!",
        text2: "Your new collection was added successfully.",
      });

      onClose();
    } catch (error) {
      console.error("Some error occurred while creating new collection");
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Could not create collection. Please try again.",
      });
    } finally {
      setLoading(false);
      setName("");
      setImageUri("");
    }
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
            className={`mb-4 h-40 items-center justify-center overflow-hidden rounded-lg border ${
              colorScheme === "light"
                ? "border-gray-300"
                : "border-gray-700 bg-gray-800"
            }`}
          >
            {imageUri ? (
              <Image
                source={{ uri: imageUri }}
                style={{ height: "100%", width: "100%" }}
                className="rounded-md"
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

          <View className="mt-2 min-h-[40px] flex-row justify-end gap-x-3">
            {loading ? (
              <ActivityIndicator
                size="small"
                color={colorScheme === "light" ? "#000" : "#fff"}
              />
            ) : (
              <>
                <TouchableOpacity
                  onPress={() => {
                    setName("");
                    setImageUri("");
                    onClose();
                  }}
                  className={`rounded-lg px-4 py-3 ${
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
                  className={`rounded-lg px-4 py-3 ${
                    !name
                      ? "bg-gray-400"
                      : colorScheme === "light"
                      ? "bg-blue-500"
                      : "bg-blue-600"
                  }`}
                >
                  <Text className="text-white font-medium">Create</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};
