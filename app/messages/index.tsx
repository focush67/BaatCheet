import { MessageSearch } from "@/components/messages/MessageSearch";
import { Notes } from "@/components/messages/Notes";
import { blocked, messages, requests } from "@/constants/data";
import { useTheme } from "@/context/ThemeContext";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MessageScreen() {
  const router = useRouter();
  const { colorScheme } = useTheme();
  const isDark = colorScheme === "dark";

  const [activeTab, setActiveTab] = useState<ActiveMessageTab>("messages");

  const getData = () => {
    if (activeTab === "messages") return messages;
    if (activeTab === "requests") return requests;
    return blocked;
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black">
      <View className="flex-row justify-between items-center px-4 py-3">
        <TouchableOpacity onPress={() => router.back()} className="pr-2">
          <Ionicons
            name="chevron-back"
            size={26}
            color={isDark ? "#fff" : "#000"}
          />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-black dark:text-white flex-1 text-center">
          Messages
        </Text>
        <TouchableOpacity>
          <Ionicons
            name="create-outline"
            size={24}
            color={isDark ? "#fff" : "#000"}
          />
        </TouchableOpacity>
      </View>

      <MessageSearch />
      <Notes />

      {/* Tabs */}
      <View className="flex-row justify-around border-b border-gray-300 dark:border-gray-700 py-2">
        {["messages", "requests", "blocked"].map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab as typeof activeTab)}
            className={`pb-1 ${
              activeTab === tab ? "border-b-2 border-blue-500" : ""
            }`}
          >
            <Text
              className={`text-sm font-medium ${
                activeTab === tab
                  ? "text-blue-500"
                  : isDark
                  ? "text-gray-400"
                  : "text-gray-600"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Message List */}
      <View style={{ flex: 1 }}>
        <FlatList
          data={getData()}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="flex-row items-center px-4 py-3"
              onPress={() =>
                router.push({
                  pathname: "/messages/[id]",
                  params: { id: item.id },
                })
              }
            >
              <Image
                source={{ uri: item.avatar }}
                className="w-12 h-12 rounded-full"
              />
              <View className="flex-1 ml-3">
                <View className="flex-row items-center">
                  <Text className="text-base font-semibold text-black dark:text-white">
                    {item.username}
                  </Text>
                  {item.isVerified && (
                    <MaterialIcons
                      name="verified"
                      size={16}
                      color="#3897f0"
                      style={{ marginLeft: 4 }}
                    />
                  )}
                </View>
                <Text
                  numberOfLines={1}
                  className={`text-sm ${
                    item.unread ? "font-bold" : "font-normal"
                  } ${
                    isDark
                      ? item.unread
                        ? "text-white"
                        : "text-gray-400"
                      : item.unread
                      ? "text-black"
                      : "text-gray-500"
                  }`}
                >
                  {item.lastMessage}
                </Text>
              </View>
              <View className="items-end ml-2">
                <Text className="text-xs text-gray-500">{item.time}</Text>
                {item.unread && (
                  <View className="bg-blue-500 rounded-full w-4 h-4 items-center justify-center mt-1">
                    <Text className="text-white text-xs">1</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
