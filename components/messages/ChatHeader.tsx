import {
  Feather,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export const ChatHeader = ({
  colorScheme,
  handleBack,
  user,
}: {
  colorScheme: string;
  handleBack: () => void;
  user: any;
}) => {
  const router = useRouter();
  return (
    <View
      className={`flex-row items-center justify-between px-5 py-1 border-b ${
        colorScheme === "light" ? "border-gray-200" : "border-gray-800"
      }`}
    >
      <View className="flex-row items-center">
        <TouchableOpacity onPress={handleBack} className="mr-4">
          <Ionicons
            name="arrow-back"
            size={26}
            color={colorScheme === "light" ? "black" : "white"}
          />
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row items-center"
          onPress={() =>
            router.push({
              pathname: "/profile",
              params: {
                id: user.id,
              },
            })
          }
        >
          <View
            className={`rounded-full p-0.5 ${
              colorScheme === "light" ? "bg-gray-200" : "bg-gray-700"
            }`}
          >
            <Image
              source={{ uri: user.avatar }}
              className="w-9 h-9 rounded-full border-2 border-white dark:border-black"
            />
          </View>

          <View className="ml-3">
            <View className="flex-row items-center">
              <Text
                className={`font-semibold text-[17px] ${
                  colorScheme === "light" ? "text-black" : "text-white"
                }`}
              >
                {user.username}
              </Text>
              <View className="flex-row items-center ml-1.5">
                <Text> </Text>

                {user.isVerified && (
                  <MaterialIcons
                    name="verified"
                    size={18}
                    color="#3897f0"
                    style={{ marginRight: 2 }}
                  />
                )}
                {user.isCloseFriend && (
                  <MaterialCommunityIcons
                    name="star-circle"
                    size={18}
                    color="#ffc107"
                  />
                )}
              </View>
            </View>
            <Text className="text-[13px] text-gray-500 mt-0.5">
              {" "}
              {user.status}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View className="flex-row items-center space-x-6">
        <TouchableOpacity className="p-1.5">
          <Feather
            name="phone"
            size={22}
            color={colorScheme === "light" ? "black" : "white"}
          />
        </TouchableOpacity>
        <TouchableOpacity className="p-1.5">
          <Ionicons
            name="videocam-outline"
            size={24}
            color={colorScheme === "light" ? "black" : "white"}
          />
        </TouchableOpacity>
        <TouchableOpacity className="p-1.5">
          <FontAwesome
            name="info-circle"
            size={22}
            color={colorScheme === "light" ? "black" : "white"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
