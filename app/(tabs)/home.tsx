import { View, ScrollView } from "react-native";
import Stories from "@/components/home/Stories";
import PostFeed from "@/components/home/PostFeed";
import HeaderBar from "@/components/home/HeaderBar";

export default function Home() {
  return (
    <View className="flex-1 bg-gray-50">
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