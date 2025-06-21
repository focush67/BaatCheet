import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import SaveToCollectionModal from "./saved/CollectionModal";
import { useSavedStore } from "@/stores/SavedStore";
import { usePostStore } from "@/stores/PostStore";
import { removePostFromCollection } from "@/services/postService";
import ConfirmationDialog from "@/components/post/saved/ConfirmationDialog";
import { useHaptics } from "@/hooks/useHaptics";

const SaveButton = ({
  postId,
  isBookmarked,
  setIsBookmarked,
}: {
  postId: string;
  isBookmarked: boolean;
  setIsBookmarked: (_: boolean) => void;
}) => {
  const { colorScheme } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const getCollectionForPost = useSavedStore(
    (state) => state.getCollectionForPost
  );
  const updateCollectionInStore = useSavedStore(
    (state) => state.updateCollection
  );
  const toggleBookmark = usePostStore((state) => state.toggleBookmark);
  const haptics = useHaptics();

  const handlePress = () => {
    setModalVisible(true);
  };

  const handleLongPress = () => {
    if (!isBookmarked) return;
    haptics.selection();
    setConfirmVisible(true);
  };

  const handleRemove = async () => {
    try {
      const collectionId = getCollectionForPost(postId);
      if (collectionId) {
        // Remove from database
        await removePostFromCollection(collectionId, postId);
        // Update store - pass null as newCollectionId to indicate removal only
        updateCollectionInStore(null, postId, collectionId);
        // Update bookmark state
        setIsBookmarked(false);
        toggleBookmark(postId);
        // Show feedback
        haptics.notification("success");
      }
    } catch (error) {
      console.error("Error removing post from collection:", error);
      haptics.notification("error");
    } finally {
      setConfirmVisible(false);
    }
  };

  return (
    <>
      <TouchableOpacity
        onPress={handlePress}
        onLongPress={handleLongPress}
        className={`w-8 h-8 rounded-full justify-center items-center ${
          colorScheme === "light" ? "bg-white" : "bg-gray-900"
        }`}
      >
        <Ionicons
          name={isBookmarked ? "bookmark" : "bookmark-outline"}
          size={26}
          color={colorScheme === "light" ? "#262626" : "#ffffff"}
        />
      </TouchableOpacity>

      <SaveToCollectionModal
        postId={postId}
        isInitiallySaved={isBookmarked}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onCollectionSelected={() => setIsBookmarked(true)}
        onCollectionRemoved={() => setIsBookmarked(false)}
      />

      <ConfirmationDialog
        visible={confirmVisible}
        title="Remove from Collection"
        message="Are you sure you want to remove this post from your collection?"
        onDismiss={() => setConfirmVisible(false)}
        onConfirm={handleRemove}
      />
    </>
  );
};

export default SaveButton;
