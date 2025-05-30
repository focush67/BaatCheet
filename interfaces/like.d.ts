interface GLike {
  id: string;
  postId?: string;
  storyId?: string;
  ownerId: string;
  commentId?: string;
  owner: GUser;
  post?: GPost;
  story?: GStory;
  comment?: GComment;
}
