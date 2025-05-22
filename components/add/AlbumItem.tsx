import { Ionicons } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import { Text, TouchableOpacity } from "react-native";

export const AlbumItem = ({
  item,
  isSelected,
  onPress,
}: {
  item: MediaLibrary.Album;
  isSelected: boolean;
  onPress: () => void;
}) => {
  const showCount = item.assetCount > 0 || item.assetCount === undefined;

  return (
    <TouchableOpacity
      className={`flex-row items-center px-4 py-2 mr-2 rounded-full ${
        isSelected
          ? "bg-blue-100 dark:bg-blue-900"
          : "bg-gray-100 dark:bg-gray-800"
      }`}
      onPress={onPress}
    >
      <Ionicons
        name="folder"
        size={24}
        color={isSelected ? "#3b82f6" : "gray"}
      />
      <Text className="ml-2 mr-2 max-w-[100px] text-gray-800 dark:text-gray-200 truncate">
        {item.title}
      </Text>
      {showCount && (
        <Text className="text-xs text-gray-500 dark:text-gray-400">
          {item.assetCount ?? "?"}
        </Text>
      )}
    </TouchableOpacity>
  );
};
