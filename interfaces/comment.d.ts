interface ReplyProps {
  author: string;
  content: string;
  timestamp: string;
}

interface TComment {
  id: string;
  postId?: string;
  storyId?: string;
  content: string;
  isReply: boolean;
  replyToId?: string;
  post?: GPost;
  story?: GStory;
  owner?: GUser;
  replyTo?: TComment;
  liked?: boolean;
  showReplies?: boolean;
  likes: GLike[];
  replies: TComment[];
  createdAt?: string;
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

interface CommentModalProps {
  visible: boolean;
  onClose: () => void;
  comments?: TComment[];
}

interface CommentsByPost {
  [postId: string]: TComment[];
}

interface ZCommentStore {
  commentsByPost: CommentsByPost;
  addComment: (postId: string, comment: TComment) => void;
  addReply: (postId: string, parentCommentId: string, reply: TComment) => void;
  toggleCommentLike: (
    postId: string,
    commentId: string,
    parentId?: string,
    userEmail: string
  ) => void;
  toggleShowReplies: (postId: string, commentId: string) => void;
  initializeComments: (postId: string, comments: TComment[]) => void;
  reset: () => void;
}
