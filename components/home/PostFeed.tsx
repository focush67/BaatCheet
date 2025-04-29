import React from "react";
import { FlatList } from "react-native";
import PostCard from "@/components/home/PostCard";

const dummyPosts: Post[] = [
  {
    id: 1,
    username: "john",
    avatar: "https://i.pravatar.cc/150?img=2",
    image: "https://picsum.photos/400/400?random=1",
    caption: "Exploring the mountains! #adventure #nature",
    likes: 342,
    comments: 28,
    timeAgo: "2h ago",
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 2,
    username: "lisa",
    avatar: "https://i.pravatar.cc/150?img=3",
    image: "https://picsum.photos/400/400?random=2",
    caption: "Coffee time ☕️ #morningvibes",
    likes: 128,
    comments: 12,
    timeAgo: "1h ago",
    isLiked: true,
    isBookmarked: true,
  },
  {
    id: 3,
    username: "traveler",
    avatar: "https://i.pravatar.cc/150?img=4",
    image: "https://picsum.photos/400/400?random=3",
    caption: "Sunset views never get old 🌅",
    likes: 892,
    comments: 42,
    timeAgo: "4h ago",
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 4,
    username: "dave",
    avatar: "https://i.pravatar.cc/150?img=6",
    image: "https://picsum.photos/400/400?random=4",
    caption: "King Sized 🌅",
    likes: 892,
    comments: 42,
    timeAgo: "3h ago",
    isLiked: false,
    isBookmarked: true,
  },
];

export default function PostFeed() {
  return (
    <FlatList
      data={dummyPosts}
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
