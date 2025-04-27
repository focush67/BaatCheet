interface UserProfile {
  username: string,
  name: string,
  bio: string,
  posts: number,
  followers: string,
  following: string | int,
}

interface TabButtonProps {
  iconName: IoniconsName;
  isActive: boolean;
  onPress: () => void;
  iconColor: string;
  colorScheme:"light"|"dark"
}
