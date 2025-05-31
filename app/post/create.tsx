import { useTheme } from "@/context/ThemeContext";
import { handlePostCreation } from "@/hooks/posts/useCreatePost";
import { createNewPost } from "@/services/postService";
import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function CreatePostScreen() {
  const { imageUri } = useLocalSearchParams();
  const [caption, setCaption] = useState("");
  const [tags, setTags] = useState("");
  const [isLoading, setLoading] = useState(false);
  const { colorScheme } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const user = useUser();
  const isLightMode = colorScheme === "light";
  const bgColor = isLightMode ? "bg-white" : "bg-black";
  const textColor = isLightMode ? "text-black" : "text-white";
  const borderColor = isLightMode ? "border-gray-200" : "border-gray-800";

  const handleSubmit = async () => {
    setLoading(true);
    console.log({
      imageUri,
      caption,
      tags: tags.split(",").map((tag) => tag.trim()),
    });

    if (user) {
      if (user.user) {
        if (
          !user.user.emailAddresses ||
          user.user.emailAddresses.length === 0
        ) {
          throw new Error(
            "Email Address is not valid or absent inside upload screen"
          );
        }
      }
    }
    const results = await handlePostCreation({
      user: user.user?.emailAddresses[0].emailAddress!,
      selectedImage: typeof imageUri === "string" ? imageUri : imageUri?.[0],
      setLoading,
    });
    const input: GCreatePostInput = {
      coverPhoto: results?.publicUrl!,
      caption: caption,
      email: user.user?.emailAddresses[0].emailAddress!,
    };

    const response = await createNewPost(input);
    console.log("Response for Post Upload", response);
    router.replace("/(tabs)/home");
  };

  return (
    <SafeAreaView edges={["top", "bottom"]} className={`flex-1 ${bgColor}`}>
      {/* Header */}
      <View
        className={`flex-row items-center justify-between px-4 py-3 border-b ${borderColor}`}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons
            name="close"
            size={28}
            color={isLightMode ? "#262626" : "#ffffff"}
          />
        </TouchableOpacity>

        <Text className={`text-lg font-semibold ${textColor}`}>New Post</Text>

        <TouchableOpacity onPress={handleSubmit} disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator color={isLightMode ? "#262626" : "#ffffff"} />
          ) : (
            <Text className="text-blue-500 font-semibold">Share</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView
        contentContainerStyle={{
          paddingBottom: insets.bottom + 16,
        }}
        className="flex-1"
      >
        <View className="p-4">
          {/* Image Preview */}
          <View className="w-full aspect-square mb-6 rounded-md overflow-hidden bg-gray-200">
            {imageUri ? (
              <Image
                source={{ uri: imageUri as string }}
                className="w-full h-full"
                resizeMode="cover"
              />
            ) : (
              <Text className="text-center text-gray-500 mt-32">No Image</Text>
            )}
          </View>

          {/* Caption Input */}
          <View className="mb-6">
            <TextInput
              placeholder="Write a caption..."
              placeholderTextColor={isLightMode ? "#8e8e8e" : "#737373"}
              value={caption}
              onChangeText={setCaption}
              multiline
              numberOfLines={3}
              className={`${textColor} text-base p-0`}
              style={{ minHeight: 80 }}
            />
          </View>

          {/* Options */}
          <OptionItem
            text="Tag people"
            textColor={textColor}
            borderColor={borderColor}
            isLightMode={isLightMode}
          />

          <OptionItem
            text="Add location"
            textColor={textColor}
            borderColor={borderColor}
            isLightMode={isLightMode}
          />

          <OptionItem
            text="Advanced settings"
            textColor={textColor}
            borderColor={borderColor}
            isLightMode={isLightMode}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Reusable Option Component
const OptionItem = ({
  text,
  textColor,
  borderColor,
  isLightMode,
}: {
  text: string;
  textColor: string;
  borderColor: string;
  isLightMode: boolean;
}) => (
  <>
    <View className={`h-[0.5px] w-full ${borderColor} my-2`} />
    <TouchableOpacity className="py-3 flex-row items-center justify-between">
      <Text className={`${textColor}`}>{text}</Text>
      <Ionicons
        name="chevron-forward"
        size={20}
        color={isLightMode ? "#8e8e8e" : "#737373"}
      />
    </TouchableOpacity>
  </>
);
