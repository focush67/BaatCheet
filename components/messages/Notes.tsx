import React from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import { notes } from "@/constants/data";

export default function Notes() {
  return (
    <View className="py-3 border-b border-gray-200 dark:border-gray-700">
      <FlatList
        data={notes}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity className="items-center mr-4">
            <View className="w-20 h-20 rounded-full border-2 border-blue-500 overflow-hidden mb-1">
              <Image
                source={{ uri: item.avatar }}
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>
            <Text
              numberOfLines={1}
              className="text-xs text-center text-gray-800 dark:text-white w-14"
            >
              {item.note}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
