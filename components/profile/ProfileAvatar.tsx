import { useTheme } from "@/context/ThemeContext";
import { useStoryUpload } from "@/hooks/story/useCreateStory";
import { useUser } from "@clerk/clerk-expo";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Image,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";
import Toast from "react-native-toast-message";
import { ImageUploadModal } from "../story/UploadStory";
import { BlurView } from "expo-blur";

const ProfileAvatar = ({
  username,
  size = 84,
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
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const userEmail = useMemo(
    () => user?.emailAddresses[0]?.emailAddress,
    [user?.emailAddresses]
  );

  const ownerUsername = user?.unsafeMetadata?.username as string | undefined;

  const ownerProfileImage = useMemo(
    () =>
      imageUrl ?? (user?.unsafeMetadata?.profilePicture as string | undefined),
    [imageUrl, user?.unsafeMetadata?.profilePicture]
  );

  const isOwner = username === ownerUsername;

  const { upload, isUploading } = useStoryUpload();
  const [storyMode, setStoryMode] = useState(false);

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const handleImageUpload = useCallback(
    async (imageUri: string) => {
      if (!userEmail) {
        Toast.show({
          type: "error",
          text1: "Upload Failed",
          text2: "You must be logged in to create a story.",
        });
        return;
      }

      const result = await upload(imageUri, userEmail);
      if (result.success) {
        Toast.show({
          type: "success",
          text1: "Story Uploaded",
          text2: "Your story has been uploaded successfully.",
        });
        if (mountedRef.current) setStoryMode(false);
      } else {
        Toast.show({
          type: "error",
          text1: "Upload Failed",
          text2: result.error ?? "Something went wrong",
        });
      }
    },
    [upload, userEmail]
  );

  const handleToggleNotifications = useCallback(() => {
    setNotificationsEnabled((v) => !v);
  }, []);

  const avatarContainerStyle = { width: size, height: size };
  return (
    <>
      <TouchableOpacity
        onLongPress={() => setModalVisible(true)}
        accessibilityLabel={`${username}'s avatar`}
        accessibilityRole="imagebutton"
      >
        <View
          className={`rounded-full ml-2 border ${
            colorScheme === "light" ? "border-gray-800" : "border-gray-200"
          } p-[3px] relative`}
          style={avatarContainerStyle}
        >
          {ownerProfileImage ? (
            <Image
              source={{ uri: ownerProfileImage }}
              className="w-full h-full rounded-full"
              resizeMode="cover"
            />
          ) : (
            <View
              className={`w-full h-full rounded-full ${
                colorScheme === "dark" ? "bg-gray-700" : "bg-gray-200"
              }`}
            />
          )}

          {isOwner && (
            <TouchableOpacity
              onPress={() => setStoryMode(true)}
              disabled={isUploading}
              accessibilityLabel="Create story"
              accessibilityRole="button"
              className="absolute bottom-0 right-0 rounded-full p-1 bg-blue-500"
            >
              <AntDesign name="plus" size={14} color="white" />
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
        <SafeAreaView className="flex-1">
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
              <View
                className={`overflow-hidden border-4 rounded-full shadow-xl mb-4`}
                style={{ width: 200, height: 200 }}
              >
                {imageUrl ? (
                  <Image
                    source={{ uri: imageUrl }}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                ) : ownerProfileImage ? (
                  <Image
                    source={{ uri: ownerProfileImage }}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                ) : (
                  <View
                    className={`${
                      colorScheme === "dark" ? "bg-gray-700" : "bg-gray-200"
                    } w-full h-full`}
                  />
                )}
              </View>

              <Text
                className={`text-lg font-semibold mb-2 ${
                  colorScheme === "dark" ? "text-white" : "text-black"
                }`}
              >
                @{username}
              </Text>

              {!isOwner && (
                <View className="flex-row mt-4 space-x-4 gap-x-2">
                  <TouchableOpacity
                    onPress={toggleFollow}
                    accessibilityLabel={
                      isFollowing ? "Unfollow user" : "Follow user"
                    }
                    accessibilityRole="button"
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

                  <TouchableOpacity
                    onPress={handleToggleNotifications}
                    accessibilityLabel={
                      notificationsEnabled
                        ? "Mute notifications"
                        : "Unmute notifications"
                    }
                    accessibilityRole="button"
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

              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                className={`mt-6 px-6 py-2 rounded-full border border-gray-300  ${
                  colorScheme === "dark" ? "bg-dark" : "bg-white"
                }`}
              >
                <Text
                  className={`text-center text-sm ${
                    colorScheme === "dark" ? "text-white" : "text-black"
                  }`}
                >
                  Close
                </Text>
              </TouchableOpacity>
            </View>
          </BlurView>
        </SafeAreaView>
      </Modal>

      <ImageUploadModal
        loading={isUploading}
        visible={storyMode}
        onClose={() => setStoryMode(false)}
        onImageSelected={handleImageUpload}
        title="Create New Story"
        emptyPreviewText="Select a photo for your story"
      />
    </>
  );
};

export default React.memo(ProfileAvatar);
