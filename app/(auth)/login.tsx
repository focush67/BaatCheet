import { FormInput } from "@/components/auth/FormInput";
import { useTheme } from "@/context/ThemeContext";
import { useSignInForm } from "@/hooks/auth/useSignInForm";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

export default function SignInScreen() {
  const router = useRouter();
  const { colorScheme } = useTheme();
  const {
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    handleSubmit,
    isFormValid,
  } = useSignInForm();

  const isLight = colorScheme === "light";

  return (
    <View
      className={`flex-1 ${
        isLight ? "bg-white" : "bg-gray-900"
      } p-6 justify-center`}
    >
      {/* Header */}
      <View className="flex-row items-start mb-1">
        <TouchableOpacity
          onPress={() => router.back()}
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
            Welcome back
          </Text>
          <Text
            className={`text-lg ${isLight ? "text-gray-500" : "text-gray-400"}`}
          >
            Sign in to continue
          </Text>
        </View>
      </View>

      {/* Form */}
      <View className="mb-6">
        <FormInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <FormInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity className="items-end mb-6">
          <Text className="text-blue-500 font-medium">Forgot password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`h-12 rounded-lg bg-blue-500 items-center justify-center ${
            !isFormValid && "opacity-70"
          }`}
          onPress={handleSubmit}
          disabled={!isFormValid || isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-bold text-lg">Sign In</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Divider */}
      <View className="flex-row items-center my-6">
        <View
          className={`flex-1 h-px ${isLight ? "bg-gray-200" : "bg-gray-700"}`}
        />
        <Text className={`px-3 ${isLight ? "text-gray-400" : "text-gray-500"}`}>
          OR
        </Text>
        <View
          className={`flex-1 h-px ${isLight ? "bg-gray-200" : "bg-gray-700"}`}
        />
      </View>

      {/* Sign Up Link */}
      <View className="flex-row justify-center">
        <Text className={isLight ? "text-gray-500" : "text-gray-400"}>
          Don't have an account?
        </Text>
        <TouchableOpacity
          className="ml-1"
          onPress={() => router.push("/register")}
        >
          <Text className="text-blue-500 font-medium">Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
