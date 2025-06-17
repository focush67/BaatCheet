import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/context/ThemeContext";
import { Feather } from "@expo/vector-icons";
import { NewCollectionModal } from "../profile/CollectionModal";
import { useSavedStore } from "@/stores/SavedStore";
import { savePostToCollection } from "@/services/postService";

const SaveToCollectionModal = ({
  postId,
  visible,
  onClose,
  onCollectionSelected,
}: {
  postId: string;
  visible: boolean;
  onClose: () => void;
  onCollectionSelected: (collectionId: string) => void;
}) => {
  const { colorScheme } = useTheme();
  const collections = useSavedStore((state) => state.collections);
  const [newModal, setNewModal] = useState(false);
  const isDarkMode = colorScheme === "dark";

  const saveToCollection = async (itemId: string) => {
    const response = await savePostToCollection(itemId, postId);
    console.log("Saved to Collection response", response);
  };

  return (
    <>
      <Modal
        isVisible={visible}
        onBackdropPress={onClose}
        onBackButtonPress={onClose}
        useNativeDriver
        animationIn="slideInUp"
        animationOut="slideOutDown"
        swipeDirection={"down"}
        onSwipeComplete={onClose}
        backdropOpacity={0.4}
        style={{ justifyContent: "flex-end", margin: 0 }}
      >
        <View
          className={`rounded-t-3xl ${isDarkMode ? "bg-gray-900" : "bg-white"}`}
          style={{ height: "70%", paddingHorizontal: 16, paddingTop: 12 }}
        >
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
              Save
            </Text>
          </View>

          <View
            className={`flex-row items-center rounded-lg px-3 py-2 mb-4 ${
              isDarkMode ? "bg-gray-700" : "bg-gray-100"
            }`}
          >
            <Ionicons
              name="search"
              size={20}
              color={isDarkMode ? "#9ca3af" : "#6b7280"}
              className="mr-2"
            />
            <Text
              className={`${isDarkMode ? "text-gray-300" : "text-gray-500"}`}
            >
              Search
            </Text>
          </View>

          <TouchableOpacity
            className={`flex-row items-center py-3 border-b ${
              isDarkMode ? "border-gray-700" : "border-gray-200"
            }`}
            onPress={() => {
              onCollectionSelected("default");
              saveToCollection("default");
              onClose();
            }}
          >
            <View
              className={`w-11 h-11 rounded-md items-center justify-center mr-3 ${
                isDarkMode ? "bg-gray-700" : "bg-gray-100"
              }`}
            >
              <Ionicons
                name="grid"
                size={24}
                color={isDarkMode ? "white" : "black"}
              />
            </View>
            <Text className={`${isDarkMode ? "text-white" : "text-black"}`}>
              All Posts
            </Text>
          </TouchableOpacity>

          <FlatList
            data={collections}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 80 }}
            renderItem={({ item }) => (
              <TouchableOpacity
                className="flex-row items-center py-3"
                onPress={() => {
                  onCollectionSelected(item.id);
                  onClose();
                }}
              >
                <Image
                  source={{ uri: item.coverPhoto }}
                  className="w-11 h-11 rounded-md mr-3"
                />
                <View className="flex-1">
                  <Text
                    className={`${isDarkMode ? "text-white" : "text-black"}`}
                  >
                    {item.title}
                  </Text>
                  <Text
                    className={`text-sm ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {12} posts
                  </Text>
                </View>
                <TouchableOpacity
                  className="w-8 h-8 rounded-full border border-gray-400 items-center justify-center opacity-60"
                  onPress={() => {
                    saveToCollection(item.id);
                  }}
                >
                  <Feather
                    name="plus"
                    size={16}
                    color={isDarkMode ? "#ffffff" : "#000000"}
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            )}
          />

          <TouchableOpacity
            className={`absolute bottom-5 left-4 right-4 flex-row items-center justify-center py-3 rounded-lg ${
              isDarkMode ? "bg-blue-600" : "bg-blue-500"
            }`}
            onPress={() => setNewModal(true)}
          >
            <Ionicons name="add" size={24} color="white" className="mr-2" />
            <Text className="text-white font-semibold">New Collection</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <NewCollectionModal
        visible={newModal}
        onClose={() => setNewModal(false)}
      />
    </>
  );
};

export default SaveToCollectionModal;
