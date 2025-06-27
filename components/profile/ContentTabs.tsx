import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity, View } from "react-native";

type TabButtonProps = {
  iconName: IoniconsName;
  isActive: boolean;
  onPress: () => void;
  colorScheme: "light" | "dark";
};

const TabButton = ({
  iconName,
  isActive,
  onPress,
  colorScheme,
}: TabButtonProps) => {
  const isDarkMode = colorScheme === "dark";

  return (
    <TouchableOpacity
      className={`flex-1 items-center py-3 ${
        isActive
          ? `border-t-2 ${isDarkMode ? "border-white" : "border-black"}`
          : ""
      }`}
      onPress={onPress}
    >
      <Ionicons
        name={iconName}
        size={24}
        color={
          isActive
            ? isDarkMode
              ? "white"
              : "black"
            : isDarkMode
            ? "#a1a1aa"
            : "#737373"
        }
      />
    </TouchableOpacity>
  );
};

export const ContentTabs = ({ activeTab, setActiveTab }: ContentProps) => {
  const { colorScheme } = useTheme();
  const isDarkMode = colorScheme === "dark";

  return (
    <View className={`flex-row mt-4`}>
      <TabButton
        iconName={activeTab === "posts" ? "grid" : "grid-outline"}
        isActive={activeTab === "posts"}
        onPress={() => setActiveTab("posts")}
        colorScheme={colorScheme}
      />
      <TabButton
        iconName={activeTab === "saved" ? "bookmark" : "bookmark-outline"}
        isActive={activeTab === "saved"}
        onPress={() => setActiveTab("saved")}
        colorScheme={colorScheme}
      />
      <TabButton
        iconName={activeTab === "tagged" ? "person" : "person-outline"}
        isActive={activeTab === "tagged"}
        onPress={() => setActiveTab("tagged")}
        colorScheme={colorScheme}
      />
    </View>
  );
};
