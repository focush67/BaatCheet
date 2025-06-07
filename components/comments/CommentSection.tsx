import { useCommentStore } from "@/stores/CommentStore";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import CommentThread from "./CommentThread";

const CommentsSection = ({ postId }: { postId: string }) => {
  const commentStore = useCommentStore((state) => state.commentsByPost[postId]);

  return (
    <View className="flex-1">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {commentStore && commentStore.length > 0 ? (
          commentStore.map((comment) => (
            <CommentThread key={comment.id} comment={comment} postId={postId} />
          ))
        ) : (
          <View className="flex-1 justify-center items-center mt-8 px-4">
            <Text className="text-center text-sm text-gray-500">
              No comments yet. Be the first to share your thoughts and start the
              conversation!
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default React.memo(CommentsSection);
