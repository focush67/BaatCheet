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
  saves: number;
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

// GraphQL types for backend type checks

interface GPost {
  id: string;
  coverPhoto: string;
  caption?: string;
  createdAt?: string;
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
