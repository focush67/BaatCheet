import { useTheme } from "@/context/ThemeContext";
import React from "react";
import { Text, View } from "react-native";

const Bio = ({ name, bio }: { name: string; bio: string }) => {
  const { colorScheme } = useTheme();
  return (
    <View className="mt-2 px-4">
      <Text
        className={`font-bold ${
          colorScheme === "light" ? "text-gray-800" : "text-gray-200"
        }`}
      >
        {name}
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
