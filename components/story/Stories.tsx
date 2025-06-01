import { initialStories } from "@/constants/data";
import { handleStoryCreation } from "@/hooks/story/useCreateStory";
import { createNewStory } from "@/services/storyService";
import { useUser } from "@clerk/clerk-expo";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import Toast from "react-native-toast-message";
import { Story } from "./Story";
import { StoryModal } from "./StoryModal";
import { ImageUploadModal } from "./UploadStory";

export const Stories = () => {
  const [stories, setStories] = useState<UserStory[]>(initialStories);
  const [selectedStory, setSelectedStory] = useState<UserStory | null>(null);
  const [storyModalVisible, setStoryModalVisible] = useState(false);
  const [uploadModalVisible, setUploadModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

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
    if (!user) {
      Toast.show({
        type: "error",
        text1: "Upload Failed",
        text2: "You must be logged in to create a story.",
      });
      return;
    }
    try {
      setLoading(true);
      const uploadResults = await handleStoryCreation({
        selectedImage: imageUri,
        setLoading,
        user: user?.emailAddresses[0].emailAddress!,
      });

      if (!uploadResults) {
        throw new Error("Upload Failed to Supabase");
      }

      const response = await createNewStory({
        coverPhoto: uploadResults.publicUrl,
        email: user.emailAddresses[0].emailAddress,
      });

      console.log("Response for Story Upload", response);
      Toast.show({
        type: "success",
        text1: "Story Uploaded",
        text2: "Your story has been uploaded successfully.",
      });
      setStories((prev) => [
        {
          id: 1,
          username: user?.unsafeMetadata?.username as string,
          avatar: user?.unsafeMetadata?.profilePicture as string,
          image: uploadResults?.publicUrl!,
          hasUnseenStory: false,
          createdAt: new Date().toISOString(),
        },
        ...prev.filter((s) => s.id !== 1),
      ]);

      handleCloseUploadModal();
    } catch (error: any) {
      console.error("Story upload failed:", error);
      Toast.show({
        type: "error",
        text1: "Upload Failed",
        text2: error.message || "Something went wrong",
      });
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
        loading={loading}
        visible={uploadModalVisible}
        onClose={handleCloseUploadModal}
        onImageSelected={handleImageUpload}
        title="Add to Story"
        emptyPreviewText="Select a photo for your story"
      />
    </View>
  );
};
