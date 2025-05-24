import { BaseToast, ErrorToast } from "react-native-toast-message";

export const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "#22c55e", backgroundColor: "#f0fdf4" }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontWeight: "bold",
        color: "#16a34a",
      }}
      text2Style={{
        fontSize: 14,
        color: "#15803d",
      }}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: "#ef4444", backgroundColor: "#fef2f2" }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontWeight: "bold",
        color: "#b91c1c",
      }}
      text2Style={{
        fontSize: 14,
        color: "#7f1d1d",
      }}
    />
  ),
};
