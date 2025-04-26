import { View, Text } from 'react-native'
import React from 'react'

const Bio =  ({ name, bio }:{name:string,bio:string}) => (
    <View className="mt-4 px-4">
      <Text className="font-bold">{name}</Text>
      <Text className="text-gray-800">{bio}</Text>
    </View>
);

export default Bio