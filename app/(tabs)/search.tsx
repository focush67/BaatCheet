import { useTheme } from "@/context/ThemeContext";
import React from "react";
import {
  View,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const images = [
  "https://picsum.photos/200",
  "https://picsum.photos/201",
  "https://picsum.photos/202",
  "https://picsum.photos/203",
  "https://picsum.photos/204",
  "https://picsum.photos/205",
  "https://picsum.photos/206",
  "https://picsum.photos/207",
];

export default function Search() {
  const insets = useSafeAreaInsets();
  const { colorScheme } = useTheme();
  return (
    <View
      className={`flex-1 ${
        colorScheme === "light" ? "bg-white" : "bg-black"
      }  px-4 pt-2`}
      style={{ paddingTop: insets.top }}
    >
      <TextInput
        className="bg-gray-100 rounded-full px-4 py-2 mb-4 mt-2"
        placeholder="Search"
      />

      <FlatList
        data={images}
        numColumns={3}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item }) => (
          <TouchableOpacity className="mb-2">
            <Image source={{ uri: item }} className="w-28 h-28 rounded-md" />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
