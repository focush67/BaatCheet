import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProfileHeader from '@/components/profile/ProfileHeader';
import PostsGrid from '@/components/profile/PostsGrid';  
import ContentTabs from '@/components/profile/ContentTabs';
import Highlights from '@/components/profile/Highlights';
import ActionButtons from '@/components/profile/ActionButtons';
import Bio from '@/components/profile/Bio';
import Statistics from '@/components/profile/Statistics';
import ProfileAvatar from '@/components/profile/ProfileAvatar';

const user:UserProfile = {
  username: 'sparshv70',
  name: 'Sparsh Verma',
  bio: 'Digital creator | Photography enthusiast ✨',
  posts: 125,
  followers: '4.5K',
  following: 342,
};

const posts = Array.from({ length: 15 }, (_, i) => ({
  id: i.toString(),
  imageUrl: `https://picsum.photos/300/300?random=${i}`,
}));

const ProfileScreen = () => {
  const [activeTab, setActiveTab] = useState('posts');
  const [isFollowing, setIsFollowing] = useState(false);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'posts': return <PostsGrid posts={posts} />;
      case 'saved': return <Text className="text-center py-10 text-gray-500">Saved posts coming soon</Text>;
      case 'tagged': return <Text className="text-center py-10 text-gray-500">Tagged photos coming soon</Text>;
      default: return null;
    }
  };

return (
  <SafeAreaView className="flex-1 bg-white">
    <ScrollView>
      <View className="px-4">
        <ProfileHeader username={user.username} />
        
        <View className="flex-row items-center mt-3"> 
          <ProfileAvatar size={86} />
          <Statistics {...user} />
        </View>

        <Bio {...user} />
        <ActionButtons 
          isFollowing={isFollowing} 
          toggleFollow={() => setIsFollowing(!isFollowing)} 
        />
        <Highlights />
      </View>

      <ContentTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {renderTabContent()}
    </ScrollView>
  </SafeAreaView>
);
};

export default ProfileScreen;