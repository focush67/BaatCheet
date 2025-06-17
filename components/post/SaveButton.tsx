import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import SaveToCollectionModal from "./CollectionModal";

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

  const handlePress = () => {
    if (isBookmarked) {
      setIsBookmarked(false);
    } else {
      setModalVisible(true);
    }
  };

  return (
    <>
      <TouchableOpacity
        onPress={handlePress}
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
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onCollectionSelected={() => setIsBookmarked(true)}
      />
    </>
  );
};

export default SaveButton;
