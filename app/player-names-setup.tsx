import { useGame } from "@/contexts/game-context";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function PlayerNamesSetupScreen() {
  const router = useRouter();
  const { gameState, isLoading, updatePlayerName } = useGame();
  const [playerNames, setPlayerNames] = useState<Record<string, string>>({});
  const scrollViewRef = useRef<ScrollView>(null);
  const inputRefs = useRef<Record<string, TextInput | null>>({});
  const inputPositions = useRef<Record<string, number>>({});

  useEffect(() => {
    // Initialize player names from game state
    const names: Record<string, string> = {};
    gameState.players.forEach((player) => {
      names[player.id] = player.name;
    });
    setPlayerNames(names);
  }, [gameState.players]);

  const handleNameChange = (playerId: string, text: string) => {
    const textWithoutNewlines = text.replace(/\n/g, "");
    if (textWithoutNewlines !== text) {
      Keyboard.dismiss();
    }
    setPlayerNames((prev) => ({
      ...prev,
      [playerId]: textWithoutNewlines,
    }));
  };

  const handleInputFocus = (playerId: string) => {
    const position = inputPositions.current[playerId];
    if (position !== undefined && scrollViewRef.current) {
      setTimeout(() => {
        scrollViewRef.current?.scrollTo({
          y: position - 100,
          animated: true,
        });
      }, 100);
    }
  };

  const handleInputLayout = (playerId: string, event: any) => {
    const { y } = event.nativeEvent.layout;
    inputPositions.current[playerId] = y;
  };

  const handleStart = () => {
    // Update all player names
    Object.entries(playerNames).forEach(([playerId, name]) => {
      if (name.trim()) {
        updatePlayerName(playerId, name.trim());
      }
    });
    router.push("/game");
  };

  const handleBack = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <SafeAreaView className='flex-1 bg-black justify-center items-center'>
        <ActivityIndicator size='large' color='#FFD700' />
        <Text className='text-white text-xl mb-4 mt-4'>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (!gameState.players || gameState.players.length === 0) {
    return (
      <SafeAreaView className='flex-1 bg-black justify-center items-center'>
        <Text className='text-white text-xl mb-4'>No players found</Text>
        <TouchableOpacity
          onPress={() => router.push("/player-selection")}
          className='bg-yellow rounded-full px-12 py-4'
          activeOpacity={0.8}
        >
          <Text className='text-black text-lg font-bold' numberOfLines={1}>
            Back
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className='flex-1 bg-black'>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView
          ref={scrollViewRef}
          className='flex-1'
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingTop: 42,
            paddingBottom: 42,
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps='handled'
        >
          <View style={{ maxWidth: 600, alignSelf: "center", width: "100%" }}>
            <Text className='text-white text-3xl font-bold mb-2 text-center'>
              Who's playing?
            </Text>
            <Text className='text-white text-sm mb-8 text-center opacity-70'>
              Enter player names
            </Text>

            <View style={{ gap: 12, marginBottom: 24 }}>
              {gameState.players.map((player, index) => (
                <View
                  key={player.id}
                  style={{ gap: 6 }}
                  onLayout={(event) => handleInputLayout(player.id, event)}
                >
                  <Text className='text-white text-sm opacity-70'>
                    Player {index + 1}
                  </Text>
                  <TextInput
                    ref={(ref) => {
                      inputRefs.current[player.id] = ref;
                    }}
                    value={playerNames[player.id] || ""}
                    onChangeText={(text) => handleNameChange(player.id, text)}
                    onFocus={() => handleInputFocus(player.id)}
                    placeholder={`Player ${index + 1}`}
                    placeholderTextColor='rgba(255, 255, 255, 0.5)'
                    className='bg-grey-light rounded-2xl px-4 py-4 text-black text-base font-bold'
                    autoCapitalize='words'
                    returnKeyType='next'
                    numberOfLines={1}
                    multiline
                    textAlignVertical='top'
                    autoComplete='off'
                    autoCorrect={false}
                  />
                </View>
              ))}
            </View>

            <View className='items-center'>
              <TouchableOpacity
                onPress={handleStart}
                className='bg-yellow rounded-full px-16 py-5 mb-4'
                activeOpacity={0.8}
              >
                <Text
                  className='text-black text-xl font-bold'
                  numberOfLines={1}
                >
                  Start
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleBack}
                className='bg-grey-light rounded-full px-12 py-4'
                activeOpacity={0.8}
              >
                <Text
                  className='text-black text-lg font-bold'
                  numberOfLines={1}
                >
                  Back
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
