import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const LikeButton = ({ post }: { post: PostCard }) => {
  const { colorScheme } = useTheme();
  const [likes, setLikes] = useState(post.likes);
  const [liked, setLiked] = useState(post.isLiked);
  const incrementLike = () => {
    if (liked) {
      setLiked(false);
      setLikes((prev) => prev - 1);
    } else {
      setLiked(true);
      setLikes((prev) => prev + 1);
    }
  };
  return (
    <View className="flex-row items-center mr-2">
      <TouchableOpacity
        className={`w-8 h-8 rounded-full justify-center items-center  ${
          colorScheme === "light" ? "bg-white" : "bg-gray-900"
        }`}
        onPress={() => incrementLike()}
      >
        <Ionicons
          name={liked ? "heart" : "heart-outline"}
          size={22}
          color={
            liked ? "#ed4956" : colorScheme === "light" ? "#262626" : "#ffffff"
          }
        />
      </TouchableOpacity>
      <Text
        className={`text-md ${
          colorScheme === "light" ? "text-gray-700" : "text-gray-300"
        }`}
      >
        {likes}
      </Text>
    </View>
  );
};

export default LikeButton;
