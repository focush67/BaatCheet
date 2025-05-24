import { useSignUp } from "@clerk/clerk-expo";
import { useState } from "react";

export const useSignUpForm = () => {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [code, setCode] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); // ✅ success message state

  const validatePassword = () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return false;
    }
    setError("");
    return true;
  };

  const handleSignUp = async () => {
    if (!isLoaded || !validatePassword()) return;
    setIsLoading(true);
    setError("");
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
      setError("Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async () => {
    if (!isLoaded) return;
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const result = await signUp.attemptEmailAddressVerification({ code });
      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        console.log("✅ Email verified and session activated");
        setSuccess("Email verified successfully!");
        return true;
      } else {
        setError("Verification incomplete. Please try again.");
        return false;
      }
    } catch (err: any) {
      console.error("❌ Verification failed:", JSON.stringify(err, null, 2));
      setError("Invalid verification code");
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
    isFormValid: !!email && !!password && !!confirmPassword && !error,
  };
};
