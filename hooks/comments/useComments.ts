import { useCommentStore } from "@/stores/CommentStore";
import { useMemo, useState } from "react";

export const useComments = (postId: string) => {
  const [newComment, setNewComment] = useState("");
  const { commentsByPost, toggleShowReplies } = useCommentStore();

  const comments = useMemo(
    () => commentsByPost[postId] || [],
    [commentsByPost, postId]
  );

  return {
    comments,
    newComment,
    setNewComment,
    toggleReplies: (id: string) => toggleShowReplies(postId, id),
  };
};
