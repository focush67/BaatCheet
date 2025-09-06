import * as MediaLibrary from "expo-media-library";
import { Image, TouchableOpacity } from "react-native";

interface AssetItemProps {
  item: MediaLibrary.Asset;
  isSelected: boolean;
  onPress: () => void;
  size: number;
}

export const AssetItem = ({
  item,
  isSelected,
  onPress,
  size,
}: AssetItemProps) => (
  <TouchableOpacity onPress={onPress}>
    <Image
      source={{ uri: item.uri }}
      style={{
        width: size,
        height: size,
        margin: 2,
        borderWidth: isSelected ? 2 : 0,
        borderColor: "#3b82f6",
      }}
    />
  </TouchableOpacity>
);
