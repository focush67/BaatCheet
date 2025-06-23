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
  post: GridPost | null;
  onClose: () => void;
}

interface PostGridProps {
  posts: UserPost[];
  onLongPressPost: (post: UserPost | null) => void;
  onPostPressOut: () => void;
}

interface GridPost {
  id: string;
  coverPhoto: string;
  caption: string;
  owner: {
    username: string;
    email: string;
    profilePicture: string;
  };
}

interface GridProps {
  posts: GridPost[];
  onLongPressPost: (post: GridPost | null) => void;
  onPostPressOut: () => void;
}

interface ProfileStatistics {
  posts: string | number;
  followers: string;
  following: string;
}

interface GUpdateUserInput {
  name: string;
  username: string;
  profilePicture: string;
  bio: string;
}

interface ZUser {
  id: string;
  username: string;
  profilePicture: string;
}

// GraphQL types for backend type checks

interface GUser {
  id: string;
  username?: string;
  email: string;
  name?: string;
  profilePicture: string;
  bio: string;
  createdAt: string;
  followers: GUser[];
  following: GUser[];
  likes: GLike[];
  comments: GComment[];
  collections: GUserCollection[];
  highlights: GHighlightOwner[];
  stories: GUserStory[];
  posts: GPost[];
  taggedPosts: GTag[];
}

interface GUserCollection {
  collection: GCollection;
  posts: GPost[];
}

interface GUserHighlight {
  highlight: GHighlight;
  stories: GStory[];
}

interface GUserStory {
  is: string;
  content: string;
  createdAt: string;
  likes: GLike[];
  comments: GComment[];
}

interface GCreatUserInput {
  username: string;
  email: string;
  name?: string;
  profilePicture?: string;
  bio?: string;
}

interface GUpdateUserInput {
  name?: string;
  profilePicture?: string;
  username?: string;
  bio?: string;
}
