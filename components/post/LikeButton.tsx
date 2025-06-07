import { useTheme } from "@/context/ThemeContext";
import { likePost, unlikePost } from "@/services/postService";
import { usePostStore } from "@/stores/PostStore";
import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const LikeButton = ({ postId }: { postId: string }) => {
  const { colorScheme } = useTheme();
  const { user } = useUser();
  if (!user) {
    return null;
  }
  const post = usePostStore((state) =>
    state.mappedPosts.find((p) => p.id === postId)
  );
  const toggleLike = usePostStore((state) => state.toggleLike);
  if (!post) {
    return null;
  }

  const handleLiking = async () => {
    toggleLike(postId);
    if (post.isLiked) {
      await unlikePost(postId, user.emailAddresses[0].emailAddress);
    } else {
      await likePost(postId, user.emailAddresses[0].emailAddress);
    }
  };
  return (
    <View className="flex-row items-center mr-2">
      <TouchableOpacity
        className={`w-8 h-8 rounded-full justify-center items-center  ${
          colorScheme === "light" ? "bg-white" : "bg-gray-900"
        }`}
        onPress={handleLiking}
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
