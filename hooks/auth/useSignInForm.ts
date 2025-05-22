import { useSignIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useState } from "react";

export const useSignInForm = () => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<{ title: string; message: string } | null>(
    null
  );

  const handleSubmit = async () => {
    if (!isLoaded) return;
    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.replace("/");
      }
    } catch (err: any) {
      const errorData = JSON.parse(JSON.stringify(err, null));
      if (errorData.status === 422) {
        setError({
          title: "Account Not Found",
          message:
            "This email isn't registered. Would you like to create an account?",
        });
      } else {
        setError({
          title: "Sign In Failed",
          message:
            errorData.errors?.[0]?.message || "Invalid email or password",
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
    error,
    setError,
    handleSubmit,
    isFormValid: !!email && !!password,
  };
};
