import { useTheme } from "@/context/ThemeContext";
import { useCommentStore } from "@/stores/CommentStore";
import { usePostStore } from "@/stores/PostStore";
import { useStoryStore } from "@/stores/StoryStore";
import { useAuth } from "@clerk/clerk-expo";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Menu } from "react-native-paper";
import { NewCollectionModal } from "./CollectionModal";

export const ProfileHeader = ({
  username,
  self,
}: {
  username: string;
  self: boolean;
}) => {
  const { colorScheme } = useTheme();
  const [mainMenuVisible, setMainMenuVisible] = useState(false);
  const [plusMenuVisible, setPlusMenuVisible] = useState(false);
  const [showNewCollectionModal, setShowNewCollectionModal] = useState(false);
  const router = useRouter();
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    usePostStore.getState().reset();
    useCommentStore.getState().reset();
    useStoryStore.getState().reset();
    await signOut();
  };

  return (
    <>
      <View
        className={`flex-row items-center justify-between px-4 py-2 ${
          colorScheme === "light" ? "bg-white" : "bg-black"
        }`}
      >
        <Text
          className={`text-2xl font-bold ${
            colorScheme === "light" ? "text-black" : "text-white"
          }`}
        >
          {username}
        </Text>

        {self === true ? (
          <View className="flex-row items-center">
            <Menu
              visible={plusMenuVisible}
              onDismiss={() => setPlusMenuVisible(false)}
              anchor={
                <TouchableOpacity
                  className="mr-4"
                  onPress={() => setPlusMenuVisible(true)}
                >
                  <Feather
                    name="plus-square"
                    size={24}
                    color={colorScheme === "light" ? "#262626" : "#ffffff"}
                  />
                </TouchableOpacity>
              }
              contentStyle={{
                backgroundColor: colorScheme === "light" ? "#fff" : "#222",
              }}
            >
              <Menu.Item
                onPress={() => {
                  setPlusMenuVisible(false);
                  router.push("/add");
                }}
                title="New Post"
                titleStyle={{
                  color: colorScheme === "light" ? "#000" : "#fff",
                }}
              />
              <Menu.Item
                onPress={() => {
                  setPlusMenuVisible(false);
                  setShowNewCollectionModal(true);
                }}
                title="New Collection"
                titleStyle={{
                  color: colorScheme === "light" ? "#000" : "#fff",
                }}
              />
            </Menu>

            <Menu
              visible={mainMenuVisible}
              onDismiss={() => setMainMenuVisible(false)}
              anchor={
                <TouchableOpacity onPress={() => setMainMenuVisible(true)}>
                  <Ionicons
                    name="menu"
                    size={24}
                    color={colorScheme === "light" ? "#262626" : "#ffffff"}
                  />
                </TouchableOpacity>
              }
              contentStyle={{
                backgroundColor: colorScheme === "light" ? "#fff" : "#222",
              }}
            >
              <Menu.Item
                onPress={handleSignOut}
                title="Sign Out"
                titleStyle={{
                  color: colorScheme === "light" ? "#000" : "#fff",
                }}
              />
            </Menu>
          </View>
        ) : (
          <Feather name="menu" size={18} />
        )}
      </View>

      <NewCollectionModal
        visible={showNewCollectionModal}
        onClose={() => setShowNewCollectionModal(false)}
      />
    </>
  );
};
