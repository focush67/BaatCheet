interface UserPost {
  id: string;
  imageUrl: string;
}

interface UserStory {
  id: number;
  username: string;
  image: string;
  hasUnseenStory: boolean;
}

interface PostCardProps {
  post: {
    id: number;
    username: string;
    avatar: string;
    image: string;
    caption?: string;
    likes: number;
    comments: number;
    timeAgo: string;
    isLiked: boolean;
    isBookmarked: boolean;
  };
}

interface Post {
  id: number;
  username: string;
  avatar: string;
  image: string;
  caption: string;
  likes: number;
  comments: number;
  timeAgo: string;
  isLiked: boolean;
  isBookmarked: boolean;
}
