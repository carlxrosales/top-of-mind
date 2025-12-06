import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useGame } from "@/contexts/game-context";

export default function PlayerSelectionScreen() {
  const router = useRouter();
  const { startGame } = useGame();
  const [selectedPlayers, setSelectedPlayers] = useState(3);

  const handleStart = () => {
    startGame(selectedPlayers);
    router.push("/player-names-setup");
  };

  return (
    <View className="flex-1 bg-black justify-center items-center px-6">
      <Text className="text-white text-3xl font-bold mb-2 text-center">
        How many players?
      </Text>
      <Text className="text-white text-sm mb-12 text-center opacity-70">
        Minimum 3 players
      </Text>

      <View className="flex-row flex-wrap justify-center mb-12" style={{ gap: 12 }}>
        {[3, 4, 5, 6, 7, 8].map((num) => (
          <TouchableOpacity
            key={num}
            onPress={() => setSelectedPlayers(num)}
            activeOpacity={0.7}
            className={`w-16 h-16 rounded-full border-2 items-center justify-center ${
              selectedPlayers === num
                ? "bg-white border-white"
                : "bg-black border-white"
            }`}
          >
            <Text className={`text-2xl font-bold ${
              selectedPlayers === num ? "text-black" : "text-white"
            }`}>
              {num}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        onPress={handleStart}
        className="bg-yellow rounded-full px-16 py-5 mb-4"
        activeOpacity={0.8}
      >
        <Text className="text-black text-xl font-bold">Start</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.back()}
        className="bg-grey-light rounded-full px-12 py-4"
        activeOpacity={0.8}
      >
        <Text className="text-black text-lg font-bold">Back</Text>
      </TouchableOpacity>
    </View>
  );
}

