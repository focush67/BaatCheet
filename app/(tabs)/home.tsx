import { View, ScrollView } from "react-native";
import Stories from "@/components/home/Stories";
import PostFeed from "@/components/home/PostFeed";
import HeaderBar from "@/components/home/HeaderBar";
import { useTheme } from "@/context/ThemeContext";

export default function Home() {
  const { colorScheme } = useTheme();
  return (
    <View
      className={`flex-1 ${
        colorScheme === "light" ? "bg-gray-50" : "bg-black"
      }`}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
      >
        <HeaderBar />
        <Stories />
        <PostFeed />
      </ScrollView>
    </View>
  );
}
