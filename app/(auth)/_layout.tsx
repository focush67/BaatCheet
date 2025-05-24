import { useTheme } from "@/context/ThemeContext";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function AuthRoutesLayout() {
  const { isSignedIn } = useAuth();
  const { user, isLoaded } = useUser();
  const { colorScheme } = useTheme();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      try {
        if (user) {
          await user.reload();
        }
        setIsReady(true);
      } catch (error) {
        console.error(error);
        setIsReady(true);
      }
    };
    prepare();
  }, [user]);

  if (!isLoaded || !isReady) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
      <StatusBar
        style={colorScheme === "dark" ? "light" : "dark"}
        backgroundColor="transparent"
        translucent
      />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
          contentStyle: {
            backgroundColor: colorScheme === "dark" ? "#000000" : "#FFFFFF",
          },
          gestureEnabled: true,
          gestureDirection: "horizontal",
        }}
      >
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
        <Stack.Screen name="setup" />
      </Stack>
    </>
  );
}
