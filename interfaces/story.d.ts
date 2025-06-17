interface UserStory {
  owner: GUser;
  stories: GStory[];
}

interface ImageUploadModalProps {
  loading: boolean;
  visible: boolean;
  onClose: () => void;
  onImageSelected: (imageUri: string) => Promise<void>;
  title?: string;
  emptyPreviewText?: string;
}

interface StoryModalProps {
  visible: boolean;
  stories: GStory[];
  onClose: () => void;
  duration?: number;
}

interface StoryProps {
  story: GStory;
  onPress: () => void;
}

interface StoryReplyBarProps {
  replyInputRef: RefObject<RNTextInput>;
  stopAnimation: () => void;
  startAnimation: (index: number, remainingDuration: number) => void;
  currentIndex: number;
  remainingDurationRef: React.MutableRefObject<number>;
  storyId: string;
  email: string;
}

interface ZStoriesState {
  userStories: GStory[];
  toggleLike: (id: string, userEmail: string) => void;
  replyToStory: (storyId: string, comment: GComment) => void;
  fetchUserStories: () => Promise<void>;
  reset: () => void;
}
// GraphQL types for backend type checks

interface GStory {
  id: string;
  content?: string;
  coverPhoto: string;
  owner: GUser;
  likes: GLike[];
  comments: GComment[];
}

interface GCreateStoryInput {
  coverPhoto: string;
  email: string;
  content?: String;
}
