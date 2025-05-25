import { useTheme } from "@/context/ThemeContext";
import { useUser } from "@clerk/clerk-expo";
import { Feather, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ProfileAvatar = ({
  size = 86,
  imageUrl = "https://picsum.photos/150/150?random=1",
}) => {
  const { colorScheme } = useTheme();
  const { user } = useUser();

  const [modalVisible, setModalVisible] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const profileUri =
    (user?.unsafeMetadata?.profilePicture as string) || imageUrl;

  return (
    <>
      {/* Avatar Thumbnail */}
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View
          className={`rounded-full ml-2 border ${
            colorScheme === "light" ? "border-gray-800" : "border-gray-200"
          } p-[3px]`}
          style={{ width: size, height: size }}
        >
          <Image
            source={{ uri: profileUri }}
            className="w-full h-full rounded-full"
            resizeMode="cover"
          />
        </View>
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 bg-black/60 justify-center items-center px-6">
          {/* Tap outside to close */}
          <Pressable
            className="absolute inset-0"
            onPress={() => setModalVisible(false)}
          />

          {/* Profile Modal Content */}
          <View className="items-center bg-white/10 rounded-3xl p-6">
            {/* Circular Image */}
            <View
              className="overflow-hidden border-4 border-white rounded-full mb-6"
              style={{ width: 240, height: 240 }}
            >
              <Image
                source={{ uri: profileUri }}
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>

            {/* Buttons */}
            <View className="flex-row gap-x-4 mt-4">
              {/* Follow / Following */}
              <TouchableOpacity
                onPress={() => setIsFollowing(!isFollowing)}
                className="bg-white px-5 py-2 rounded-full flex-row items-center gap-x-2"
              >
                <Feather
                  name={isFollowing ? "user-check" : "user-plus"}
                  size={18}
                  color="black"
                />
                <Text className="text-black font-semibold text-sm">
                  {isFollowing ? "Unfollow" : "Follow"}
                </Text>
              </TouchableOpacity>

              {/* Notifications / Muted */}
              <TouchableOpacity
                onPress={() => setNotificationsEnabled(!notificationsEnabled)}
                className="bg-white px-5 py-2 rounded-full flex-row items-center space-x-2"
              >
                <Ionicons
                  name={
                    notificationsEnabled ? "notifications" : "notifications-off"
                  }
                  size={18}
                  color="black"
                />
                <Text className="text-black font-semibold text-sm">
                  {notificationsEnabled ? "Mute" : "Unmute"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default ProfileAvatar;
