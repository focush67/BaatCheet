import { parseClerkError } from "@/utils/clerk";
import { useSignUp } from "@clerk/clerk-expo";
import { useCallback, useEffect, useRef, useState, useMemo } from "react";
import Toast from "react-native-toast-message";

export const useSignUpForm = () => {
  const showToast = (type: string, title: string, message: string) => {
    Toast.show({
      type: type,
      text1: title,
      text2: message,
    });
  };

  const { isLoaded, signUp, setActive } = useSignUp();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [code, setCode] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState<Error | null>(null);

  const mountedRef = useRef<boolean>(true);
  const submittingRef = useRef<boolean>(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  });

  const validatePassword = useCallback((): boolean => {
    if (password !== confirmPassword) {
      showToast("error", "Password Mismatch", "Passwords do not match.");
      return false;
    }
    if (password.length < 8) {
      showToast(
        "error",
        "Weak Password",
        "Password must be at least 8 characters."
      );
      return false;
    }
    return true;
  }, [password, confirmPassword]);

  const handleSignUp = useCallback(async () => {
    if (!isLoaded) return;
    if (!isLoading || submittingRef.current) return;
    if (!validatePassword()) return;

    submittingRef.current = true;
    setIsLoading(true);
    setSuccess("");
    setError(null);

    try {
      await signUp.create({ emailAddress: email, password });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      if (!mountedRef.current) return;

      setPendingVerification(true);
      setSuccess("Account created. Verification code sent to your email.");
      showToast(
        "success",
        "Account Created",
        "Check your email for the verification code."
      );
    } catch (err: any) {
      const parsed = parseClerkError(err);
      console.error("❌ Sign Up Error:", parsed);
      setError(err instanceof Error ? err : new Error("Sign up failed"));

      const firstError = parsed.errors?.[0];
      const title =
        firstError?.code === "form_email_address_exists"
          ? "Email Already Registered"
          : "Sign Up Failed";
      const message =
        firstError?.longMessage ??
        firstError?.message ??
        "Failed to create account. Please try again.";

      showToast("error", title, message);
    } finally {
      submittingRef.current = false;
      if (mountedRef.current) setIsLoading(false);
    }
  }, [isLoaded, isLoading, signUp, email, password, validatePassword]);

  const handleVerify = useCallback(async (): Promise<boolean> => {
    if (!isLoaded) return false;
    if (isLoading || submittingRef.current) return false;

    submittingRef.current = true;
    setIsLoading(true);
    setSuccess("");
    setError(null);

    try {
      const result = await signUp.attemptEmailAddressVerification({ code });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        if (!mountedRef.current) return false;
        setSuccess("Email verified successfully!");
        showToast("success", "Email Verified", "Welcome aboard!");
        return true;
      }

      return false;
    } catch (err: any) {
      const parsed = parseClerkError(err);
      console.error("❌ Verification Error:", parsed);
      setError(err instanceof Error ? err : new Error("Verification failed"));

      const firstError = parsed.errors?.[0];
      showToast(
        "error",
        "Verification Failed",
        firstError?.longMessage ?? firstError?.message ?? "Invalid code."
      );
      return false;
    } finally {
      submittingRef.current = false;
      if (mountedRef.current) setIsLoading(false);
    }
  }, [isLoaded, isLoading, signUp, code, setActive]);

  const isFormValid = useMemo(
    () => !!email && !!password && !!confirmPassword,
    [email, password, confirmPassword]
  );

  const reset = useCallback(() => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setCode("");
    setPendingVerification(false);
    setIsLoading(false);
    setSuccess("");
    setError(null);
  }, []);

  return useMemo(
    () => ({
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
      error,
      handleSignUp,
      handleVerify,
      reset,
      isFormValid,
    }),
    [
      email,
      password,
      confirmPassword,
      code,
      pendingVerification,
      isLoading,
      success,
      error,
      handleSignUp,
      handleVerify,
      reset,
      isFormValid,
    ]
  );
};
