import { Animation } from "@/constants/theme";
import { useEffect } from "react";
import { Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type ToastPosition = "top" | "bottom";

interface ToastProps {
  message: string;
  visible: boolean;
  duration?: number;
  position?: ToastPosition;
}

export function Toast({
  message,
  visible,
  duration = Animation.duration.toast,
  position = "top",
}: ToastProps) {
  const insets = useSafeAreaInsets();
  const translateY = useSharedValue<number>(
    position === "top"
      ? Animation.translate.toast.top
      : Animation.translate.toast.bottom
  );
  const opacity = useSharedValue<number>(Animation.opacity.hidden);

  useEffect(() => {
    if (visible) {
      translateY.value = withSpring(0, Animation.spring);
      opacity.value = withTiming(Animation.opacity.visible, {
        duration: Animation.duration.fast,
      });
      const timer = setTimeout(() => {
        translateY.value = withTiming(
          position === "top"
            ? Animation.translate.toast.top
            : Animation.translate.toast.bottom,
          { duration: Animation.duration.fast }
        );
        opacity.value = withTiming(Animation.opacity.hidden, {
          duration: Animation.duration.fast,
        });
      }, duration);
      return () => clearTimeout(timer);
    } else {
      translateY.value =
        position === "top"
          ? Animation.translate.toast.top
          : Animation.translate.toast.bottom;
      opacity.value = Animation.opacity.hidden;
    }
  }, [visible, duration, position]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
      opacity: opacity.value,
    };
  });

  if (!visible) return null;

  const positionStyle =
    position === "top"
      ? { top: insets.top + 16 }
      : { bottom: insets.bottom + 16 };

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          left: 0,
          right: 0,
          alignItems: "center",
          zIndex: 1000,
        },
        positionStyle,
        animatedStyle,
      ]}
      pointerEvents='none'
    >
      <View className='bg-black px-4 py-4 rounded-2xl' pointerEvents='none'>
        <Text
          className='text-white text-lg text-center font-semibold'
          pointerEvents='none'
        >
          {message}
        </Text>
      </View>
    </Animated.View>
  );
}
