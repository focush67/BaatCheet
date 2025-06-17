import { ThemeProvider, useTheme } from "@/context/ThemeContext";
import { toastConfig } from "@/utils/toastConfig";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import Constants from "expo-constants";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import Toast from "react-native-toast-message";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import "./globals.css";

const CLERK_KEY =
  process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY ||
  Constants?.expoConfig?.extra?.CLERK_PUBLISHABLE_KEY;

if (!CLERK_KEY) {
  throw new Error("Missing Clerk Publishable Key");
}

const RootLayoutContent = () => {
  const { colorScheme } = useTheme();

  useEffect(() => {
    StatusBar.setBarStyle(
      colorScheme === "dark" ? "light-content" : "dark-content"
    );
    StatusBar.setBackgroundColor("transparent");
    StatusBar.setTranslucent(true);
  }, [colorScheme]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            animation: "slide_from_right",
            contentStyle: {
              backgroundColor: colorScheme === "dark" ? "#000000" : "#FFFFFF",
            },
          }}
        />
      </PaperProvider>
    </GestureHandlerRootView>
  );
};

export default function RootLayout() {
  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={CLERK_KEY}
      appearance={{
        variables: {
          colorPrimary: "#3b82f6",
        },
      }}
    >
      <ThemeProvider>
        <RootLayoutContent />
        <Toast position="bottom" config={toastConfig} />
      </ThemeProvider>
    </ClerkProvider>
  );
}
