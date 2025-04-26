import { View, Text,TouchableOpacity } from 'react-native'
import React from 'react'
import {Ionicons,Feather} from '@expo/vector-icons';

const ProfileHeader = ({ username }:{username:string}) => (
    <View className="flex-row items-center justify-between px-4">
      <Text className="text-2xl font-bold">{username}</Text>
      <View className="flex-row">
        <TouchableOpacity className="ml-5">
          <Feather name="plus-square" size={24} />
        </TouchableOpacity>
        <TouchableOpacity className="ml-5">
          <Ionicons name="menu" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );

export default ProfileHeader