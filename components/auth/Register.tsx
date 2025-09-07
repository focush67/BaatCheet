import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { FormInput } from "./FormInput";

const Register = ({
  isLight,
  email,
  isFormValid,
  handleSignUp,
  isLoading,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
}: {
  isLight: boolean;
  email: string;
  isFormValid: boolean;
  handleSignUp: () => Promise<void>;
  isLoading: boolean;
  setEmail: (_: string) => void;
  password: string;
  setPassword: (_: string) => void;
  confirmPassword: string;
  setConfirmPassword: (_: string) => void;
}) => {
  const router = useRouter();
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
                } mb-5`}
              >
                Create Account
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
};

export default Register;
