import React, { createContext, useContext, useState, useCallback } from "react";

export interface Player {
  id: string;
  name: string;
  score: number;
}

export interface GameState {
  players: Player[];
  currentCardIndex: number;
  isCardFlipped: boolean;
  isGameActive: boolean;
  playersWithPointForCurrentCard: string[]; // Track which players have added a point for the current card
}

interface GameContextType {
  gameState: GameState;
  startGame: (numPlayers: number) => void;
  endGame: () => void;
  flipCard: () => void;
  drawNewCard: () => void;
  addPoint: (playerId: string) => void;
  subtractPoint: (playerId: string) => void;
  updatePlayerName: (playerId: string, name: string) => void;
  resetGame: () => void;
  hasPointForCurrentCard: (playerId: string) => boolean;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [gameState, setGameState] = useState<GameState>({
    players: [],
    currentCardIndex: 0,
    isCardFlipped: false,
    isGameActive: false,
    playersWithPointForCurrentCard: [],
  });

  const startGame = useCallback((numPlayers: number) => {
    const players: Player[] = Array.from({ length: numPlayers }, (_, i) => ({
      id: `player-${i + 1}`,
      name: `Player ${i + 1}`,
      score: 0,
    }));

    setGameState({
      players,
      currentCardIndex: 0,
      isCardFlipped: false,
      isGameActive: true,
      playersWithPointForCurrentCard: [],
    });
  }, []);

  const endGame = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      isGameActive: false,
    }));
  }, []);

  const flipCard = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      isCardFlipped: !prev.isCardFlipped,
    }));
  }, []);

  const drawNewCard = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      currentCardIndex: (prev.currentCardIndex + 1) % 110,
      isCardFlipped: false,
      playersWithPointForCurrentCard: [], // Reset tracking for new card
    }));
  }, []);

  const addPoint = useCallback((playerId: string) => {
    setGameState((prev) => {
      // Only allow adding if player hasn't added a point for this card yet
      if (prev.playersWithPointForCurrentCard.includes(playerId)) {
        return prev;
      }

      return {
        ...prev,
        players: prev.players.map((player) =>
          player.id === playerId
            ? { ...player, score: player.score + 1 }
            : player
        ),
        playersWithPointForCurrentCard: [
          ...prev.playersWithPointForCurrentCard,
          playerId,
        ],
      };
    });
  }, []);

  const subtractPoint = useCallback((playerId: string) => {
    setGameState((prev) => {
      // Only allow subtracting if player has added a point for this card
      if (!prev.playersWithPointForCurrentCard.includes(playerId)) {
        return prev;
      }

      return {
        ...prev,
        players: prev.players.map((player) =>
          player.id === playerId
            ? { ...player, score: Math.max(0, player.score - 1) }
            : player
        ),
        playersWithPointForCurrentCard:
          prev.playersWithPointForCurrentCard.filter((id) => id !== playerId),
      };
    });
  }, []);

  const updatePlayerName = useCallback((playerId: string, name: string) => {
    setGameState((prev) => ({
      ...prev,
      players: prev.players.map((player) =>
        player.id === playerId
          ? { ...player, name: name.trim() || player.name }
          : player
      ),
    }));
  }, []);

  const resetGame = useCallback(() => {
    setGameState({
      players: [],
      currentCardIndex: 0,
      isCardFlipped: false,
      isGameActive: false,
      playersWithPointForCurrentCard: [],
    });
  }, []);

  const hasPointForCurrentCard = useCallback(
    (playerId: string) => {
      return gameState.playersWithPointForCurrentCard.includes(playerId);
    },
    [gameState.playersWithPointForCurrentCard]
  );

  return (
    <GameContext.Provider
      value={{
        gameState,
        startGame,
        endGame,
        flipCard,
        drawNewCard,
        addPoint,
        subtractPoint,
        updatePlayerName,
        resetGame,
        hasPointForCurrentCard,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
