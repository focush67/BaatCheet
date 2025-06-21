import * as Haptics from "expo-haptics";

export const useHaptics = () => {
  return {
    selection: () => Haptics.selectionAsync(),
    notification: (type: "success" | "warning" | "error") => {
      Haptics.notificationAsync(
        type === "success"
          ? Haptics.NotificationFeedbackType.Success
          : type === "warning"
          ? Haptics.NotificationFeedbackType.Warning
          : Haptics.NotificationFeedbackType.Error
      );
    },
  };
};
