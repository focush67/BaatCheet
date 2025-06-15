import { useTheme } from "@/context/ThemeContext";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { formatDistanceToNow } from "date-fns";
import { useUser } from "@clerk/clerk-expo";
import { useCommentStore } from "@/stores/CommentStore";
import { likeComment } from "@/services/postService";

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

  const isDark = colorScheme === "dark";
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

  const handleCommentLike = async () => {
    console.log("Data", data);
    try {
      const response = await likeComment(
        data.id,
        user.emailAddresses[0].emailAddress
      );

      const input = {
        postId: postId,
        commentId: data.id,
        parentId: undefined,
        userId: response.ownerId,
        userEmail: user.emailAddresses[0].emailAddress,
        likeId: response.id,
      };
      toggleCommentLike(input);
    } catch (error) {
      console.error("Error liking comment", error);
    }
  };

  return (
    <View className={`flex-row py-2 ${isReply ? "pl-11" : "pl-4"} pr-4`}>
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
            onPress={() => {
              console.log("Starting Reply for ", data.content);
              startReply(data);
            }}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={{ color: textSecondaryColor }} className="text-[10px]">
              Reply
            </Text>
          </TouchableOpacity>
        </View>

        {!isReply && data.replies.length > 0 && (
          <TouchableOpacity
            onPress={() => toggleReplies?.(data.id)}
            className="mt-1"
          >
            <Text style={{ color: textSecondaryColor }} className="text-[10px]">
              {data.showReplies
                ? "Hide replies"
                : `View ${data.replies.length} ${
                    data.replies.length === 1 ? "reply" : "replies"
                  }`}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default React.memo(SingleThread);
