import { useSignUp } from "@clerk/clerk-expo";
import { useState } from "react";
import Toast from "react-native-toast-message";

export const useSignUpForm = () => {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [code, setCode] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const showToast = (title: string, message: string) => {
    Toast.show({
      type: "error",
      text1: title,
      text2: message,
    });
  };

  const validatePassword = (): boolean => {
    if (password !== confirmPassword) {
      showToast("Password Mismatch", "Passwords do not match.");
      return false;
    }
    if (password.length < 8) {
      showToast("Weak Password", "Password must be at least 8 characters.");
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    if (!isLoaded || !validatePassword()) return;

    setIsLoading(true);
    setSuccess("");

    try {
      await signUp.create({ emailAddress: email, password });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setPendingVerification(true);
      setSuccess("Account created. Verification code sent to your email.");
      Toast.show({
        type: "success",
        text1: "Account Created",
        text2: "Check your email for the verification code.",
      });
    } catch (err: any) {
      console.log("❌ Sign Up Error:", JSON.parse(JSON.stringify(err, null)));

      const firstError = err?.errors?.[0] || {};
      const title =
        firstError?.code === "form_email_address_exists"
          ? "Email Already Registered"
          : "Sign Up Failed";
      const message =
        firstError?.longMessage ||
        "Failed to create account. Please try again.";

      showToast(title, message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async () => {
    if (!isLoaded) return;
    setIsLoading(true);
    setSuccess("");

    try {
      const result = await signUp.attemptEmailAddressVerification({ code });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        setSuccess("Email verified successfully!");
        Toast.show({
          type: "success",
          text1: "Email Verified",
          text2: "Welcome aboard!",
        });
        return true;
      }

      return false;
    } catch (err: any) {
      console.log(
        "❌ Verification Error:",
        JSON.parse(JSON.stringify(err, null))
      );
      const firstError = err?.errors?.[0] || {};
      showToast(
        "Verification Failed",
        firstError?.longMessage || "Invalid code."
      );
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
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
    success,
    setSuccess,
    handleSignUp,
    handleVerify,
    isFormValid: !!email && !!password && !!confirmPassword,
  };
};
