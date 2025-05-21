import { sampleNotifications } from "@/constants/data";
import { useTheme } from "@/context/ThemeContext";
import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const NotificationsPage = () => {
  const { colorScheme } = useTheme();
  const [activeTab, setActiveTab] = useState("all");
  const router = useRouter();
  const [notifications, setNotifications] = useState(sampleNotifications);

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const renderNotificationIcon = (type: string) => {
    switch (type) {
      case "like":
        return <FontAwesome name="heart" size={16} color="#ed4956" />;
      case "comment":
        return <Ionicons name="chatbubble-outline" size={16} color="#3897f0" />;
      case "follow":
        return <Ionicons name="person-add-outline" size={16} color="#3897f0" />;
      case "mention":
        return <Ionicons name="at" size={16} color="#3897f0" />;
      default:
        return null;
    }
  };

  const renderNotificationContent = (n: any) => {
    const notificationTextMap: Record<string, string> = {
      like: "liked your photo.",
      comment: `commented: "${n.text}"`,
      follow: "started following you.",
      mention: `mentioned you in a comment: "${n.text}"`,
    };

    return (
      <SafeAreaView className="flex-1" edges={["top"]}>
        <Text
          className={`text-sm leading-snug ${
            n.read
              ? colorScheme === "dark"
                ? "text-gray-300"
                : "text-gray-700"
              : "text-black dark:text-white"
          }`}
        >
          <Text className="font-semibold">{n.user.name} </Text>
          {notificationTextMap[n.type]}
        </Text>
        <Text className="text-xs text-gray-400 mt-0.5">{n.time}</Text>
      </SafeAreaView>
    );
  };

  const filteredNotifications = notifications.filter((n) => {
    switch (activeTab) {
      case "all":
        return true;
      case "following":
        return n.type === "follow";
      case "comments":
        return n.type === "comment";
      case "verified":
        return n.type === "like";
      case "official":
        return n.type === "mention";
      default:
        return true;
    }
  });

  return (
    <SafeAreaView
      edges={["bottom"]}
      className={`flex-1 ${colorScheme === "dark" ? "bg-black" : "bg-white"}`}
    >
      <SafeAreaView
        className={`flex-row justify-between items-center px-4 py-3 border-b ${
          colorScheme === "light" ? "border-gray-200" : "border-gray-700"
        }`}
      >
        <TouchableOpacity
          onPress={() => {
            router.back();
          }}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color={colorScheme === "light" ? "#000" : "#fff"}
          />
        </TouchableOpacity>
        <Text
          className={`text-xl font-bold ${
            colorScheme === "light" ? "text-black" : "text-white"
          }`}
        >
          Notifications
        </Text>
        <TouchableOpacity>
          <Feather
            name="inbox"
            size={24}
            color={colorScheme === "light" ? "#000" : "#fff"}
          />
        </TouchableOpacity>
      </SafeAreaView>

      <View
        className={`flex-row border-b ${
          colorScheme === "light" ? "border-gray-200" : "border-gray-700"
        }`}
      >
        {["all", "following", "comments", "verified", "official"].map((tab) => (
          <TouchableOpacity
            key={tab}
            className={`flex-1 items-center py-3 ${
              activeTab === tab
                ? `border-b-2 ${
                    colorScheme === "light" ? "border-black" : "border-white"
                  }`
                : ""
            }`}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              className={`text-sm ${
                activeTab === tab
                  ? colorScheme === "light"
                    ? "text-black font-semibold"
                    : "text-white font-semibold"
                  : "text-gray-400"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView className="flex-1">
        {filteredNotifications.map((n) => (
          <TouchableOpacity
            key={n.id}
            onPress={() => markAsRead(n.id)}
            className={`flex-row items-start gap-3 px-4 py-3 border-b ${
              colorScheme === "light" ? "border-gray-100" : "border-gray-800"
            } ${!n.read ? "bg-gray-100 dark:bg-gray-900" : ""}`}
          >
            <View className="relative">
              <Image
                source={{ uri: n.user.avatar }}
                className="w-11 h-11 rounded-full"
              />
              <View className="absolute -bottom-1 -right-1 bg-white dark:bg-black rounded-full p-1">
                {renderNotificationIcon(n.type)}
              </View>
            </View>
            {renderNotificationContent(n)}
            {n.postImage && (
              <Image
                source={{ uri: n.postImage }}
                className="w-11 h-11 rounded-md ml-auto mt-1"
              />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotificationsPage;
