import { useTheme } from "@/context/ThemeContext";
import { useSignUp } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as React from "react";
import {
  ActivityIndicator,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const { colorScheme } = useTheme();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState("");

  const isLightMode = colorScheme === "light";
  const bgColor = isLightMode ? "bg-white" : "bg-gray-900";
  const textColor = isLightMode ? "text-gray-900" : "text-white";
  const inputBgColor = isLightMode ? "bg-gray-50" : "bg-gray-800";
  const inputBorderColor = isLightMode ? "border-gray-200" : "border-gray-700";
  const placeholderColor = isLightMode ? "text-gray-400" : "text-gray-400";

  const validatePassword = () => {
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return false;
    }
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const onSignUpPress = async () => {
    if (!isLoaded || !validatePassword()) return;
    setIsLoading(true);

    try {
      await signUp.create({ emailAddress, password });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
      Alert.alert("Error", "Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded) return;
    setIsLoading(true);

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });
      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/");
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
      Alert.alert("Error", "Invalid verification code");
    } finally {
      setIsLoading(false);
    }
  };

  if (pendingVerification) {
    return (
      <View className={`flex-1 ${bgColor} p-6 justify-center`}>
        {/* Verification Header with Back Button */}
        <View className="flex-row items-start mb-10">
          <TouchableOpacity
            onPress={() => setPendingVerification(false)}
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
              Verify Email
            </Text>
            <Text
              className={`text-lg ${
                isLightMode ? "text-gray-500" : "text-gray-400"
              }`}
            >
              We've sent a code to {emailAddress}
            </Text>
          </View>
        </View>

        <View className="mb-6">
          <Text className={`text-sm font-medium mb-1 ${textColor}`}>
            Verification Code
          </Text>
          <TextInput
            className={`h-12 px-4 rounded-lg ${inputBgColor} ${inputBorderColor} border ${textColor}`}
            placeholderTextColor={placeholderColor}
            placeholder="Enter 6-digit code"
            value={code}
            onChangeText={setCode}
            keyboardType="number-pad"
            autoFocus
          />
        </View>

        <TouchableOpacity
          className={`h-12 rounded-lg bg-blue-500 items-center justify-center ${
            !code && "opacity-70"
          }`}
          onPress={onVerifyPress}
          disabled={!code || isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-bold text-lg">Verify Email</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity className="mt-4 items-center">
          <Text className="text-blue-500 font-medium">Resend Code</Text>
        </TouchableOpacity>
      </View>
    );
  }

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
            Create Account
          </Text>
          <Text
            className={`text-lg ${
              isLightMode ? "text-gray-500" : "text-gray-400"
            }`}
          >
            Join us today
          </Text>
        </View>
      </View>

      <View className="mb-6">
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

        <View className="mb-4">
          <Text className={`text-sm font-medium mb-1 ${textColor}`}>
            Password
          </Text>
          <TextInput
            className={`h-12 px-4 rounded-lg ${inputBgColor} ${inputBorderColor} border ${textColor}`}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <Text
            className={`text-xs mt-1 ${
              isLightMode ? "text-gray-500" : "text-gray-400"
            }`}
          >
            Use at least 8 characters
          </Text>
        </View>

        <View className="mb-6">
          <Text className={`text-sm font-medium mb-1 ${textColor}`}>
            Confirm Password
          </Text>
          <TextInput
            className={`h-12 px-4 rounded-lg ${inputBgColor} ${inputBorderColor} border ${textColor}`}
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            onBlur={validatePassword}
          />
          {passwordError ? (
            <Text className={`text-xs mt-1 text-red-500`}>{passwordError}</Text>
          ) : null}
        </View>

        <TouchableOpacity
          className={`h-12 rounded-lg bg-blue-500 items-center justify-center ${
            (!emailAddress || !password || !confirmPassword || passwordError) &&
            "opacity-70"
          }`}
          onPress={onSignUpPress}
          disabled={
            !emailAddress ||
            !password ||
            !confirmPassword ||
            !!passwordError ||
            isLoading
          }
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-bold text-lg">Create Account</Text>
          )}
        </TouchableOpacity>
      </View>

      <View className="flex-row justify-center">
        <Text className={`${isLightMode ? "text-gray-500" : "text-gray-400"}`}>
          Already have an account?
        </Text>
        <TouchableOpacity
          className="ml-1"
          onPress={() => router.push("/login")}
        >
          <Text className="text-blue-500 font-medium">Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
