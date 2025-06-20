interface UserPost {
  id: string;
  imageUrl: string;
  caption?: string;
  username?: string;
}

interface PostCard {
  id: string;
  username: string;
  avatar: string;
  image: string;
  caption?: string;
  likes: number;
  comments: number;
  timeAgo: string;
  isLiked: boolean;
  isBookmarked: boolean;
}

interface PostCardProps {
  post: PostCard;
}

interface ReelCardProps {
  username?: string;
  caption?: string;
  music?: string;
  profileImage?: string;
  likes?: string;
  comments?: string;
  isFollowing?: boolean;
}

interface ZPostStore {
  mappedPosts: PostCard[];
  setMappedPosts: (email: string) => Promise<void>;
  toggleLike: (postId: string) => void;
  toggleBookmark: (postId: string) => void;
  reset: () => void;
}

interface ZCollectionPost {
  post: {
    id: string;
  };
}
interface ZCollection {
  id: string;
  title: string;
  isPrivate: boolean;
  coverPhoto: string;
  posts: ZCollectionPost[];
}

interface ZSavedStore {
  collections: ZCollection[];
  setCollections: (email: string) => Promise<void>;
  addNewCollection: (collection: ZCollection) => void;
  updateCollection: (
    newCollectionId: string | null,
    postId: string,
    oldCollectionId: string | null
  ) => void;
  getCollectionForPost: (postId: string) => string | null;
  reset: () => void;
}

// GraphQL types for backend type checks

interface GPost {
  id: string;
  coverPhoto: string;
  caption?: string;
  createdAt?: string;
  isBookmarked?: boolean;
  owner: GUser;
  likes: GLike[];
  comments: GComment[];
  tags: GTag[];
}

interface GCreatePostInput {
  coverPhoto: string;
  caption?: string;
  email: string;
}
