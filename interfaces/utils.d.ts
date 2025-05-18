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
