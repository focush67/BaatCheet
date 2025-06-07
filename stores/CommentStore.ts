import { create } from "zustand";
import { persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useCommentStore = create<ZCommentStore>()(
  persist(
    (set, get) => ({
      commentsByPost: {},

      initializeComments: (postId, comments) => {
        set((state) => ({
          commentsByPost: {
            ...state.commentsByPost,
            [postId]: comments,
          },
        }));
      },

      addComment: (postId, comment) => {
        const prev = get().commentsByPost[postId] || [];
        set({
          commentsByPost: {
            ...get().commentsByPost,
            [postId]: [...prev, comment],
          },
        });
      },

      addReply: (postId, parentCommentId, reply) => {
        const updated = (get().commentsByPost[postId] || []).map((comment) => {
          if (comment.id === parentCommentId) {
            return {
              ...comment,
              replies: [...(comment.replies || []), reply],
            };
          }
          return comment;
        });

        set({
          commentsByPost: {
            ...get().commentsByPost,
            [postId]: updated,
          },
        });
      },

      toggleCommentLike: (postId, commentId, parentId, userEmail) => {
        const updated = (get().commentsByPost[postId] || []).map((comment) => {
          if (comment.id === commentId && !parentId) {
            const isLiked = comment.likes.some(
              (l) => l.owner.email === userEmail
            );
            return {
              ...comment,
              liked: !isLiked,
              likes: isLiked
                ? comment.likes.filter((l) => l.owner.email !== userEmail)
                : [...comment.likes, { owner: { email: userEmail } }],
            };
          }

          if (parentId && comment.id === parentId) {
            return {
              ...comment,
              replies: comment.replies.map((reply) => {
                if (reply.id === commentId) {
                  const isLiked = reply.likes.some(
                    (l) => l.owner.email === userEmail
                  );
                  return {
                    ...reply,
                    liked: !isLiked,
                    likes: isLiked
                      ? reply.likes.filter((l) => l.owner.email !== userEmail)
                      : [...reply.likes, { owner: { email: userEmail } }],
                  };
                }
                return reply;
              }),
            };
          }

          return comment;
        });

        set({
          commentsByPost: {
            ...get().commentsByPost,
            [postId]: updated,
          },
        });
      },

      toggleShowReplies: (postId, commentId) => {
        const updated = (get().commentsByPost[postId] || []).map((comment) =>
          comment.id === commentId
            ? { ...comment, showReplies: !comment.showReplies }
            : comment
        );

        set({
          commentsByPost: {
            ...get().commentsByPost,
            [postId]: updated,
          },
        });
      },

      reset: () => {
        set({ commentsByPost: {} });
      },
    }),
    {
      name: "comment-storage",
      storage: {
        getItem: async (name) => {
          const value = await AsyncStorage.getItem(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: async (name, value) => {
          await AsyncStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: async (name) => {
          await AsyncStorage.removeItem(name);
        },
      },
    }
  )
);
