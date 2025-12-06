import React from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import { Image } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function PrivacyPolicyScreen() {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView className='flex-1 bg-black'>
      <View
        className='px-6 items-center'
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
          Privacy Policy
        </Text>
        <Text className='text-white text-sm mb-8 text-center opacity-70'>
          Last updated: {new Date().toLocaleDateString()}
        </Text>
      </View>

      <ScrollView
        className='flex-1'
        contentContainerStyle={{ paddingBottom: insets.bottom + 66 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          className='px-6'
          style={{ gap: 24, maxWidth: 600, alignSelf: "center", width: "100%" }}
        >
          <View style={{ gap: 8 }}>
            <Text className='text-yellow text-xl font-bold'>Introduction</Text>
            <Text className='text-white text-base leading-6'>
              Top of Mind ("we", "our", or "us") is committed to protecting your
              privacy. This Privacy Policy explains how we handle information
              when you use our mobile application.
            </Text>
          </View>

          <View style={{ gap: 8 }}>
            <Text className='text-yellow text-xl font-bold'>
              Information We Collect
            </Text>
            <Text className='text-white text-base leading-6'>
              We do not collect, store, or transmit any personal information or
              data. Top of Mind operates entirely offline and does not require
              any user accounts, registration, or data collection.
            </Text>
          </View>

          <View style={{ gap: 8 }}>
            <Text className='text-yellow text-xl font-bold'>
              Local Data Storage
            </Text>
            <Text className='text-white text-base leading-6'>
              All game data, including player names and scores, is stored
              locally on your device only. This information is never transmitted
              to us or any third parties. You can clear this data at any time by
              uninstalling the app.
            </Text>
          </View>

          <View style={{ gap: 8 }}>
            <Text className='text-yellow text-xl font-bold'>
              Analytics and Tracking
            </Text>
            <Text className='text-white text-base leading-6'>
              We do not use any analytics tools, tracking technologies, or
              third-party services that collect user data. We do not track your
              usage, behavior, or any other information.
            </Text>
          </View>

          <View style={{ gap: 8 }}>
            <Text className='text-yellow text-xl font-bold'>
              Third-Party Services
            </Text>
            <Text className='text-white text-base leading-6'>
              Top of Mind does not integrate with any third-party services that
              collect or share user data. The app functions independently
              without external data connections.
            </Text>
          </View>

          <View style={{ gap: 8 }}>
            <Text className='text-yellow text-xl font-bold'>
              Children's Privacy
            </Text>
            <Text className='text-white text-base leading-6'>
              Our app is designed for users aged 14 and above. Since we do not
              collect any information, we do not knowingly collect personal
              information from children.
            </Text>
          </View>

          <View style={{ gap: 8 }}>
            <Text className='text-yellow text-xl font-bold'>
              Changes to This Policy
            </Text>
            <Text className='text-white text-base leading-6'>
              We may update this Privacy Policy from time to time. Any changes
              will be posted on this page with an updated revision date. We
              encourage you to review this policy periodically.
            </Text>
          </View>

          <View style={{ gap: 8 }}>
            <Text className='text-yellow text-xl font-bold'>Contact Us</Text>
            <Text className='text-white text-base leading-6'>
              If you have any questions about this Privacy Policy, please
              contact us at hey@carlrosales.com.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
