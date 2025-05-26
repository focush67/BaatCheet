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
  posts: Record<string, PostCard>;
  setPost: (post: PostCard) => void;
  loadPosts: () => void;
  incrementLike: (postId: string) => void;
  incrementComment: (postId: string) => void;
  incrementSave: (postId: string) => void;
  postArray: PostCard[];
}
