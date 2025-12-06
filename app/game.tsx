import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { useGame } from "@/contexts/game-context";
import { GameCard } from "@/components/card";
import { PlayerList } from "@/components/player-list";
import { ConfirmationModal } from "@/components/confirmation-modal";
import { PlayerNameModal } from "@/components/player-name-modal";
import { Player } from "@/contexts/game-context";
import { CARDS } from "@/data/cards";

export default function GameScreen() {
  const router = useRouter();
  const {
    gameState,
    flipCard,
    drawNewCard,
    addPoint,
    subtractPoint,
    updatePlayerName,
    endGame,
    resetGame,
    hasPointForCurrentCard,
  } = useGame();
  const [showEndGameModal, setShowEndGameModal] = useState(false);
  const [showNameModal, setShowNameModal] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  const currentCard = CARDS[gameState.currentCardIndex];

  const handleEndGame = () => {
    setShowEndGameModal(true);
  };

  const confirmEndGame = () => {
    endGame();
    setShowEndGameModal(false);
    router.push("/results");
  };

  const cancelEndGame = () => {
    setShowEndGameModal(false);
  };

  const handleEditName = (player: Player) => {
    setSelectedPlayer(player);
    setShowNameModal(true);
  };

  const handleSaveName = (playerId: string, name: string) => {
    updatePlayerName(playerId, name);
    setShowNameModal(false);
    setSelectedPlayer(null);
  };

  const handleCloseNameModal = () => {
    setShowNameModal(false);
    setSelectedPlayer(null);
  };

  if (!gameState.isGameActive || !currentCard) {
    return null;
  }

  return (
    <SafeAreaView className='flex-1 bg-black'>
      <View className='flex-1'>
        <View className='flex-row justify-between items-center px-4 py-3 bg-grey-dark/10'>
          <TouchableOpacity
            onPress={handleEndGame}
            className='rounded-full px-4 py-2.5'
            style={{ backgroundColor: "rgb(220, 38, 38)" }}
            activeOpacity={0.7}
          >
            <Text className='text-white text-sm font-bold'>End</Text>
          </TouchableOpacity>
          <Text className='text-white text-sm font-bold'>
            {gameState.currentCardIndex + 1} / 110
          </Text>
          <View className='w-16' />
        </View>

        <ScrollView
          className='flex-1'
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 16,
            paddingVertical: 16,
          }}
          showsVerticalScrollIndicator={false}
        >
          <GameCard
            card={currentCard}
            isFlipped={gameState.isCardFlipped}
            onFlip={flipCard}
            cardKey={gameState.currentCardIndex}
          />
        </ScrollView>

        <View className='px-4 py-3 bg-grey-dark/10'>
          <Text className='text-white text-sm font-bold mb-2 text-center opacity-70'>
            Players ({gameState.players.length})
          </Text>
          <View style={{ maxHeight: 220 }}>
            <PlayerList
              players={gameState.players}
              onAddPoint={addPoint}
              onSubtractPoint={subtractPoint}
              onEditName={handleEditName}
              hasPointForCurrentCard={hasPointForCurrentCard}
            />
          </View>
        </View>

        <View
          className='flex-row justify-center px-4 py-3 bg-grey-dark/10'
          style={{ gap: 12 }}
        >
          <TouchableOpacity
            onPress={flipCard}
            className='flex-1 bg-grey-light rounded-full py-4 items-center'
            activeOpacity={0.8}
          >
            <Text className='text-black text-base font-bold'>Flip</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={drawNewCard}
            className='flex-1 bg-yellow rounded-full py-4 items-center'
            activeOpacity={0.8}
          >
            <Text className='text-black text-base font-bold'>New Card</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ConfirmationModal
        visible={showEndGameModal}
        title='End Game?'
        message="Are you sure you want to end the game? You'll be taken to the results screen."
        onConfirm={confirmEndGame}
        onCancel={cancelEndGame}
      />

      <PlayerNameModal
        visible={showNameModal}
        player={selectedPlayer}
        onSave={handleSaveName}
        onClose={handleCloseNameModal}
      />
    </SafeAreaView>
  );
}
