import React, { useState, useEffect } from "react";
import { TextInput, TouchableOpacity, View, Text } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";

const ReplyComposer = ({
  postId,
  onSubmit,
  onCancel,
  username,
  commentId,
}: {
  postId: string;
  onSubmit: (text: string) => void;
  onCancel: () => void;
  username: string | undefined;
  commentId: string;
}) => {
  const { colorScheme } = useTheme();
  const isDark = colorScheme === "dark";
  const [replyText, setReplyText] = useState("");
  const textInputRef = React.useRef<TextInput>(null);

  useEffect(() => {
    textInputRef.current?.focus();
  }, []);

  const handleSubmit = () => {
    if (replyText.trim()) {
      onSubmit(replyText.trim());
      setReplyText("");
    }
  };

  return (
    <View className="ml-11 mt-2 pr-4 mb-4">
      {/* Top Info Row */}
      <View className="flex-row items-center justify-between mb-1">
        <Text
          className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}
        >
          Replying to @{username}
        </Text>
        <TouchableOpacity
          onPress={onCancel}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons
            name="close"
            size={16}
            color={isDark ? "#9ca3af" : "#6b7280"}
          />
        </TouchableOpacity>
      </View>

      {/* Input and Send */}
      <View
        className={`flex-row items-end bg-transparent rounded-xl border ${
          isDark ? "border-gray-700" : "border-gray-300"
        } shadow-sm p-2`}
      >
        <TextInput
          ref={textInputRef}
          className={`
            flex-1 text-sm px-2 py-1
            ${isDark ? "text-gray-100" : "text-gray-900"}
          `}
          placeholder="Write a reply..."
          placeholderTextColor={isDark ? "#6b7280" : "#9ca3af"}
          multiline
          value={replyText}
          onChangeText={setReplyText}
          textAlignVertical="top"
        />

        <TouchableOpacity
          onPress={handleSubmit}
          disabled={!replyText.trim()}
          className={`ml-2 p-2 rounded-full transition-all ${
            replyText.trim()
              ? isDark
                ? "bg-blue-600"
                : "bg-blue-500"
              : isDark
              ? "bg-gray-700"
              : "bg-gray-300"
          }`}
        >
          <Ionicons
            name="send"
            size={16}
            color={
              replyText.trim() ? "#ffffff" : isDark ? "#9ca3af" : "#ffffff"
            }
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default React.memo(ReplyComposer);
