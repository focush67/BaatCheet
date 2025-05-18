import { useTheme } from "@/context/ThemeContext";
import React from "react";
import { Image, View } from "react-native";

const ProfileAvatar = ({
  size = 86,
  imageUrl = "https://picsum.photos/150/150?random=1",
}) => {
  const { colorScheme } = useTheme();
  return (
    <View
      className={`rounded-full ml-2 ${
        colorScheme === "light" ? "border-gray-800" : "border-gray-200"
      }`}
      style={{
        width: size,
        height: size,
        borderWidth: 1,
        padding: 3,
      }}
    >
      <Image
        source={{ uri: imageUrl }}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: size / 2,
        }}
        resizeMode="cover"
      />
    </View>
  );
};
export default ProfileAvatar;
