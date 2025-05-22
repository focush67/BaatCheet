import { initialStories } from "@/constants/data";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { Story } from "./Story";
import { StoryModal } from "./StoryModal";
import { StoryUploadModal } from "./UploadStory";

export const Stories = () => {
  const [stories, setStories] = useState<UserStory[]>(initialStories);
  const [selectedStory, setSelectedStory] = useState<UserStory | null>(null);
  const [storyModalVisible, setStoryModalVisible] = useState(false);
  const [uploadModalVisible, setUploadModalVisible] = useState(false);

  const handleStoryPress = (id: number) => {
    if (id === 1) {
      setUploadModalVisible(true);
      return;
    }

    const story = stories.find((s) => s.id === id);
    if (story) {
      setSelectedStory(story);
      setStoryModalVisible(true);
      setStories((prev) =>
        prev.map((s) => (s.id === id ? { ...s, hasUnseenStory: false } : s))
      );
    }
  };

  const handleCloseModal = () => {
    setStoryModalVisible(false);
    setSelectedStory(null);
  };

  const handleCloseUploadModal = () => {
    setUploadModalVisible(false);
  };

  const handleStoryUpload = (imageUri: string) => {
    setStories((prev) => [
      {
        id: 1,
        username: "Your Story",
        avatar: "user_avatar_url",
        image: imageUri,
        hasUnseenStory: false,
        createdAt: new Date().toISOString(),
      },
      ...prev.filter((s) => s.id !== 1),
    ]);
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
        visible={storyModalVisible}
        story={selectedStory}
        onClose={handleCloseModal}
      />

      <StoryUploadModal
        visible={uploadModalVisible}
        onClose={handleCloseUploadModal}
        onStorySelected={handleStoryUpload} // Added this prop
      />
    </View>
  );
};
