import { usePostStore } from "@/stores/PostStore";
import React, { useEffect } from "react";
import { FlatList } from "react-native";
import PostCard from "../post/PostCard";

export default function Wall() {
  const posts = usePostStore((state) => state.posts);

  useEffect(() => {
    if (!posts || posts.length === 0) {
      usePostStore.getState().setPosts();
    }
  }, [posts]);

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
