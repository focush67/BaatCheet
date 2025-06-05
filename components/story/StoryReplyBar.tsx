import { View, TextInput, TouchableOpacity, Keyboard } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { replyToStory } from "@/services/storyService";
import { useStoryStore } from "@/stores/StoryStore";

const StoryReplyBar = ({
  replyInputRef,
  stopAnimation,
  startAnimation,
  currentIndex,
  remainingDurationRef,
  storyId,
  email,
}: StoryReplyBarProps) => {
  const [replyText, setReplyText] = useState("");
  const handleSendReply = async () => {
    replyText.trim() && Keyboard.dismiss();
    const response = await replyToStory(storyId, email, replyText);
    useStoryStore.getState().replyToStory(storyId, response);
    setReplyText("");
  };
  return (
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
        onBlur={() =>
          startAnimation(currentIndex, remainingDurationRef.current)
        }
      />
      <TouchableOpacity onPress={handleSendReply} disabled={!replyText.trim()}>
        <Ionicons
          name="send"
          size={20}
          color={replyText.trim() ? "#0095f6" : "rgba(255,255,255,0.5)"}
        />
      </TouchableOpacity>
    </View>
  );
};

export default StoryReplyBar;
