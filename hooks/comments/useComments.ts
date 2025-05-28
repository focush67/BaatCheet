import { sampleComments } from "@/constants/data";
import { useCommentStore } from "@/stores/CommentStore";
import { useEffect, useMemo, useState } from "react";

export const useComments = (
  initialComments = sampleComments,
  postId: string
) => {
  const [newComment, setNewComment] = useState("");

  const {
    commentsByPost,
    addComment: addCommentToStore,
    addReply: addReplyToStore,
    toggleCommentLike,
    toggleShowReplies,
    initializeComments,
  } = useCommentStore();

  const comments = useMemo(
    () => commentsByPost[postId] || [],
    [commentsByPost, postId]
  );

  useEffect(() => {
    initializeComments(postId, sampleComments);
  }, []);

  const addComment = (text: string) => {
    const comment: TComment = {
      id: Date.now().toString(),
      postId,
      username: "Current User",
      avatar: "https://i.pravatar.cc/150?img=3",
      text,
      time: "Just Now",
      liked: false,
      likes: 0,
      replies: [],
      isVerified: false,
    };
    addCommentToStore(postId, comment);
    setNewComment("");
  };

  const addReply = (parentId: string, text: string) => {
    if (!text.trim()) {
      return;
    }
    const reply: TComment = {
      id: `${parentId}-${Date.now()}`,
      postId,
      username: "current_user",
      avatar: "https://i.pravatar.cc/150?img=3",
      text,
      time: "Just now",
      liked: false,
      likes: 0,
      replies: [],
      isVerified: false,
    };
    addReplyToStore(postId, parentId, reply);
  };

  return {
    comments,
    newComment,
    setNewComment,
    toggleReplies: (id: string) => toggleShowReplies(postId, id),
    toggleLike: (id: string, isReply = false, parentId?: string) =>
      toggleCommentLike(postId, id, parentId),
    addComment,
    addReply,
  };
};
