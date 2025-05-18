interface MessageItem {
  id: string;
  username: string;
  lastMessage: string;
  time: string;
  unread: boolean;
  avatar: string;
  isVerified?: boolean;
}

interface ChatBubbleMessage {
  id: string;
  text: string;
  isMe: boolean;
  time: string;
}

interface ChatBubbleProps {
  message: ChatBubbleMessage;
}

interface ChatMessage {
  text: string;
  timestamp: string;
  isOwnMessage: boolean;
}
