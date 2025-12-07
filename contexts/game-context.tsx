import { Card, generateCards } from "@/data/cards";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

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
  cards: Card[]; // Cards for the current game
}

interface GameContextType {
  gameState: GameState;
  isLoading: boolean;
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

const STORAGE_KEY = "@top_of_mind_game_state";

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
    cards: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadGameState = async () => {
      try {
        const storedState = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedState) {
          const parsedState = JSON.parse(storedState);
          setGameState(parsedState);
        }
      } catch {
        // Error loading game state
      } finally {
        setIsLoading(false);
      }
    };

    loadGameState();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const saveGameState = async () => {
        try {
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
        } catch {
          // Error saving game state
        }
      };

      saveGameState();
    }
  }, [gameState, isLoading]);

  const startGame = useCallback(async (numPlayers: number) => {
    const players: Player[] = Array.from({ length: numPlayers }, (_, i) => ({
      id: `player-${i + 1}`,
      name: `Player ${i + 1}`,
      score: 0,
    }));

    // Generate fresh cards for each new game
    const cards = generateCards();

    const newState = {
      players,
      currentCardIndex: 0,
      isCardFlipped: false,
      isGameActive: true,
      playersWithPointForCurrentCard: [],
      cards,
    };

    setGameState(newState);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
    } catch {
      // Error saving game state
    }
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
      currentCardIndex: (prev.currentCardIndex + 1) % prev.cards.length,
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

  const resetGame = useCallback(async () => {
    const resetState = {
      players: [],
      currentCardIndex: 0,
      isCardFlipped: false,
      isGameActive: false,
      playersWithPointForCurrentCard: [],
      cards: [],
    };
    setGameState(resetState);
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch {
      // Error clearing game state
    }
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
        isLoading,
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
