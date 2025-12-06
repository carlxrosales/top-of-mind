import { ResultsContent } from "@/components/results-content";
import { useGame } from "@/contexts/game-context";
import { Image } from "expo-image";
import * as MediaLibrary from "expo-media-library";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Platform,
  SafeAreaView,
  ScrollView,
  Share,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ViewShot from "react-native-view-shot";

const isWeb = Platform.OS === "web";

export default function ResultsScreen() {
  const router = useRouter();
  const { gameState, resetGame } = useGame();
  const [isSharing, setIsSharing] = useState(false);
  const viewShotRef = useRef<ViewShot>(null);

  const handleShare = async () => {
    if (isWeb) {
      // Share functionality not available on web
      return;
    }

    try {
      if (!viewShotRef.current || !viewShotRef.current.capture) return;

      setIsSharing(true);

      const uri = await viewShotRef.current.capture();

      if (!uri) {
        setIsSharing(false);
        return;
      }

      if (Platform.OS === "android") {
        const { status } = await MediaLibrary.requestPermissionsAsync(true, [
          "photo",
        ]);
        if (status !== "granted") {
          setIsSharing(false);
          return;
        }
        await MediaLibrary.saveToLibraryAsync(uri);
      } else {
        const result = await Share.share({ url: uri });
      }
    } catch (error) {
      console.error("Share error:", error);
    } finally {
      setIsSharing(false);
    }
  };

  const handleNewGame = () => {
    resetGame();
    router.push("/");
  };

  if (!gameState.players || gameState.players.length === 0) {
    return (
      <SafeAreaView className='flex-1 bg-black justify-center items-center'>
        <Text className='text-white text-xl mb-4'>No game data available</Text>
        <TouchableOpacity
          onPress={() => router.push("/")}
          className='bg-yellow rounded-full px-12 py-4'
          activeOpacity={0.8}
        >
          <Text className='text-black text-lg font-bold' numberOfLines={1}>
            Home
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const shareableContent = (
    <ScrollView
      className='flex-1 bg-black'
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View className='flex-1 justify-center items-center px-6 py-12 bg-black'>
        <View className='bg-grey-dark rounded-full w-24 h-24 items-center justify-center mb-6 overflow-hidden'>
          <Image
            source={require("@/assets/images/icon.png")}
            style={{ width: 62, height: 62 }}
            contentFit='contain'
          />
        </View>
        <ResultsContent />
      </View>
    </ScrollView>
  );

  return (
    <SafeAreaView className='flex-1 bg-black'>
      {isWeb ? (
        <>
          {shareableContent}
          <View className='items-center pt-2 pb-6'>
            <TouchableOpacity
              onPress={handleNewGame}
              className='bg-yellow rounded-full px-16 py-5 mb-4'
              activeOpacity={0.8}
            >
              <Text className='text-black text-xl font-bold' numberOfLines={1}>
                New Game
              </Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <ViewShot
            ref={viewShotRef}
            options={{ format: "png", quality: 1 }}
            style={{ flex: 1, backgroundColor: "#000000" }}
          >
            {shareableContent}
          </ViewShot>
          <View className='items-center pt-2 pb-6'>
            <TouchableOpacity
              onPress={handleNewGame}
              className='bg-yellow rounded-full px-16 py-5 mb-4'
              activeOpacity={0.8}
            >
              <Text className='text-black text-xl font-bold' numberOfLines={1}>
                New Game
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleShare}
              className='bg-grey-light rounded-full px-12 py-4'
              activeOpacity={0.8}
              disabled={isSharing}
            >
              <Text className='text-black text-lg font-bold' numberOfLines={1}>
                {Platform.OS === "android" ? "Save" : "Share"}
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}
