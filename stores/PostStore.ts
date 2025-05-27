import { samplePosts } from "@/constants/data";
import { create } from "zustand";

export const usePostStore = create<PostStore>((set) => ({
  posts: samplePosts,
  setPosts: (posts) => set({ posts }),

  toggleLike: (id) =>
    set((state) => ({
      posts: state.posts.map((p) => {
        if (p.id !== id) return p;

        const isNowLiked = !p.isLiked;
        const likes = isNowLiked ? p.likes + 1 : p.likes - 1;

        return {
          ...p,
          isLiked: isNowLiked,
          likes: likes < 0 ? 0 : likes,
        };
      }),
    })),

  toggleBookmark: (id) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === id ? { ...post, isBookmarked: !post.isBookmarked } : post
      ),
    })),
}));
