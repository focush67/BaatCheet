import { useTheme } from "@/context/ThemeContext";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";

const HeaderBar = ({ unreadMessages = 4 }: HeaderBarProps) => {
  const { colorScheme } = useTheme();
  const router = useRouter();
  return (
    <SafeAreaView
      className={`flex-row items-center justify-between px-4 py-3 ${
        colorScheme === "light"
          ? "bg-white border-b border-gray-200"
          : "bg-black border-b border-gray-800"
      }`}
    >
      <Text
        className={`text-2xl font-bold ${
          colorScheme === "light" ? "text-black" : "text-white"
        }`}
      >
        BaatCheet
      </Text>

      {/* Icons */}
      <View className="flex-row items-center gap-x-2">
        <TouchableOpacity onPress={() => router.push("/notifications")}>
          <Ionicons
            name="heart-outline"
            size={28}
            color={colorScheme === "light" ? "#262626" : "#ffffff"}
          />
        </TouchableOpacity>

        <TouchableOpacity
          className="relative"
          onPress={() => router.push("/messages")}
        >
          <FontAwesome
            name="paper-plane-o"
            size={28}
            color={colorScheme === "light" ? "#262626" : "#ffffff"}
          />
          {unreadMessages > 0 && (
            <View className="absolute -top-2 -right-2 bg-red-500 rounded-full px-1.5 min-w-[20px] h-[20px] items-center justify-center">
              <Text className="text-white text-[13px] font-semibold">
                {unreadMessages}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default HeaderBar;
