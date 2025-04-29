import { View, Text } from "react-native";
import { useTheme } from "@/context/ThemeContext";

export default function ChatBubble({ message }: ChatBubbleProps) {
  const { colorScheme } = useTheme();

  return (
    <View className={`mb-3 ${message.isMe ? "items-end" : "items-start"}`}>
      <View
        className={`max-w-[80%] rounded-lg px-4 py-2 ${
          message.isMe
            ? "bg-blue-500"
            : colorScheme === "light"
            ? "bg-gray-200"
            : "bg-gray-700"
        }`}
      >
        <Text
          className={
            message.isMe
              ? "text-white"
              : colorScheme === "light"
              ? "text-black"
              : "text-white"
          }
        >
          {message.text}
        </Text>
      </View>
      <Text
        className={`text-xs mt-1 ${
          colorScheme === "light" ? "text-gray-500" : "text-gray-400"
        }`}
      >
        {message.time}
      </Text>
    </View>
  );
}
