import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ThemeProvider, useTheme } from "@/context/ThemeContext"; // Ensure that useTheme is imported from the right context
import "./globals.css";
import { StatusBar } from "react-native";
import { useEffect } from "react";

const RootLayoutContent = () => {
  const { colorScheme } = useTheme(); // Use useTheme here since it is inside ThemeProvider

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
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </GestureHandlerRootView>
  );
};

export default function RootLayout() {
  return (
    <ThemeProvider>
      <RootLayoutContent />
    </ThemeProvider>
  );
}
