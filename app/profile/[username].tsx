import { ProfileActions } from "@/components/profile/Actions";
import Bio from "@/components/profile/Bio";
import { ContentTabs } from "@/components/profile/ContentTabs";
import Highlights from "@/components/profile/Highlights";
import { PostPreview } from "@/components/profile/PostPreview";
import PostsGrid from "@/components/profile/PostsGrid";
import ProfileAvatar from "@/components/profile/ProfileAvatar";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { Statistics } from "@/components/profile/Statistics";
import { useTheme } from "@/context/ThemeContext";
import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const user: UserProfile = {
  username: "sparshv70",
  name: "Sparsh Verma",
  bio: "Digital creator | Photography enthusiast ✨",
  posts: 125,
  followers: "4.5K",
  following: 342,
};

const posts = Array.from({ length: 15 }, (_, i) => ({
  id: i.toString(),
  imageUrl: `https://picsum.photos/300/300?random=${i}`,
  username: user.username,
  caption: "Sample caption " + i,
})) as UserPost[];

const ProfileScreen = () => {
  const { colorScheme } = useTheme();
  const [activeTab, setActiveTab] = useState<ActiveTab>("posts");
  const [isFollowing, setIsFollowing] = useState(false);

  const [previewPost, setPreviewPost] = useState<UserPost | null>(null);
  const [previewVisible, setPreviewVisible] = useState(false);

  const handleLongPress = (post: UserPost | null) => {
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
            posts={posts}
            onLongPressPost={handleLongPress}
            onPostPressOut={handlePressOut}
          />
        );
      case "saved":
        return (
          <Text className="text-center py-10 text-gray-500">
            Saved posts coming soon
          </Text>
        );
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
          <ProfileHeader username={user.username} self={false} />
          <View className="flex-row items-center mt-3">
            <ProfileAvatar size={86} />
            <Statistics {...user} />
          </View>
          <Bio {...user} />
          <ProfileActions
            self={false}
            isFollowing={isFollowing}
            toggleFollow={() => setIsFollowing(!isFollowing)}
          />
          <Highlights self={false} />
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
