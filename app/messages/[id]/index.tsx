import { ChatBubble } from "@/components/messages/ChatBubble";
import { ChatHeader } from "@/components/messages/ChatHeader";
import { ChatInput } from "@/components/messages/ChatInput";
import { mockChatMessages } from "@/constants/data";
import { useTheme } from "@/context/ThemeContext";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { FlatList, KeyboardAvoidingView, Platform, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ChatScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const navigation = useNavigation();
  const { colorScheme } = useTheme();

  const handleBack = () => {
    if (navigation.canGoBack()) {
      router.back();
    } else {
      router.push("/messages");
    }
  };

  const user = {
    username: "john_doe",
    name: "John Doe",
    avatar: "https://i.pravatar.cc/150?img=5",
    status: "Active now",
    isVerified: true,
    isCloseFriend: true,
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black" edges={["top"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
        keyboardVerticalOffset={Platform.OS === "ios" ? 85 : 0}
      >
        <ChatHeader
          colorScheme={colorScheme}
          user={user}
          handleBack={handleBack}
        />

        <View className="flex-1">
          <FlatList
            data={mockChatMessages}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{
              paddingHorizontal: 20,
              paddingTop: 20,
              paddingBottom: 90, // Increased padding to accommodate ChatInput
            }}
            renderItem={({ item }) => (
              <View className="mb-5">
                <ChatBubble message={item} />
              </View>
            )}
            inverted
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={() => (
              <View className="items-center py-6 mb-3">
                <View
                  className={`flex-row items-center px-6 py-3 rounded-full ${
                    colorScheme === "light" ? "bg-gray-100" : "bg-gray-800"
                  }`}
                ></View>
              </View>
            )}
          />
        </View>

        <ChatInput />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
