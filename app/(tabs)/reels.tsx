import { VideoScreen } from "@/components/reel/ReelCard";
import React, { useRef, useState } from "react";
import { FlatList, ViewToken } from "react-native";

const DATA = [1, 2, 3, 4, 5];

const Reels = () => {
  const [currentVisibleIndex, setCurrentVisibleIndex] = useState<number | null>(
    null
  );
  const timeoutRef = useRef<number | null>(null);
  const flatListRef = useRef(null);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      const firstVisibleItem = viewableItems[0];

      if (firstVisibleItem?.index !== currentVisibleIndex) {
        setCurrentVisibleIndex(null);

        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(() => {
          setCurrentVisibleIndex(firstVisibleItem?.index ?? null);
        }, 500);
      }
    }
  ).current;

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 80,
  };

  return (
    <FlatList
      windowSize={3}
      ref={flatListRef}
      data={DATA}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item, index }) => (
        <VideoScreen
          shouldPlay={index === currentVisibleIndex}
          videoSource={
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          }
        />
      )}
      pagingEnabled
      showsVerticalScrollIndicator={false}
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={viewabilityConfig}
    />
  );
};

export default Reels;
