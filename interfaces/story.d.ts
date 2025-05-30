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

// GraphQL types for backend type checks

interface GStory {
  id: string;
  content: string;
  ownerId: string;
  owner: GUser;
  highlights: GHighlightStory[];
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
