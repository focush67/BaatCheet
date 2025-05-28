import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCommentStore = create<CommentStore>()(
  persist(
    (set, get) => ({
      commentsByPost: {},

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
        const updateReplies = (comments: TComment[]): TComment[] =>
          comments.map((comment) => {
            if (comment.id === parentCommentId) {
              return {
                ...comment,
                replies: [...comment.replies, reply],
              };
            }
            return {
              ...comment,
              replies: updateReplies(comment.replies),
            };
          });

        const updated = updateReplies(get().commentsByPost[postId] || []);
        set({
          commentsByPost: {
            ...get().commentsByPost,
            [postId]: updated,
          },
        });
      },

      toggleCommentLike: (postId, commentId, parentId) => {
        const toggle = (comments: TComment[]): TComment[] =>
          comments.map((comment) => {
            if (comment.id === commentId) {
              const isNowLiked = !comment.liked;
              return {
                ...comment,
                liked: isNowLiked,
                likes: isNowLiked
                  ? comment.likes + 1
                  : Math.max(comment.likes - 1, 0),
              };
            }
            return {
              ...comment,
              replies: toggle(comment.replies),
            };
          });

        set({
          commentsByPost: {
            ...get().commentsByPost,
            [postId]: toggle(get().commentsByPost[postId] || []),
          },
        });
      },

      toggleShowReplies: (postId, commentId) => {
        const update = (comments: TComment[]): TComment[] =>
          comments.map((comment) => {
            if (comment.id === commentId) {
              return {
                ...comment,
                showReplies: !comment.showReplies,
              };
            }
            return {
              ...comment,
              replies: update(comment.replies),
            };
          });

        set({
          commentsByPost: {
            ...get().commentsByPost,
            [postId]: update(get().commentsByPost[postId] || []),
          },
        });
      },

      initializeComments(postId, comments) {
        const hasComments = !!get().commentsByPost[postId];
        if (!hasComments) {
          const addPostId = (commentList: TComment[]): TComment[] =>
            commentList.map((c) => ({
              ...c,
              postId,
              replies: addPostId(c.replies || []),
            }));

          const formattedComments = addPostId(comments);

          set((state) => ({
            commentsByPost: {
              ...state.commentsByPost,
              [postId]: formattedComments,
            },
          }));
        }
      },
      reset: () => {
        useCommentStore.persist.clearStorage();
        set({ commentsByPost: {} });
      },
    }),

    {
      name: "comments-store",
      storage: {
        getItem: async (name) => {
          const item = await AsyncStorage.getItem(name);
          return item ? JSON.parse(item) : null;
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
