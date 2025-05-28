import { samplePosts } from "@/constants/data";
import { usePostStore } from "@/stores/PostStore";
import React, { useEffect } from "react";
import { FlatList } from "react-native";
import PostCard from "../post/PostCard";

export default function Wall() {
  const posts = usePostStore((state) => state.posts);
  useEffect(() => {
    usePostStore.getState().setPosts(samplePosts);
  }, []);
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
