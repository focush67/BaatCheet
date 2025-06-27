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
import { getPostsForUser, getPostsSaved } from "@/services/postService";
import {
  followUser,
  getFollowStatus,
  unfollowUser,
} from "@/services/userService";

type ProfileScreenProps = {
  username: string;
  userEmail: string;
  avatar: string;
  ownerName: string;
  caption: string;
  isExternalProfile: string;
};

const ProfileScreen = () => {
  const { user } = useUser();
  const { colorScheme } = useTheme();
  const { username, avatar, userEmail, isExternalProfile, ownerName, caption } =
    useLocalSearchParams<ProfileScreenProps>();

  const isPersonalProfile = !isExternalProfile;

  const currentUsername = isPersonalProfile
    ? (user?.unsafeMetadata?.username as string)
    : (username as string);

  const currentProfileName = isPersonalProfile
    ? (user?.unsafeMetadata.ownerName as string)
    : ownerName;

  const currentUserEmail = isPersonalProfile
    ? (user?.emailAddresses[0].emailAddress as string)
    : undefined;

  const currentUserAvatar = isPersonalProfile
    ? (user?.unsafeMetadata?.profilePicture as string)
    : (avatar as string);

  const currentUserCaption = isPersonalProfile
    ? (user?.unsafeMetadata.caption as string)
    : caption;

  const [posts, setPosts] = useState<GridPost[]>([]);
  const [savedPosts, setSavedPosts] = useState<GridPost[]>([]);
  const [activeTab, setActiveTab] = useState<ActiveTab>("posts");
  const [isFollowing, setIsFollowing] = useState(false);
  const [previewPost, setPreviewPost] = useState<GridPost | null>(null);
  const [previewVisible, setPreviewVisible] = useState(false);

  const profileData = {
    username: currentUsername,
    name: currentProfileName,
    bio: currentUserCaption,
    picture: currentUserAvatar,
  };

  useEffect(() => {
    const fetchSaved = async () => {
      let posts = [];
      if (isPersonalProfile) {
        posts = await getPostsSaved(currentUserEmail, undefined);
      } else {
        posts = await getPostsSaved(undefined, currentUsername);
      }
      setSavedPosts(posts);
    };

    const fetchPersonalPosts = async () => {
      let createdPosts = [];
      if (isPersonalProfile) {
        createdPosts = await getPostsForUser(currentUserEmail, undefined);
      } else {
        createdPosts = await getPostsForUser(undefined, currentUsername);
      }
      setPosts(createdPosts as GridPost[]);
    };

    fetchSaved();
    fetchPersonalPosts();
  }, [currentUserEmail, currentUsername, isPersonalProfile]);

  useEffect(() => {
    const fetchFollowStatus = async () => {
      const sourceEmail = user?.emailAddresses[0].emailAddress as string;
      if (isPersonalProfile || !sourceEmail || !userEmail) {
        console.log(
          "Skipping follow status check for personal profile or missing email"
        );
        return;
      }

      const followStatus = await getFollowStatus(sourceEmail, userEmail);
      console.log("Follow status:", followStatus);
      setIsFollowing(followStatus);
    };

    fetchFollowStatus();
  }, [isPersonalProfile, currentUserEmail]);

  const handleLongPress = (post: GridPost | null) => {
    console.log("Setting preview post:", post);
    setPreviewPost(post);
    setPreviewVisible(true);
  };

  const toggleFollow = async () => {
    setIsFollowing((prev) => !prev);
    let response = null;
    const sourceEmail = user?.emailAddresses[0].emailAddress as string;
    if (isFollowing) {
      response = await unfollowUser(sourceEmail!, userEmail!);
    } else {
      response = await followUser(sourceEmail!, userEmail!);
    }
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
              username={currentUsername}
              imageUrl={avatar}
            />
            <Statistics posts={124} followers={"4.5k"} following={"300"} />
          </View>

          <Bio name={profileData.name} bio={profileData.bio} />
          <ProfileActions
            self={isPersonalProfile}
            isFollowing={isFollowing}
            toggleFollow={toggleFollow}
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
