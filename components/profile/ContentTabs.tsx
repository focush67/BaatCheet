import { View,TouchableOpacity } from 'react-native'
import React from 'react'
import {Ionicons} from '@expo/vector-icons';

const ContentTabs = ({ activeTab, setActiveTab }:{activeTab:ActiveTab,setActiveTab:(_:string) => void}) => (
    <View className="flex-row border-t border-gray-200 mt-4">
      <TabButton
        iconName="grid"
        isActive={activeTab === 'posts'}
        onPress={() => setActiveTab('posts')}
      />
      <TabButton
        iconName={activeTab === 'saved' ? 'bookmark' : 'bookmark-outline'}
        isActive={activeTab === 'saved'}
        onPress={() => setActiveTab('saved')}
      />
      <TabButton
        iconName={activeTab === 'tagged' ? 'person' : 'person-outline'}
        isActive={activeTab === 'tagged'}
        onPress={() => setActiveTab('tagged')}
      />
    </View>
  );
  
  const TabButton = ({ iconName, isActive, onPress }:TabButtonProps) => (
    <TouchableOpacity
      className={`flex-1 items-center py-3 ${isActive ? 'border-t-2 border-black' : ''}`}
      onPress={onPress}
    >
      <Ionicons
        name={iconName}
        size={24}
        color={isActive ? 'black' : 'gray'}
      />
    </TouchableOpacity>
  );

export default ContentTabs