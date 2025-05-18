import { useState } from "react";

export const useReply = () => {
  const [replyingTo, setReplyingTo] = useState<TComment | null>(null);
  const [replyText, setReplyText] = useState("");

  const startReply = (comment: TComment) => {
    setReplyingTo(comment);
    setReplyText(`@${comment.username} `);
  };

  const cancelReply = () => {
    setReplyingTo(null);
    setReplyText("");
  };

  return {
    replyingTo,
    replyText,
    setReplyText,
    startReply,
    cancelReply,
  };
};
