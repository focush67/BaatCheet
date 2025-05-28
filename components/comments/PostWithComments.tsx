import CommentsSection from "@/components/comments/CommentSection";
import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

const CommentsModal = ({ visible, onClose, postId }: any) => {
  const { colorScheme } = useTheme();
  const isDark = colorScheme === "dark";

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View className="flex-1 justify-end bg-black/50">
        <View className="bg-white dark:bg-black rounded-t-2xl h-[60%] p-4">
          <View className="flex-row justify-between items-center mb-2 border-b border-gray-200 dark:border-zinc-700 pb-2">
            <Text className="text-md ml-auto mr-auto font-semibold dark:text-white">
              Comments
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons
                name="close-outline"
                size={20}
                color={`${isDark ? "white" : "black"}`}
              />
            </TouchableOpacity>
          </View>

          <CommentsSection postId={postId} />
        </View>
      </View>
    </Modal>
  );
};

export default CommentsModal;
