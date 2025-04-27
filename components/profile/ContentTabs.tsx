import { View, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/context/ThemeContext";

const ContentTabs = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: ActiveTab;
  setActiveTab: (_: ActiveTab) => void;
}) => {
  const { colorScheme } = useTheme();

  return (
    <View className="flex-row border-t border-gray-200 mt-4">
      <TabButton
        iconName={"grid"}
        isActive={activeTab === "posts"}
        onPress={() => setActiveTab("posts")}
        iconColor={colorScheme === "light" ? "black" : "white"}
      />
      <TabButton
        iconName={activeTab === "saved" ? "bookmark" : "bookmark-outline"}
        isActive={activeTab === "saved"}
        onPress={() => setActiveTab("saved")}
        iconColor={colorScheme === "light" ? "black" : "white"}
      />

      <TabButton
        iconName={activeTab === "tagged" ? "person" : "person-outline"}
        isActive={activeTab === "tagged"}
        onPress={() => setActiveTab("tagged")}
        iconColor={colorScheme === "light" ? "black" : "white"}
      />
    </View>
  );
};

const TabButton = ({
  iconName,
  isActive,
  onPress,
  iconColor,
}: TabButtonProps) => (
  <TouchableOpacity
    className={`flex-1 items-center py-3 ${
      isActive ? "border-t-2 border-black" : ""
    }`}
    onPress={onPress}
  >
    <Ionicons name={iconName} size={24} color={isActive ? "gray" : iconColor} />
  </TouchableOpacity>
);

export default ContentTabs;
