import { useTheme } from "@/context/ThemeContext";
import { usePostStore } from "@/stores/PostStore";
import { useCommentStore } from "@/stores/CommentStore";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import CommentsModal from "../comments/PostWithComments";
import CommentButton from "./CommentButton";
import LikeButton from "./LikeButton";
import SaveButton from "./SaveButton";
import ShareButton from "./ShareButton";
import { useUser } from "@clerk/clerk-expo";

const PostCard = ({ post }: { post: PostCard }) => {
  const { colorScheme } = useTheme();
  const router = useRouter();
  const { user } = useUser();
  const [showComments, setShowComments] = useState(false);
  const toggleBookmark = usePostStore((state) => state.toggleBookmark);

  const storePost = usePostStore((state) =>
    state.mappedPosts.find((p) => p.id === post.id)
  );
  const isBookmarked = storePost?.isBookmarked ?? post.isBookmarked;
  const comments = useCommentStore((state) => state.commentsByPost[post.id]);

  const handleProfilePress = () => {
    const isMyProfile = post.owner?.username === user?.unsafeMetadata?.username;
    if (isMyProfile) {
      return null;
    }

    const params = {
      username: post.owner.username,
      avatar: post.owner.profilePicture,
      ownerName: post.owner.name,
      caption: post.owner.bio,
      userEmail: post.owner.email,
      isExternalProfile: "true",
    };

    console.log("Navigating to profile with params:", params);
    router.push({
      pathname: "/profile",
      params: params,
    });
  };
  return (
    <View
      className={`border-b ${
        colorScheme === "light"
          ? "bg-white border-gray-200"
          : "bg-black border-gray-800"
      }`}
    >
      <View className="flex-row items-center justify-between px-4 py-3">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={handleProfilePress}>
            <Image
              source={{ uri: post.owner?.profilePicture }}
              className="w-8 h-8 rounded-full mr-3"
            />
          </TouchableOpacity>

          <Text
            className={`font-semibold text-sm ${
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

      <View className="relative">
        <Image
          source={{ uri: post.image }}
          className={`w-full aspect-square ${
            colorScheme === "light" ? "bg-gray-100" : "bg-gray-900"
          }`}
          resizeMode="cover"
        />

        <View
          className="absolute bottom-2 left-2 p-2 bg-gray-800 rounded-full"
          style={{ zIndex: 10 }}
        >
          <Ionicons name="person-outline" size={14} color="white" />
        </View>
      </View>

      <View className="flex-row justify-between items-center px-4 py-1.5">
        <View className="flex-row items-center">
          <LikeButton postId={post.id} />
          <CommentButton postId={post.id} setShowComments={setShowComments} />
          <ShareButton post={post} />
        </View>

        <SaveButton
          postId={post.id}
          isBookmarked={isBookmarked}
          setIsBookmarked={() => toggleBookmark(post.id)}
        />
      </View>

      {post.caption && (
        <View className="px-4">
          <Text
            className={`text-sm ${
              colorScheme === "light" ? "text-black" : "text-white"
            }`}
          >
            <Text className="font-semibold">{post.username} </Text>
            <Text>{post.caption}</Text>
          </Text>
        </View>
      )}

      {post.comments > 0 && (
        <TouchableOpacity
          className="px-4 pt-1"
          onPress={() => setShowComments(true)}
        >
          <Text
            className={`text-sm ${
              colorScheme === "light" ? "text-gray-500" : "text-gray-400"
            }`}
          >
            View all {comments?.length} comment
            {comments?.length !== 1 ? "s" : ""}
          </Text>
        </TouchableOpacity>
      )}

      <View className="px-4 pt-1 pb-3">
        <Text
          className={`text-[10px] uppercase ${
            colorScheme === "light" ? "text-gray-400" : "text-gray-500"
          }`}
        >
          {post.timeAgo}
        </Text>
      </View>
      <CommentsModal
        postId={post.id}
        visible={showComments}
        onClose={() => setShowComments(false)}
      />
    </View>
  );
};

export default PostCard;
