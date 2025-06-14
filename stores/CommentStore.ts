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
        postComments.map((comment) => {
          console.log(`Likes for ${comment.content}`, comment.likes);
        });
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
        console.log(
          `🟡 Starting toggleLike for comment ${input.commentId} on post ${input.postId}`
        );

        const { postId, commentId, parentId, userEmail, userId, likeId } =
          input;

        const before = get().commentsByPost[postId] || [];
        const beforeComment = before.find((c) => c.id === commentId);
        console.log(
          "🔵 Before state:",
          JSON.parse(JSON.stringify(beforeComment))
        );

        const updated = before.map((comment) => {
          if (comment.id === commentId && !parentId) {
            console.log(`🟠 Found main comment to like/unlike: ${commentId}`);

            const userLikeIndex =
              comment.likes?.findIndex((l) => l?.owner?.email === userEmail) ??
              -1;

            const isLiked = userLikeIndex !== -1;
            console.log(
              `🟠 Current like status: ${isLiked ? "LIKED" : "NOT LIKED"}`
            );

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

            console.log(`🟠 New likes count: ${newLikes.length}`);

            return {
              ...comment,
              liked: newLikedStatus,
              likes: newLikes,
            };
          }

          if (parentId && comment.id === parentId) {
            console.log(
              `🟠 Found parent comment ${parentId} containing reply ${commentId}`
            );
            return {
              ...comment,
              replies:
                comment.replies?.map((reply) => {
                  if (reply.id === commentId) {
                    console.log(`🟠 Found reply to like/unlike: ${commentId}`);

                    const userLikeIndex =
                      reply.likes?.findIndex(
                        (l) => l?.owner?.email === userEmail
                      ) ?? -1;

                    const isLiked = userLikeIndex !== -1;
                    console.log(
                      `🟠 Current like status: ${
                        isLiked ? "LIKED" : "NOT LIKED"
                      }`
                    );

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

                    console.log(
                      `🟠 New reply likes count: ${newReplyLikes.length}`
                    );

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

        const after = get().commentsByPost[postId].find(
          (c) => c.id === commentId
        );
        console.log("🟢 After state:", JSON.parse(JSON.stringify(after)));
        console.log(`🟡 Finished toggleLike for comment ${commentId}`);
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
