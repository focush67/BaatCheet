interface UserStory {
  id: number;
  username: string;
  image: string;
  hasUnseenStory: boolean;
  avatar: string;
}

interface StoryModalProps {
  visible: boolean;
  story: UserStory | null;
  onClose: () => void;
  duration?: number;
}

interface StoryPress {
  story: UserStory;
  onPress: (id: number) => void;
}
