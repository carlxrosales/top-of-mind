import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import { Player } from "@/contexts/game-context";

interface PlayerNameModalProps {
  visible: boolean;
  player: Player | null;
  onSave: (playerId: string, name: string) => void;
  onClose: () => void;
}

export const PlayerNameModal: React.FC<PlayerNameModalProps> = ({
  visible,
  player,
  onSave,
  onClose,
}) => {
  const [name, setName] = useState("");

  React.useEffect(() => {
    if (player) {
      setName(player.name);
    }
  }, [player]);

  const handleSave = () => {
    if (player && name.trim()) {
      onSave(player.id, name.trim());
      onClose();
    }
  };

  if (!player) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/70 justify-center items-center px-6">
        <View className="bg-white rounded-3xl p-5 w-full max-w-sm">
          <Text className="text-black text-xl font-bold mb-3 text-center">
            Edit Player Name
          </Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Enter player name"
            placeholderTextColor="rgb(150, 150, 150)"
            className="bg-grey-light rounded-2xl px-4 py-3 mb-4 text-black text-base"
            autoFocus
            maxLength={20}
            onSubmitEditing={handleSave}
          />
          <View className="flex-row" style={{ gap: 12 }}>
            <TouchableOpacity
              onPress={onClose}
              className="flex-1 bg-grey-light rounded-full py-3 items-center"
              activeOpacity={0.7}
            >
              <Text className="text-black text-base font-bold">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSave}
              className="flex-1 bg-yellow rounded-full py-3 items-center"
              activeOpacity={0.8}
            >
              <Text className="text-black text-base font-bold">Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

