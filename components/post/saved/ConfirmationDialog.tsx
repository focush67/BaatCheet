import React from "react";
import { Modal, Portal, Text, Button } from "react-native-paper";
import { useTheme } from "@/context/ThemeContext";
import { View } from "react-native";
interface ConfirmationDialogProps {
  visible: boolean;
  title: string;
  message: string;
  onDismiss: () => void;
  onConfirm: () => void;
}

const ConfirmationDialog = ({
  visible,
  title,
  message,
  onDismiss,
  onConfirm,
}: ConfirmationDialogProps) => {
  const { colorScheme } = useTheme();
  const isDarkMode = colorScheme === "dark";

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={{
          backgroundColor: isDarkMode ? "#1e1e1e" : "white",
          padding: 20,
          margin: 20,
          borderRadius: 8,
        }}
      >
        <Text
          variant="titleMedium"
          style={{
            marginBottom: 12,
            fontWeight: "bold",
            color: isDarkMode ? "white" : "black",
          }}
        >
          {title}
        </Text>
        <Text
          variant="bodyMedium"
          style={{
            marginBottom: 20,
            color: isDarkMode ? "#b0b0b0" : "#555",
          }}
        >
          {message}
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <Button
            mode="text"
            onPress={onDismiss}
            textColor={isDarkMode ? "#b0b0b0" : "#555"}
            style={{ marginRight: 10 }}
          >
            Cancel
          </Button>
          <Button
            mode="contained"
            onPress={onConfirm}
            buttonColor={isDarkMode ? "#ff4444" : "#ff4444"}
            textColor="white"
          >
            Remove
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};

export default ConfirmationDialog;
