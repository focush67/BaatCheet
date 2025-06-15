import React, { useState } from "react";
import { View } from "react-native";
import ReplyComposer from "./ReplyComposer";
import SingleThread from "./SingleThread";
import { useCommentStore } from "@/stores/CommentStore";
import { addReplyToComment } from "@/services/postService";
import { useUser } from "@clerk/clerk-expo";

const CommentThread = ({ comment, postId, setShowInput }: any) => {
  const { user } = useUser();
  if (!user) {
    return null;
  }
  const [replyingTo, setReplyingTo] = useState<{
    commentId: string;
    username: string;
  } | null>(null);

  const updateRepliesForStore = useCommentStore((state) => state.addReply);
  const toggleReplies = useCommentStore((state) => state.toggleShowReplies);

  const handleStartReply = (commentData: any) => {
    setShowInput(false);
    setReplyingTo({
      commentId: commentData.id,
      username: commentData.owner.username,
    });
  };

  const handleCancelReply = () => {
    setShowInput(true);
    setReplyingTo(null);
  };

  const handleToggleReplies = (commentId: string) => {
    toggleReplies(postId, commentId);
  };

  const handleSubmitReply = async (replyText: string) => {
    if (!replyingTo) {
      return null;
    }
    const response = await addReplyToComment(
      replyingTo?.commentId!,
      user.emailAddresses[0].emailAddress,
      replyText
    );

    updateRepliesForStore(postId, replyingTo?.commentId!, response);
    setReplyingTo(null);
    setShowInput(true);
  };

  return (
    <View className="pb-4">
      <SingleThread
        data={comment}
        isReply={false}
        postId={postId}
        startReply={handleStartReply}
        toggleReplies={handleToggleReplies}
      />

      {replyingTo?.commentId === comment.id && (
        <ReplyComposer
          username={replyingTo?.username}
          postId={postId}
          commentId={comment.id}
          onCancel={handleCancelReply}
          onSubmit={(replyText: string) => handleSubmitReply(replyText)}
        />
      )}

      {comment?.showReplies && (
        <View className="ml-12 space-y-3 mt-3">
          {comment.showReplies &&
            comment.replies.map((reply: any, idx: number) => (
              <SingleThread
                key={idx}
                data={reply}
                isReply={true}
                parentId={comment.id}
                postId={postId}
                startReply={handleStartReply}
              />
            ))}
        </View>
      )}
    </View>
  );
};

export default React.memo(CommentThread);
