import { VideoScreen } from "@/components/reel/ReelCard";
import { videos } from "@/constants/data";
import React, { useRef, useState } from "react";
import { FlatList, ViewToken, useWindowDimensions } from "react-native";

const Reels = () => {
  const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = useWindowDimensions();
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
      className="bg-black "
      windowSize={3}
      ref={flatListRef}
      data={videos}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item, index }) => (
        <VideoScreen
          shouldPlay={index === currentVisibleIndex}
          videoSource={item}
        />
      )}
      pagingEnabled
      showsVerticalScrollIndicator={false}
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={viewabilityConfig}
      getItemLayout={(data, index) => ({
        length: SCREEN_HEIGHT,
        offset: SCREEN_HEIGHT * index,
        index,
      })}
    />
  );
};

export default Reels;
