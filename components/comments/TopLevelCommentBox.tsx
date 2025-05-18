import { useTheme } from "@/context/ThemeContext";
import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
const TopLevelCommentBox: React.FC<any> = ({ value, onChange, onSubmit }) => {
  const { colorScheme } = useTheme();
  return (
    <View className="px-4 py-3">
      <View className="flex-row items-center">
        <TextInput
          className={`flex-1 text-sm p-3 border border-gray-100 rounded-lg  ${
            colorScheme === "light" ? "text-gray-800" : "text-gray-200"
          }`}
          placeholder="Add a comment..."
          placeholderTextColor="#8e8e8e"
          value={value}
          onChangeText={onChange}
          multiline
          style={{ minHeight: 40, textAlignVertical: "top" }}
        />
        <TouchableOpacity
          onPress={() => {
            if (value.trim()) onSubmit(value);
          }}
          disabled={!value.trim()}
          className="ml-3"
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text
            className={`text-sm font-semibold ${
              value.trim() ? "text-blue-500" : "text-blue-200"
            }`}
          >
            Post
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TopLevelCommentBox;
