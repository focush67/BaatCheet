import React from "react";
import { Image, Modal, Pressable, Text, View } from "react-native";

export const PostPreview: React.FC<PostPreviewProps> = ({
  visible,
  post,
  onClose,
}) => {
  if (!post) return null;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <Pressable
        className="flex-1 bg-black/60 justify-center items-center"
        onPress={onClose}
      >
        <View className="w-11/12 bg-white rounded-xl overflow-hidden">
          <Image
            source={{ uri: post.imageUrl }}
            className="w-full h-80"
            resizeMode="cover"
          />
          <View className="p-4">
            <Text className="font-bold text-base mb-1">
              @{post.username || "user"}
            </Text>
            <Text className="text-sm text-gray-700">
              {post.caption || "No caption"}
            </Text>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};
