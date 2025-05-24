import { FormInput } from "@/components/auth/FormInput";
import { VerificationForm } from "@/components/auth/VerificationForm";
import { useTheme } from "@/context/ThemeContext";
import { useSignUpForm } from "@/hooks/auth/useSignUpForm";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function SignUpScreen() {
  const router = useRouter();
  const { colorScheme } = useTheme();
  const {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    code,
    setCode,
    pendingVerification,
    setPendingVerification,
    isLoading,
    error,
    handleSignUp,
    handleVerify,
    isFormValid,
  } = useSignUpForm();

  const isLight = colorScheme === "light";

  const handleResendCode = async () => {};

  if (pendingVerification) {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View
          className={`flex-1 ${
            isLight ? "bg-white" : "bg-gray-900"
          } p-6 justify-center`}
        >
          <VerificationForm
            email={email}
            code={code}
            setCode={setCode}
            isLoading={isLoading}
            onVerify={async () => {
              const success = await handleVerify();
              console.log("Success Log", success);
              if (success) {
                console.log("Navigating to /(auth)/setup");
                router.push({
                  pathname: "/(auth)/setup",
                  params: {},
                });
              }
            }}
            onBack={() => setPendingVerification(false)}
            onResend={handleResendCode}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View
          className={`flex-1 ${
            isLight ? "bg-white" : "bg-gray-900"
          } p-6 justify-center`}
        >
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
                } mb-1`}
              >
                Create Account
              </Text>
              <Text
                className={`text-lg ${
                  isLight ? "text-gray-500" : "text-gray-400"
                }`}
              >
                Join us today
              </Text>
            </View>
          </View>

          <View className="mb-4">
            <FormInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <FormInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <FormInput
              label="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
            {error ? (
              <Text className="text-xs mt-1 text-red-500">{error}</Text>
            ) : null}

            <TouchableOpacity
              className={`h-12 rounded-lg bg-blue-500 items-center justify-center mt-4 ${
                !isFormValid && "opacity-70"
              }`}
              onPress={handleSignUp}
              disabled={!isFormValid || isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white font-bold text-lg">
                  Create Account
                </Text>
              )}
            </TouchableOpacity>
          </View>

          <View className="flex-row justify-center">
            <Text className={isLight ? "text-gray-500" : "text-gray-400"}>
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
