interface GCommentBase {
  id: string;
  content: string;
  isReply: boolean;
  replyToId?: string;
  createdAt: string;
}

interface LikeDispatch {
  postId: string;
  commentId: string;
  parentId?: string;
  userId: string;
  userEmail: string;
  likeId: string;
}

interface GComment extends GCommentBase {
  postId?: string;
  storyId?: string;
  post?: GPost;
  story?: GStory;
  owner: GUser;
  replyTo?: GComment;
  likes: GLike[];
  replies: GComment[];
}

interface UIComment extends GComment {
  liked?: boolean;
  showReplies?: boolean;
}

interface CommentsByPost {
  [postId: string]: UIComment[];
}

interface ZCommentStore {
  commentsByPost: CommentsByPost;
  addComment: (postId: string, comment: GComment) => void;
  addReply: (postId: string, parentCommentId: string, reply: GComment) => void;
  toggleCommentLike: ({ input }: LikeDispatch) => void;
  toggleShowReplies: (postId: string, commentId: string) => void;
  fetchComments: (postId: string, currentUserEmail: string) => Promise<void>;
  reset: () => void;
}
