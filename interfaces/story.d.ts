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
