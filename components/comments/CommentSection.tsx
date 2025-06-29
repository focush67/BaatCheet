import { useCommentStore } from "@/stores/CommentStore";
import React, { useState } from "react";
import {
  ScrollView,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import CommentThread from "./CommentThread";
import TopLevelCommentBox from "./TopLevelCommentBox";

const CommentsSection = ({ postId }: { postId: string }) => {
  const commentStore = useCommentStore((state) => state.commentsByPost[postId]);
  const [replyText, setReplyText] = useState("");
  const [showTopLevelCommentBox, setShowTopLevelCommentBox] = useState(true);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1"
      keyboardVerticalOffset={80}
    >
      <View className="flex-1">
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 16 }}
          showsVerticalScrollIndicator={false}
        >
          {commentStore && commentStore.length > 0 ? (
            commentStore.map((comment) => (
              <CommentThread
                key={comment.id}
                setShowInput={setShowTopLevelCommentBox}
                comment={comment}
                postId={postId}
              />
            ))
          ) : (
            <View className="flex-1 justify-center items-center mt-8 px-4">
              <Text className="text-center text-sm text-gray-500">
                No comments yet. Be the first to share your thoughts and start
                the conversation!
              </Text>
            </View>
          )}
        </ScrollView>

        <View className="border-t border-gray-700">
          {showTopLevelCommentBox && (
            <TopLevelCommentBox
              value={replyText}
              onChange={setReplyText}
              postId={postId}
              onSubmit={() => setReplyText("")}
            />
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default React.memo(CommentsSection);
