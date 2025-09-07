import { View, KeyboardAvoidingView, Platform } from "react-native";
import { VerificationForm } from "./VerificationForm";
import { useRouter } from "expo-router";
import React from "react";

const Pending = ({
  isLight,
  email,
  code,
  setCode,
  isLoading,
  handleVerify,
  handleResendCode,
  setPendingVerification,
}: {
  isLight: boolean;
  email: string;
  code: string;
  setCode: (_: string) => void;
  isLoading: boolean;
  handleVerify: () => Promise<boolean | undefined>;
  handleResendCode: () => void;
  setPendingVerification: (_: boolean) => void;
}) => {
  const router = useRouter();
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
};

export default Pending;
