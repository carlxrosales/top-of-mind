import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function CoverScreen() {
  const router = useRouter();

  return (
    <View className='flex-1 bg-black justify-center items-center px-6'>
      <View className='items-center' style={{ maxWidth: 600, width: "100%" }}>
        <View className='items-center mb-16'>
          <View className='bg-grey-dark rounded-full w-24 h-24 items-center justify-center mb-4 overflow-hidden'>
            <Image
              source={require("@/assets/images/icon.png")}
              style={{ width: 62, height: 62 }}
              contentFit='contain'
            />
          </View>
          <Text className='text-white text-4xl font-bold mb-1 text-center'>
            top of
          </Text>
          <Text className='text-white text-5xl font-bold mb-6 text-center'>
            MIND
          </Text>
          <Text className='text-white text-base text-center mb-12 px-4 leading-6'>
            What do you think the others will answer?
          </Text>
          <View
            className='flex-row flex-wrap justify-center mb-8'
            style={{ gap: 12 }}
          >
            <View className='bg-white rounded-2xl px-4 py-2'>
              <Text className='text-black text-xs font-bold'>AGE 14+</Text>
            </View>
            <View className='bg-white rounded-2xl px-4 py-2'>
              <Text className='text-black text-xs font-bold'>PLAYERS 3+</Text>
            </View>
            <View className='bg-white rounded-2xl px-4 py-2'>
              <Text className='text-black text-xs font-bold'>15-45 MIN</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => router.push("/player-selection")}
          className='bg-yellow rounded-full px-16 py-5 mb-4'
          activeOpacity={0.8}
        >
          <Text className='text-black text-xl font-bold' numberOfLines={1}>
            Start Game
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/tutorial")}
          className='bg-grey-light rounded-full px-12 py-4 mb-8'
          activeOpacity={0.8}
        >
          <Text className='text-black text-lg font-bold' numberOfLines={1}>
            How to Play
          </Text>
        </TouchableOpacity>

        <View className='px-6'>
          <Text className='text-white text-xs text-center leading-5 opacity-80'>
            Top of Mind is an exciting and fast-paced game where you put your
            telepathy skills to the test! Try to guess what the other players
            will answer to more than 400 categories.
          </Text>
        </View>
      </View>
    </View>
  );
}
