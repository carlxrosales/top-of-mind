import { GameProvider } from "@/contexts/game-context";
import { ToastProvider } from "@/contexts/toast-context";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "../global.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    const hideSplashScreen = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      await SplashScreen.hideAsync();
    };

    hideSplashScreen();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style='light' />
      <GameProvider>
        <ToastProvider>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name='index' />
            <Stack.Screen name='tutorial' />
            <Stack.Screen name='player-selection' />
            <Stack.Screen name='player-names-setup' />
            <Stack.Screen name='game' />
            <Stack.Screen name='results' />
            <Stack.Screen name='help' />
            <Stack.Screen name='privacy-policy' />
            <Stack.Screen name='terms-of-use' />
          </Stack>
        </ToastProvider>
      </GameProvider>
    </GestureHandlerRootView>
  );
}
