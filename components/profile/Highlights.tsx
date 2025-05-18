import React from "react";
import { Image, ScrollView, Text, View } from "react-native";

const HighlightItem = ({ id }: { id: number }) => (
  <View className="items-center mr-6">
    <View className="w-16 h-16 rounded-full border border-gray-300 p-0.5">
      <Image
        source={{ uri: `https://picsum.photos/70/70?random=${id}` }}
        className="w-full h-full rounded-full"
      />
    </View>
    <Text className="mt-1 text-xs">{id === 1 ? "New" : `Highlight ${id}`}</Text>
  </View>
);

const Highlights = () => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    className="mt-6 px-4"
  >
    {[1, 2, 3, 4].map((item) => (
      <HighlightItem key={item} id={item} />
    ))}
  </ScrollView>
);

export default Highlights;
