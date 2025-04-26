import { Stack } from "expo-router";
import {Gesture, GestureHandlerRootView} from 'react-native-gesture-handler';
import './globals.css';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <Stack
    screenOptions={{
      headerShown: false
    }}
  />
  </GestureHandlerRootView>
  );
}
