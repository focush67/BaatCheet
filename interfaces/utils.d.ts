interface ThemeProps {
  background: string;
  text: string;
  primary: string;
}

interface HeaderBarProps {
  unreadMessages?: number;
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

interface UploadFileWrapperProps {
  selectedImage: string;
  user: string;
  setLoading: (_: boolean) => void;
  folder: string;
  identifier: string;
  purpose: string;
}

type IoniconsName = React.ComponentProps<typeof Ionicons>["name"];
type GraphQLOperation = {
  query: string;
  variables?: Record<string, any>;
};

type ApiConfig<TVariables, TResponse> = {
  operation: GraphQLOperation;
  responseKey: string;
  friendlyErrorMessage: string;
  logLabel: string;
  serviceName: string;
  variables?: TVariables;
  transformResponse?: (data: any) => TResponse;
};

interface ImagePreviewProps {
  uri: string | null;
  emptyText: string;
}

interface NextButtonProps {
  disabled: boolean;
  onPress: () => void;
}

interface ClerkErrorShape {
  status?: number;
  errors?: Array<{ code?: string; message?: string; longMessage?: string }>;
}

interface UseSignInFormReturn {
  email: string;
  setEmail: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
  isLoading: boolean;
  isFormValid: boolean;
  handleSubmit: () => Promise<void>;
  reset: () => void;
}

interface ProfileAvatarProps {
  username: string;
  size?: number;
  imageUrl?: string | null;
  isFollowing: boolean;
  toggleFollow: () => void;
  modalVisible: boolean;
  setModalVisible: (v: boolean) => void;
}

interface UploadResult {
  success: boolean;
  publicUrl?: string;
  error?: string;
}
