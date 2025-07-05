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
import Options from "./Options";
import EditPostModal from "./EditModal";
import { updatePost } from "@/services/postService";
import Toast from "react-native-toast-message";
import { useUser } from "@clerk/clerk-expo";

const PostCard = ({ post }: { post: PostCard }) => {
  const { colorScheme } = useTheme();
  const [menuVisible, setMenuVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const router = useRouter();
  const { user } = useUser();
  const [showComments, setShowComments] = useState(false);
  const toggleBookmark = usePostStore((state) => state.toggleBookmark);

  const storePost = usePostStore((state) =>
    state.mappedPosts.find((p) => p.id === post.id)
  );
  const isBookmarked = storePost?.isBookmarked ?? post.isBookmarked;

  const handlePostUpdation = async (newCaption: string) => {
    try {
      const response = await updatePost(post.id, newCaption);
      if (response.id) {
        usePostStore.getState().updatePost(post.id, newCaption);
        setEditMode(false);
        Toast.show({
          type: "success",
          text1: "Post Updation",
          text2: "Post has been updated successfully",
        });
      } else {
        Toast.show({
          type: "info",
          text1: "Dicy Update",
          text2: "Post may not have been updated. Please try again",
        });
      }
    } catch (error) {
      console.error("Error updating post:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to update post. Please try again.",
      });
    }
  };
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
        <TouchableOpacity onPress={() => setMenuVisible(true)}>
          <Ionicons
            name="ellipsis-horizontal"
            size={20}
            color={colorScheme === "light" ? "#000" : "#fff"}
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
      <Options
        bottomSheetVisible={menuVisible}
        setBottomSheetVisible={setMenuVisible}
        colorScheme={colorScheme}
        postOwner={post.username}
        onEdit={() => {
          setMenuVisible(false);
          setEditMode(true);
        }}
      />
      <EditPostModal
        visible={editMode}
        onClose={() => setEditMode(false)}
        // onSave={(newCaption) => {
        //   console.log(`Saving new caption: ${newCaption}`);
        //   setEditMode(false);
        // }}
        onSave={handlePostUpdation}
        initialCaption={post.caption!}
        profileImage={post.avatar}
        colorScheme={colorScheme}
        postImage={post.image}
      />
    </View>
  );
};

export default PostCard;
