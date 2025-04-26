import { View, Text } from 'react-native'
import React from 'react'

const Statistics = ({ posts, followers, following }:{posts:string|number,followers:string,following:string}) => (
  <View className="flex-1 flex-row justify-evenly ml-2">
    <View className="items-center">
      <Text className="font-bold text-base">{posts}</Text>
      <Text className="text-gray-500 text-xs mt-0.5">Posts</Text>
    </View>
    <View className="items-center">
      <Text className="font-bold text-base">{followers}</Text>
      <Text className="text-gray-500 text-xs mt-0.5">Followers</Text>
    </View>
    <View className="items-center">
      <Text className="font-bold text-base">{following}</Text>
      <Text className="text-gray-500 text-xs mt-0.5">Following</Text>
    </View>
  </View>
  );

export default Statistics