import { sampleComments } from "@/constants/data";
import { useComments } from "@/hooks/comments/useComments";
import { useReply } from "@/hooks/comments/useReply";
import { useCommentStore } from "@/stores/CommentStore";
import React from "react";
import { ScrollView, View } from "react-native";
import CommentThread from "./CommentThread";
import TopLevelCommentBox from "./TopLevelCommentBox";

const CommentsSection = ({ postId }: { postId: string }) => {
  const {
    newComment,
    setNewComment,
    toggleReplies,
    toggleLike,
    addComment,
    addReply,
  } = useComments(sampleComments, postId);

  const { replyingTo, replyText, setReplyText, startReply, cancelReply } =
    useReply();
  const commentStore = useCommentStore((state) => state.commentsByPost[postId]);
  console.log(`Comment Section rendered for ${postId}`);
  return (
    <View className="flex-1">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {commentStore.map((comment) => (
          <CommentThread
            key={comment.id}
            comment={comment}
            toggleReplies={toggleReplies}
            toggleLike={toggleLike}
            startReply={startReply}
            addReply={addReply}
            replyText={replyText}
            setReplyText={setReplyText}
            replyingTo={replyingTo}
            cancelReply={cancelReply}
            postId={postId}
          />
        ))}
      </ScrollView>

      {!replyingTo && (
        <TopLevelCommentBox
          value={newComment}
          onChange={setNewComment}
          onSubmit={addComment}
        />
      )}
    </View>
  );
};

export default React.memo(CommentsSection);
