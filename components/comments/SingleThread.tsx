import { useTheme } from "@/context/ThemeContext";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const SingleThread: React.FC<any> = ({
  data,
  isReply = false,
  parentId,
  toggleLike,
  toggleReplies,
  startReply,
  postId,
}) => {
  const { colorScheme } = useTheme();
  const isDark = colorScheme === "dark";
  console.log(`Single Thread rendered for ${postId}`);
  const textPrimaryColor = isDark ? "#fff" : "#262626";
  const textSecondaryColor = isDark ? "#888" : "#999";
  const likeIconColor = data.liked ? "#ed4956" : isDark ? "#ccc" : "#262626";

  return (
    <View className={`flex-row py-2 ${isReply ? "pl-11" : "pl-4"} pr-4`}>
      <View className="mr-3">
        <Image source={{ uri: data.avatar }} className="w-8 h-8 rounded-full" />
      </View>

      <View className="flex-1">
        <View className="flex-row">
          <View className="flex-1">
            <View className="flex-row items-center">
              <Text
                style={{ color: textPrimaryColor }}
                className="font-semibold text-[12px] mr-1.5"
              >
                {data.username}
              </Text>
              {data.isVerified && (
                <MaterialIcons name="verified" size={12} color="#3897f0" />
              )}
            </View>
            <Text
              style={{ color: textPrimaryColor }}
              className="text-[12px] mt-0.5 leading-5"
            >
              {data.text}
            </Text>
          </View>

          <View className="ml-2 items-center">
            <TouchableOpacity
              onPress={() => toggleLike(data.id, isReply, parentId)}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons
                name={data.liked ? "heart" : "heart-outline"}
                size={16}
                color={likeIconColor}
              />
            </TouchableOpacity>
            {data.likes > 0 && (
              <Text
                style={{ color: textSecondaryColor }}
                className="text-[12px] mt-0.5"
              >
                {data.likes}
              </Text>
            )}
          </View>
        </View>

        <View className="flex-row items-center mt-1.5">
          <Text
            style={{ color: textSecondaryColor }}
            className="text-[10px] mr-4"
          >
            {data.time}
          </Text>
          <TouchableOpacity
            onPress={() => {
              toggleReplies?.(data.id);
              startReply(data);
            }}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={{ color: textSecondaryColor }} className="text-[10px]">
              Reply
            </Text>
          </TouchableOpacity>
        </View>

        {!isReply && data.replies.length > 0 && (
          <TouchableOpacity
            onPress={() => toggleReplies?.(data.id)}
            className="mt-1"
          >
            <Text style={{ color: textSecondaryColor }} className="text-[10px]">
              {data.showReplies
                ? "Hide replies"
                : `View ${data.replies.length} ${
                    data.replies.length === 1 ? "reply" : "replies"
                  }`}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default React.memo(SingleThread);
