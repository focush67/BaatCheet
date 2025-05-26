import { samplePosts } from "@/constants/data";
import React from "react";
import { FlatList } from "react-native";
import PostCard from "../post/PostCard";
export default function Wall() {
  // const posts = usePostStore((state) => state.posts);
  // const postArray = React.useMemo(() => Object.values(posts), [posts]);
  return (
    <FlatList
      data={samplePosts}
      renderItem={({ item }) => {
        if (!PostCard) {
          console.error("PostCard is undefined!");
          return null;
        }
        return <PostCard post={item} />;
      }}
      keyExtractor={(item) => item.id.toString()}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 30 }}
    />
  );
}
