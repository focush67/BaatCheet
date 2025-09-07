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
import React, { useCallback, useEffect, useState, useMemo } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getPostsForUser, getPostsSaved } from "@/services/postService";
import { BlurView } from "expo-blur";
import useFollow from "@/hooks/user/useFollow";

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

  const isExternal = useMemo(
    () => String(isExternalProfile) === "true",
    [isExternalProfile]
  );

  const isPersonalProfile = !isExternal;
  const sessionEmail = useMemo(
    () => user?.emailAddresses[0]?.emailAddress,
    [user?.emailAddresses]
  );

  const currentUsername = useMemo(
    () =>
      isPersonalProfile
        ? (user?.unsafeMetadata?.username as string | undefined)
        : (username as string | undefined),
    [isPersonalProfile, user?.unsafeMetadata?.username, username]
  );

  const currentProfileName = useMemo(
    () =>
      isPersonalProfile
        ? (user?.unsafeMetadata?.ownerName as string | undefined)
        : (ownerName as string | undefined),
    [isPersonalProfile, user?.unsafeMetadata?.ownerName, ownerName]
  );

  const currentUserEmail = useMemo(
    () =>
      isPersonalProfile
        ? (user?.emailAddresses?.[0]?.emailAddress as string | undefined)
        : (userEmail as string | undefined),
    [isPersonalProfile, user?.emailAddresses, userEmail]
  );

  const currentUserAvatar = useMemo(
    () =>
      isPersonalProfile
        ? (user?.unsafeMetadata?.profilePicture as string | undefined)
        : (avatar as string | undefined),
    [isPersonalProfile, user?.unsafeMetadata?.profilePicture, avatar]
  );

  const currentUserCaption = useMemo(
    () =>
      isPersonalProfile
        ? (user?.unsafeMetadata?.caption as string | undefined)
        : (caption as string | undefined),
    [isPersonalProfile, user?.unsafeMetadata?.caption, caption]
  );

  const { isFollowing, toggleFollow } = useFollow(
    sessionEmail,
    currentUserEmail
  );

  const [posts, setPosts] = useState<GridPost[]>([]);
  const [savedPosts, setSavedPosts] = useState<GridPost[]>([]);
  const [activeTab, setActiveTab] = useState<ActiveTab>("posts");

  const [previewPost, setPreviewPost] = useState<GridPost | null>(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [profileModalVisible, setProfileModalVisible] = useState(false);

  const profileData = useMemo(
    () => ({
      username: currentUsername,
      name: currentProfileName,
      bio: currentUserCaption,
      picture: currentUserAvatar,
    }),
    [currentUsername, currentProfileName, currentUserCaption, currentUserAvatar]
  );

  useEffect(() => {
    let mounted = true;

    const fetchSaved = async () => {
      try {
        let result: GridPost[] = [];
        if (isPersonalProfile) {
          result = (await getPostsSaved(
            currentUserEmail,
            undefined
          )) as GridPost[];
        } else {
          result = (await getPostsSaved(
            undefined,
            currentUsername
          )) as GridPost[];
        }
        if (mounted) setSavedPosts(result);
      } catch (err) {
        console.error("Failed to fetch saved posts", err);
      }
    };

    const fetchPersonalPosts = async () => {
      try {
        let result: GridPost[] = [];
        if (isPersonalProfile) {
          result = (await getPostsForUser(
            currentUserEmail,
            undefined
          )) as GridPost[];
        } else {
          result = (await getPostsForUser(
            undefined,
            currentUsername
          )) as GridPost[];
        }
        if (mounted) setPosts(result);
      } catch (err) {
        console.error("Failed to fetch posts for profile", err);
      }
    };

    fetchSaved();
    fetchPersonalPosts();

    return () => {
      mounted = false;
    };
  }, [isPersonalProfile, currentUserEmail, currentUsername]);

  const handleLongPress = useCallback((post: GridPost | null) => {
    setPreviewPost(post);
    setPreviewVisible(true);
  }, []);

  const handlePressOut = useCallback(() => {
    setPreviewVisible(false);
    setPreviewPost(null);
  }, []);

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
      {profileModalVisible && (
        <BlurView
          intensity={140}
          tint={colorScheme === "dark" ? "dark" : "light"}
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 10,
          }}
        />
      )}

      <ScrollView>
        <View className="px-4">
          <ProfileHeader
            username={profileData.username!}
            self={isPersonalProfile}
          />

          <View className="flex-row items-center mt-3">
            <ProfileAvatar
              size={86}
              username={currentUsername!}
              imageUrl={avatar}
              isFollowing={isFollowing || false}
              toggleFollow={toggleFollow}
              modalVisible={profileModalVisible}
              setModalVisible={setProfileModalVisible}
            />
            <Statistics posts={124} followers={"4.5k"} following={"300"} />
          </View>

          <Bio name={profileData.name!} bio={profileData.bio!} />
          <ProfileActions
            self={isPersonalProfile}
            isFollowing={isFollowing || false}
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
