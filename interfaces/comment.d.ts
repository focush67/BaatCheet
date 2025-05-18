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
