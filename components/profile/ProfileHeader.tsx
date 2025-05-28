import { useTheme } from "@/context/ThemeContext";
import { useCommentStore } from "@/stores/CommentStore";
import { usePostStore } from "@/stores/PostStore";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Menu } from "react-native-paper";

export const ProfileHeader = ({ username }: { username: string }) => {
  const { colorScheme } = useTheme();
  const [menuVisible, setMenuVisible] = useState(false);
  const router = useRouter();
  const { signOut } = useAuth();
  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);
  const { user } = useUser();

  const handleSignOut = async () => {
    closeMenu();
    usePostStore.getState().reset();
    useCommentStore.getState().reset();
    await signOut();
    router.replace("/login");
  };

  return (
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
        {(user?.unsafeMetadata?.username as string) || "Username"}
      </Text>

      <View className="flex-row items-center">
        <TouchableOpacity className="mr-4" onPress={() => router.push("/add")}>
          <Feather
            name="plus-square"
            size={24}
            color={colorScheme === "light" ? "#262626" : "#ffffff"}
          />
        </TouchableOpacity>

        {/* Menu dropdown */}
        <Menu
          visible={menuVisible}
          onDismiss={closeMenu}
          anchor={
            <TouchableOpacity onPress={openMenu}>
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
    </View>
  );
};
