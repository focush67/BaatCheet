import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { useTheme } from "@/context/ThemeContext";

export default function TabsLayout() {
  const { colorScheme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarButton: (props) => (
          <Pressable {...props} android_ripple={null} style={props.style} />
        ),
        tabBarStyle: {
          backgroundColor: colorScheme === "light" ? "#fff" : "#000",
          borderWidth: 0,
          height: 60,
          paddingBottom: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "bold",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="home-outline"
              size={size}
              color={
                colorScheme === "light"
                  ? color === "#000"
                    ? "#000"
                    : "#7f7f7f"
                  : "#fff"
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="search-outline"
              size={size}
              color={
                colorScheme === "light"
                  ? color === "#000"
                    ? "#000"
                    : "#7f7f7f"
                  : "#fff"
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: "Add",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="add-circle-outline"
              size={size}
              color={
                colorScheme === "light"
                  ? color === "#000"
                    ? "#000"
                    : "#7f7f7f"
                  : "#fff"
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="reels"
        options={{
          title: "Reels",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="videocam-outline"
              size={size}
              color={
                colorScheme === "light"
                  ? color === "#000"
                    ? "#000"
                    : "#7f7f7f"
                  : "#fff"
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="person-outline"
              size={size}
              color={
                colorScheme === "light"
                  ? color === "#000"
                    ? "#000"
                    : "#7f7f7f"
                  : "#fff"
              }
            />
          ),
        }}
      />
    </Tabs>
  );
}
