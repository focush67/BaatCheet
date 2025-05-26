import { samplePosts } from "@/constants/data";

export const fetchPosts = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(samplePosts);
    }, 500);
  });
};
