import { useTheme } from "@/context/ThemeContext";
import { addNewComment } from "@/services/postService";
import { useCommentStore } from "@/stores/CommentStore";
import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Alert,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";

const TopLevelCommentBox: React.FC<any> = ({
  postId,
  value,
  onChange,
  onSubmit,
}) => {
  const [isCommenting, setIsCommenting] = useState(false);
  const { colorScheme } = useTheme();
  const { user } = useUser();
  const updateComments = useCommentStore((state) => state.addComment);

  if (!user) return null;

  const handleCommenting = async () => {
    if (isCommenting) return;
    setIsCommenting(true);

    try {
      const response = await addNewComment(
        postId,
        user.emailAddresses[0].emailAddress,
        value.trim()
      );
      updateComments(postId, response);
      onSubmit?.(); // clear input
    } catch (error) {
      console.error("Failed to add comment:", error);
      Alert.alert("Error", "Failed to add comment. Please try again.");
    } finally {
      setIsCommenting(false);
    }
  };

  return (
    <View className="px-4 py-3">
      <View className="flex-row items-center">
        <TextInput
          className={`flex-1 text-sm p-3 border rounded-lg ${
            colorScheme === "light"
              ? "text-gray-800 border-gray-400"
              : "text-gray-200 border-gray-50"
          }`}
          placeholder="Add a comment..."
          placeholderTextColor="#8e8e8e"
          value={value}
          onChangeText={onChange}
          multiline
          editable={!isCommenting}
          style={{ minHeight: 40, textAlignVertical: "top" }}
        />
        <TouchableOpacity
          onPress={handleCommenting}
          disabled={!value.trim() || isCommenting}
          className="ml-3"
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          {isCommenting ? (
            <ActivityIndicator
              size="small"
              color={colorScheme === "light" ? "black" : "white"}
            />
          ) : (
            <Ionicons
              name="send-sharp"
              color={colorScheme === "light" ? "black" : "white"}
              size={28}
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TopLevelCommentBox;
