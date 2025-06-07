import { usePostStore } from "@/stores/PostStore";
import React, { useEffect } from "react";
import { FlatList } from "react-native";
import PostCard from "../post/PostCard";
import { useStoryStore } from "@/stores/StoryStore";
import { useUser } from "@clerk/clerk-expo";
export default function Wall() {
  const { user } = useUser();
  const posts = usePostStore((state) => state.posts);
  const stories = useStoryStore((state) => state.userStories);
  const mappedPosts = usePostStore((state) => state.mappedPosts);
  useEffect(() => {
    if (!posts || posts.length === 0) {
      usePostStore.getState().setPosts();
    }

    if (!mappedPosts || mappedPosts.length === 0) {
      usePostStore
        .getState()
        .setMappedPosts(user?.emailAddresses[0].emailAddress!);
    }

    if (!stories || stories.length === 0) {
      useStoryStore.getState().fetchUserStories();
    }
  }, [posts, stories, mappedPosts]);

  return (
    <FlatList
      data={mappedPosts}
      renderItem={({ item }) => <PostCard post={item} />}
      keyExtractor={(item) => item.id.toString()}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 30 }}
    />
  );
}
