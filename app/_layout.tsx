import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ThemeProvider, useTheme } from "@/context/ThemeContext";
import "./globals.css";
import { StatusBar, View } from "react-native";
import { useEffect } from "react";

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
