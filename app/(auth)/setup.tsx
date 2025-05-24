import ImagePicker from "@/components/story/ImagePicker";
import { useTheme } from "@/context/ThemeContext";
import { uploadFile } from "@/services/uploadService";
import { updateUserByEmail } from "@/services/userService";
import { useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const ProfileSetupScreen = () => {
  const { user } = useUser();
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);
  const { colorScheme: theme } = useTheme();

  const handleSubmit = async () => {
    if (!name.trim() || !username.trim() || !selectedImage) {
      Alert.alert(
        "Complete your profile",
        "Please enter your name, username and select a profile picture."
      );
      return;
    }
    setLoading(true);
    try {
      const { publicUrl, blob } = await uploadFile(
        selectedImage,
        `${user?.id}_avatar`,
        {
          bucket: "upload-assets",
          pathPrefix: "profile_pictures",
          upsert: true,
          updateClerkUser: {
            user,
            updateMetadata: true,
            updateProfileImage: true,
          },
        }
      );
      await updateUserByEmail(user?.emailAddresses[0].emailAddress!, {
        name,
        username,
        profilePicture: publicUrl,
        bio,
      });
      await user?.update({ unsafeMetadata: { hasCompletedSetup: true } });

      if (blob) {
        await user?.setProfileImage({
          file: blob,
        });
      }
      router.replace("/(tabs)/home");
    } catch (error) {
      console.error("Profile update error:", error);
      Alert.alert(
        "Error",
        error instanceof Error ? error.message : "Failed to update profile"
      );
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = name && username;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className={`flex-1 justify-center bg-${
        theme === "light" ? "white" : "gray-900"
      }`}
    >
      <View className="px-8 pb-12">
        <View className="items-center mb-8">
          <Text
            className={`text-2xl font-bold mb-1 ${
              theme === "light" ? "text-gray-900" : "text-white"
            }`}
          >
            Complete Your Profile
          </Text>
          <Text
            className={`text-base ${
              theme === "light" ? "text-gray-500" : "text-gray-400"
            }`}
          >
            Add your personal details
          </Text>
        </View>

        <View className="items-center mb-8">
          <ImagePicker
            onImageSelected={setSelectedImage}
            selectedImage={selectedImage}
            theme={theme}
          />
        </View>

        <Text
          className={`text-sm font-medium mb-1 ${
            theme === "light" ? "text-gray-700" : "text-gray-300"
          }`}
        >
          Full Name
        </Text>
        <TextInput
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
          className={`rounded-xl p-4 mb-4 text-base ${
            theme === "light"
              ? "bg-gray-100 text-gray-900"
              : "bg-gray-800 text-white"
          }`}
          autoCapitalize="words"
          placeholderTextColor={theme === "light" ? "#999" : "#777"}
        />

        <Text
          className={`text-sm font-medium mb-1 ${
            theme === "light" ? "text-gray-700" : "text-gray-300"
          }`}
        >
          Username
        </Text>
        <TextInput
          placeholder="Choose a username"
          value={username}
          onChangeText={setUsername}
          className={`rounded-xl p-4 mb-4 text-base ${
            theme === "light"
              ? "bg-gray-100 text-gray-900"
              : "bg-gray-800 text-white"
          }`}
          autoCapitalize="none"
          placeholderTextColor={theme === "light" ? "#999" : "#777"}
        />

        <Text
          className={`text-sm font-medium mb-1 ${
            theme === "light" ? "text-gray-700" : "text-gray-300"
          }`}
        >
          Bio (Optional)
        </Text>
        <TextInput
          placeholder="Tell us about yourself"
          value={bio}
          onChangeText={setBio}
          multiline
          numberOfLines={3}
          className={`rounded-xl p-4 mb-8 text-base ${
            theme === "light"
              ? "bg-gray-100 text-gray-900"
              : "bg-gray-800 text-white"
          }`}
          placeholderTextColor={theme === "light" ? "#999" : "#777"}
        />

        <TouchableOpacity
          disabled={!isFormValid || loading}
          onPress={handleSubmit}
          className={`rounded-xl py-4 items-center justify-center shadow-lg ${
            !isFormValid || loading ? "opacity-70 bg-blue-500" : "bg-blue-600"
          }`}
          activeOpacity={0.8}
        >
          {loading ? (
            <ActivityIndicator color="white" size="small" />
          ) : (
            <Text className="text-white font-semibold text-lg">
              Finish Setup
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ProfileSetupScreen;
