import { useTheme } from "@/context/ThemeContext";
import React, { memo, useState, useCallback, useMemo } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "@clerk/clerk-expo";
import { ImageUploadModal } from "./UploadStory";
import { handleStoryCreation } from "@/hooks/story/useCreateStory";
import Toast from "react-native-toast-message";
import { createNewStory } from "@/services/storyService";

export const Story = memo(({ story, onPress }: StoryProps) => {
  const { colorScheme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [uploadMode, setUploadMode] = useState(false);
  const profilePicture = story.owner.profilePicture || "";
  const hasUnseen = true;

  const { user } = useUser();
  const ownerUsername = user?.unsafeMetadata.username;
  const primaryEmail = (user?.primaryEmailAddress ??
    user?.emailAddresses?.[0]?.emailAddress ??
    null) as string;

  const handleImageUpload = useCallback(
    async (imageUri: string) => {
      if (!primaryEmail) {
        Toast.show({
          type: "error",
          text1: "Upload Failed",
          text2: "You must be logged in to create a story",
        });
        return;
      }

      try {
        setLoading(true);
        const uploadResults = await handleStoryCreation({
          selectedImage: imageUri,
          setLoading,
          user: primaryEmail,
        });

        if (!uploadResults) {
          throw new Error("Upload failed to Supabase");
        }

        await createNewStory({
          coverPhoto: uploadResults.publicUrl,
          email: primaryEmail,
        });

        Toast.show({
          type: "success",
          text1: "Story Uploaded",
          text2: "Your story has been uploaded successfully.",
        });
      } catch (error: any) {
        console.warn("Story Upload Failed", error);
        Toast.show({
          type: "error",
          text1: "Upload Failed",
          text2: error?.message ?? "Something went wrong",
        });
      } finally {
        setLoading(false);
      }
    },
    [primaryEmail]
  );

  const displayLabel = useMemo(() => {
    if (!ownerUsername) return story.owner.username ?? "Story";
    return story.owner.username === ownerUsername
      ? "Your Story"
      : story.owner.username;
  }, [ownerUsername, story.owner.username]);

  const showUploadButton = useMemo(
    () => ownerUsername === story.owner.username,
    [ownerUsername, story.owner.username]
  );

  return (
    <>
      <TouchableOpacity
        className="flex-1 px-1 items-center mr-2.5"
        onPress={onPress}
        activeOpacity={0.7}
      >
        <View
          className={`w-20 h-20 rounded-full justify-center items-center relative border-2 ${
            hasUnseen ? "border-primary" : "border-gray-300"
          }`}
        >
          <Image
            source={{ uri: profilePicture }}
            className="w-[80px] h-[80px] rounded-full"
            resizeMode="cover"
          />

          {showUploadButton && (
            <TouchableOpacity
              onPress={() => setUploadMode(true)}
              style={{
                position: "absolute",
                bottom: -4,
                right: -4,
                backgroundColor: "#3B82F6",
                borderRadius: 10,
                padding: 2,
                elevation: 2,
              }}
            >
              <Ionicons name="add" size={14} color={"white"} />
            </TouchableOpacity>
          )}
        </View>

        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          className={`text-xs mt-2 max-w-20 ${
            colorScheme === "light" ? "text-gray-900" : "text-gray-100"
          }`}
        >
          {displayLabel}
        </Text>
      </TouchableOpacity>
      {showUploadButton && (
        <ImageUploadModal
          loading={loading}
          visible={uploadMode}
          onClose={() => setUploadMode(false)}
          onImageSelected={handleImageUpload}
          title="Create New Story"
          emptyPreviewText="Select a photo for your story"
        />
      )}
      0
    </>
  );
});
