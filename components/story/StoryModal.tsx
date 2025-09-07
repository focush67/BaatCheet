import { useUser } from "@clerk/clerk-expo";
import React, { useEffect, useRef, useState, useCallback } from "react";
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
import ProgressBars from "./ProgressBars";

export const StoryModal = ({
  visible,
  stories = [],
  onClose,
  duration = 5000,
}: StoryModalProps) => {
  const { user } = useUser();
  const [currentIndex, setCurrentIndex] = useState(0);
  const animValuesRef = useRef<Animated.Value[]>([]);
  const [isLiked, setIsLiked] = useState(false);

  const replyInputRef = useRef<TextInput>(null);
  const startTimeRef = useRef<number | null>(null);
  const remainingDurationRef = useRef<number>(duration);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentStory = useStoryById(stories[currentIndex]?.id);

  if (!user) {
    return null;
  }

  const userEmail = (user?.primaryEmailAddress ??
    user?.emailAddresses?.[0]?.emailAddress ??
    null) as string | null;

  useEffect(() => {
    if (!stories || stories.length === 0) {
      animValuesRef.current = [];
      return;
    }
    if (animValuesRef.current.length !== stories.length) {
      animValuesRef.current = stories.map(() => new Animated.Value(0));
    }
  }, [stories]);

  useEffect(() => {
    const liked = currentStory?.likes?.some(
      (l) => l?.owner?.email === userEmail
    );
    setIsLiked(Boolean(liked));
  }, [currentStory, userEmail]);

  useEffect(() => {
    if (visible) {
      animValuesRef.current.forEach((v) => v?.setValue(0));
      setCurrentIndex(0);
    }
  }, [visible, stories.length]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const stopAnimation = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    const anim = animValuesRef.current[currentIndex];
    if (anim) anim.stopAnimation();
  }, [currentIndex]);

  const startAnimation = useCallback(
    (index: number, customDuration?: number) => {
      stopAnimation();
      if (!stories || index >= stories.length) return;

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

      const anim = animValuesRef.current[index] || new Animated.Value(0);
      Animated.timing(anim, {
        toValue: 1,
        duration: animationDuration,
        useNativeDriver: false,
      }).start();
    },
    [duration, onClose, stopAnimation, stories]
  );

  useEffect(() => {
    if (visible && currentStory) {
      startAnimation(currentIndex);
    }
    return () => stopAnimation();
  }, [visible, currentIndex, currentStory, startAnimation, stopAnimation]);

  if (!currentStory || !visible || !userEmail) return null;

  return (
    <Modal visible={visible} transparent={false} animationType="fade">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-1 bg-black justify-end">
          <ProgressBars animValuesRef={animValuesRef} length={stories.length} />

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

          {currentStory.coverPhoto && (
            <Image
              source={{ uri: currentStory.coverPhoto }}
              resizeMode="contain"
              className="w-full h-full absolute"
            />
          )}

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
