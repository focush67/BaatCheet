import { View, TextInput, TouchableOpacity } from "react-native";
import { Ionicons, Feather, FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";

export default function InputBar() {
  const [message, setMessage] = useState("");
  const { colorScheme } = useTheme();

  const handleSend = () => {
    if (message.trim()) {
      setMessage("");
    }
  };

  return (
    <View
      className={`px-4 py-3 ${
        colorScheme === "light"
          ? "border-t border-gray-200"
          : "border-t border-gray-800"
      }`}
    >
      <View
        className={`flex-row items-center ${
          colorScheme === "light" ? "bg-gray-100" : "bg-gray-900"
        } rounded-full px-4 py-2`}
      >
        <TouchableOpacity className="mr-3">
          <FontAwesome
            name="smile-o"
            size={24}
            color={colorScheme === "light" ? "gray" : "lightgray"}
          />
        </TouchableOpacity>
        <TextInput
          className={`flex-1 ${
            colorScheme === "light" ? "text-black" : "text-white"
          }`}
          placeholder="Message..."
          placeholderTextColor={colorScheme === "light" ? "gray" : "lightgray"}
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity className="ml-3" onPress={handleSend}>
          {message ? (
            <Ionicons
              name="send"
              size={24}
              color={colorScheme === "light" ? "#007AFF" : "#0A84FF"}
            />
          ) : (
            <Feather
              name="camera"
              size={24}
              color={colorScheme === "light" ? "gray" : "lightgray"}
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
