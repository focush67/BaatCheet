import { ThemeProvider, useTheme } from "@/context/ThemeContext";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import Constants from "expo-constants";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { StatusBar, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
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
    if (colorScheme === "light") {
      StatusBar.setBarStyle("dark-content");
      StatusBar.setBackgroundColor("white");
    } else {
      StatusBar.setBarStyle("light-content");
      StatusBar.setBackgroundColor("black");
    }
  }, [colorScheme]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider>
        <View
          style={{
            flex: 1,
            backgroundColor: colorScheme === "dark" ? "#000" : "#fff",
          }}
        >
          <Stack
            screenOptions={{
              headerShown: false,
              animation: "slide_from_right",
              contentStyle: {
                backgroundColor: colorScheme === "dark" ? "#000" : "#fff",
              },
            }}
          />
        </View>
      </PaperProvider>
    </GestureHandlerRootView>
  );
};

export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={CLERK_KEY}>
      <ThemeProvider>
        <RootLayoutContent />
      </ThemeProvider>
    </ClerkProvider>
  );
}
