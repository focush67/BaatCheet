interface UserProfile {
  username: string;
  name: string;
  bio: string;
  posts: number;
  followers: string;
  following: string | int;
}

interface TabButtonProps {
  iconName: IoniconsName;
  isActive: boolean;
  onPress: () => void;
  iconColor: string;
  colorScheme: "light" | "dark";
}

interface ContentProps {
  activeTab: ActiveTab;
  setActiveTab: (_: ActiveTab) => void;
}

interface PostPreviewProps {
  visible: boolean;
  post: UserPost | null;
  onClose: () => void;
}

interface PostGridProps {
  posts: UserPost[];
  onLongPressPost: (post: UserPost | null) => void;
  onPostPressOut: () => void;
}

interface ProfileStatistics {
  posts: string | number;
  followers: string;
  following: string;
}
