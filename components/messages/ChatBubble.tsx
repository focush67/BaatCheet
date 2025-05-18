import React from "react";
import { Text, View } from "react-native";

export const ChatBubble = ({ message }: { message: ChatMessage }) => {
  return (
    <View
      className={`mb-3 flex ${
        message.isOwnMessage ? "items-end" : "items-start"
      }`}
    >
      <View
        className={`px-4 py-2 rounded-2xl max-w-[80%] ${
          message.isOwnMessage
            ? "bg-blue-500 rounded-br-none"
            : "bg-gray-200 dark:bg-gray-700 rounded-bl-none"
        }`}
      >
        <Text
          className={`text-sm ${
            message.isOwnMessage ? "text-white" : "text-black dark:text-white"
          }`}
        >
          {message.text}
        </Text>
        <Text
          className={`text-xs mt-1 ${
            message.isOwnMessage ? "text-blue-100" : "text-gray-500"
          }`}
        >
          {message.timestamp}
        </Text>
      </View>
    </View>
  );
};
