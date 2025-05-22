import { useTheme } from "@/context/ThemeContext";
import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";

export const ChatInput = () => {
  const { colorScheme } = useTheme();
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      console.log("Sending message", message);
      setMessage("");
    }
  };

  return (
    <View
      className={`absolute bottom-2 left-0 right-0 px-6 py-4 border-t ${
        colorScheme === "light"
          ? "border-gray-200 bg-white"
          : "border-gray-800 bg-black"
      }`}
    >
      <View className="flex-row items-center gap-2">
        <TouchableOpacity>
          <FontAwesome
            name="camera"
            size={22}
            color={colorScheme === "light" ? "black" : "white"}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicons
            name="mic-outline"
            size={22}
            color={colorScheme === "light" ? "black" : "white"}
          />
        </TouchableOpacity>

        <View
          className={`flex-1 rounded-full px-5 py-3 ${
            colorScheme === "light" ? "bg-gray-100" : "bg-gray-800"
          }`}
        >
          <TextInput
            placeholder="Message..."
            value={message}
            onChangeText={setMessage}
            placeholderTextColor={
              colorScheme === "light" ? "#8e8e8e" : "#a8a8a8"
            }
            className={`text-base ${
              colorScheme === "light" ? "text-black" : "text-white"
            }`}
          />
        </View>

        <TouchableOpacity>
          <Ionicons
            name="happy-outline"
            size={22}
            color={colorScheme === "light" ? "black" : "white"}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSend}>
          <Feather
            name="send"
            size={22}
            color={
              message.trim()
                ? colorScheme === "light"
                  ? "black"
                  : "white"
                : "gray"
            }
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
