import { useTheme } from "@/context/ThemeContext";
import { usePostStore } from "@/stores/PostStore";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const LikeButton = ({ postId }: { postId: string }) => {
  const { colorScheme } = useTheme();
  const post = usePostStore((state) =>
    state.posts.find((p) => p.id === postId)
  );
  const toggleLike = usePostStore((state) => state.toggleLike);
  if (!post) {
    return null;
  }

  return (
    <View className="flex-row items-center mr-2">
      <TouchableOpacity
        className={`w-8 h-8 rounded-full justify-center items-center  ${
          colorScheme === "light" ? "bg-white" : "bg-gray-900"
        }`}
        onPress={() => toggleLike(postId)}
      >
        <Ionicons
          name={post.isLiked ? "heart" : "heart-outline"}
          size={22}
          color={
            post.isLiked
              ? "#ed4956"
              : colorScheme === "light"
              ? "#262626"
              : "#ffffff"
          }
        />
      </TouchableOpacity>
      <Text
        className={`text-md ${
          colorScheme === "light" ? "text-gray-700" : "text-gray-300"
        }`}
      >
        {post.likes}
      </Text>
    </View>
  );
};

export default LikeButton;
