import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Ionicons, Feather, FontAwesome } from '@expo/vector-icons';

interface PostCardProps {
  post: {
    id: number;
    username: string;
    avatar: string;
    image: string;
    caption?: string;
    likes: number;
    comments: number;
    timeAgo: string;
    isLiked: boolean;
    isBookmarked: boolean;
  };
}

const PostCard = ({ post }: PostCardProps) => {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [isBookmarked, setIsBookmarked] = useState(post.isBookmarked);
  const [likeCount, setLikeCount] = useState(post.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  const formatNumber = (num: number): string => {
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'm';
    if (num >= 1_000) return (num / 1_000).toFixed(1) + 'k';
    return num.toString();
  };

  return (
    <View className="bg-white border-b border-gray-200">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3">
        <View className="flex-row items-center">
          <Image
            source={{ uri: post.avatar }}
            className="w-12 h-12 rounded-full mr-3"
          />
          <Text className="font-semibold text-black text-sm">{post.username}</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={20} color="#262626" />
        </TouchableOpacity>
      </View>

      {/* Post Image */}
      <Image
        source={{ uri: post.image }}
        className="w-full aspect-square bg-gray-100"
        resizeMode="cover"
      />

      {/* Actions */}
      <View className="flex-row justify-between items-center px-4 py-3">
        <View className="flex-row items-center space-x-4">
          <TouchableOpacity
            onPress={handleLike}
            className="w-8 h-8 rounded-full bg-white justify-center items-center"
          >
            <Ionicons
              name={isLiked ? 'heart' : 'heart-outline'}
              size={24}
              color={isLiked ? '#ed4956' : '#262626'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            className="w-8 h-8 rounded-full bg-white justify-center items-center"
          >
            <FontAwesome
              name="comment-o"
              size={22}
              color="#262626"
              style={{ transform: [{ scaleX: -1 }] }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            className="w-8 h-8 rounded-full bg-white justify-center items-center"
          >
            <Feather name="send" size={22} color="#262626" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => setIsBookmarked(!isBookmarked)}
          className="w-8 h-8 rounded-full bg-white justify-center items-center"
        >
          <Ionicons
            name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
            size={22}
            color="#262626"
          />
        </TouchableOpacity>
      </View>

      {/* Likes */}
      <View className="px-4">
        <Text className="font-semibold text-sm text-black">
          {formatNumber(likeCount)} likes
        </Text>
      </View>

      {/* Caption */}
      {post.caption && (
        <View className="px-4 pt-1">
          <Text className="text-sm text-black">
            <Text className="font-semibold">{post.username} </Text>
            <Text>{post.caption}</Text>
          </Text>
        </View>
      )}

      {/* View Comments */}
      {post.comments > 0 && (
        <TouchableOpacity className="px-4 pt-1">
          <Text className="text-sm text-gray-500">
            View all {post.comments} comment{post.comments !== 1 ? 's' : ''}
          </Text>
        </TouchableOpacity>
      )}

      {/* Time */}
      <View className="px-4 pt-1 pb-3">
        <Text className="text-xs text-gray-400 uppercase">{post.timeAgo}</Text>
      </View>
    </View>
  );
};

export default PostCard;
