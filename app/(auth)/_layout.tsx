import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function AuthRoutesLayout() {
  const { isSignedIn } = useAuth();
  const { colorScheme } = useTheme();

  if (isSignedIn) {
    return <Redirect href={"/(tabs)/home"} />;
  }

  return (
    <>
      <StatusBar
        style={colorScheme === "dark" ? "light" : "dark"}
        backgroundColor={colorScheme === "dark" ? "#000000" : "#ffffff"}
      />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
          contentStyle: {
            backgroundColor: colorScheme === "dark" ? "#000000" : "#ffffff",
          },
          // Additional screen transition customization
          gestureEnabled: true,
          gestureDirection: "horizontal",
          animationTypeForReplace: "push",
        }}
      >
        <Stack.Screen
          name="sign-in"
          options={{
            animation: "fade",
            statusBarAnimation: "fade",
          }}
        />
        <Stack.Screen
          name="sign-up"
          options={{
            animation: "slide_from_bottom",
            statusBarAnimation: "slide",
          }}
        />
        {/* Add more screens with custom animations if needed */}
      </Stack>
    </>
  );
}
