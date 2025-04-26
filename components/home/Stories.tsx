import React, { useState } from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity } from 'react-native';
import {colors} from '@/constants/theme'
const initialStories: UserStory[] = [
  { id: 1, username: 'you', image: 'https://i.pravatar.cc/150?img=1', hasUnseenStory: false },
  { id: 2, username: 'john', image: 'https://i.pravatar.cc/150?img=2', hasUnseenStory: true },
  { id: 3, username: 'lisa', image: 'https://i.pravatar.cc/150?img=3', hasUnseenStory: true },
  { id: 4, username: 'mike', image: 'https://i.pravatar.cc/150?img=4', hasUnseenStory: false },
  { id: 5, username: 'ella', image: 'https://i.pravatar.cc/150?img=5', hasUnseenStory: true },
  { id: 6, username: 'dave', image: 'https://i.pravatar.cc/150?img=6', hasUnseenStory: true },
  { id: 7, username: 'sara', image: 'https://i.pravatar.cc/150?img=7', hasUnseenStory: false },
];

export default function Stories() {
  const [stories, setStories] = useState<UserStory[]>(initialStories);

  const handleStoryPress = (id: number) => {
    setStories(prev => prev.map(story => 
      story.id === id ? {...story, hasUnseenStory: false} : story
    ));
  };

  return (
    <View className="pb-2 border-b border-gray-100 mb-2">
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        className="pt-3 px-4"
      >
        {stories.map(story => (
          <TouchableOpacity 
            key={story.id} 
            className="items-center mr-4"
            onPress={() => handleStoryPress(story.id)}
          >
            <View className={`rounded-full p-0.5 ${story.hasUnseenStory ? 
              'bg-gradient-to-tr from-yellow-400 to-pink-500' : 
              'bg-gray-200'}`}
            >
              <Image
                source={{ uri: story.image }}
                className="w-20 h-20 rounded-full border-2 border-white"
              />
            </View>
            <Text 
              className={`text-xs mt-1 ${story.id === 1 ? 'font-bold' : 'font-normal'}`}
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{ maxWidth: 64 }}
            >
              {story.id === 1 ? 'Your Story' : story.username}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

