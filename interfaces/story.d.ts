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
  handleSendReply: () => void;
  stopAnimation: () => void;
  startAnimation: (index: number, remainingDuration: number) => void;
  currentIndex: number;
  remainingDurationRef: React.MutableRefObject<number>;
}

interface HighlightImagePickerProps {
  onImageSelected: (uri: string) => void;
  selectedImage: string | null;
  theme: "light" | "dark";
}

interface HighlightModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: () => void;
  theme: "light" | "dark";
  highlightName: string;
  setHighlightName: (text: string) => void;
  selectedImage: string | null;
  setSelectedImage: (uri: string) => void;
}

interface HighlightItemProps {
  id: number;
  onPress?: () => void;
  theme?: "light" | "dark";
  imageUri?: string;
}

interface THighlight {
  id: number;
  name: string;
  imageUri: string;
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

interface GHighlightStory {
  id: string;
  highlightId: string;
  storyId: string;
  highlight: GHighlight;
  story: GStory;
}

interface GHighlight {
  id: string;
  coverPhoto: string;
  title: string;
  owners: GHighlightOwner[];
  stories: GHighlightStory[];
}

interface GHighlightOwner {
  id: string;
  highlightId: string;
  userId: string;
  highlight: GHighlight;
  user: GUser;
}

interface GCreateStoryInput {
  coverPhoto: string;
  email: string;
  content?: String;
}
