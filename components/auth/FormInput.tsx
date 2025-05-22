import { useTheme } from "@/context/ThemeContext";
import { Text, TextInput, View } from "react-native";

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

  return (
    <View className="mb-4">
      <Text
        className={`text-sm font-medium mb-1 ${
          isLight ? "text-gray-900" : "text-white"
        }`}
      >
        {label}
      </Text>
      <TextInput
        className={`h-12 px-4 rounded-lg border ${
          isLight
            ? "bg-gray-50 border-gray-200 text-gray-900"
            : "bg-gray-800 border-gray-700 text-white"
        }`}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
      />
    </View>
  );
};
