import { ThemeProvider, useTheme } from "@/context/ThemeContext";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { StatusBar, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import "./globals.css";

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
    <ThemeProvider>
      <RootLayoutContent />
    </ThemeProvider>
  );
}
