import { useTheme } from "@/context/ThemeContext";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEffect, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Pressable } from "react-native-gesture-handler";
import CommentsModal from "../comments/PostWithComments";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

export const VideoScreen = ({
  shouldPlay,
  videoSource,
}: {
  shouldPlay: boolean;
  videoSource: string;
}) => {
  const { colorScheme } = useTheme();
  const [isFollowing, setIsFollowing] = useState(false);
  const [captionExpanded, setCaptionExpanded] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [isLiked, setIsLiked] = useState(true);
  const [likeCount, setLikeCount] = useState(235);

  const handleLike = () => {
    setIsLiked((prev) => !prev);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
  });

  useEffect(() => {
    if (shouldPlay) {
      player.play();
    } else {
      player.pause();
    }
  }, [shouldPlay]);

  useEffect(() => {
    const subscription = player.addListener(
      "statusChange",
      ({ status, error }) => {}
    );

    return () => {
      subscription.remove();
      player.pause();
    };
  }, []);

  const togglePlayPause = () => {
    if (player.playing) {
      player.pause();
    } else {
      player.play();
    }
  };

  const toggleFollow = () => {
    setIsFollowing((prev) => !prev);
  };

  const toggleCaption = () => {
    setCaptionExpanded((prev) => !prev);
  };

  const isDark = colorScheme === "dark";
  const textColor = "text-white";
  const iconColor = "white";
  const bgColor = isDark ? "bg-black" : "bg-white";
  const btnBg = isDark ? "bg-white" : "bg-black";
  const btnText = "text-black";

  return (
    <View className={`${bgColor} relative`}>
      <Pressable onPress={togglePlayPause}>
        <VideoView
          style={styles.video}
          player={player}
          nativeControls={false}
          contentFit="cover"
        />
      </Pressable>

      <View
        className="absolute right-4 bottom-24 items-center gap-y-4"
        pointerEvents="box-none"
      >
        <TouchableOpacity onPress={handleLike} activeOpacity={0.7}>
          <View className="items-center">
            <Ionicons
              name={isLiked ? "heart" : "heart-outline"}
              size={26}
              color={
                isLiked
                  ? "#ed4956"
                  : colorScheme === "light"
                  ? "#262626"
                  : "#ffffff"
              }
            />
            <Text className={`text-sm ${textColor}`}>{likeCount}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setShowComments(true)}
          activeOpacity={0.7}
        >
          <View className="items-center">
            <Ionicons name="chatbubble-outline" size={28} color={iconColor} />
            <Text className={`text-sm ${textColor}`}>234</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            /* Share action */
          }}
          activeOpacity={0.7}
        >
          <View className="items-center">
            <Feather name="send" size={28} color={iconColor} />
            <Text className={`text-sm ${textColor}`}>23k</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            /* More options */
          }}
          activeOpacity={0.7}
        >
          <Feather name="more-vertical" size={24} color={iconColor} />
        </TouchableOpacity>
      </View>

      <View
        className="absolute bottom-12 left-4 pr-20"
        pointerEvents="box-none"
      >
        <View className="flex-row items-center mb-1">
          <Text className={`${textColor} font-semibold mr-2`}>
            @your_username
          </Text>
          <TouchableOpacity
            onPress={toggleFollow}
            className={`px-3 py-1 rounded-full ${btnBg}`}
            activeOpacity={0.7}
          >
            <Text className={`text-sm font-semibold ${btnText}`}>
              {isFollowing ? "Following" : "Follow"}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={toggleCaption} activeOpacity={0.7}>
          <Text
            className={`${textColor}`}
            numberOfLines={captionExpanded ? undefined : 2}
          >
            This is a sample reel caption with hashtags #reel #example #testing
            #video #tailwind #longtext Just testing how long captions are
            rendered and whether the truncation works or not.
          </Text>
        </TouchableOpacity>
      </View>

      <CommentsModal
        visible={showComments}
        onClose={() => setShowComments(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  video: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT - 55,
  },
});
