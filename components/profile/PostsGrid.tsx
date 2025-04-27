import React from "react";
import { View, Image, Pressable, useWindowDimensions } from "react-native";

const PostsGrid = ({ posts }: { posts: UserPost[] }) => {
  const { width } = useWindowDimensions();
  const imageSize = width / 3;

  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
      {posts.map((post) => (
        <Pressable
          key={post.id}
          style={{
            width: imageSize,
            height: imageSize,
            padding: 1,
          }}
          onPress={() => {
            // No action for now, or you can put console.log(post.id)
          }}
        >
          <Image
            source={{ uri: post.imageUrl }}
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </Pressable>
      ))}
    </View>
  );
};

export default PostsGrid;
