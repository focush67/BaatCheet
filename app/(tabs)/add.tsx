import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

export default function UploadScreen() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [albums, setAlbums] = useState<MediaLibrary.Album[]>([]);
  const [assets, setAssets] = useState<MediaLibrary.Asset[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState<MediaLibrary.Album | null>(
    null
  );
  const [permissionStatus, setPermissionStatus] =
    useState<MediaLibrary.PermissionStatus>();
  const [isLoading, setIsLoading] = useState(true);
  const { width } = useWindowDimensions();
  const router = useRouter();
  const { colorScheme } = useTheme();
  const thumbnailSize = width / 3 - 4;

  // Theme-aware colors
  const colors = {
    background: colorScheme === "light" ? "bg-white" : "bg-black",
    text: colorScheme === "light" ? "text-gray-800" : "text-gray-200",
    textSecondary: colorScheme === "light" ? "text-gray-500" : "text-gray-400",
    border: colorScheme === "light" ? "border-gray-200" : "border-gray-800",
    button: colorScheme === "light" ? "bg-blue-500" : "bg-blue-600",
    buttonDisabled: colorScheme === "light" ? "bg-gray-400" : "bg-gray-700",
    albumSelected: colorScheme === "light" ? "bg-blue-100" : "bg-blue-900",
    albumUnselected: colorScheme === "light" ? "bg-gray-100" : "bg-gray-800",
    icon: colorScheme === "light" ? "#333" : "#ccc",
    iconSelected: colorScheme === "light" ? "#0095f6" : "#3b82f6",
    previewBackground: colorScheme === "light" ? "bg-gray-100" : "bg-gray-900",
  };

  useEffect(() => {
    checkPermissions();
  }, []);

  useEffect(() => {
    if (selectedAlbum && permissionStatus === "granted") {
      fetchAssets(selectedAlbum);
    }
  }, [selectedAlbum, permissionStatus]);

  const checkPermissions = async () => {
    setIsLoading(true);
    try {
      const { status, canAskAgain } = await MediaLibrary.getPermissionsAsync();

      if (status === "undetermined" && canAskAgain) {
        const { status: newStatus } =
          await MediaLibrary.requestPermissionsAsync();
        setPermissionStatus(newStatus);
      } else {
        setPermissionStatus(status);
      }

      if (status === "granted") {
        await fetchAlbums();
      }
    } catch (error) {
      console.error("Permission error:", error);
      Alert.alert("Error", "Failed to check media permissions");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAlbums = async () => {
    setIsLoading(true);
    try {
      const userAlbums = await MediaLibrary.getAlbumsAsync({
        includeSmartAlbums: false,
      });

      const smartAlbums = await MediaLibrary.getAlbumsAsync({
        includeSmartAlbums: true,
      });

      const allAlbums = [...userAlbums, ...smartAlbums].filter(
        (album, index, self) =>
          index === self.findIndex((a) => a.id === album.id)
      );

      const sortedAlbums = allAlbums.sort((a, b) =>
        a.title.localeCompare(b.title)
      );

      setAlbums(sortedAlbums);

      const defaultAlbum =
        sortedAlbums.find((a) => a.title === "Camera Roll") ||
        sortedAlbums.find((a) => a.title === "All Photos") ||
        sortedAlbums[0];

      if (defaultAlbum) {
        setSelectedAlbum(defaultAlbum);
      }
    } catch (error) {
      console.error("Album fetch error:", error);
      Alert.alert("Error", "Could not load media albums");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAssets = async (album: MediaLibrary.Album) => {
    setIsLoading(true);
    try {
      let fetchedAssets: MediaLibrary.Asset[] = [];
      let hasNextPage = true;
      let endCursor: string | undefined;
      while (hasNextPage && fetchedAssets.length < 500) {
        const {
          assets: chunk,
          endCursor: nextCursor,
          hasNextPage: nextPage,
        } = await MediaLibrary.getAssetsAsync({
          first: 100,
          after: endCursor,
          album: album,
          sortBy: ["creationTime"],
          mediaType: ["photo"],
        });

        fetchedAssets = [...fetchedAssets, ...chunk];
        endCursor = nextCursor;
        hasNextPage = nextPage;
      }

      setAssets(fetchedAssets);
      setSelectedImage(fetchedAssets[0]?.uri || null);
    } catch (error) {
      console.error("Asset fetch error:", error);
      Alert.alert("Error", "Could not load media from this album");
      setAssets([]);
      setSelectedImage(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    if (selectedImage) {
      router.push({
        pathname: "../post/create",
        params: { imageUri: selectedImage },
      });
    }
  };

  const renderAlbumItem = ({ item }: { item: MediaLibrary.Album }) => {
    const showCount = item.assetCount > 0 || item.assetCount === undefined;
    const isSelected = selectedAlbum?.id === item.id;

    return (
      <TouchableOpacity
        className={`flex-row items-center px-4 py-2 mr-2 rounded-full ${
          isSelected ? colors.albumSelected : colors.albumUnselected
        }`}
        onPress={() => setSelectedAlbum(item)}
      >
        <Ionicons
          name="folder"
          size={24}
          color={isSelected ? colors.iconSelected : colors.icon}
        />
        <Text className={`ml-2 mr-2 max-w-[100px] ${colors.text} truncate`}>
          {item.title}
        </Text>
        {showCount && (
          <Text className={`text-xs ${colors.textSecondary}`}>
            {item.assetCount ?? "?"}
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  const renderAssetItem = ({ item }: { item: MediaLibrary.Asset }) => (
    <TouchableOpacity onPress={() => setSelectedImage(item.uri)}>
      <Image
        source={{ uri: item.uri }}
        style={{
          width: thumbnailSize,
          height: thumbnailSize,
          margin: 2,
          borderWidth: selectedImage === item.uri ? 2 : 0,
          borderColor: colors.iconSelected,
        }}
      />
    </TouchableOpacity>
  );

  if (permissionStatus === "denied") {
    return (
      <View
        className={`flex-1 items-center justify-center ${colors.background} p-4`}
      >
        <Text className={`${colors.text} text-center mb-4`}>
          Media library permission is required to access your photos.
        </Text>
        <Text className={`${colors.textSecondary} text-center`}>
          Please enable it in your device settings.
        </Text>
      </View>
    );
  }

  if (isLoading && albums.length === 0) {
    return (
      <View
        className={`flex-1 items-center justify-center ${colors.background}`}
      >
        <ActivityIndicator size="large" color={colors.iconSelected} />
        <Text className={`mt-4 ${colors.textSecondary}`}>
          Loading your media...
        </Text>
      </View>
    );
  }

  return (
    <View className={`flex-1 ${colors.background}`}>
      {/* Back Button */}
      <View className="px-4 py-3">
        <TouchableOpacity
          onPress={() => router.back()} // 👈 Go back
          className="flex-row items-center"
        >
          <Ionicons name="arrow-back" size={24} color={colors.icon} />
          <Text className={`ml-2 text-lg ${colors.text}`}>Back</Text>
        </TouchableOpacity>
      </View>

      {/* Image Preview Section */}
      <View
        className={`flex-1 ${colors.previewBackground} items-center justify-center`}
      >
        {selectedImage ? (
          <Image
            source={{ uri: selectedImage }}
            resizeMode="contain"
            className="w-full h-full"
          />
        ) : (
          <View className="items-center justify-center">
            <Ionicons name="image" size={60} color={colors.icon} />
            <Text className={`mt-2 ${colors.textSecondary} text-lg`}>
              {assets.length === 0
                ? "No media in this album"
                : "No image selected"}
            </Text>
          </View>
        )}
      </View>

      {/* Bottom Section */}
      <View className={`flex-1 border-t ${colors.border}`}>
        {/* Albums Row */}
        <View className={`h-[60px] border-b ${colors.border}`}>
          {albums.length > 0 ? (
            <FlatList
              data={albums}
              renderItem={renderAlbumItem}
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
              <Text className={colors.textSecondary}>No albums found</Text>
            </View>
          )}
        </View>

        {/* Assets Grid */}
        <View className="flex-1">
          {isLoading ? (
            <View className="flex-1 items-center justify-center">
              <ActivityIndicator size="large" color={colors.iconSelected} />
            </View>
          ) : assets.length > 0 ? (
            <FlatList
              data={assets}
              renderItem={renderAssetItem}
              keyExtractor={(item) => item.id}
              numColumns={3}
              contentContainerStyle={{ padding: 2 }}
            />
          ) : (
            <View className="flex-1 items-center justify-center">
              <Text className={colors.textSecondary}>
                No media found in this album
              </Text>
            </View>
          )}
        </View>

        {/* Next Button */}
        <TouchableOpacity
          className={`m-2 p-4 rounded items-center justify-center ${
            !selectedImage ? colors.buttonDisabled : colors.button
          }`}
          onPress={handleNext}
          disabled={!selectedImage}
        >
          <Text className="text-white font-bold text-base">Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
