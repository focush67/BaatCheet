import { ProfileActions } from "@/components/profile/Actions";
import Bio from "@/components/profile/Bio";
import { ContentTabs } from "@/components/profile/ContentTabs";
import { PostPreview } from "@/components/profile/PostPreview";
import PostsGrid from "@/components/profile/PostsGrid";
import ProfileAvatar from "@/components/profile/ProfileAvatar";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { Statistics } from "@/components/profile/Statistics";
import { useTheme } from "@/context/ThemeContext";
import { useUser } from "@clerk/clerk-expo";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getPostsSaved } from "@/services/postService";
import { samplePosts } from "@/constants/data";

const ProfileScreen = () => {
  const { user } = useUser();
  const { colorScheme } = useTheme();
  const { username } = useLocalSearchParams<{ username?: string }>();

  const [savedPosts, setSavedPosts] = useState<GridPost[]>([]);
  const [activeTab, setActiveTab] = useState<ActiveTab>("posts");
  const [isFollowing, setIsFollowing] = useState(false);
  const [previewPost, setPreviewPost] = useState<GridPost | null>(null);
  const [previewVisible, setPreviewVisible] = useState(false);

  const isPersonalProfile = !username;
  const ownerUsername = user?.unsafeMetadata?.username as string;

  useEffect(() => {
    const fetchSaved = async () => {
      const posts = await getPostsSaved(user?.emailAddresses[0].emailAddress!);
      console.log("Saved Posts", posts);
      setSavedPosts(posts);
    };

    fetchSaved();
  }, []);

  // console.log("Saved Posts:", savedPosts);
  const profileData = {
    username: isPersonalProfile ? ownerUsername : (username as string),
    name: user?.unsafeMetadata?.ownerName as string,
    bio: (user?.unsafeMetadata?.caption as string) || "Just a chill guy",
    picture: isPersonalProfile
      ? (user?.unsafeMetadata?.profilePicture as string)
      : "https://picsum.photos/400/400?random=4",
  };

  const posts = Array.from({ length: 15 }, (_, i) => ({
    id: i.toString(),
    imageUrl: `https://picsum.photos/300/300?random=${i}`,
    username: profileData.username,
    caption: `Sample caption ${i}`,
  })) as UserPost[];

  const handleLongPress = (post: GridPost | null) => {
    setPreviewPost(post);
    setPreviewVisible(true);
  };

  const handlePressOut = () => {
    setPreviewVisible(false);
    setPreviewPost(null);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "posts":
        return (
          <PostsGrid
            posts={savedPosts}
            onLongPressPost={handleLongPress}
            onPostPressOut={handlePressOut}
          />
        );
      case "saved":
        return isPersonalProfile ? (
          <PostsGrid
            posts={savedPosts}
            onLongPressPost={handleLongPress}
            onPostPressOut={handlePressOut}
          />
        ) : null;
      case "tagged":
        return (
          <Text className="text-center py-10 text-gray-500">
            Tagged photos coming soon
          </Text>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView
      className={`flex-1 ${colorScheme === "light" ? "bg-white" : "bg-black"}`}
    >
      <ScrollView>
        <View className="px-4">
          <ProfileHeader
            username={profileData.username}
            self={isPersonalProfile}
          />

          <View className="flex-row items-center mt-3">
            <ProfileAvatar
              size={86}
              username={profileData.username}
              imageUrl={profileData.picture}
            />
            <Statistics posts={124} followers={"4.5k"} following={"300"} />
          </View>

          <Bio name={profileData.name} bio={profileData.bio} />
          <ProfileActions
            self={isPersonalProfile}
            isFollowing={isFollowing}
            toggleFollow={() => setIsFollowing(!isFollowing)}
          />
        </View>

        <ContentTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        {renderTabContent()}
        <PostPreview
          visible={previewVisible}
          post={previewPost}
          onClose={() => setPreviewVisible(false)}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
