import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  Image,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "@/context/ThemeContext";
import { useUser } from "@clerk/clerk-expo";
import { useCommentStore } from "@/stores/CommentStore";
import { deleteComment, likeComment } from "@/services/postService";
import { formatDistanceToNow } from "date-fns";

const SingleThread: React.FC<any> = ({
  data,
  isReply = false,
  parentId,
  toggleReplies,
  startReply,
  postId,
}) => {
  const { colorScheme } = useTheme();
  const { user } = useUser();
  if (!user) {
    return null;
  }
  const [showModal, setShowModal] = useState(false);

  const isDark = colorScheme === "dark";
  const isCurrentUserComment =
    user?.emailAddresses[0].emailAddress === data.owner.email;
  const textPrimaryColor = isDark ? "#fff" : "#262626";
  const textSecondaryColor = isDark ? "#888" : "#999";
  const likeIconColor = data.liked ? "#ed4956" : isDark ? "#ccc" : "#262626";
  const timeAgo = formatDistanceToNow(new Date(Number(data.createdAt)), {
    addSuffix: true,
  }).replace(/^about /, "");

  const isLiked = data.likes.some(
    (l: any) => l?.owner?.email === user.emailAddresses[0].emailAddress
  );

  const toggleCommentLike = useCommentStore((state) => state.toggleCommentLike);

  const removeComment = useCommentStore((state) => state.removeComment);

  const handleCommentLike = async () => {
    try {
      const response = await likeComment(
        data.id,
        user.emailAddresses[0].emailAddress
      );

      toggleCommentLike({
        postId,
        commentId: data.id,
        parentId,
        userId: response.ownerId,
        userEmail: user.emailAddresses[0].emailAddress,
        likeId: response.id,
      });
    } catch (error) {
      console.error("Error liking comment", error);
    }
  };

  const handleDelete = async () => {
    const response = await deleteComment(
      postId,
      data.id,
      user.emailAddresses[0].emailAddress
    );
    console.log(`Response for deletion`, response);
    removeComment(postId, data.id, user.emailAddresses[0].emailAddress);
    setShowModal(false);
  };

  return (
    <>
      <TouchableOpacity
        onLongPress={() => {
          if (isCurrentUserComment) setShowModal(true);
        }}
        activeOpacity={0.8}
        className={`flex-row py-2 ${isReply ? "pl-11" : "pl-4"} pr-4`}
      >
        <View className="mr-3">
          <Image
            source={{ uri: data.owner.profilePicture }}
            className="w-8 h-8 rounded-full"
          />
        </View>

        <View className="flex-1">
          <View className="flex-row">
            <View className="flex-1">
              <View className="flex-row items-center">
                <Text
                  style={{ color: textPrimaryColor }}
                  className="font-semibold text-[12px] mr-1.5"
                >
                  {data.owner.username}
                </Text>
                {data.isVerified && (
                  <MaterialIcons name="verified" size={12} color="#3897f0" />
                )}
              </View>
              <Text
                style={{ color: textPrimaryColor }}
                className="text-[12px] mt-0.5 leading-5"
              >
                {data.content}
              </Text>
            </View>

            <View className="ml-2 items-center">
              <TouchableOpacity
                onPress={handleCommentLike}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons
                  name={isLiked ? "heart" : "heart-outline"}
                  size={16}
                  color={likeIconColor}
                />
              </TouchableOpacity>
              {data.likes.length > 0 && (
                <Text
                  style={{ color: textSecondaryColor }}
                  className="text-[12px] mt-0.5"
                >
                  {data.likes.length}
                </Text>
              )}
            </View>
          </View>

          <View className="flex-row items-center mt-1.5">
            <Text
              style={{ color: textSecondaryColor }}
              className="text-[10px] mr-4"
            >
              {timeAgo}
            </Text>
            <TouchableOpacity
              onPress={() => startReply(data)}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Text
                style={{ color: textSecondaryColor }}
                className="text-[10px]"
              >
                Reply
              </Text>
            </TouchableOpacity>
          </View>

          {!isReply && data.replies.length > 0 && (
            <TouchableOpacity
              onPress={() => toggleReplies?.(data.id)}
              className="mt-1"
            >
              <Text
                style={{ color: textSecondaryColor }}
                className="text-[10px]"
              >
                {data.showReplies
                  ? "Hide replies"
                  : `View ${data.replies.length} ${
                      data.replies.length === 1 ? "reply" : "replies"
                    }`}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>

      {/* Custom Modal */}
      <Modal
        visible={showModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <Pressable
          onPress={() => setShowModal(false)}
          className="flex-1 bg-black/40 justify-end"
        >
          <View
            className={`bg-white dark:bg-zinc-800 p-4 rounded-t-2xl shadow-lg`}
          >
            <TouchableOpacity
              onPress={handleDelete}
              className="py-3 items-center border-b border-gray-200 dark:border-gray-700"
            >
              <Text className="text-red-500 font-semibold text-base">
                Delete Comment
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setShowModal(false)}
              className="py-3 items-center"
            >
              <Text
                className={`text-base ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

export default React.memo(SingleThread);
