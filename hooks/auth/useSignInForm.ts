import { useSignIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useState, useCallback, useMemo, useRef } from "react";
import Toast from "react-native-toast-message";
import { parseClerkError } from "@/utils/clerk";

const showErrorToast = (title: string, message?: string) => {
  Toast.show({
    type: "error",
    text1: title,
    text2: message ?? "Something went wrong",
  });
};

export const useSignInForm = (): UseSignInFormReturn => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const mountedRef = useRef(true);
  const submittingRef = useRef(false);

  const reset = useCallback(() => {
    setEmail("");
    setPassword("");
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!isLoaded) return;
    if (isLoading || submittingRef.current) return;
    submittingRef.current = true;
    setIsLoading(true);

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        if (mountedRef.current) {
          router.push("/(tabs)/home");
        }
      } else {
        showErrorToast("Sign In Failed", "Could not complete sign in");
      }
    } catch (err: unknown) {
      const parsed = parseClerkError(err);
      console.error("SignIn Error", err);
      if (parsed.status === 402) {
        showErrorToast(
          "Sign In Failed",
          "Please check your credentials and try again."
        );
      } else {
        showErrorToast(
          "Login Failed",
          parsed.errors?.[0]?.message ?? "Invalid Email or Password"
        );
      }
    } finally {
      submittingRef.current = false;
      setIsLoading(false);
    }
  }, [email, password, isLoading, isLoaded, router, signIn, setActive]);

  const isFormValid = useMemo(() => !!email && !!password, [email, password]);

  return useMemo(
    () => ({
      email,
      setEmail,
      password,
      setPassword,
      isLoading,
      isFormValid,
      handleSubmit,
      reset,
    }),
    [
      email,
      setEmail,
      password,
      setPassword,
      isLoading,
      isFormValid,
      handleSubmit,
      reset,
    ]
  );
};
