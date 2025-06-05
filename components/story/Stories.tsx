import { getStories } from "@/services/storyService";
import { groupStoriesByOwner } from "@/utils/misc";
import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { Story } from "./Story";
import { StoryModal } from "./StoryModal";

export const Stories = () => {
  const [storyModalVisible, setStoryModalVisible] = useState(false);
  const [userStories, setUserStories] = useState<UserStory[]>([]);
  const [selectedUserStories, setSelectedUserStories] = useState<GStory[]>([]);

  useEffect(() => {
    getStories()
      .then((response) => {
        const grouped = groupStoriesByOwner(response);
        setUserStories(grouped);
      })
      .catch((error) => console.error("Error", error));
  }, []);

  const openStoryModal = (storyList: GStory[]) => {
    setSelectedUserStories(storyList);
    setStoryModalVisible(true);
  };

  const handleCloseModal = () => {
    setStoryModalVisible(false);
  };

  return (
    <View style={{ paddingBottom: 8 }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15, paddingTop: 8 }}
      >
        {userStories.map((storyGroup) => (
          <Story
            key={storyGroup.owner.email}
            story={storyGroup.stories[0]}
            onPress={() => openStoryModal(storyGroup.stories)}
          />
        ))}
      </ScrollView>
      <StoryModal
        visible={storyModalVisible}
        stories={selectedUserStories}
        onClose={handleCloseModal}
      />
    </View>
  );
};
