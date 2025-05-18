import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity, View } from "react-native";

const TabButton = ({
  iconName,
  isActive,
  onPress,
  iconColor,
  colorScheme,
}: TabButtonProps) => (
  <TouchableOpacity
    className={`flex-1 items-center py-3 ${
      isActive
        ? `border-t-2 ${
            colorScheme === "light" ? "border-black" : "border-white"
          }`
        : ""
    }`}
    onPress={onPress}
  >
    <Ionicons name={iconName} size={24} color={isActive ? "gray" : iconColor} />
  </TouchableOpacity>
);

export const ContentTabs = ({ activeTab, setActiveTab }: ContentProps) => {
  const { colorScheme } = useTheme();
  return (
    <View className="flex-row mt-4">
      <TabButton
        iconName={"grid"}
        isActive={activeTab === "posts"}
        onPress={() => setActiveTab("posts")}
        iconColor={colorScheme === "light" ? "black" : "white"}
        colorScheme={colorScheme}
      />
      <TabButton
        iconName={activeTab === "saved" ? "bookmark" : "bookmark-outline"}
        isActive={activeTab === "saved"}
        onPress={() => setActiveTab("saved")}
        iconColor={colorScheme === "light" ? "black" : "white"}
        colorScheme={colorScheme}
      />

      <TabButton
        iconName={activeTab === "tagged" ? "person" : "person-outline"}
        isActive={activeTab === "tagged"}
        onPress={() => setActiveTab("tagged")}
        iconColor={colorScheme === "light" ? "black" : "white"}
        colorScheme={colorScheme}
      />
    </View>
  );
};
