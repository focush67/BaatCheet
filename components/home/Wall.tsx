import { usePostStore } from "@/stores/PostStore";
import React, { useEffect } from "react";
import { FlatList } from "react-native";
import PostCard from "../post/PostCard";
import { useStoryStore } from "@/stores/StoryStore";
import { useSavedStore } from "@/stores/SavedStore";
import { useUser } from "@clerk/clerk-expo";

export default function Wall() {
  const { user } = useUser();
  if (!user) {
    return null;
  }
  const email = user.emailAddresses[0].emailAddress;
  const stories = useStoryStore((state) => state.userStories);
  const mappedPosts = usePostStore((state) => state.mappedPosts);
  const collections = useSavedStore((state) => state.collections);

  useEffect(() => {
    if (!mappedPosts || mappedPosts.length === 0) {
      usePostStore.getState().setMappedPosts(email);
    }

    if (!stories || stories.length === 0) {
      useStoryStore.getState().fetchUserStories();
    }

    if (!collections || collections.length === 0) {
      useSavedStore.getState().setCollections(email);
    }
  }, [collections, stories, mappedPosts, email]);

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
