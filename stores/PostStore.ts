import { samplePosts } from "@/constants/data";
import { create } from "zustand";
export const usePostStore = create<ZPostStore>((set, get) => ({
  posts: {},

  get postArray(): PostCard[] {
    return Object.values(get().posts);
  },

  setPost: (post) =>
    set((state) => ({
      posts: {
        ...state.posts,
        [post.id]: post,
      },
    })),

  loadPosts: () => {
    const initialPosts: Record<string, PostCard> = {};
    for (const p of samplePosts) {
      initialPosts[p.id] = { ...p };
    }
    set({ posts: initialPosts });
  },

  incrementLike: (postId) =>
    set((state) => {
      const post = state.posts[postId];
      if (!post) return state;
      const isLiked = !post.isLiked;
      const likes = post.likes + (isLiked ? 1 : -1);
      return {
        posts: {
          ...state.posts,
          [postId]: {
            ...post,
            likes,
            isLiked,
          },
        },
      };
    }),

  incrementComment: (postId) =>
    set((state) => {
      const post = state.posts[postId];
      if (!post) return state;
      return {
        posts: {
          ...state.posts,
          [postId]: {
            ...post,
            comments: post.comments + 1,
          },
        },
      };
    }),

  incrementSave: (postId) =>
    set((state) => {
      const post = state.posts[postId];
      if (!post) return state;
      return {
        posts: {
          ...state.posts,
          [postId]: {
            ...post,
            saves: post.saves + 1,
          },
        },
      };
    }),
}));
