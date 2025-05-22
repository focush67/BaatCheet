import { useTheme } from "@/context/ThemeContext";
import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { Redirect, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

export default function LandingScreen() {
  const { user, isLoaded } = useUser();
  const { colorScheme } = useTheme();
  const router = useRouter();

  const isLightMode = colorScheme === "light";
  const bgColor = isLightMode ? "bg-white" : "bg-gray-900";
  const textColor = isLightMode ? "text-gray-900" : "text-white";
  const buttonSecondaryBg = isLightMode ? "bg-gray-100" : "bg-gray-800";

  if (!isLoaded) {
    return (
      <View className={`flex-1 ${bgColor} items-center justify-center`}>
        <ActivityIndicator
          size="large"
          color={isLightMode ? "#3b82f6" : "#60a5fa"}
        />
      </View>
    );
  }

  // Redirect if user is already authenticated
  if (user) {
    return <Redirect href="/(tabs)/home" />;
  }

  return (
    <View className={`flex-1 ${bgColor}`}>
      <StatusBar style={isLightMode ? "dark" : "light"} />

      <View className="flex-1 items-center justify-center p-6">
        <View className="items-center mb-8">
          <Ionicons
            name="chatbubbles"
            size={80}
            color={isLightMode ? "#3b82f6" : "#60a5fa"}
          />
          <Text className={`text-4xl font-bold mt-4 ${textColor}`}>
            BaatCheet
          </Text>
          <Text
            className={`text-lg mt-2 ${
              isLightMode ? "text-gray-500" : "text-gray-400"
            }`}
          >
            Connect with friends
          </Text>
        </View>

        {/* Auth Buttons */}
        <View className="w-full max-w-xs">
          <TouchableOpacity
            className={`w-full py-4 mb-4 rounded-full bg-blue-500 items-center justify-center`}
            onPress={() => router.push("/(auth)/login")}
          >
            <Text className="text-white font-bold text-lg">Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`w-full py-4 rounded-full ${buttonSecondaryBg} items-center justify-center border ${
              isLightMode ? "border-gray-200" : "border-gray-700"
            }`}
            onPress={() => router.push("/(auth)/register")}
          >
            <Text className={`font-semibold text-lg ${textColor}`}>
              Create Account
            </Text>
          </TouchableOpacity>
        </View>

        <View className="absolute bottom-8">
          <Text
            className={`text-sm ${
              isLightMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            By continuing, you agree to our Terms and Privacy Policy
          </Text>
        </View>
      </View>
    </View>
  );
}
