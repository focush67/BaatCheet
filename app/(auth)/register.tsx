import Register from "@/components/auth/Register";
import Pending from "@/components/auth/Pending";
import { useTheme } from "@/context/ThemeContext";
import { useSignUpForm } from "@/hooks/auth/useSignUpForm";

export default function SignUpScreen() {
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
    handleSignUp,
    handleVerify,
    isFormValid,
  } = useSignUpForm();

  const isLight = colorScheme === "light";
  const handleResendCode = async () => {};

  if (pendingVerification) {
    return (
      <Pending
        isLight={isLight}
        email={email}
        code={code}
        setCode={setCode}
        isLoading={isLoading}
        handleVerify={handleVerify}
        handleResendCode={handleResendCode}
        setPendingVerification={setPendingVerification}
      />
    );
  } else {
    return (
      <Register
        isLight={isLight}
        email={email}
        isFormValid={isFormValid}
        handleSignUp={handleSignUp}
        isLoading={isLoading}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
      />
    );
  }
}
