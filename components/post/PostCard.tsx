import { useTheme } from "@/context/ThemeContext";
import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import CommentsModal from "../comments/PostWithComments";

const PostCard = ({ post }: PostCardProps) => {
  const { colorScheme } = useTheme();
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [isBookmarked, setIsBookmarked] = useState(post.isBookmarked);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);
  const [commentCount] = useState(post.comments);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  const formatNumber = (num: number): string => {
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "m";
    if (num >= 1_000) return (num / 1_000).toFixed(1) + "k";
    return num.toString();
  };

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

      {/* Post Actions */}
      <View className="flex-row justify-between items-center px-4 py-3">
        <View className="flex-row items-center space-x-4">
          <TouchableOpacity
            onPress={handleLike}
            className={`w-8 h-8 rounded-full justify-center items-center ${
              colorScheme === "light" ? "bg-white" : "bg-gray-900"
            }`}
          >
            <Ionicons
              name={isLiked ? "heart" : "heart-outline"}
              size={26}
              color={
                isLiked
                  ? "#ed4956"
                  : colorScheme === "light"
                  ? "#262626"
                  : "#ffffff"
              }
            />
          </TouchableOpacity>
          <Text
            className={`text-md ml-1 mr-2 ${
              colorScheme === "light" ? "text-gray-700" : "text-gray-300"
            }`}
          >
            {formatNumber(likeCount)}
          </Text>

          <TouchableOpacity
            className={`w-8 h-8 rounded-full justify-center items-center ${
              colorScheme === "light" ? "bg-white" : "bg-gray-900"
            }`}
            onPress={() => setShowComments(true)}
          >
            <FontAwesome
              name="comment-o"
              size={24}
              color={colorScheme === "light" ? "#262626" : "#ffffff"}
              style={{ transform: [{ scaleX: -1 }] }}
            />
          </TouchableOpacity>
          <Text
            className={`text-md ml-1 mr-2 ${
              colorScheme === "light" ? "text-gray-700" : "text-gray-300"
            }`}
          >
            {formatNumber(commentCount)}
          </Text>

          <TouchableOpacity
            className={`w-8 h-8 rounded-full justify-center items-center ${
              colorScheme === "light" ? "bg-white" : "bg-gray-900"
            }`}
          >
            <Feather
              name="send"
              size={24}
              color={colorScheme === "light" ? "#262626" : "#ffffff"}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => setIsBookmarked(!isBookmarked)}
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
