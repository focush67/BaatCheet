import React, { useState } from "react";
import { View, Image, Dimensions } from "react-native";
import {
  LongPressGestureHandler,
  GestureHandlerRootView,
  State,
} from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");

const PostThumbnail = ({
  imageUrl,
  onActivate,
  onDeactivate,
}: {
  imageUrl: string;
  onActivate: () => void;
  onDeactivate: () => void;
}) => (
  <LongPressGestureHandler
    onHandlerStateChange={({ nativeEvent }) => {
      if (nativeEvent.state === State.ACTIVE) {
        onActivate();
      }
      if (
        nativeEvent.state === State.END ||
        nativeEvent.state === State.CANCELLED ||
        nativeEvent.state === State.FAILED
      ) {
        onDeactivate();
      }
    }}
    minDurationMs={200}
  >
    <View className="w-1/3 aspect-square p-px">
      <Image
        source={{ uri: imageUrl }}
        style={{ width: "auto", height: "100%" }}
      />
    </View>
  </LongPressGestureHandler>
);

const PostsGrid = ({ posts }: { posts: UserPost[] }) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const opacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: withTiming(opacity.value, { duration: 150 }),
    transform: [
      { scale: withTiming(opacity.value ? 1 : 0.9, { duration: 150 }) },
    ],
  }));

  const showPreview = (url: string) => {
    setPreviewImage(url);
    opacity.value = 1;
  };

  const hidePreview = () => {
    opacity.value = 0;
    setTimeout(() => setPreviewImage(null), 200);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {posts.map((post) => (
          <PostThumbnail
            key={post.id}
            imageUrl={post.imageUrl}
            onActivate={() => showPreview(post.imageUrl)}
            onDeactivate={hidePreview}
          />
        ))}
      </View>

      {previewImage && (
        <Animated.View
          style={[
            {
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,0.8)",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 999,
            },
            animatedStyle,
          ]}
        >
          <Image
            source={{ uri: previewImage }}
            style={{
              width: width * 0.9,
              height: width * 0.9,
              borderRadius: 12,
              resizeMode: "contain",
            }}
          />
        </Animated.View>
      )}
    </GestureHandlerRootView>
  );
};

export default PostsGrid;
