import CommentsSection from "@/components/comments/CommentSection";
import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

const CommentsModal = ({ visible, onClose }: any) => {
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View className="flex-1 justify-end bg-black/50">
        <View className="bg-white dark:bg-black rounded-t-2xl max-h-[80%] p-4">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-lg font-semibold dark:text-white">
              Comments
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Text className="text-blue-500 text-sm">Close</Text>
            </TouchableOpacity>
          </View>

          <CommentsSection />
        </View>
      </View>
    </Modal>
  );
};

export default CommentsModal;
