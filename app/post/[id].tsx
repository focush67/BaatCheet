import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { Image, Pressable, Text, View } from "react-native";

const getPostById = (id: string) => ({
  id,
  imageUrl: `https://picsum.photos/500/500?random=${id}`,
  caption: `This is the caption for post ${id}`,
  username: "sparshv70",
});

export default function PostScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const post = getPostById(id ?? "0");
  const navigation = useNavigation();

  useEffect(() => {
    navigation.getParent()?.setOptions({ tabBarStyle: { display: "none" } });

    return () => {
      navigation.getParent()?.setOptions({ tabBarStyle: undefined });
    };
  }, []);

  return (
    <View className="flex-1 bg-white pt-10">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 mb-2.5">
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={28} color="black" />
        </Pressable>
        <Text className="font-bold text-base">{post.username}</Text>
        <View className="w-7" />
      </View>

      <Image
        source={{ uri: post.imageUrl }}
        className="w-full h-[400px]"
        resizeMode="cover"
      />

      <Text className="mt-3 px-4 text-sm">{post.caption}</Text>
    </View>
  );
}

export const unstable_settings = {
  initialRouteName: "index",
};

export const screenOptions = {
  presentation: "modal",
};
