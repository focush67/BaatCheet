import { getStories } from "@/services/storyService";
import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { Story } from "./Story";
import { StoryModal } from "./StoryModal";

export const Stories = () => {
  const [stories, setStories] = useState<GStory[]>([]);
  const [selectedStory, setSelectedStory] = useState<GStory | null>(null);
  const [storyModalVisible, setStoryModalVisible] = useState(false);

  useEffect(() => {
    getStories()
      .then((response) => setStories(response))
      .catch((error) => console.error("Error", error));
  }, []);

  const openStoryModal = (story: GStory) => {
    setSelectedStory(story);
    setStoryModalVisible(true);
  };

  const handleCloseModal = () => {
    setStoryModalVisible(false);
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
            onPress={() => openStoryModal(story)}
          />
        ))}
      </ScrollView>

      <StoryModal
        visible={storyModalVisible}
        story={selectedStory}
        onClose={handleCloseModal}
      />
    </View>
  );
};
