import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

interface HeaderBarProps {
  unreadMessages?: number;
}

const HeaderBar = ({ unreadMessages = 4 }: HeaderBarProps) => {
  return (
    <View className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
      {/* App name or logo */}
      <Text className="text-2xl font-bold text-black">BaatCheet</Text>

      {/* Icons */}
      <View className="flex-row items-center gap-x-2">
        <TouchableOpacity>
          <Ionicons name="heart-outline" size={24} color="#262626" />
        </TouchableOpacity>

        <TouchableOpacity className="relative">
          <FontAwesome name="paper-plane-o" size={22} color="#262626" />
          {unreadMessages > 0 && (
            <View className="absolute -top-2 -right-2 bg-red-500 rounded-full px-1.5 min-w-[16px] h-[16px] items-center justify-center">
              <Text className="text-white text-[10px] font-semibold">{unreadMessages}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HeaderBar;
