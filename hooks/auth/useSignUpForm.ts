import { useSignUp } from "@clerk/clerk-expo";
import { useState } from "react";

type AuthError = {
  code?: string;
  message: string;
  field?: string;
};

export const useSignUpForm = () => {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [code, setCode] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AuthError | null>(null);
  const [success, setSuccess] = useState("");

  const validatePassword = (): boolean => {
    if (password !== confirmPassword) {
      setError({ message: "Passwords do not match", field: "confirmPassword" });
      return false;
    }
    if (password.length < 8) {
      setError({
        message: "Password must be at least 8 characters",
        field: "password",
      });
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    if (!isLoaded || !validatePassword()) return;

    setIsLoading(true);
    setError(null);
    setSuccess("");

    try {
      await signUp.create({ emailAddress: email, password });
      console.log("✅ Account created successfully");

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      console.log("✅ Email verification code sent");

      setPendingVerification(true);
      setSuccess("Account created. Verification code sent to your email.");
    } catch (err: any) {
      console.error("❌ Error in sign-up:", JSON.stringify(err, null, 2));

      const firstError = err?.errors?.[0] || {};
      setError({
        message:
          firstError?.message || "Failed to create account. Please try again.",
        code: firstError?.code,
        field: firstError?.meta?.param,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async () => {
    if (!isLoaded) return;
    setIsLoading(true);
    setError(null);
    setSuccess("");

    try {
      const result = await signUp.attemptEmailAddressVerification({ code });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        setSuccess("Email verified successfully!");
        return true;
      }

      return false;
    } catch (err: any) {
      console.error("❌ Verification failed:", JSON.stringify(err, null, 2));
      const firstError = err?.errors?.[0] || {};
      setError({
        message:
          firstError?.message || "Verification failed. Please try again.",
        code: firstError?.code,
        field: "code",
      });
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
    error,
    success,
    setError,
    handleSignUp,
    handleVerify,
    isFormValid: !!email && !!password && !!confirmPassword,
  };
};
