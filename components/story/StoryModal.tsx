import { useUser } from "@clerk/clerk-expo";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useStoryById } from "@/stores/StoryStore";
import StoryLikeButton from "./StoryLikeButton";
import StoryReplyBar from "./StoryReplyBar";
import StoryHeader from "./StoryHeader";

export const StoryModal = ({
  visible,
  stories = [],
  onClose,
  duration = 5000,
}: StoryModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { user } = useUser();
  const [animValues, setAnimValues] = useState<Animated.Value[]>([]);
  const [isLiked, setIsLiked] = useState(false);

  const replyInputRef = useRef<TextInput>(null);
  const startTimeRef = useRef<number | null>(null);
  const remainingDurationRef = useRef<number>(duration);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentStory = useStoryById(stories[currentIndex]?.id);

  if (!user) {
    return null;
  }
  const userEmail = user.emailAddresses[0]?.emailAddress;
  useEffect(() => {
    if (stories.length > 0) {
      setAnimValues(stories.map(() => new Animated.Value(0)));
    }
  }, [stories]);

  useEffect(() => {
    const liked = currentStory?.likes?.some(
      (like) => like?.owner?.email === userEmail
    );

    setIsLiked(liked ?? false);
  }, [currentStory, userEmail]);

  useEffect(() => {
    if (visible) {
      animValues.forEach((val) => val?.setValue(0));
      setCurrentIndex(0);
    }
  }, [visible]);

  useEffect(() => {
    if (visible && currentStory) {
      startAnimation(currentIndex);
    }
    return () => stopAnimation();
  }, [currentIndex, visible]);

  const startAnimation = (index: number, customDuration?: number) => {
    stopAnimation();
    if (index >= stories.length) return;

    const animationDuration = customDuration ?? duration;
    startTimeRef.current = Date.now();
    remainingDurationRef.current = animationDuration;

    timerRef.current = setTimeout(() => {
      if (index < stories.length - 1) {
        setCurrentIndex(index + 1);
      } else {
        onClose();
      }
    }, animationDuration);

    Animated.timing(animValues[index] || new Animated.Value(0), {
      toValue: 1,
      duration: animationDuration,
      useNativeDriver: false,
    }).start();
  };

  const stopAnimation = () => {
    timerRef.current && clearTimeout(timerRef.current);
    timerRef.current = null;
  };

  if (!currentStory || !visible) return null;

  return (
    <Modal visible={visible} transparent={false} animationType="fade">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View className="flex-1 bg-black justify-end">
          {/* Progress bars */}
          <View className="absolute top-2 left-2 right-2 flex-row gap-1 z-50">
            {stories.map((_, i) => (
              <View
                key={i}
                className="flex-1 h-0.5 bg-white/30 rounded overflow-hidden"
              >
                <Animated.View
                  style={{
                    height: "100%",
                    backgroundColor: "white",
                    width:
                      animValues[i]?.interpolate({
                        inputRange: [0, 1],
                        outputRange: ["0%", "100%"],
                      }) || "0%",
                  }}
                />
              </View>
            ))}
          </View>

          <StoryHeader currentStory={currentStory} onClose={onClose} />

          <View className="absolute inset-0 flex-row z-40">
            <TouchableOpacity
              className="flex-1"
              onPress={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
            />
            <TouchableOpacity
              className="flex-1"
              onPress={() =>
                setCurrentIndex((prev) =>
                  prev < stories.length - 1 ? prev + 1 : prev
                )
              }
            />
          </View>

          {/* Story image */}
          {currentStory.coverPhoto && (
            <Image
              source={{ uri: currentStory.coverPhoto }}
              resizeMode="contain"
              className="w-full h-full absolute"
            />
          )}

          {/* Bottom bar */}
          <View className="absolute bottom-5 px-4 w-full flex-row items-center z-50">
            <StoryReplyBar
              remainingDurationRef={remainingDurationRef}
              email={userEmail}
              storyId={currentStory.id}
              replyInputRef={replyInputRef}
              startAnimation={startAnimation}
              stopAnimation={stopAnimation}
              currentIndex={currentIndex}
            />
            <StoryLikeButton
              isLiked={isLiked}
              currentStory={currentStory}
              email={userEmail}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};
