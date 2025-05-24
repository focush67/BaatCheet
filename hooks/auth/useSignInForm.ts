import { useSignIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useState } from "react";
import Toast from "react-native-toast-message";
export const useSignInForm = () => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!isLoaded) return;
    setIsLoading(true);
    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/(tabs)/home");
      }
    } catch (err: any) {
      const errorData = JSON.parse(JSON.stringify(err, null));
      console.error("❌ Sign In Error:", errorData.errors[0]?.longMessage);
      if (errorData.status === 422) {
        Toast.show({
          type: "error",
          text1: "Login Failed",
          text2: errorData.errors?.[0]?.longMessage,
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Login Failed",
          text2: errorData.errors?.[0]?.message || "Invalid email or password",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    handleSubmit,
    isFormValid: !!email && !!password,
  };
};
