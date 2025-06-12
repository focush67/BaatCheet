import { useTheme } from "@/context/ThemeContext";
import { useCommentStore } from "@/stores/CommentStore";
import { useUser } from "@clerk/clerk-expo";
import { FontAwesome } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { Text, TouchableOpacity } from "react-native";
const CommentButton = ({
  postId,
  setShowComments,
}: {
  postId: string;
  setShowComments: (_: boolean) => void;
}) => {
  const { colorScheme } = useTheme();
  const { user } = useUser();
  const formatNumber = (num: number): string => {
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "m";
    if (num >= 1_000) return (num / 1_000).toFixed(1) + "k";
    return num.toString();
  };
  useEffect(() => {
    useCommentStore
      .getState()
      .fetchComments(postId, user?.emailAddresses[0].emailAddress!);
  }, []);

  const comments = useCommentStore((state) => state.commentsByPost[postId]);
  return (
    <>
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
        {formatNumber(comments?.length || 0)}
      </Text>
    </>
  );
};

export default CommentButton;
