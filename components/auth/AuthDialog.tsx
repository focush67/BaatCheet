import { useTheme } from "@/context/ThemeContext";
import { Text } from "react-native";
import { Button, Dialog, Portal } from "react-native-paper";

export const AuthDialog = ({
  visible,
  onDismiss,
  title,
  message,
  showSignUp = false,
  onSignUp,
}: {
  visible: boolean;
  onDismiss: () => void;
  title: string;
  message: string;
  showSignUp?: boolean;
  onSignUp?: () => void;
}) => {
  const { colorScheme } = useTheme();
  const isLight = colorScheme === "light";

  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={onDismiss}
        style={{
          backgroundColor: isLight ? "#fff" : "#000",
          borderRadius: 12,
        }}
      >
        <Dialog.Title style={{ color: isLight ? "#000" : "#fff" }}>
          {title}
        </Dialog.Title>
        <Dialog.Content>
          <Text style={{ color: isLight ? "#000" : "#fff", fontSize: 16 }}>
            {message}
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            onPress={onDismiss}
            textColor={isLight ? "#64748b" : "#94a3b8"}
          >
            Cancel
          </Button>
          {showSignUp && (
            <Button
              onPress={onSignUp}
              textColor={isLight ? "#3b82f6" : "#60a5fa"}
            >
              Sign Up
            </Button>
          )}
          <Button
            onPress={onDismiss}
            textColor={isLight ? "#3b82f6" : "#60a5fa"}
          >
            OK
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
