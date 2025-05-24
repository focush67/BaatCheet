import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { FormInput } from "./FormInput";

export const VerificationForm = ({
  email,
  code,
  setCode,
  isLoading,
  onVerify,
  onBack,
  onResend,
}: {
  email: string;
  code: string;
  setCode: (code: string) => void;
  isLoading: boolean;
  onVerify: () => void;
  onBack: () => void;
  onResend: () => void;
}) => {
  const { colorScheme } = useTheme();
  const isLight = colorScheme === "light";

  return (
    <>
      <View className="flex-row items-start mb-10">
        <TouchableOpacity
          onPress={onBack}
          className="mr-3 pt-1"
          hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
        >
          <Ionicons
            name="chevron-back"
            size={26}
            color={isLight ? "#000" : "#fff"}
          />
        </TouchableOpacity>
        <View>
          <Text
            className={`text-3xl font-bold ${
              isLight ? "text-gray-900" : "text-white"
            } mb-2`}
          >
            Verify Email
          </Text>
          <Text
            className={`text-lg ${isLight ? "text-gray-500" : "text-gray-400"}`}
          >
            We've sent a code to {email}
          </Text>
        </View>
      </View>

      <View className="mb-6">
        <FormInput
          label="Verification Code"
          value={code}
          onChangeText={setCode}
          keyboardType="numeric"
        />
      </View>

      <TouchableOpacity
        className={`h-12 rounded-lg bg-blue-500 items-center justify-center ${
          !code && "opacity-70"
        }`}
        onPress={onVerify}
        disabled={!code || isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white font-bold text-lg">Verify Email</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity className="mt-4 items-center" onPress={onResend}>
        <Text className="text-blue-500 font-medium">Resend Code</Text>
      </TouchableOpacity>
    </>
  );
};
