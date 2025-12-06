import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  interpolate,
} from "react-native-reanimated";
import { Card as CardType } from "@/data/cards";

interface CardProps {
  card: CardType;
  isFlipped: boolean;
  onFlip: () => void;
  cardKey?: number;
}

export const GameCard: React.FC<CardProps> = ({
  card,
  isFlipped,
  onFlip,
  cardKey,
}) => {
  const { width, height } = useWindowDimensions();
  const MAX_CARD_WIDTH = 400;
  const MAX_CARD_HEIGHT = 533;

  const calculatedWidth = width * 0.8;
  const calculatedHeight = calculatedWidth * (4 / 3);

  const cardWidth = Math.min(calculatedWidth, MAX_CARD_WIDTH);
  const cardHeight = Math.min(calculatedHeight, MAX_CARD_HEIGHT);

  const flipRotation = useSharedValue(0);
  const cardTranslateX = useSharedValue(0);
  const cardScale = useSharedValue(1);
  const cardOpacity = useSharedValue(1);
  const previousCardKey = React.useRef<number | undefined>(undefined);

  React.useEffect(() => {
    flipRotation.value = withTiming(isFlipped ? 180 : 0, { duration: 600 });
  }, [isFlipped]);

  React.useEffect(() => {
    if (
      cardKey !== undefined &&
      cardKey !== previousCardKey.current &&
      previousCardKey.current !== undefined
    ) {
      // New card animation: start from right side of screen (off-screen)
      const startX = width + cardWidth;
      cardTranslateX.value = startX;
      cardScale.value = 0.95;
      cardOpacity.value = 0.5;

      // Animate: slide in from right to position to the right of current card, then settle into final position
      cardTranslateX.value = withSequence(
        withTiming(cardWidth * 0.15, { duration: 400 }),
        withTiming(0, { duration: 300 })
      );
      cardScale.value = withSequence(
        withTiming(1.08, { duration: 400 }),
        withTiming(1, { duration: 300 })
      );
      cardOpacity.value = withSequence(
        withTiming(1, { duration: 400 }),
        withTiming(1, { duration: 300 })
      );
    } else if (cardKey !== undefined && previousCardKey.current === undefined) {
      // Initial card - no animation
      cardTranslateX.value = 0;
      cardScale.value = 1;
      cardOpacity.value = 1;
    }

    previousCardKey.current = cardKey;
  }, [cardKey, width, cardWidth]);

  const frontAnimatedStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(flipRotation.value, [0, 180], [0, 180]);
    return {
      transform: [{ rotateY: `${rotateY}deg` }],
      opacity: flipRotation.value < 90 ? 1 : 0,
    };
  });

  const backAnimatedStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(flipRotation.value, [0, 180], [180, 360]);
    return {
      transform: [{ rotateY: `${rotateY}deg` }],
      opacity: flipRotation.value > 90 ? 1 : 0,
    };
  });

  const containerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: cardTranslateX.value },
        { scale: cardScale.value },
      ],
      opacity: cardOpacity.value,
      zIndex: cardTranslateX.value > 0 ? 10 : 1,
    };
  });

  const renderCardSide = (categories: string[], isBack: boolean) => (
    <View className='w-full h-full bg-white rounded-xl p-5 justify-center items-center'>
      <View className='flex-1 justify-center items-center'>
        {categories.map((category, index) => (
          <Text
            key={index}
            className={`text-black text-lg font-semibold text-center ${
              index > 0 ? "mt-6" : ""
            }`}
            style={{ lineHeight: 28 }}
          >
            {category}
          </Text>
        ))}
      </View>
      {isBack && (
        <View className='absolute bottom-3 right-3'>
          <View className='bg-black rounded-full w-4 h-4 items-center justify-center'></View>
        </View>
      )}
    </View>
  );

  return (
    <View
      style={{
        width: cardWidth,
        height: cardHeight,
        overflow: "visible",
      }}
    >
      <Animated.View
        style={[
          {
            width: "100%",
            height: "100%",
          },
          containerAnimatedStyle,
          {
            shadowColor: "#fff",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 12,
            elevation: 12,
          },
        ]}
      >
        <TouchableOpacity
          onPress={onFlip}
          activeOpacity={0.95}
          className='w-full h-full'
        >
          <Animated.View
            style={[
              {
                position: "absolute",
                width: "100%",
                height: "100%",
                top: 0,
                left: 0,
                backfaceVisibility: "hidden",
              },
              frontAnimatedStyle,
            ]}
          >
            {renderCardSide(card.front, false)}
          </Animated.View>
          <Animated.View
            style={[
              {
                position: "absolute",
                width: "100%",
                height: "100%",
                top: 0,
                left: 0,
                backfaceVisibility: "hidden",
              },
              backAnimatedStyle,
            ]}
          >
            {renderCardSide(card.back, true)}
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};
