import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { GameProvider } from "@/contexts/game-context";
import { ToastProvider } from "@/contexts/toast-context";
import "../global.css";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
          </Stack>
        </ToastProvider>
      </GameProvider>
    </GestureHandlerRootView>
  );
}
