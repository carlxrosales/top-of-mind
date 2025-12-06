import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Linking,
} from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type FAQItem = {
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
  {
    question: "How do I play Top of Mind?",
    answer:
      "Top of Mind is a party game where players try to match each other's answers. The player holding the phone reads a category and gives their answer first. Everyone else tries to match that answer. Only players whose answers match get a point. Check out the 'How it Works' section from the home screen for detailed instructions.",
  },
  {
    question: "Can I customize player names?",
    answer:
      "Yes! When setting up your game, you can customize each player's name. You can also edit player names during the game by long-pressing on a player's name in the player list.",
  },
  {
    question: "How do I end the game?",
    answer:
      "You can end the game at any time by tapping the 'End' button in the top left corner of the game screen. You'll be asked to confirm before ending. Once ended, you'll see the final results and can share or start a new game.",
  },
];

const FAQAccordion = ({ question, answer }: FAQItem) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View className='mb-4'>
      <TouchableOpacity
        onPress={() => setIsOpen(!isOpen)}
        className='bg-grey-dark/30 rounded-2xl px-4 py-4'
        activeOpacity={0.7}
      >
        <View className='flex-row justify-between items-center'>
          <Text className='text-white text-base font-bold flex-1 pr-4'>
            {question}
          </Text>
          <Text className='text-yellow text-xl font-bold'>
            {isOpen ? "−" : "+"}
          </Text>
        </View>
      </TouchableOpacity>
      {isOpen && (
        <View className='mt-2 px-4'>
          <Text className='text-white text-sm leading-6 opacity-90'>
            {answer}
          </Text>
        </View>
      )}
    </View>
  );
};

export default function HelpScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleContactUs = async () => {
    const email = "hey@carlrosales.com";
    const subject = "Top of Mind Support";
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}`;

    try {
      const canOpen = await Linking.canOpenURL(mailtoUrl);
      if (canOpen) {
        await Linking.openURL(mailtoUrl);
      }
    } catch (error) {
      console.error("Error opening email:", error);
    }
  };

  return (
    <SafeAreaView className='flex-1 bg-black'>
      <View
        className='px-6 pt-8 items-center'
        style={{ paddingTop: insets.top + 42 }}
      >
        <View className='bg-grey-dark rounded-full w-24 h-24 items-center justify-center mb-6 overflow-hidden'>
          <Image
            source={require("@/assets/images/icon.png")}
            style={{ width: 62, height: 62 }}
            contentFit='contain'
          />
        </View>
        <Text className='text-white text-4xl font-bold mb-2 text-center'>
          Help & Support
        </Text>
        <Text className='text-white text-sm mb-8 text-center opacity-70'>
          We're here to help
        </Text>
      </View>

      <ScrollView
        className='flex-1'
        contentContainerStyle={{ paddingBottom: insets.bottom + 66 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          className='px-6'
          style={{ maxWidth: 600, alignSelf: "center", width: "100%" }}
        >
          <View className='mb-8'>
            <Text className='text-yellow text-xl font-bold mb-4'>
              Contact Us
            </Text>
            <Text className='text-white text-base mb-2 opacity-90'>
              Email us at hey@carlrosales.com
            </Text>
            <TouchableOpacity
              onPress={handleContactUs}
              className='bg-yellow rounded-full py-4 items-center'
              activeOpacity={0.8}
            >
              <Text className='text-black text-base font-bold' numberOfLines={1}>Contact Us</Text>
            </TouchableOpacity>
          </View>

          <View className='mb-8'>
            <Text className='text-yellow text-xl font-bold mb-4'>
              Frequently Asked Questions
            </Text>
            {faqs.map((faq, index) => (
              <FAQAccordion
                key={index}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </View>

          <View className='mb-8'>
            <Text className='text-yellow text-xl font-bold mb-4'>Legal</Text>
            <View style={{ gap: 12 }}>
              <TouchableOpacity
                onPress={() => router.push("/privacy-policy")}
                className='bg-grey-dark/30 rounded-2xl px-4 py-4'
                activeOpacity={0.7}
              >
                <Text className='text-white text-base font-bold' numberOfLines={1}>
                  Privacy Policy
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.push("/terms-of-use")}
                className='bg-grey-dark/30 rounded-2xl px-4 py-4'
                activeOpacity={0.7}
              >
                <Text className='text-white text-base font-bold' numberOfLines={1}>
                  Terms of Use
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
