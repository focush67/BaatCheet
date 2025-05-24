import { initialStories } from "@/constants/data";
import { supabase } from "@/utils/supabase";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { Story } from "./Story";
import { StoryModal } from "./StoryModal";
import { ImageUploadModal } from "./UploadStory";

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

  const handleImageUpload = async (imageUri: string) => {
    try {
      const response = await fetch(imageUri);
      const blob = await response.blob();
      const fileName = `stories/${Date.now()}-${Math.random()
        .toString(36)
        .slice(2)}.jpg`;

      const { error } = await supabase.storage
        .from("story-uploads")
        .upload(fileName, blob);

      if (error) throw error;

      const {
        data: { publicUrl },
      } = supabase.storage.from("story-uploads").getPublicUrl(fileName);

      setStories((prev) => [
        {
          id: 1,
          username: "Your Story",
          avatar: "user_avatar_url", // Replace with actual user avatar
          image: publicUrl, // Use the Supabase URL
          hasUnseenStory: false,
          createdAt: new Date().toISOString(),
        },
        ...prev.filter((s) => s.id !== 1),
      ]);

      handleCloseUploadModal();
    } catch (error) {
      console.error("Story upload failed:", error);
    }
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

      <ImageUploadModal
        visible={uploadModalVisible}
        onClose={handleCloseUploadModal}
        onImageSelected={handleImageUpload}
        title="Add to Story"
        emptyPreviewText="Select a photo for your story"
      />
    </View>
  );
};
