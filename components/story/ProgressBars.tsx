import { View, Animated } from "react-native";
import React from "react";

interface ProgressBarProps {
  animValuesRef: React.RefObject<Animated.Value[]>;
  length: number;
}

function ProgressBars({ animValuesRef, length }: ProgressBarProps) {
  const animValues = animValuesRef.current;

  return (
    <View className="absolute top-2 left-2 right-2 flex-row gap-1 z-50">
      {Array.from({ length }).map((_, i) => {
        const interpolatedWidth =
          animValues && animValues[i]
            ? animValues[i].interpolate({
                inputRange: [0, 1],
                outputRange: ["0%", "100%"],
              })
            : null;

        return (
          <View
            key={i}
            className="flex-1 h-0.5 bg-white/30 rounded overflow-hidden"
          >
            {interpolatedWidth ? (
              <Animated.View
                style={{
                  height: "100%",
                  backgroundColor: "white",
                  width: interpolatedWidth,
                }}
              />
            ) : (
              <View className="h-full bg-white/10" />
            )}
          </View>
        );
      })}
    </View>
  );
}

export default ProgressBars;
