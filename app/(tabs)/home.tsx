import HeaderBar from "@/components/home/Header";
import Wall from "@/components/home/Wall";
import { Stories } from "@/components/story/Stories";
import { useTheme } from "@/context/ThemeContext";
import { usePostStore } from "@/stores/PostStore";
import { useLayoutEffect } from "react";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const { colorScheme } = useTheme();
  const { loadPosts } = usePostStore();

  useLayoutEffect(() => {
    loadPosts();
  }, []);

  return (
    <SafeAreaView
      edges={["top"]}
      className={`flex-1 ${
        colorScheme === "light" ? "bg-gray-50" : "bg-black"
      }`}
    >
      <FlatList
        data={[{ key: "header" }, { key: "stories" }, { key: "wall" }]}
        renderItem={({ item }) => {
          switch (item.key) {
            case "header":
              return <HeaderBar />;
            case "stories":
              return <Stories />;
            case "wall":
              return <Wall />;
            default:
              return null;
          }
        }}
        stickyHeaderIndices={[0]} // Makes header sticky
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
