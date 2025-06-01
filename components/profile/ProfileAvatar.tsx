import { useTheme } from "@/context/ThemeContext";
import { handleStoryCreation } from "@/hooks/story/useCreateStory";
import { createNewStory } from "@/services/storyService";
import { useUser } from "@clerk/clerk-expo";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { StoryModal } from "../story/StoryModal";
import { ImageUploadModal } from "../story/UploadStory";

const ProfileAvatar = ({
  username,
  size = 86,
  imageUrl,
}: {
  username: string;
  size: number;
  imageUrl: string;
}) => {
  const { colorScheme } = useTheme();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [selectedStory, setSelectedStory] = useState<UserStory | null>(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [storyMode, setStoryMode] = useState(false);
  const [showStory, setShowStory] = useState(false);
  const owner = user?.unsafeMetadata?.username as string;
  const isOwner = username === owner;

  const handleImageUpload = async (imageUri: string) => {
    if (!user) {
      throw new Error("Session is required to create Story. Please login");
    }
    try {
      setLoading(true);
      const uploadResults = await handleStoryCreation({
        selectedImage: imageUri,
        setLoading,
        user: user.emailAddresses[0].emailAddress,
      });

      if (!uploadResults) {
        throw new Error("Upload failed to Supabase");
      }
      const response = await createNewStory({
        coverPhoto: uploadResults.publicUrl,
        email: user.emailAddresses[0].emailAddress,
      });

      console.log(`Response for Story Upload`, response);
    } catch (error: any) {
      console.log(`Story Upload Failed`);
      throw new Error(error);
    }
  };

  return (
    <>
      <TouchableOpacity onLongPress={() => setModalVisible(true)}>
        <View
          className={`rounded-full ml-2 border ${
            colorScheme === "light" ? "border-gray-800" : "border-gray-200"
          } p-[3px]`}
          style={{ width: size, height: size }}
        >
          <Image
            source={{ uri: imageUrl }}
            className="w-full h-full rounded-full"
            resizeMode="cover"
          />
          {isOwner && (
            <TouchableOpacity onPress={() => setStoryMode(true)}>
              <View
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  backgroundColor: "#1DA1F2",
                  borderRadius: 999,
                  padding: 4,
                }}
              >
                <AntDesign name="plus" size={14} color="white" />
              </View>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 bg-black/60 justify-center items-center px-6">
          <Pressable
            className="absolute inset-0"
            onPress={() => setModalVisible(false)}
          />

          <View className="items-center bg-white/10 rounded-3xl p-6">
            <View
              className="overflow-hidden border-4 border-white rounded-full mb-6"
              style={{ width: 240, height: 240 }}
            >
              <Image
                source={{ uri: imageUrl }}
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>

            {!isOwner && (
              <View className="flex-row gap-x-4 mt-4">
                <TouchableOpacity
                  onPress={() => setIsFollowing(!isFollowing)}
                  className="bg-white px-5 py-2 rounded-full flex-row items-center gap-x-2"
                >
                  <Feather
                    name={isFollowing ? "user-check" : "user-plus"}
                    size={18}
                    color="black"
                  />
                  <Text className="text-black font-semibold text-sm">
                    {isFollowing ? "Unfollow" : "Follow"}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setNotificationsEnabled(!notificationsEnabled)}
                  className="bg-white px-5 py-2 rounded-full flex-row items-center space-x-2"
                >
                  <Ionicons
                    name={
                      notificationsEnabled
                        ? "notifications"
                        : "notifications-off"
                    }
                    size={18}
                    color="black"
                  />
                  <Text className="text-black font-semibold text-sm">
                    {notificationsEnabled ? "Mute" : "Unmute"}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </Modal>

      <StoryModal
        visible={showStory}
        story={selectedStory}
        onClose={() => {
          setShowStory(false);
          setSelectedStory(null);
        }}
      />

      <ImageUploadModal
        visible={storyMode}
        onClose={() => setStoryMode(false)}
        onImageSelected={handleImageUpload}
        title="Create New Story"
        emptyPreviewText="Select a photo for your story"
      />
    </>
  );
};

export default ProfileAvatar;
