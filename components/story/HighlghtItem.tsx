import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";

const HighlightItem: React.FC<HighlightItemProps> = ({
  id,
  onPress,
  theme,
  imageUri,
}) => (
  <Pressable onPress={onPress} disabled={!onPress}>
    <View className="items-center mr-6">
      <View className="w-16 h-16 rounded-full border border-gray-300 p-0.5">
        {id === 1 ? (
          <TouchableOpacity
            className="items-center flex-1 justify-center"
            onPress={onPress}
          >
            <Ionicons
              name="add-outline"
              size={28}
              color={theme === "light" ? "black" : "white"}
            />
          </TouchableOpacity>
        ) : (
          <Image
            source={{
              uri: imageUri || `https://picsum.photos/70/70?random=${id}`,
            }}
            className="w-full h-full rounded-full"
          />
        )}
      </View>
      <Text
        className={`mt-1 text-xs ${
          theme === "light" ? "text-black" : "text-white"
        }`}
      >
        {id === 1 ? "New" : `Highlight ${id}`}
      </Text>
    </View>
  </Pressable>
);

export default HighlightItem;
