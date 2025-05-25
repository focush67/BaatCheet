import { useTheme } from "@/context/ThemeContext";
import { useUser } from "@clerk/clerk-expo";
import React from "react";
import { Text, View } from "react-native";

const Bio = ({ name, bio }: { name: string; bio: string }) => {
  const { colorScheme } = useTheme();
  const { user } = useUser();
  console.log("User", user?.unsafeMetadata);
  return (
    <View className="mt-4 px-4">
      <Text
        className={`font-bold ${
          colorScheme === "light" ? "text-gray-800" : "text-gray-200"
        }`}
      >
        {user?.unsafeMetadata?.ownerName as string}
      </Text>
      <Text
        className={`${
          colorScheme === "light" ? "text-gray-800" : "text-gray-200"
        }`}
      >
        {bio}
      </Text>
    </View>
  );
};

export default Bio;
