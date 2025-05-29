import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

const ReplyComposer: React.FC<any> = ({
  replyText,
  onChange,
  onSubmit,
  onCancel,
  username,
  postId,
}) => {
  console.log(`Reply composer rendered for ${postId}`);
  return (
    <View className="ml-11 mt-2 pr-4">
      <View className="flex-row items-center mb-1">
        <Text className="text-xs text-gray-400">Replying to @{username}</Text>
      </View>

      <TextInput
        className="text-xs p-2 border border-gray-300 rounded-lg bg-gray-50 text-black"
        placeholder="Write a reply..."
        placeholderTextColor="#8e8e8e"
        multiline
        value={replyText}
        onChangeText={onChange}
        autoFocus
      />

      <View className="flex-row justify-end mt-2 gap-x-3">
        <TouchableOpacity
          onPress={onCancel}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text className="text-xs text-gray-500">Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            onSubmit();
            onCancel();
          }}
          disabled={!replyText.trim()}
          className={`px-3 py-1 rounded-lg ${
            replyText.trim() ? "bg-blue-600" : "bg-blue-300"
          }`}
        >
          <Text className="text-xs font-semibold text-white">Reply</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default React.memo(ReplyComposer);
