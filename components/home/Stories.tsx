import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import Story from "./Story";

const initialStories: UserStory[] = [
  {
    id: 1,
    username: "you",
    image: "https://i.pravatar.cc/150?img=1",
    hasUnseenStory: false,
  },
  {
    id: 2,
    username: "john",
    image: "https://i.pravatar.cc/150?img=2",
    hasUnseenStory: true,
  },
  {
    id: 3,
    username: "lisa",
    image: "https://i.pravatar.cc/150?img=3",
    hasUnseenStory: true,
  },
  {
    id: 4,
    username: "mike",
    image: "https://i.pravatar.cc/150?img=4",
    hasUnseenStory: false,
  },
  {
    id: 5,
    username: "ella",
    image: "https://i.pravatar.cc/150?img=5",
    hasUnseenStory: true,
  },
  {
    id: 6,
    username: "dave",
    image: "https://i.pravatar.cc/150?img=6",
    hasUnseenStory: true,
  },
  {
    id: 7,
    username: "sara",
    image: "https://i.pravatar.cc/150?img=7",
    hasUnseenStory: false,
  },
];

export default function Stories() {
  const [stories, setStories] = useState<UserStory[]>(initialStories);

  const handleStoryPress = (id: number) => {
    setStories((prev) =>
      prev.map((story) =>
        story.id === id ? { ...story, hasUnseenStory: false } : story
      )
    );
  };

  return (
    <View className="pb-1">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="pt-3 px-4"
      >
        {stories.map((story, id) => (
          <Story story={story} key={id} handleStoryPress={handleStoryPress} />
        ))}
      </ScrollView>
    </View>
  );
}
