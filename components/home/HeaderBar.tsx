import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useTheme } from "@/context/ThemeContext";

interface HeaderBarProps {
  unreadMessages?: number;
}

const HeaderBar = ({ unreadMessages = 4 }: HeaderBarProps) => {
  const { colorScheme } = useTheme();

  return (
    <View
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
        <TouchableOpacity>
          <Ionicons
            name="heart-outline"
            size={28}
            color={colorScheme === "light" ? "#262626" : "#ffffff"}
          />
        </TouchableOpacity>

        <TouchableOpacity className="relative">
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
    </View>
  );
};

export default HeaderBar;
