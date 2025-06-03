import { usePostStore } from "@/stores/PostStore";
import React, { useEffect } from "react";
import { FlatList } from "react-native";
import PostCard from "../post/PostCard";
import { useStoryStore } from "@/stores/StoryStore";

export default function Wall() {
  const posts = usePostStore((state) => state.posts);
  const stories = useStoryStore((state) => state.userStories);
  useEffect(() => {
    if (!posts || posts.length === 0) {
      usePostStore.getState().setPosts();
    }

    if (!stories || stories.length === 0) {
      useStoryStore.getState().fetchUserStories();
    }
  }, [posts, stories]);

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
