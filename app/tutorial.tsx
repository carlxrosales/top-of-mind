import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type TabType = "classic" | "advanced";

export default function TutorialScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("classic");
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  }, [activeTab]);

  const renderClassicContent = () => (
    <View style={{ gap: 24 }}>
      <View style={{ gap: 8 }}>
        <Text className='text-yellow text-xl font-bold'>Overview</Text>
        <Text className='text-white text-base leading-6'>
          In Classic mode, the player holding the phone (current turn) reads the
          category and gives their answer. Everyone else tries to match that
          answer. Only players whose answers match the current turn player's
          answer get one point each.
        </Text>
      </View>

      <View style={{ gap: 8 }}>
        <Text className='text-yellow text-xl font-bold'>1. Set Up</Text>
        <Text className='text-white text-base leading-6'>
          Choose the number of players (minimum 3). You can customize player
          names or use the defaults.
        </Text>
      </View>

      <View style={{ gap: 8 }}>
        <Text className='text-yellow text-xl font-bold'>2. The Card</Text>
        <Text className='text-white text-base leading-6'>
          Each card has 4 categories on each side. The player holding the phone
          chooses which category to use. Tap the card to flip it and see the
          other side. You can draw a new card anytime.
        </Text>
      </View>

      <View style={{ gap: 8 }}>
        <Text className='text-yellow text-xl font-bold'>3. Answering</Text>
        <Text className='text-white text-base leading-6'>
          The player holding the phone (current turn) reads the category and
          gives their answer first. Then everyone else gives their answer,
          trying to match what the current turn player said.
        </Text>
      </View>

      <View style={{ gap: 8 }}>
        <Text className='text-yellow text-xl font-bold'>4. Scoring</Text>
        <Text className='text-white text-base leading-6'>
          Only players whose answers match the current turn player's answer get
          one point each. Tap a player's card to give them a point if their
          answer matched. Each player gets exactly one point per card if they
          matched.
        </Text>
      </View>

      <View style={{ gap: 8 }}>
        <Text className='text-yellow text-xl font-bold'>5. Winning</Text>
        <Text className='text-white text-base leading-6'>
          The player with the most points at the end wins! You can end the game
          anytime to see the results.
        </Text>
      </View>

      <View style={{ gap: 8 }}>
        <Text className='text-yellow text-xl font-bold'>Tips</Text>
        <Text className='text-white text-base leading-6'>
          • The current turn player's answer is what everyone tries to match
          {"\n"}• Only players matching the current turn player get one point
          {"\n"}• Long press a player's name to edit it during the game{"\n"}•
          Tap a player's card to toggle their point for the current card{"\n"}•
          Pass the phone to the next player after each round so everyone gets a
          turn
        </Text>
      </View>
    </View>
  );

  const renderAdvancedContent = () => (
    <View style={{ gap: 24 }}>
      <View style={{ gap: 8 }}>
        <Text className='text-yellow text-xl font-bold'>Overview</Text>
        <Text className='text-white text-base leading-6'>
          In Advanced mode, players take turns giving examples for the chosen
          category. Everyone who successfully gives an example gets a point, but
          the round stops when someone fails. This mode tests your quick
          thinking and knowledge under pressure!
        </Text>
      </View>

      <View style={{ gap: 8 }}>
        <Text className='text-yellow text-xl font-bold'>1. Set Up</Text>
        <Text className='text-white text-base leading-6'>
          Choose the number of players (minimum 3). You can customize player
          names or use the defaults. Set a target score before starting (e.g.,
          10 points).
        </Text>
      </View>

      <View style={{ gap: 8 }}>
        <Text className='text-yellow text-xl font-bold'>2. The Card</Text>
        <Text className='text-white text-base leading-6'>
          Each card has 4 categories on each side. The player holding the phone
          chooses which category to use. Tap the card to flip it and see the
          other side. You can draw a new card anytime.
        </Text>
      </View>

      <View style={{ gap: 8 }}>
        <Text className='text-yellow text-xl font-bold'>3. Answering</Text>
        <Text className='text-white text-base leading-6'>
          Players take turns going around the circle. Each player must give one
          example for the chosen category. Be quick with your examples to keep
          the game moving!
        </Text>
      </View>

      <View style={{ gap: 8 }}>
        <Text className='text-yellow text-xl font-bold'>4. Scoring</Text>
        <Text className='text-white text-base leading-6'>
          When a player successfully gives an example, tap their card to add a
          point. Everyone who successfully gives an example gets a point. The
          round stops when someone fails to give an example, and that player
          doesn't get a point.
        </Text>
      </View>

      <View style={{ gap: 8 }}>
        <Text className='text-yellow text-xl font-bold'>5. Winning</Text>
        <Text className='text-white text-base leading-6'>
          The first player to reach the target score wins! Or play for a set
          amount of time and see who has the most points at the end. The player
          who failed gets to choose the next category.
        </Text>
      </View>

      <View style={{ gap: 8 }}>
        <Text className='text-yellow text-xl font-bold'>Tips</Text>
        <Text className='text-white text-base leading-6'>
          • Set a target score before starting{"\n"}• Be quick with your
          examples to keep the game moving{"\n"}• The player who fails gets to
          choose the next category{"\n"}• Feel free to create your own house
          rules and variations!
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView className='flex-1 bg-black'>
      <View
        className='px-6 pt-8'
        style={{ maxWidth: 600, alignSelf: "center", width: "100%" }}
      >
        <Text className='text-white text-4xl font-bold mb-2 text-center'>
          How to Play
        </Text>
        <Text className='text-white text-sm mb-8 text-center opacity-70'>
          Top of Mind
        </Text>

        {/* Tabs */}
        <View className='flex-row mb-8' style={{ gap: 8 }}>
          <TouchableOpacity
            onPress={() => setActiveTab("classic")}
            className={`flex-1 rounded-full py-3 ${
              activeTab === "classic" ? "bg-yellow" : "bg-grey-light"
            }`}
            activeOpacity={0.8}
          >
            <Text
              className={`text-center text-base font-bold ${
                activeTab === "classic" ? "text-black" : "text-black"
              }`}
              numberOfLines={1}
            >
              Classic
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab("advanced")}
            className={`flex-1 rounded-full py-3 ${
              activeTab === "advanced" ? "bg-yellow" : "bg-grey-light"
            }`}
            activeOpacity={0.8}
          >
            <Text
              className={`text-center text-base font-bold ${
                activeTab === "advanced" ? "text-black" : "text-black"
              }`}
              numberOfLines={1}
            >
              Advanced
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        ref={scrollViewRef}
        className='flex-1'
        contentContainerStyle={{ paddingBottom: 140 }}
      >
        <View
          className='px-6'
          style={{ maxWidth: 600, alignSelf: "center", width: "100%" }}
        >
          {activeTab === "classic"
            ? renderClassicContent()
            : renderAdvancedContent()}
        </View>
      </ScrollView>

      <View className='absolute bottom-0 left-0 right-0 pb-8 pt-4 items-center'>
        <TouchableOpacity
          onPress={() => router.back()}
          className='bg-yellow rounded-full px-12 py-4'
          activeOpacity={0.8}
        >
          <Text className='text-black text-lg font-bold' numberOfLines={1}>
            Got it!
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
