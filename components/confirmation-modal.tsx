import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
} from "react-native";

interface ConfirmationModalProps {
  visible: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  visible,
  title,
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View className="flex-1 bg-black/70 justify-center items-center px-6">
        <View className="bg-white rounded-3xl p-5 w-full max-w-sm">
          <Text className="text-black text-xl font-bold mb-3 text-center">
            {title}
          </Text>
          <Text className="text-black text-sm mb-6 text-center leading-5">
            {message}
          </Text>
          <View className="flex-row" style={{ gap: 12 }}>
            <TouchableOpacity
              onPress={onCancel}
              className="flex-1 bg-grey-light rounded-full py-3 items-center"
              activeOpacity={0.7}
            >
              <Text className="text-black text-base font-bold">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onConfirm}
              className="flex-1 bg-yellow rounded-full py-3 items-center"
              activeOpacity={0.8}
            >
              <Text className="text-black text-base font-bold">Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

