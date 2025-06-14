import React from "react";
import { View } from "react-native";
import ReplyComposer from "./ReplyComposer";
import SingleThread from "./SingleThread";

const CommentThread = ({ comment, postId }: any) => {
  return (
    <View className="pb-4">
      <SingleThread data={comment} isReply={false} postId={postId} />

      {comment?.showReplies && (
        <View className="ml-12 space-y-3 mt-3">
          {comment.showReplies &&
            comment.replies.map((reply: any) => (
              <SingleThread
                key={reply.id}
                data={reply}
                isReply={true}
                parentId={comment.id}
              />
            ))}
        </View>
      )}
    </View>
  );
};

export default React.memo(CommentThread);
