interface TNotification {
  id: number;
  type: "like" | "comment" | "share" | "follow" | "mention";
  user: {
    name: string;
    avatar: string;
  };
  text?: string;
  postImage?: string;
  time: string;
  read: boolean;
}
