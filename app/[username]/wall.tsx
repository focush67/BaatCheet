import PostCard from "@/components/post/PostCard";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function UserPostWall() {
  const { username } = useLocalSearchParams<{ username: string }>();
  const [posts, setPosts] = useState<PostCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const dummyPosts: PostCard[] = Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        username: username || "unknown",
        avatar: `https://i.pravatar.cc/150?img=${i + 1}`,
        image: `https://picsum.photos/400/400?random=${i + 1}`,
        caption: `Post #${i + 1} by ${username}`,
        likes: Math.floor(Math.random() * 1000),
        comments: Math.floor(Math.random() * 100),
        timeAgo: `${i + 1}h ago`,
        isLiked: Math.random() < 0.5,
        isBookmarked: Math.random() < 0.5,
      }));
      setPosts(dummyPosts);
      setLoading(false);
    }, 800);
  }, [username]);

  if (loading) {
    return <Text style={{ padding: 20 }}>Loading posts for {username}...</Text>;
  }

  return (
    <SafeAreaView edges={["top"]}>
      <FlatList
        data={posts}
        renderItem={({ item }) => <PostCard post={item} />}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      />
    </SafeAreaView>
  );
}
