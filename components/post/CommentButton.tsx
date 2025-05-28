import { useTheme } from "@/context/ThemeContext";
import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text, TouchableOpacity } from "react-native";

const CommentButton = ({
  post,
  setShowComments,
}: {
  post: PostCard;
  setShowComments: (_: boolean) => void;
}) => {
  const { colorScheme } = useTheme();

  const [commentCount] = useState(post.comments);
  console.log("Comments", commentCount);
  const formatNumber = (num: number): string => {
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "m";
    if (num >= 1_000) return (num / 1_000).toFixed(1) + "k";
    return num.toString();
  };
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
        {formatNumber(commentCount)}
      </Text>
    </>
  );
};

export default CommentButton;
