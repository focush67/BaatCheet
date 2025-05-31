import { AlbumItem } from "@/components/add/AlbumItem";
import { AssetItem } from "@/components/add/AssetItem";
import { ImagePreview } from "@/components/add/ImagePreview";
import { NextButton } from "@/components/add/NextButton";
import { useAlbums } from "@/hooks/media/useAlbums";
import { useAssets } from "@/hooks/media/useAssets";
import { useMediaLibrary } from "@/hooks/media/useMediaLibrary";
import { Ionicons } from "@expo/vector-icons";
import {
  ActivityIndicator,
  FlatList,
  Modal,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

type ImageUploadModalProps = {
  visible: boolean;
  onClose: () => void;
  onImageSelected: (imageUri: string) => Promise<void>;
  title?: string;
  emptyPreviewText?: string;
};

export const ImageUploadModal = ({
  visible,
  onClose,
  onImageSelected,
  title = "Select Photo",
  emptyPreviewText = "Select a photo",
}: ImageUploadModalProps) => {
  const { width, height } = useWindowDimensions();
  const thumbnailSize = width / 4 - 6;
  const previewHeight = height * 0.4;

  const { permissionStatus } = useMediaLibrary();
  const { albums, selectedAlbum, setSelectedAlbum } =
    useAlbums(permissionStatus);
  const {
    assets,
    selectedImage,
    setSelectedImage,
    isLoading: isAssetLoading,
  } = useAssets(selectedAlbum);

  const handleSubmit = async () => {
    if (selectedImage) {
      await onImageSelected(selectedImage);
      onClose();
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-gray-50 dark:bg-zinc-900">
        <View className="flex-row justify-between items-center px-4 py-3 border-b border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-sm">
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={24} color="gray" />
          </TouchableOpacity>
          <Text className="text-lg font-semibold text-gray-900 dark:text-zinc-100">
            {title}
          </Text>
          <View style={{ width: 24 }} />
        </View>

        <View
          className="bg-gray-100 dark:bg-zinc-800 items-center justify-center rounded-md m-3"
          style={{ height: previewHeight }}
        >
          <ImagePreview uri={selectedImage} emptyText={emptyPreviewText} />
        </View>

        <View className="h-16 border-b border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900">
          {albums.length > 0 && (
            <FlatList
              data={albums}
              renderItem={({ item }) => (
                <AlbumItem
                  item={item}
                  isSelected={selectedAlbum?.id === item.id}
                  onPress={() => setSelectedAlbum(item)}
                />
              )}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: 12,
                alignItems: "center",
              }}
            />
          )}
        </View>

        <View className="flex-1 px-2 pt-2">
          {isAssetLoading ? (
            <View className="flex-1 items-center justify-center">
              <ActivityIndicator size="large" color="#3b82f6" />
            </View>
          ) : (
            <FlatList
              data={assets}
              renderItem={({ item }) => (
                <AssetItem
                  item={item}
                  isSelected={selectedImage === item.uri}
                  onPress={() => setSelectedImage(item.uri)}
                  size={thumbnailSize}
                />
              )}
              keyExtractor={(item) => item.id}
              numColumns={4}
              contentContainerStyle={{ paddingBottom: 100 }}
            />
          )}
        </View>

        <View className="absolute bottom-4 left-0 right-0 px-5">
          <NextButton disabled={!selectedImage} onPress={handleSubmit} />
        </View>
      </View>
    </Modal>
  );
};
