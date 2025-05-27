import { useTheme } from "@/context/ThemeContext";
import { usePostStore } from "@/stores/PostStore";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import CommentsModal from "../comments/PostWithComments";
import CommentButton from "./CommentButton";
import LikeButton from "./LikeButton";
import SaveButton from "./SaveButton";
import ShareButton from "./ShareButton";

const PostCard = ({ post }: PostCardProps) => {
  const { colorScheme } = useTheme();
  const [showComments, setShowComments] = useState(false);
  const toggleBookmark = usePostStore((state) => state.toggleBookmark);
  const storePost = usePostStore((state) =>
    state.posts.find((p) => p.id === post.id)
  );

  const isBookmarked = storePost?.isBookmarked ?? post.isBookmarked;

  return (
    <View
      className={`border-b ${
        colorScheme === "light"
          ? "bg-white border-gray-200"
          : "bg-black border-gray-800"
      }`}
    >
      {/* Post Header */}
      <View className="flex-row items-center justify-between px-4 py-3">
        <View className="flex-row items-center">
          <Image
            source={{ uri: post.avatar }}
            className="w-12 h-12 rounded-full mr-3"
          />
          <Text
            className={`font-semibold text-md ${
              colorScheme === "light" ? "text-black" : "text-white"
            }`}
          >
            {post.username}
          </Text>
        </View>
        <TouchableOpacity>
          <Ionicons
            name="ellipsis-horizontal"
            size={20}
            color={`${colorScheme === "light" ? "#000" : "#fff"}`}
          />
        </TouchableOpacity>
      </View>

      {/* Post Image */}
      <View className="relative">
        <Image
          source={{ uri: post.image }}
          className={`w-full aspect-square ${
            colorScheme === "light" ? "bg-gray-100" : "bg-gray-900"
          }`}
          resizeMode="cover"
        />

        {/* Tag icon at bottom-left */}
        <View
          className="absolute bottom-2 left-2 p-2 bg-gray-800 rounded-full"
          style={{ zIndex: 10 }}
        >
          <Ionicons name="person-outline" size={14} color="white" />
        </View>
      </View>

      <View className="flex-row justify-between items-center px-4 py-3">
        <View className="flex-row items-center space-x-4">
          <LikeButton postId={post.id} />
          <CommentButton post={post} setShowComments={setShowComments} />
          <ShareButton post={post} />
        </View>

        <SaveButton
          isBookmarked={isBookmarked}
          setIsBookmarked={() => toggleBookmark(post.id)}
        />
      </View>

      {post.caption && (
        <View className="px-4 pt-1">
          <Text
            className={`text-md ${
              colorScheme === "light" ? "text-black" : "text-white"
            }`}
          >
            <Text className="font-semibold">{post.username} </Text>
            <Text>{post.caption}</Text>
          </Text>
        </View>
      )}

      {post.comments > 0 && (
        <TouchableOpacity className="px-4 pt-1">
          <Text
            className={`text-sm ${
              colorScheme === "light" ? "text-gray-500" : "text-gray-400"
            }`}
          >
            View all {post.comments} comment{post.comments !== 1 ? "s" : ""}
          </Text>
        </TouchableOpacity>
      )}

      <View className="px-4 pt-1 pb-3">
        <Text
          className={`text-xs uppercase ${
            colorScheme === "light" ? "text-gray-400" : "text-gray-500"
          }`}
        >
          {post.timeAgo}
        </Text>
      </View>
      <CommentsModal
        visible={showComments}
        onClose={() => setShowComments(false)}
      />
    </View>
  );
};

export default PostCard;
