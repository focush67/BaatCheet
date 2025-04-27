import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useTheme } from "@/context/ThemeContext";

const ProfileHeader = ({ username }: { username: string }) => {
  const { colorScheme } = useTheme();

  return (
    <View
      className={`flex-row items-center justify-between px-4 py-3 ${
        colorScheme === "light" ? "bg-white" : "bg-black"
      }`}
    >
      <Text
        className={`text-2xl font-bold ${
          colorScheme === "light" ? "text-black" : "text-white"
        }`}
      >
        {username}
      </Text>
      <View className="flex-row">
        <TouchableOpacity className="ml-5">
          <Feather
            name="plus-square"
            size={24}
            color={colorScheme === "light" ? "#262626" : "#ffffff"}
          />
        </TouchableOpacity>
        <TouchableOpacity className="ml-5">
          <Ionicons
            name="menu"
            size={24}
            color={colorScheme === "light" ? "#262626" : "#ffffff"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileHeader;
