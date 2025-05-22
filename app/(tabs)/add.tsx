import { AlbumItem } from "@/components/add/AlbumItem";
import { AssetItem } from "@/components/add/AssetItem";
import { ImagePreview } from "@/components/add/ImagePreview";
import { NextButton } from "@/components/add/NextButton";
import { useAlbums } from "@/hooks/media/useAlbums";
import { useAssets } from "@/hooks/media/useAssets";
import { useMediaLibrary } from "@/hooks/media/useMediaLibrary";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function UploadScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const thumbnailSize = width / 3 - 4;

  const { permissionStatus, isLoading: isPermissionLoading } =
    useMediaLibrary();
  const {
    albums,
    selectedAlbum,
    setSelectedAlbum,
    isLoading: _,
  } = useAlbums(permissionStatus);
  const {
    assets,
    selectedImage,
    setSelectedImage,
    isLoading: isAssetsLoading,
  } = useAssets(selectedAlbum);

  const handleNext = () => {
    if (selectedImage) {
      router.push({
        pathname: "../post/create",
        params: { imageUri: selectedImage },
      });
    }
  };

  if (permissionStatus === "denied") {
    return (
      <View className="flex-1 items-center justify-center bg-white dark:bg-black p-4">
        <Text className="text-gray-800 dark:text-gray-200 text-center mb-4">
          Media library permission is required to access your photos.
        </Text>
        <Text className="text-gray-500 dark:text-gray-400 text-center">
          Please enable it in your device settings.
        </Text>
      </View>
    );
  }

  if (isPermissionLoading && albums.length === 0) {
    return (
      <View className="flex-1 items-center justify-center bg-white dark:bg-black">
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text className="mt-4 text-gray-500 dark:text-gray-400">
          Loading your media...
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black" edges={["top"]}>
      {/* Back Button */}
      <View className="px-4 py-3">
        <TouchableOpacity
          onPress={() => router.back()}
          className="flex-row items-center"
        >
          <Ionicons name="arrow-back" size={24} color="gray" />
          <Text className="ml-2 text-lg text-gray-800 dark:text-gray-200">
            Back
          </Text>
        </TouchableOpacity>
      </View>

      {/* Image Preview Section */}
      <View className="flex-1 bg-gray-100 dark:bg-gray-900 items-center justify-center">
        <ImagePreview
          uri={selectedImage}
          emptyText={
            assets.length === 0 ? "No media in this album" : "No image selected"
          }
        />
      </View>

      {/* Bottom Section */}
      <View className="flex-1 border-t border-gray-200 dark:border-gray-800">
        <View className="h-[60px] border-b border-gray-200 dark:border-gray-800">
          {albums.length > 0 ? (
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
                paddingHorizontal: 10,
                alignItems: "center",
              }}
            />
          ) : (
            <View className="flex-1 items-center justify-center">
              <Text className="text-gray-500 dark:text-gray-400">
                No albums found
              </Text>
            </View>
          )}
        </View>

        {/* Assets Grid */}
        <View className="flex-1">
          {isAssetsLoading ? (
            <View className="flex-1 items-center justify-center">
              <ActivityIndicator size="large" color="#3b82f6" />
            </View>
          ) : assets.length > 0 ? (
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
              numColumns={3}
              contentContainerStyle={{ padding: 2 }}
            />
          ) : (
            <View className="flex-1 items-center justify-center">
              <Text className="text-gray-500 dark:text-gray-400">
                No media found in this album
              </Text>
            </View>
          )}
        </View>

        <NextButton disabled={!selectedImage} onPress={handleNext} />
      </View>
    </SafeAreaView>
  );
}
