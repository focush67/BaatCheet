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
}) => {
  const { colorScheme } = useTheme();
  const isDark = colorScheme === "dark";

  const textPrimaryColor = isDark ? "#fff" : "#262626";
  const textSecondaryColor = isDark ? "#888" : "#999";
  const likeIconColor = data.liked ? "#ed4956" : isDark ? "#ccc" : "#262626";

  return (
    <View className={`flex-row py-2 ${isReply ? "pl-11" : "pl-4"} pr-4`}>
      {/* Avatar */}
      <View className="mr-3">
        <Image source={{ uri: data.avatar }} className="w-8 h-8 rounded-full" />
      </View>

      {/* Content */}
      <View className="flex-1">
        {/* Username and text */}
        <View className="flex-row">
          <View className="flex-1">
            <View className="flex-row items-center">
              <Text
                style={{ color: textPrimaryColor }}
                className="font-semibold text-[11px] mr-1.5"
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

          {/* Like button */}
          <TouchableOpacity
            onPress={() => toggleLike(data.id, isReply, parentId)}
            className="ml-2"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons
              name={data.liked ? "heart" : "heart-outline"}
              size={14}
              color={likeIconColor}
            />
          </TouchableOpacity>
        </View>

        {/* Meta info */}
        <View className="flex-row items-center mt-1.5">
          <Text
            style={{ color: textSecondaryColor }}
            className="text-[11px] mr-4"
          >
            {data.time}
          </Text>
          {data.likes > 0 && (
            <Text
              style={{ color: textSecondaryColor }}
              className="text-[11px] mr-4"
            >
              {data.likes} like{data.likes !== 1 ? "s" : ""}
            </Text>
          )}
          <TouchableOpacity
            onPress={() => startReply(data)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={{ color: textSecondaryColor }} className="text-[11px]">
              Reply
            </Text>
          </TouchableOpacity>
        </View>

        {/* View replies */}
        {!isReply && data.replies.length > 0 && (
          <TouchableOpacity
            onPress={() => toggleReplies?.(data.id)}
            className="mt-1"
          >
            <Text style={{ color: textSecondaryColor }} className="text-[11px]">
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

export default SingleThread;
