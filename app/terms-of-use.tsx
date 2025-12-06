import React from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import { Image } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TermsOfUseScreen() {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView className='flex-1 bg-black'>
      <View
        className='px-6 pt-16 items-center'
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
          Terms of Use
        </Text>
        <Text className='text-white text-sm mb-8 text-center opacity-70'>
          Last updated: {new Date().toLocaleDateString()}
        </Text>
      </View>

      <ScrollView
        className='flex-1'
        contentContainerStyle={{ paddingBottom: insets.bottom + 666 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          className='px-6'
          style={{ gap: 24, maxWidth: 600, alignSelf: "center", width: "100%" }}
        >
          <View style={{ gap: 8 }}>
            <Text className='text-yellow text-xl font-bold'>
              Acceptance of Terms
            </Text>
            <Text className='text-white text-base leading-6'>
              By downloading, installing, or using Top of Mind ("the App"), you
              agree to be bound by these Terms of Use. If you do not agree to
              these terms, please do not use the App.
            </Text>
          </View>

          <View style={{ gap: 8 }}>
            <Text className='text-yellow text-xl font-bold'>
              Use of the App
            </Text>
            <Text className='text-white text-base leading-6'>
              Top of Mind is a party game application designed for entertainment
              purposes. You may use the App for personal, non-commercial
              purposes only. The App is intended for users aged 14 and above.
            </Text>
          </View>

          <View style={{ gap: 8 }}>
            <Text className='text-yellow text-xl font-bold'>
              Intellectual Property
            </Text>
            <Text className='text-white text-base leading-6'>
              All content, features, and functionality of the App, including but
              not limited to text, graphics, logos, and software, are owned by
              us and are protected by copyright, trademark, and other
              intellectual property laws.
            </Text>
          </View>

          <View style={{ gap: 8 }}>
            <Text className='text-yellow text-xl font-bold'>
              Prohibited Uses
            </Text>
            <Text className='text-white text-base leading-6'>
              You agree not to: (1) modify, adapt, or reverse engineer the App;
              (2) use the App for any illegal or unauthorized purpose; (3)
              attempt to gain unauthorized access to any part of the App; (4)
              remove any copyright or proprietary notices from the App.
            </Text>
          </View>

          <View style={{ gap: 8 }}>
            <Text className='text-yellow text-xl font-bold'>
              Disclaimer of Warranties
            </Text>
            <Text className='text-white text-base leading-6'>
              The App is provided "as is" and "as available" without warranties
              of any kind, either express or implied. We do not guarantee that
              the App will be uninterrupted, error-free, or free from viruses or
              other harmful components.
            </Text>
          </View>

          <View style={{ gap: 8 }}>
            <Text className='text-yellow text-xl font-bold'>
              Limitation of Liability
            </Text>
            <Text className='text-white text-base leading-6'>
              To the maximum extent permitted by law, we shall not be liable for
              any indirect, incidental, special, consequential, or punitive
              damages, or any loss of profits or revenues, whether incurred
              directly or indirectly, or any loss of data, use, goodwill, or
              other intangible losses resulting from your use of the App.
            </Text>
          </View>

          <View style={{ gap: 8 }}>
            <Text className='text-yellow text-xl font-bold'>
              Changes to Terms
            </Text>
            <Text className='text-white text-base leading-6'>
              We reserve the right to modify these Terms of Use at any time. We
              will notify users of any material changes by updating the "Last
              updated" date at the top of this page. Your continued use of the
              App after such changes constitutes acceptance of the new terms.
            </Text>
          </View>

          <View style={{ gap: 8 }}>
            <Text className='text-yellow text-xl font-bold'>Termination</Text>
            <Text className='text-white text-base leading-6'>
              We reserve the right to terminate or suspend your access to the
              App at any time, without prior notice, for any reason, including
              if you breach these Terms of Use.
            </Text>
          </View>

          <View style={{ gap: 8 }}>
            <Text className='text-yellow text-xl font-bold'>Contact Us</Text>
            <Text className='text-white text-base leading-6'>
              If you have any questions about these Terms of Use, please contact
              us at hey@carlrosales.com.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
