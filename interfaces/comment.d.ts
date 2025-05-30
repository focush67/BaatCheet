interface ReplyProps {
  author: string;
  content: string;
  timestamp: string;
}

interface CommentInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
  placeholder: string;
}

interface CommentItemProps {
  comment: TComment;
  onLike: (id: string, parentId?: string) => void;
  onViewReplies?: (comment: TComment) => void;
  showRepliesCount?: boolean;
  isReply?: boolean;
  parentId?: string;
}

interface TComment {
  id: string;
  username: string;
  postId?: string;
  avatar: string;
  text: string;
  time: string;
  liked: boolean;
  likes: number;
  replies: TComment[];
  isVerified: boolean;
  showReplies?: boolean;
}

interface CommentModalProps {
  visible: boolean;
  onClose: () => void;
  comments?: TComment[];
}

interface CommentsByPost {
  [postId: string]: TComment[];
}

interface CommentStore {
  commentsByPost: CommentsByPost;
  addComment: (postId: string, comment: TComment) => void;
  addReply: (postId: string, parentCommentId: string, reply: TComment) => void;
  toggleCommentLike: (
    postId: string,
    commentId: string,
    parentId?: string
  ) => void;
  toggleShowReplies: (postId: string, commentId: string) => void;
  initializeComments: (postId: string, comments: TComment[]) => void;
  reset: () => void;
}

// GraphQL types for backend type checks

interface GComment {
  id: string;
  postId?: string;
  storyId?: string;
  content: string;
  ownerId: string;
  isReply: boolean;
  replyToId?: string;
  post?: GPost;
  story?: GStory;
  owner?: GUser;
  replyTo?: GComment;
  likes: GLike[];
  replies: GComment[];
}
