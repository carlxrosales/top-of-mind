import { useGame } from "@/contexts/game-context";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Keyboard,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function PlayerNamesSetupScreen() {
  const router = useRouter();
  const { gameState, updatePlayerName } = useGame();
  const [playerNames, setPlayerNames] = useState<Record<string, string>>({});

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
      <ScrollView
        className='flex-1'
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: 42,
          paddingBottom: 42,
        }}
        showsVerticalScrollIndicator={false}
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
              <View key={player.id} style={{ gap: 6 }}>
                <Text className='text-white text-sm opacity-70'>
                  Player {index + 1}
                </Text>
                <TextInput
                  value={playerNames[player.id] || ""}
                  onChangeText={(text) => handleNameChange(player.id, text)}
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
              <Text className='text-black text-xl font-bold' numberOfLines={1}>
                Start Game
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleBack}
              className='bg-grey-light rounded-full px-12 py-4'
              activeOpacity={0.8}
            >
              <Text className='text-black text-lg font-bold' numberOfLines={1}>
                Back
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
