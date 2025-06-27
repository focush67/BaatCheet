interface ThemeProps {
  background: string;
  text: string;
  primary: string;
}

interface ThemeContextType {
  theme: ThemeProps;
  colorScheme: "light" | "dark";
}

interface ModalHeaderProps {
  title: string;
  onClose: () => void;
  showBackButton?: boolean;
  onBack?: () => void;
}

interface HeaderBarProps {
  unreadMessages?: number;
}

interface UploadOptions {
  bucket: string;
  pathPrefix?: string;
  upsert?: boolean;
  updateClerkUser?: {
    user: any;
    updateMetadata?: boolean;
    updateProfileImage?: boolean;
  };
}

type IoniconsName = React.ComponentProps<typeof Ionicons>["name"];
