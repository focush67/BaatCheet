import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Image,
  Keyboard,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export const StoryModal = ({
  visible,
  story,
  onClose,
  duration = 5000,
}: StoryModalProps) => {
  const [paused, setPaused] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [liked, setLiked] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const progress = useRef(new Animated.Value(0)).current;
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const replyInputRef = useRef<TextInput>(null);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
        setPaused(true);
        stopAnimation();
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
        setPaused(false);
        startAnimation();
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    if (visible && story) {
      progress.setValue(0);
      setLiked(false);
      setReplyText("");
      startAnimation();
    } else {
      stopAnimation();
    }

    return () => stopAnimation();
  }, [visible, story]);

  const startAnimation = () => {
    if (paused || !visible) return;

    stopAnimation();

    timerRef.current = setTimeout(() => {
      onClose();
    }, duration);

    Animated.timing(progress, {
      toValue: 1,
      duration,
      useNativeDriver: false,
    }).start();
  };

  const stopAnimation = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    progress.stopAnimation();
  };

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleSendReply = () => {
    if (replyText.trim()) {
      console.log("Reply sent:", replyText);
      setReplyText("");
      Keyboard.dismiss();
      progress.resetAnimation();
    }
  };

  if (!story) return null;
  return (
    <Modal
      visible={visible}
      transparent={false}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black">
        {/* Progress Bar */}
        <View className="absolute top-2 w-full h-0.5 bg-white/30 z-50">
          <Animated.View
            style={{
              height: "100%",
              backgroundColor: "white",
              width: progress.interpolate({
                inputRange: [0, 1],
                outputRange: ["0%", "100%"],
              }),
            }}
          />
        </View>

        {/* Header */}
        <View className="absolute top-8 px-4 w-full flex-row justify-between items-center z-50">
          <View className="flex-row items-center">
            <Image
              source={{ uri: story.avatar || story.image }}
              className="w-[30px] h-[30px] rounded-full mr-2"
            />
            <Text className="text-white font-semibold">{story.username}</Text>
          </View>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Story Content */}
        <TouchableOpacity
          className="flex-1 justify-center"
          activeOpacity={1}
          onPress={() => {
            if (keyboardVisible) {
              Keyboard.dismiss();
            } else {
              setPaused(!paused);
              paused ? startAnimation() : stopAnimation();
            }
          }}
        >
          <Image
            source={{ uri: story.image }}
            resizeMode="contain"
            className="w-full h-full"
          />
        </TouchableOpacity>

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
    </Modal>
  );
};
