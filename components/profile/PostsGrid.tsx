import { useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, useWindowDimensions, View } from "react-native";

const PostsGrid = ({
  posts,
  onLongPressPost,
  onPostPressOut,
}: PostGridProps) => {
  const { width } = useWindowDimensions();
  const imageSize = width / 3;
  const router = useRouter();
  return (
    <View className="flex-row flex-wrap">
      {posts.map((post, index) => (
        <Pressable
          key={post.id}
          style={{
            width: imageSize,
            height: imageSize,
            padding: 1,
          }}
          onPress={() =>
            router.push({
              pathname: "/[username]/wall",
              params: { index: index.toString(), username: "sparshv70" },
            })
          }
          onLongPress={() => onLongPressPost(post)}
          onPressOut={() => onPostPressOut()}
        >
          <Image source={{ uri: post.imageUrl }} className="w-full h-full" />
        </Pressable>
      ))}
    </View>
  );
};

export default PostsGrid;
