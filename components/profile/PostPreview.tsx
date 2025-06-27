import React from "react";
import { Image, Modal, Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/context/ThemeContext";

export const PostPreview: React.FC<PostPreviewProps> = ({
  visible,
  post,
  onClose,
}) => {
  if (!post) return null;
  const { colorScheme } = useTheme();
  const isDarkMode = colorScheme === "dark";

  return (
    <Modal visible={visible} transparent animationType="fade">
      <Pressable
        className="flex-1 bg-black/90 justify-center items-center"
        onPress={onClose}
      >
        <View
          className={`w-full max-w-md ${
            isDarkMode ? "bg-gray-900" : "bg-white"
          }`}
        >
          {/* Top Header */}
          <View
            className={`flex-row items-center p-3 border-b ${
              isDarkMode ? "border-gray-800" : "border-gray-200"
            }`}
          >
            <View className="w-8 h-8 rounded-full mr-3 overflow-hidden">
              {post.owner.profilePicture ? (
                <Image
                  source={{ uri: post.owner.profilePicture }}
                  className="w-full h-full"
                />
              ) : (
                <View
                  className={`w-full h-full ${
                    isDarkMode ? "bg-gray-700" : "bg-gray-200"
                  }`}
                />
              )}
            </View>
            <Text
              className={`font-semibold ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              {post.owner.username}
            </Text>
          </View>

          {/* Post Image */}
          <Image
            source={{ uri: post.coverPhoto }}
            className="w-full aspect-square"
            resizeMode="cover"
          />

          <View className={`p-3 ${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
            <View className="flex-row items-center space-x-6 gap-x-2">
              <View className="flex-row items-center gap-x-1">
                <Ionicons
                  name="heart"
                  size={26}
                  color={isDarkMode ? "#fff" : "#000"}
                />
                <Text
                  className={`text-base ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  {post.likes?.length || 0}
                </Text>
              </View>

              <View className="flex-row items-center gap-x-1">
                <Ionicons
                  name="chatbubble-outline"
                  size={24}
                  color={isDarkMode ? "#fff" : "#000"}
                />
                <Text
                  className={`text-base ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  {post.comments?.length || 0}
                </Text>
              </View>
            </View>

            {/* Caption */}
            {post.caption && (
              <Text
                className={`mt-2 text-sm ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                <Text className="font-semibold">{post.owner.username} </Text>
                {post.caption}
              </Text>
            )}
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};
