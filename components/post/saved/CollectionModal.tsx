import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import Modal from "react-native-modal";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useTheme } from "@/context/ThemeContext";
import { useSavedStore } from "@/stores/SavedStore";
import {
  savePostToCollection,
  removePostFromCollection,
} from "@/services/postService";
import { usePostStore } from "@/stores/PostStore";
import { NewCollectionModal } from "@/components/profile/CollectionModal";
import CollectionItem from "./CollectionItem";

interface SaveToCollectionModalProps {
  postId: string;
  isInitiallySaved: boolean;
  visible: boolean;
  onClose: () => void;
  onCollectionSelected: (collectionId: string) => void;
  onCollectionRemoved: () => void;
}

const SaveToCollectionModal: React.FC<SaveToCollectionModalProps> = ({
  postId,
  isInitiallySaved,
  visible,
  onClose,
  onCollectionSelected,
  onCollectionRemoved,
}) => {
  const { colorScheme } = useTheme();
  const collections = useSavedStore((state) => state.collections);
  const updateCollectionInStore = useSavedStore(
    (state) => state.updateCollection
  );

  const getCollectionForPost = useSavedStore(
    (state) => state.getCollectionForPost
  );
  const toggleBookmark = usePostStore((state) => state.toggleBookmark);

  const [newModal, setNewModal] = useState(false);
  const [currentCollectionId, setCurrentCollectionId] = useState<string | null>(
    null
  );
  const isDarkMode = colorScheme === "dark";
  useEffect(() => {
    if (visible) {
      setCurrentCollectionId(getCollectionForPost(postId));
    }
  }, [visible, postId]);

  const handleSaveToCollection = async (collectionId: string) => {
    try {
      if (currentCollectionId === collectionId) {
        console.log(`Already saved in this collection, returning`);
        return;
      }

      if (!isInitiallySaved) {
        toggleBookmark(postId);
      }

      if (currentCollectionId) {
        await removePostFromCollection(currentCollectionId, postId);
        onCollectionRemoved();
      }

      await savePostToCollection(collectionId, postId);
      updateCollectionInStore(collectionId, postId, currentCollectionId);
      setCurrentCollectionId(collectionId);
      onCollectionSelected(collectionId);

      if (!currentCollectionId) {
        toggleBookmark(postId);
      }
    } catch (error) {
      console.error("Error saving to collection", error);
    }
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
              {currentCollectionId ? "Change Collection" : "Save to Collection"}
            </Text>
          </View>

          <FlatList
            data={collections}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 80 }}
            renderItem={({ item }) => (
              <CollectionItem
                item={item}
                isSelected={currentCollectionId === item.id}
                isDarkMode={isDarkMode}
                onSelect={handleSaveToCollection}
                postCount={item.posts?.length || 0}
              />
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
