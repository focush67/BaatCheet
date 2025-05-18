import { initialStories } from "@/constants/data";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { Story } from "./Story";
import { StoryModal } from "./StoryModal";

export const Stories = () => {
  const [stories, setStories] = useState<UserStory[]>(initialStories);
  const [selectedStory, setSelectedStory] = useState<UserStory | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleStoryPress = (id: number) => {
    const story = stories.find((s) => s.id === id);
    if (story) {
      setSelectedStory(story);
      setModalVisible(true);
      setStories((prev) =>
        prev.map((s) => (s.id === id ? { ...s, hasUnseenStory: false } : s))
      );
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedStory(null);
  };

  return (
    <View style={{ paddingBottom: 8 }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15, paddingTop: 8 }}
      >
        {stories.map((story) => (
          <Story
            key={story.id}
            story={story}
            onPress={() => handleStoryPress(story.id)}
          />
        ))}
      </ScrollView>

      <StoryModal
        visible={modalVisible}
        story={selectedStory}
        onClose={handleCloseModal}
      />
    </View>
  );
};
