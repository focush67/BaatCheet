import { View,Image } from 'react-native'

import React from 'react'

const ProfileAvatar = ({ 
  size = 86,
  borderColor = 'border-gray-300',
  imageUrl = 'https://picsum.photos/150/150?random=1'
}) => (
  <View 
    className="rounded-full ml-2"
    style={{
      width: size,
      height: size,
      borderWidth: 1,
      borderColor: borderColor.includes('#') ? borderColor : undefined,
      padding: 3,
    }}
  >
    <Image
      source={{ uri: imageUrl }}
      style={{
        width: '100%',
        height: '100%',
        borderRadius: size/2,
      }}
      resizeMode="cover"
    />
  </View>
);
export default ProfileAvatar