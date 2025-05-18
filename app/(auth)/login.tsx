import { useTheme } from "@/context/ThemeContext";
import { useSignIn } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, Dialog, Portal } from "react-native-paper";

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();
  const { colorScheme } = useTheme();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [dialogTitle, setDialogTitle] = React.useState("");
  const [dialogMessage, setDialogMessage] = React.useState("");

  const isLightMode = colorScheme === "light";
  const bgColor = isLightMode ? "bg-white" : "bg-gray-900";
  const textColor = isLightMode ? "text-gray-900" : "text-white";
  const inputBgColor = isLightMode ? "bg-gray-50" : "bg-gray-800";
  const inputBorderColor = isLightMode ? "border-gray-200" : "border-gray-700";
  const placeholderColor = isLightMode ? "text-gray-500" : "text-gray-200";

  const showAlert = (title: string, message: string) => {
    setDialogTitle(title);
    setDialogMessage(message);
    setVisible(true);
  };

  const onSignInPress = async () => {
    if (!isLoaded) return;
    setIsLoading(true);

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      const error = JSON.parse(JSON.stringify(err, null));
      if (error.status === 422) {
        showAlert(
          "Account Not Found",
          "This email isn't registered. Would you like to create an account?"
        );
      } else {
        showAlert(
          "Sign In Failed",
          error.errors?.[0]?.message || "Invalid email or password"
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className={`flex-1 ${bgColor} p-6 justify-center`}>
      {/* Header with Back Button */}
      <View className="flex-row items-start mb-10">
        <TouchableOpacity
          onPress={() => router.back()}
          className="mr-3 pt-1"
          hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
        >
          <Ionicons
            name="chevron-back"
            size={26}
            color={isLightMode ? "#000" : "#fff"}
          />
        </TouchableOpacity>
        <View>
          <Text className={`text-3xl font-bold ${textColor} mb-2`}>
            Welcome back
          </Text>
          <Text
            className={`text-lg ${
              isLightMode ? "text-gray-500" : "text-gray-400"
            }`}
          >
            Sign in to continue
          </Text>
        </View>
      </View>

      {/* Form */}
      <View className="mb-6">
        {/* Email Input */}
        <View className="mb-4">
          <Text className={`text-sm font-medium mb-1 ${textColor}`}>Email</Text>
          <TextInput
            className={`h-12 px-4 rounded-lg ${inputBgColor} ${inputBorderColor} border ${textColor}`}
            autoCapitalize="none"
            keyboardType="email-address"
            value={emailAddress}
            onChangeText={setEmailAddress}
          />
        </View>

        {/* Password Input */}
        <View className="mb-6">
          <Text className={`text-sm font-medium mb-1 ${textColor}`}>
            Password
          </Text>
          <TextInput
            className={`h-12 px-4 rounded-lg ${inputBgColor} ${inputBorderColor} border ${textColor}`}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        {/* Forgot Password */}
        <TouchableOpacity className="items-end mb-6">
          <Text className="text-blue-500 font-medium">Forgot password?</Text>
        </TouchableOpacity>

        {/* Sign In Button */}
        <TouchableOpacity
          className={`h-12 rounded-lg bg-blue-500 items-center justify-center ${
            (!emailAddress || !password) && "opacity-70"
          }`}
          onPress={onSignInPress}
          disabled={!emailAddress || !password || isLoading}
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
          className={`flex-1 h-px ${
            isLightMode ? "bg-gray-200" : "bg-gray-700"
          }`}
        />
        <Text
          className={`px-3 ${isLightMode ? "text-gray-400" : "text-gray-500"}`}
        >
          OR
        </Text>
        <View
          className={`flex-1 h-px ${
            isLightMode ? "bg-gray-200" : "bg-gray-700"
          }`}
        />
      </View>

      {/* Sign Up Link */}
      <View className="flex-row justify-center">
        <Text className={`${isLightMode ? "text-gray-500" : "text-gray-400"}`}>
          Don't have an account?
        </Text>
        <TouchableOpacity
          className="ml-1"
          onPress={() => router.push("/register")}
        >
          <Text className="text-blue-500 font-medium">Sign up</Text>
        </TouchableOpacity>
      </View>

      {/* Beautiful Alert Dialog */}
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={() => setVisible(false)}
          style={{
            backgroundColor: isLightMode ? "#fff" : "#000",
            borderRadius: 12,
          }}
        >
          <Dialog.Title style={{ color: isLightMode ? "#000" : "#fff" }}>
            {dialogTitle}
          </Dialog.Title>
          <Dialog.Content>
            <Text
              style={{
                color: isLightMode ? "#000" : "#fff",
                fontSize: 16,
                lineHeight: 24,
              }}
            >
              {dialogMessage}
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() => setVisible(false)}
              textColor={isLightMode ? "#64748b" : "#94a3b8"}
            >
              Cancel
            </Button>
            {dialogTitle === "Account Not Found" && (
              <Button
                onPress={() => {
                  setVisible(false);
                  router.push("/register");
                }}
                textColor={isLightMode ? "#3b82f6" : "#60a5fa"}
              >
                Sign Up
              </Button>
            )}
            <Button
              onPress={() => setVisible(false)}
              textColor={isLightMode ? "#3b82f6" : "#60a5fa"}
            >
              OK
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}
