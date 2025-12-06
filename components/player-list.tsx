import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Player } from "@/contexts/game-context";

interface PlayerListProps {
  players: Player[];
  onAddPoint: (playerId: string) => void;
  onSubtractPoint: (playerId: string) => void;
  onEditName: (player: Player) => void;
  hasPointForCurrentCard: (playerId: string) => boolean;
}

export const PlayerList: React.FC<PlayerListProps> = ({
  players,
  onAddPoint,
  onSubtractPoint,
  onEditName,
  hasPointForCurrentCard,
}) => {
  const cardWidth = "48%";

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled={true}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View className='flex-row flex-wrap' style={{ gap: 8 }}>
        {players.map((player) => {
          const hasPoint = hasPointForCurrentCard(player.id);

          return (
            <TouchableOpacity
              key={player.id}
              onPress={() => {
                if (hasPoint) {
                  onSubtractPoint(player.id);
                } else {
                  onAddPoint(player.id);
                }
              }}
              onLongPress={() => onEditName(player)}
              activeOpacity={0.7}
              className='rounded-2xl p-3 flex-row items-center justify-between'
              style={{
                width: cardWidth,
                gap: 6,
                backgroundColor: "rgb(22, 22, 22)",
              }}
            >
              <Text
                className='text-white text-base font-bold flex-1'
                numberOfLines={1}
                ellipsizeMode='tail'
              >
                {player.name}
              </Text>
              <View
                className={`rounded-2xl px-3 py-2 min-w-[40px] items-center ${
                  hasPoint ? "bg-yellow" : "bg-white"
                }`}
              >
                <Text className='text-black text-lg font-bold'>
                  {player.score}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
};
