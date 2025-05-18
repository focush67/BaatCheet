import { sampleComments } from "@/constants/data";
import { useState } from "react";

export const useComments = (initialComments = sampleComments) => {
  const [comments, setComments] = useState<TComment[]>(initialComments);
  const [newComment, setNewComment] = useState("");

  const toggleReplies = (commentId: string) => {
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === commentId
          ? { ...comment, showReplies: !comment.showReplies }
          : comment
      )
    );
  };

  const toggleLike = (
    commentId: string,
    isReply = false,
    parentId?: string
  ) => {
    setComments((prev) =>
      prev.map((comment) => {
        if (isReply && parentId && comment.id === parentId) {
          return {
            ...comment,
            replies: comment.replies.map((reply) =>
              reply.id === commentId
                ? {
                    ...reply,
                    liked: !reply.liked,
                    likes: reply.liked ? reply.likes - 1 : reply.likes + 1,
                  }
                : reply
            ),
          };
        } else if (!isReply && comment.id === commentId) {
          return {
            ...comment,
            liked: !comment.liked,
            likes: comment.liked ? comment.likes - 1 : comment.likes + 1,
          };
        }
        return comment;
      })
    );
  };

  const addComment = (text: string) => {
    const comment: TComment = {
      id: Date.now().toString(),
      username: "current_user",
      avatar: "https://i.pravatar.cc/150?img=3",
      text,
      time: "Just now",
      liked: false,
      likes: 0,
      replies: [],
      isVerified: false,
    };

    setComments([comment, ...comments]);
    setNewComment("");
  };

  const addReply = (parentId: string, text: string) => {
    if (!text.trim()) return;

    const reply: TComment = {
      id: `${parentId}-${Date.now()}`,
      username: "current_user",
      avatar: "https://i.pravatar.cc/150?img=3",
      text,
      time: "Just now",
      liked: false,
      likes: 0,
      replies: [],
      isVerified: false,
    };

    setComments((prev) =>
      prev.map((comment) =>
        comment.id === parentId
          ? {
              ...comment,
              replies: [...comment.replies, reply],
              showReplies: true,
            }
          : comment
      )
    );
  };

  return {
    comments,
    newComment,
    setNewComment,
    toggleReplies,
    toggleLike,
    addComment,
    addReply,
  };
};
