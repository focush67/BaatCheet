import { Text, TouchableOpacity } from "react-native";

export const NextButton = ({
  disabled,
  onPress,
}: {
  disabled: boolean;
  onPress: () => void;
}) => (
  <TouchableOpacity
    className={`m-1 mb-2 p-4 rounded items-center justify-center ${
      disabled ? "bg-gray-400 dark:bg-gray-700" : "bg-blue-500 dark:bg-blue-600"
    }`}
    onPress={onPress}
    disabled={disabled}
  >
    <Text className="text-white font-bold text-base">Next</Text>
  </TouchableOpacity>
);
