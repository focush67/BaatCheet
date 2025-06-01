export function groupStoriesByOwner(stories: GStory[]): UserStory[] {
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

  return Object.values(groupedStoriesMap);
}
