import { usePostStore } from "@/stores/PostStore";
import React from "react";
import { FlatList } from "react-native";
import PostCard from "../post/PostCard";

export default function Wall() {
  const posts = usePostStore((state) => state.posts); // ✅ Use selector

  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => <PostCard post={item} />}
      keyExtractor={(item) => item.id.toString()}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 30 }}
    />
  );
}
