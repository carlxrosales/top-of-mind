import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useGame } from "@/contexts/game-context";

export const ResultsContent: React.FC = () => {
  const { gameState } = useGame();

  if (!gameState.players || gameState.players.length === 0) {
    return (
      <View className='items-center'>
        <Text className='text-white text-xl'>No game data available</Text>
      </View>
    );
  }

  const sortedPlayers = [...gameState.players].sort(
    (a, b) => b.score - a.score
  );
  const topScore = sortedPlayers[0]?.score ?? 0;
  const allScoresEqual = sortedPlayers.every((p) => p.score === topScore);
  const winners = allScoresEqual
    ? []
    : sortedPlayers.filter((p) => p.score === topScore);
  const isTie = winners.length > 1;

  return (
    <>
      <Text className='text-white text-4xl font-bold mb-2 text-center'>
        {allScoresEqual ? "No Winner" : isTie ? "It's a Tie!" : "Winner!"}
      </Text>
      {!allScoresEqual && (
        <>
          {isTie ? (
            <View className='mb-8'>
              {winners.map((winner, index) => (
                <Text
                  key={winner.id}
                  className='text-yellow text-3xl font-bold text-center'
                  style={{ marginBottom: index < winners.length - 1 ? 4 : 0 }}
                >
                  {winner.name}
                </Text>
              ))}
            </View>
          ) : (
            winners[0] && (
              <Text className='text-yellow text-3xl font-bold mb-8 text-center'>
                {winners[0].name}
              </Text>
            )
          )}
        </>
      )}

      <View className='w-full max-w-md mb-8'>
        <Text className='text-white text-xl font-bold mb-4 text-center'>
          Final Scores
        </Text>
        {sortedPlayers.map((player, index) => {
          const isWinner = winners.some((w) => w.id === player.id);

          return (
            <View
              key={player.id}
              className={`flex-row items-center justify-between p-4 rounded-2xl mb-3 ${
                isWinner ? "bg-yellow" : "bg-grey-light"
              }`}
            >
              <View className='flex-row items-center flex-1'>
                <View
                  className={`w-8 h-8 rounded-full items-center justify-center mr-3 ${
                    isWinner ? "bg-black" : "bg-grey-medium"
                  }`}
                >
                  <Text
                    className={`text-sm font-bold ${
                      isWinner ? "text-yellow" : "text-white"
                    }`}
                  >
                    {index + 1}
                  </Text>
                </View>
                <Text
                  className={`text-lg font-bold ${
                    isWinner ? "text-black" : "text-black"
                  }`}
                >
                  {player.name}
                </Text>
              </View>
              <View
                className={`px-4 py-2 rounded-full ${
                  isWinner ? "bg-black" : "bg-grey-dark"
                }`}
              >
                <Text
                  className={`text-lg font-bold ${
                    isWinner ? "text-yellow" : "text-white"
                  }`}
                >
                  {player.score}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </>
  );
};
