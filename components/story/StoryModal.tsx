import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export const StoryModal = ({
  visible,
  stories,
  onClose,
  duration = 5000,
}: StoryModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [replyText, setReplyText] = useState("");
  const [liked, setLiked] = useState(false);
  const replyInputRef = useRef<TextInput>(null);
  const startTimeRef = useRef<number | null>(null);
  const remainingDurationRef = useRef<number>(duration);

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleSendReply = () => {
    if (replyText.trim()) {
      console.log("Reply sent:", replyText);
      setReplyText("");
      Keyboard.dismiss();
    }
  };

  const [animValues, setAnimValues] = useState<Animated.Value[]>([]);

  useEffect(() => {
    setAnimValues(stories.map(() => new Animated.Value(0)));
  }, [stories]);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (visible) {
      animValues.forEach((val: any) => val.setValue(0));
      setCurrentIndex(0);
    }
  }, [visible]);

  useEffect(() => {
    if (visible) {
      startAnimation(currentIndex);
    }
    return () => stopAnimation();
  }, [currentIndex, visible]);

  const startAnimation = (index: number, customDuration?: number) => {
    stopAnimation();

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

    if (animValues[index]) {
      Animated.timing(animValues[index], {
        toValue: 1,
        duration: animationDuration,
        useNativeDriver: false,
      }).start();
    }
  };

  const stopAnimation = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    const index = currentIndex;
    const startTime = startTimeRef.current;

    animValues[index]?.stopAnimation((value: any) => {
      const elapsed = startTime ? Date.now() - startTime : 0;
      const remaining = duration - elapsed;

      remainingDurationRef.current = Math.max(remaining, 0);
    });
  };

  const currentStory = stories[currentIndex];

  if (!currentStory) return null;

  return (
    <Modal
      visible={visible}
      transparent={false}
      animationType="fade"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <View className="flex-1 bg-black justify-end">
          <View className="absolute top-2 left-2 right-2 flex-row gap-1 z-50">
            {stories.map((_: any, i: number) => (
              <View
                key={i}
                className="flex-1 h-0.5 bg-white/30 overflow-hidden rounded"
              >
                <Animated.View
                  style={{
                    height: "100%",
                    backgroundColor: "white",
                    width: animValues[i]?.interpolate({
                      inputRange: [0, 1],
                      outputRange: ["0%", "100%"],
                    }),
                  }}
                />
              </View>
            ))}
          </View>

          <View className="absolute top-8 px-4 w-full flex-row justify-between items-center z-50">
            <View className="flex-row items-center">
              <Image
                source={{ uri: currentStory.owner.profilePicture }}
                className="w-[30px] h-[30px] rounded-full mr-2"
              />
              <Text className="text-white font-semibold">
                {currentStory.owner.username}
              </Text>
            </View>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="white" />
            </TouchableOpacity>
          </View>

          <View className="absolute inset-0 flex-row z-40">
            <TouchableOpacity
              className="flex-1"
              onPress={() => {
                if (currentIndex > 0) {
                  animValues[currentIndex].setValue(0);
                  setCurrentIndex(currentIndex - 1);
                } else {
                  onClose();
                }
              }}
            />

            <TouchableOpacity
              className="flex-1"
              onPress={() => {
                if (currentIndex < stories.length - 1) {
                  animValues[currentIndex].setValue(1);
                  setCurrentIndex(currentIndex + 1);
                } else {
                  onClose();
                }
              }}
            />
          </View>

          {/* Story image */}
          <Image
            source={{ uri: currentStory.coverPhoto }}
            resizeMode="contain"
            className="w-full h-full absolute"
          />

          {/* Bottom input bar */}
          <View className="absolute bottom-5 px-4 w-full flex-row items-center z-50">
            <View className="flex-1 flex-row items-center bg-white/20 rounded-full px-4 py-2 mr-2">
              <TextInput
                ref={replyInputRef}
                value={replyText}
                onChangeText={setReplyText}
                placeholder="Send message"
                placeholderTextColor="rgba(255,255,255,0.5)"
                className="flex-1 text-white text-sm"
                onSubmitEditing={handleSendReply}
                onFocus={() => stopAnimation()}
                onBlur={() => {
                  const remaining = remainingDurationRef.current;
                  startAnimation(currentIndex, remaining);
                }}
              />
              <TouchableOpacity
                onPress={handleSendReply}
                className="ml-2"
                disabled={!replyText.trim()}
              >
                <Ionicons
                  name="send"
                  size={20}
                  color={replyText.trim() ? "#0095f6" : "rgba(255,255,255,0.5)"}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={handleLike} className="p-1.5">
              <Ionicons
                name={liked ? "heart" : "heart-outline"}
                size={28}
                color={liked ? "#ff3040" : "white"}
              />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};
