import { useGame } from "@/contexts/game-context";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function PlayerSelectionScreen() {
  const router = useRouter();
  const { startGame } = useGame();
  const [selectedPlayers, setSelectedPlayers] = useState(3);

  const handleStart = () => {
    startGame(selectedPlayers);
    router.push("/player-names-setup");
  };

  return (
    <View className='flex-1 bg-black justify-center items-center px-6'>
      <View style={{ maxWidth: 600, alignSelf: "center", width: "100%" }}>
        <Text className='text-white text-3xl font-bold mb-2 text-center'>
          How many players?
        </Text>
        <Text className='text-white text-sm mb-12 text-center opacity-70'>
          Minimum 3 players
        </Text>

        <View
          className='flex-row flex-wrap justify-center mb-12'
          style={{ gap: 12 }}
        >
          {[3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
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
              <Text
                className={`text-2xl font-bold ${
                  selectedPlayers === num ? "text-black" : "text-white"
                }`}
                numberOfLines={1}
              >
                {num}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View className='items-center'>
          <TouchableOpacity
            onPress={handleStart}
            className='bg-yellow rounded-full px-16 py-5 mb-4'
            activeOpacity={0.8}
          >
            <Text className='text-black text-xl font-bold' numberOfLines={1}>
              Next
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.back()}
            className='bg-grey-light rounded-full px-12 py-4'
            activeOpacity={0.8}
          >
            <Text className='text-black text-lg font-bold' numberOfLines={1}>
              Back
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
