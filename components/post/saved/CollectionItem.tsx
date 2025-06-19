import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";

interface CollectionItemProps {
  item: {
    id: string;
    title: string;
    coverPhoto: string;
  };
  isSelected: boolean;
  isDarkMode: boolean;
  onSelect: (id: string) => void;
  postCount: number;
}

const CollectionItem: React.FC<CollectionItemProps> = ({
  item,
  isSelected,
  isDarkMode,
  onSelect,
  postCount,
}) => {
  return (
    <TouchableOpacity
      className="flex-row items-center py-3"
      onPress={() => onSelect(item.id)}
    >
      <Image
        source={{ uri: item.coverPhoto }}
        className="w-11 h-11 rounded-md mr-3"
      />
      <View className="flex-1">
        <Text className={`${isDarkMode ? "text-white" : "text-black"}`}>
          {item.title}
        </Text>
        <Text
          className={`text-sm ${
            isDarkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          {postCount} posts
        </Text>
      </View>
      {isSelected ? (
        <Ionicons
          name="checkmark"
          size={20}
          color={isDarkMode ? "#60a5fa" : "#3b82f6"}
        />
      ) : (
        <TouchableOpacity
          className="w-8 h-8 rounded-full border border-gray-400 items-center justify-center opacity-60"
          onPress={() => onSelect(item.id)}
        >
          <Feather
            name="plus"
            size={16}
            color={isDarkMode ? "#ffffff" : "#000000"}
          />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

export default CollectionItem;
