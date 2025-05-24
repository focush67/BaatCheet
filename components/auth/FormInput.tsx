import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export const FormInput = ({
  label,
  value,
  onChangeText,
  secureTextEntry = false,
  autoCapitalize = "none",
  keyboardType = "default",
}: {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
}) => {
  const { colorScheme } = useTheme();
  const isLight = colorScheme === "light";
  const [showText, setShowText] = useState(false);

  return (
    <View className="mb-4">
      <Text
        className={`text-sm font-medium mb-1 ${
          isLight ? "text-gray-900" : "text-white"
        }`}
      >
        {label}
      </Text>
      <View className="relative">
        <TextInput
          className={`h-12 px-4 rounded-lg border ${
            isLight
              ? "bg-gray-50 border-gray-200 text-gray-900"
              : "bg-gray-800 border-gray-700 text-white"
          }`}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && !showText}
          autoCapitalize={autoCapitalize}
          keyboardType={keyboardType}
        />
        {secureTextEntry && (
          <TouchableOpacity
            className="absolute right-3 top-3"
            onPress={() => setShowText(!showText)}
            hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
          >
            <Ionicons
              name={showText ? "eye-off-outline" : "eye-outline"}
              size={24}
              color={isLight ? "#6b7280" : "#9ca3af"}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
