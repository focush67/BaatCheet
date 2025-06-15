import { create } from "zustand";
import { persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchCommentsOnPost } from "@/services/postService";

export const useCommentStore = create<ZCommentStore>()(
  persist(
    (set, get) => ({
      commentsByPost: {},

      fetchComments: async (postId, currentUserEmail) => {
        const postComments = await fetchCommentsOnPost(postId);
        const processedComments = postComments.map((comment) => ({
          ...comment,
          liked: comment.likes.some(
            (l) => l?.owner?.email === currentUserEmail
          ),
          replies:
            comment.replies?.map((reply) => ({
              ...reply,
              liked: reply.likes.some(
                (l) => l?.owner?.email === currentUserEmail
              ),
            })) || [],
        }));

        set((state) => ({
          commentsByPost: {
            ...state.commentsByPost,
            [postId]: processedComments,
          },
        }));
      },

      addComment: (postId, comment) => {
        console.log("Comment inside addComment", comment);
        const prev = get().commentsByPost[postId] || [];
        set({
          commentsByPost: {
            ...get().commentsByPost,
            [postId]: [...prev, comment],
          },
        });
      },

      removeComment(postId, commentId, userEmail) {
        const prevComments = get().commentsByPost[postId] || [];
        const updatedComments = prevComments
          .map((comment) => {
            if (comment.replies?.some((r) => r.id === commentId)) {
              return {
                ...comment,
                replies: comment.replies.filter(
                  (reply) =>
                    reply.id !== commentId || reply.owner.email !== userEmail
                ),
              };
            }

            if (comment.id === commentId) {
              if (comment.owner.email === userEmail) {
                return null;
              } else {
                return comment;
              }
            }
            return comment;
          })
          .filter(Boolean);

        set((state) => ({
          commentsByPost: {
            ...state.commentsByPost,
            [postId]: updatedComments as UIComment[],
          },
        }));
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

      toggleCommentLike: (input) => {
        const { postId, commentId, parentId, userEmail, userId, likeId } =
          input;

        console.log("Input", input);
        const before = get().commentsByPost[postId] || [];
        const updated = before.map((comment) => {
          if (comment.id === commentId && !parentId) {
            console.log("Updating Normal Comment");
            const userLikeIndex =
              comment.likes?.findIndex((l) => l?.owner?.email === userEmail) ??
              -1;

            const isLiked = userLikeIndex !== -1;
            let newLikes = [...(comment.likes || [])];
            let newLikedStatus = comment.liked;

            if (isLiked) {
              newLikes.splice(userLikeIndex, 1);
              newLikedStatus = false;
            } else {
              newLikes.push({
                id: likeId,
                ownerId: userId,
                owner: {
                  email: userEmail,
                  id: userId,
                  profilePicture: "",
                  bio: "",
                  createdAt: "",
                  followers: [],
                  following: [],
                  likes: [],
                  comments: [],
                  collections: [],
                  highlights: [],
                  stories: [],
                  posts: [],
                  taggedPosts: [],
                },
              });
              newLikedStatus = true;
            }

            return {
              ...comment,
              liked: newLikedStatus,
              likes: newLikes,
            };
          }

          if (parentId && comment.id === parentId) {
            console.log("Liking Reply");
            return {
              ...comment,
              replies:
                comment.replies?.map((reply) => {
                  if (reply.id === commentId) {
                    const userLikeIndex =
                      reply.likes?.findIndex(
                        (l) => l?.owner?.email === userEmail
                      ) ?? -1;

                    const isLiked = userLikeIndex !== -1;

                    let newReplyLikes = [...(reply.likes || [])];
                    let newLikedStatus = reply.likes.some(
                      (l) => l.owner.email === userEmail
                    );

                    if (isLiked) {
                      newReplyLikes.splice(userLikeIndex, 1);
                      newLikedStatus = false;
                    } else {
                      newReplyLikes.push({
                        id: likeId,
                        ownerId: userId,
                        owner: {
                          email: userEmail,
                          id: userId,
                          profilePicture: "",
                          bio: "",
                          createdAt: "",
                          followers: [],
                          following: [],
                          likes: [],
                          comments: [],
                          collections: [],
                          highlights: [],
                          stories: [],
                          posts: [],
                          taggedPosts: [],
                        },
                      });
                      newLikedStatus = true;
                    }

                    return {
                      ...reply,
                      liked: newLikedStatus,
                      likes: newReplyLikes,
                    };
                  }
                  return reply;
                }) || [],
            };
          }

          return comment;
        });

        set((state) => ({
          commentsByPost: {
            ...state.commentsByPost,
            [postId]: updated,
          },
        }));
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
