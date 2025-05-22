import { Ionicons } from "@expo/vector-icons";
import { Image, Text, View } from "react-native";

export const ImagePreview = ({
  uri,
  emptyText,
}: {
  uri: string | null;
  emptyText: string;
}) => {
  if (uri) {
    return (
      <Image source={{ uri }} resizeMode="contain" className="w-full h-full" />
    );
  }

  return (
    <View className="items-center justify-center">
      <Ionicons name="image" size={60} color="gray" />
      <Text className="mt-2 text-gray-500 dark:text-gray-400 text-lg">
        {emptyText}
      </Text>
    </View>
  );
};
