import { View, FlatList, TouchableOpacity, Text } from "react-native";
import { useLocalSearchParams, useRouter, useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import ChatBubble from "@/components/messages/ChatBubble";
import InputBar from "@/components/messages/InputBar";
import { mockChatMessages } from "@/constants/data";
import { useTheme } from "@/context/ThemeContext";

export default function ChatScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const navigation = useNavigation();
  const { colorScheme } = useTheme();

  const handleBack = () => {
    if (navigation.canGoBack()) {
      router.back();
    } else {
      router.push("/messages"); // Fallback to messages list
    }
  };

  return (
    <View className="flex-1 bg-white dark:bg-black">
      {/* Custom Header with Back Button */}
      <View
        className={`flex-row items-center justify-between px-4 py-3 border-b ${
          colorScheme === "light" ? "border-gray-200" : "border-gray-800"
        }`}
      >
        <View className="flex-row items-center">
          <TouchableOpacity onPress={handleBack}>
            <Ionicons
              name="arrow-back"
              size={24}
              color={colorScheme === "light" ? "black" : "white"}
            />
          </TouchableOpacity>
          <Text
            className={`ml-4 text-lg font-semibold ${
              colorScheme === "light" ? "text-black" : "text-white"
            }`}
          >
            Chat {id}
          </Text>
        </View>
        <Ionicons
          name="videocam-outline"
          size={24}
          color={colorScheme === "light" ? "black" : "white"}
        />
      </View>

      {/* Messages List */}
      <FlatList
        data={mockChatMessages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => <ChatBubble message={item} />}
        inverted
      />

      {/* Input Bar */}
      <InputBar />
    </View>
  );
}
