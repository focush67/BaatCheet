import { formatDistanceToNow } from "date-fns";

export function groupStoriesByOwner(
  stories: GStory[],
  currentUserEmail?: string
): UserStory[] {
  const groupedStoriesMap: Record<string, UserStory> = {};

  for (const story of stories) {
    const ownerEmail = story.owner.email;

    if (!groupedStoriesMap[ownerEmail]) {
      groupedStoriesMap[ownerEmail] = {
        owner: story.owner,
        stories: [],
      };
    }

    groupedStoriesMap[ownerEmail].stories.push(story);
  }

  const groupedStories = Object.values(groupedStoriesMap);

  if (currentUserEmail) {
    groupedStories.sort((a, b) => {
      if (a.owner.email === currentUserEmail) return -1;
      if (b.owner.email === currentUserEmail) return 1;
      return 0;
    });
  }

  return groupedStories;
}

export function generateUniqueFileName(...parts: string[]): string {
  const timestamp = new Date().toISOString();
  const randomSuffix = Math.random().toString(36).substring(2, 8);
  const sanitizedParts = parts.map((part) =>
    part
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-_]/g, "")
  );
  return `${sanitizedParts.join("_")}_${timestamp}_${randomSuffix}`;
}

export function mapPostToPostCard(post: GPost, userEmail: string): PostCard {
  const isLiked = post?.likes?.some((like) => like.owner.email === userEmail);
  const isBookmarked = post?.savedInCollections?.some((s) =>
    s.owners.some((ow) => ow.email === userEmail)
  );

  let timeAgo = "";
  if (post.createdAt) {
    timeAgo = formatDistanceToNow(new Date(Number(post.createdAt)), {
      addSuffix: true,
    }).replace(/^about /, "");
  }

  const map = {
    id: post.id,
    username: post.owner?.username ?? "unknown",
    avatar: post.owner?.profilePicture ?? "",
    image: post.coverPhoto,
    caption: post.caption ?? "",
    likes: post.likes?.length ?? 0,
    comments: post.comments?.length ?? 0,
    saves: post.savedInCollections?.length ?? 0,
    timeAgo,
    isLiked,
    isBookmarked,
  };

  console.log("Mapping post:", post, "=>", map);
  return map;
}
