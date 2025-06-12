import { useTheme } from "@/context/ThemeContext";
import { addNewComment } from "@/services/postService";
import { useCommentStore } from "@/stores/CommentStore";
import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TextInput, TouchableOpacity, View } from "react-native";

const TopLevelCommentBox: React.FC<any> = ({
  postId,
  value,
  onChange,
  onSubmit,
}) => {
  const { colorScheme } = useTheme();
  const { user } = useUser();
  if (!user) {
    return null;
  }
  const updateComments = useCommentStore((state) => state.addComment);
  const handleCommenting = async () => {
    const response = await addNewComment(
      postId,
      user.emailAddresses[0].emailAddress,
      value
    );
    console.log("Comment Added", response);
    updateComments(postId, response);
    onSubmit?.();
  };
  return (
    <View className="px-4 py-3">
      <View className="flex-row items-center">
        <TextInput
          className={`flex-1 text-sm p-3 border rounded-lg  ${
            colorScheme === "light"
              ? "text-gray-800 border-gray-400"
              : "text-gray-200 border-gray-50"
          }`}
          placeholder="Add a comment..."
          placeholderTextColor="#8e8e8e"
          value={value}
          onChangeText={onChange}
          multiline
          style={{ minHeight: 40, textAlignVertical: "top" }}
        />
        <TouchableOpacity
          onPress={() => {
            if (value.trim()) handleCommenting();
          }}
          disabled={!value.trim()}
          className="ml-3"
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons
            name="send-sharp"
            color={`${colorScheme === "light" ? "black" : "white"}`}
            size={28}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TopLevelCommentBox;
