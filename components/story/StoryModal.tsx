import { likeStory, unlikeStory } from "@/services/storyService";
import { useUser } from "@clerk/clerk-expo";
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
import { useStoryById } from "@/stores/StoryStore";

export const StoryModal = ({
  visible,
  stories = [],
  onClose,
  duration = 5000,
}: StoryModalProps) => {
  // 1. All hooks must come first
  const [currentIndex, setCurrentIndex] = useState(0);
  const [replyText, setReplyText] = useState("");
  const { user } = useUser();
  const [animValues, setAnimValues] = useState<Animated.Value[]>([]);

  // Refs
  const replyInputRef = useRef<TextInput>(null);
  const startTimeRef = useRef<number | null>(null);
  const remainingDurationRef = useRef<number>(duration);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Get current story safely
  const currentStory = useStoryById(stories[currentIndex]?.id);

  // 2. Early validation
  if (!user) {
    return null; // Or show a "sign in" message
  }

  // Initialize animation values safely
  useEffect(() => {
    if (stories.length > 0) {
      setAnimValues(stories.map(() => new Animated.Value(0)));
    }
  }, [stories]);

  // Safe user email access
  const userEmail = user.emailAddresses[0]?.emailAddress;
  const liked = currentStory?.likes?.some(
    (like) => like?.owner?.email === userEmail
  );

  // Animation control effects
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

  const handleLike = async (storyId: string) => {
    if (!userEmail || !currentStory) return;

    try {
      if (liked) {
        await unlikeStory(storyId, userEmail);
      } else {
        await likeStory(storyId, userEmail);
      }
    } catch (error) {
      console.error("Like error:", error);
    }
  };

  const handleSendReply = () => {
    replyText.trim() && Keyboard.dismiss();
    setReplyText("");
  };

  // 3. Final null check after all hooks
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

          {/* Header */}
          <View className="absolute top-8 px-4 w-full flex-row justify-between items-center z-50">
            <View className="flex-row items-center">
              {currentStory.owner?.profilePicture && (
                <Image
                  source={{ uri: currentStory.owner.profilePicture }}
                  className="w-[30px] h-[30px] rounded-full mr-2"
                />
              )}
              <Text className="text-white font-semibold">
                {currentStory.owner?.username || "Unknown user"}
              </Text>
            </View>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="white" />
            </TouchableOpacity>
          </View>

          {/* Navigation areas */}
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
            <View className="flex-1 flex-row items-center bg-white/20 rounded-full px-4 py-2 mr-2">
              <TextInput
                ref={replyInputRef}
                value={replyText}
                onChangeText={setReplyText}
                placeholder="Send message"
                placeholderTextColor="rgba(255,255,255,0.5)"
                className="flex-1 text-white text-sm"
                onSubmitEditing={handleSendReply}
                onFocus={stopAnimation}
                onBlur={() =>
                  startAnimation(currentIndex, remainingDurationRef.current)
                }
              />
              <TouchableOpacity
                onPress={handleSendReply}
                disabled={!replyText.trim()}
              >
                <Ionicons
                  name="send"
                  size={20}
                  color={replyText.trim() ? "#0095f6" : "rgba(255,255,255,0.5)"}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => currentStory && handleLike(currentStory.id)}
            >
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
