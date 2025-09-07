import React from "react";
import {
  Image,
  Modal,
  Pressable,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/context/ThemeContext";

export const PostPreview: React.FC<PostPreviewProps> = ({
  visible,
  post,
  onClose,
}) => {
  if (!post || !visible) return null;
  const { colorScheme } = useTheme();
  const isDarkMode = colorScheme === "dark";

  const ownerUsername = post?.owner?.username || "unknown";
  const ownerProfilePicture = post?.owner?.profilePicture ?? null;
  const coverUri = post.coverPhoto ?? null;
  const likesCount = Array.isArray(post.likes) ? post.likes.length : 0;
  const commentsCount = Array.isArray(post.comments) ? post.comments.length : 0;

  return (
    <Modal visible transparent animationType="fade" accessible>
      <SafeAreaView className="flex-1" pointerEvents="box-none">
        <Pressable
          className="flex-1 bg-black/70 justify-center items-center p-4"
          onPress={onClose}
          accessibilityLabel="Close post preview"
          accessibilityRole="button"
        >
          <Pressable
            onPress={() => {}}
            className={`w-full max-w-md rounded-xl overflow-hidden shadow-2xl ${
              isDarkMode ? "bg-gray-900" : "bg-white"
            }`}
            accessibilityRole="none"
            accessibilityLabel={`Preview of ${ownerUsername}'s post`}
          >
            <View
              className={`flex-row items-center p-3 border-b ${
                isDarkMode ? "border-gray-800" : "border-gray-200"
              }`}
            >
              <View className="w-10 h-10 rounded-full mr-3 overflow-hidden">
                {ownerProfilePicture ? (
                  <Image
                    source={{ uri: ownerProfilePicture }}
                    className="w-full h-full"
                  />
                ) : (
                  <View
                    className={`${
                      isDarkMode ? "bg-gray-700" : "bg-gray-200"
                    } w-full h-full`}
                  />
                )}
              </View>

              <Text
                className={`font-semibold text-base ${
                  isDarkMode ? "text-white" : "text-black"
                } flex-1`}
              >
                {ownerUsername}
              </Text>

              <TouchableOpacity
                onPress={onClose}
                className="ml-2 p-2"
                accessibilityLabel="Close preview"
                accessibilityRole="button"
              >
                <Ionicons
                  name="close"
                  size={20}
                  color={isDarkMode ? "#fff" : "#000"}
                />
              </TouchableOpacity>
            </View>
            {coverUri ? (
              <Image
                source={{ uri: coverUri }}
                className="w-full aspect-square"
                resizeMode="cover"
              />
            ) : (
              <View
                className={`${
                  isDarkMode ? "bg-gray-800" : "bg-gray-100"
                } w-full aspect-square`}
              />
            )}
            <View className={`p-3 ${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
              <View className="flex-row items-center space-x-6">
                <View className="flex-row items-center space-x-1">
                  <Ionicons
                    name="heart"
                    size={22}
                    color={isDarkMode ? "#fff" : "#000"}
                  />
                  <Text
                    className={`${
                      isDarkMode ? "text-white" : "text-black"
                    } text-base`}
                  >
                    {likesCount}
                  </Text>
                </View>

                <View className="flex-row items-center space-x-1">
                  <Ionicons
                    name="chatbubble-outline"
                    size={22}
                    color={isDarkMode ? "#fff" : "#000"}
                  />
                  <Text
                    className={`${
                      isDarkMode ? "text-white" : "text-black"
                    } text-base`}
                  >
                    {commentsCount}
                  </Text>
                </View>
              </View>

              {post.caption ? (
                <Text
                  className={`mt-2 text-sm ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  <Text className="font-semibold">{ownerUsername} </Text>
                  {post.caption}
                </Text>
              ) : null}
            </View>
          </Pressable>
        </Pressable>
      </SafeAreaView>
    </Modal>
  );
};

export const PostPreviewMemo = React.memo(PostPreview);
export default PostPreview;
