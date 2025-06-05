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
