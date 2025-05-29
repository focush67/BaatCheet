import React from "react";
import { View } from "react-native";
import ReplyComposer from "./ReplyComposer";
import SingleThread from "./SingleThread";

const CommentThread = ({
  comment,
  toggleReplies,
  toggleLike,
  startReply,
  addReply,
  replyingTo,
  replyText,
  setReplyText,
  cancelReply,
  postId,
}: any) => {
  console.log("\n");
  console.log(`Comment Thread Rendered for ${postId}`);
  return (
    <View className="pb-4">
      <SingleThread
        data={comment}
        isReply={false}
        toggleLike={toggleLike}
        toggleReplies={toggleReplies}
        startReply={startReply}
        postId={postId}
      />

      {comment.showReplies && (
        <View className="ml-12 space-y-3 mt-3">
          {comment.showReplies &&
            comment.replies.map((reply: any) => (
              <SingleThread
                key={reply.id}
                data={reply}
                isReply={true}
                parentId={comment.id}
                toggleLike={toggleLike}
                startReply={startReply}
                toggleReplies={toggleReplies}
              />
            ))}

          {replyingTo?.id === comment.id && (
            <ReplyComposer
              postId={postId}
              replyText={replyText}
              onChange={setReplyText}
              onSubmit={() => addReply(comment.id, replyText)}
              onCancel={cancelReply}
              username={replyingTo.username}
            />
          )}
        </View>
      )}
    </View>
  );
};

export default React.memo(CommentThread);
