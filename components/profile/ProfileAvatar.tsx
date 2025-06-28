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
import Toast from "react-native-toast-message";
import { ImageUploadModal } from "../story/UploadStory";
import { BlurView } from "expo-blur";

const ProfileAvatar = ({
  username,
  size = 86,
  imageUrl,
  isFollowing,
  toggleFollow,
  modalVisible,
  setModalVisible,
}: {
  username: string;
  size: number;
  imageUrl: string | undefined;
  isFollowing: boolean;
  toggleFollow: () => void;
  modalVisible: boolean;
  setModalVisible: (_: boolean) => void;
}) => {
  const { colorScheme } = useTheme();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [storyMode, setStoryMode] = useState(false);
  const owner = user?.unsafeMetadata?.username as string;
  const ownerProfileImage =
    imageUrl || (user?.unsafeMetadata?.profilePicture as string);
  const isOwner = username === owner;

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
      Toast.show({
        type: "success",
        text1: "Story Uploaded",
        text2: "Your story has been uploaded successfully.",
      });
    } catch (error: any) {
      console.log(`Story Upload Failed`);
      Toast.show({
        type: "error",
        text1: "Upload Failed",
        text2: error.message || "Something went wrong",
      });
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
            source={{ uri: ownerProfileImage }}
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
        <View className="flex-1">
          <BlurView
            intensity={60}
            tint={colorScheme === "dark" ? "dark" : "light"}
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 24,
            }}
          >
            <Pressable
              onPress={() => setModalVisible(false)}
              style={{ position: "absolute", inset: 0 }}
            />

            <View
              className={`w-full max-w-md items-center p-6 rounded-3xl shadow-2xl border ${
                colorScheme === "dark"
                  ? "bg-white/5 border-white/10"
                  : "bg-white/80 border-gray-200"
              }`}
            >
              {/* Avatar */}
              <View
                className={`overflow-hidden border-4 ${
                  colorScheme === "dark" ? "border-white/20" : "border-white"
                } rounded-full shadow-xl mb-4`}
                style={{ width: 200, height: 200 }}
              >
                <Image
                  source={{ uri: imageUrl }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              </View>

              {/* Username */}
              <Text
                className={`text-lg font-semibold mb-2 ${
                  colorScheme === "dark" ? "text-white" : "text-black"
                }`}
              >
                @{username}
              </Text>

              {!isOwner && (
                <View className="flex-row mt-4 space-x-4">
                  {/* Follow Button */}
                  <TouchableOpacity
                    onPress={toggleFollow}
                    className={`px-5 py-2 rounded-full flex-row items-center gap-x-2 ${
                      colorScheme === "dark" ? "bg-white/90" : "bg-black"
                    }`}
                  >
                    <Feather
                      name={isFollowing ? "user-check" : "user-plus"}
                      size={18}
                      color={colorScheme === "dark" ? "black" : "white"}
                    />
                    <Text
                      className={`font-semibold text-sm ${
                        colorScheme === "dark" ? "text-black" : "text-white"
                      }`}
                    >
                      {isFollowing ? "Unfollow" : "Follow"}
                    </Text>
                  </TouchableOpacity>

                  {/* Notifications */}
                  <TouchableOpacity
                    onPress={() =>
                      setNotificationsEnabled(!notificationsEnabled)
                    }
                    className={`px-5 py-2 rounded-full flex-row items-center gap-x-2 ${
                      colorScheme === "dark" ? "bg-white/90" : "bg-black"
                    }`}
                  >
                    <Ionicons
                      name={
                        notificationsEnabled
                          ? "notifications"
                          : "notifications-off"
                      }
                      size={18}
                      color={colorScheme === "dark" ? "black" : "white"}
                    />
                    <Text
                      className={`font-semibold text-sm ${
                        colorScheme === "dark" ? "text-black" : "text-white"
                      }`}
                    >
                      {notificationsEnabled ? "Mute" : "Unmute"}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </BlurView>
        </View>
      </Modal>

      <ImageUploadModal
        loading={loading}
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
