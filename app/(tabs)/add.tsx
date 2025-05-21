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
import { SafeAreaView } from "react-native-safe-area-context";
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
          isSelected
            ? "bg-blue-100 dark:bg-blue-900"
            : "bg-gray-100 dark:bg-gray-800"
        }`}
        onPress={() => setSelectedAlbum(item)}
      >
        <Ionicons
          name="folder"
          size={24}
          color={isSelected ? "#3b82f6" : "gray"}
        />
        <Text className="ml-2 mr-2 max-w-[100px] text-gray-800 dark:text-gray-200 truncate">
          {item.title}
        </Text>
        {showCount && (
          <Text className="text-xs text-gray-500 dark:text-gray-400">
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
          borderColor: "#3b82f6", // Using your primary color
        }}
      />
    </TouchableOpacity>
  );

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

  if (isLoading && albums.length === 0) {
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
        {selectedImage ? (
          <Image
            source={{ uri: selectedImage }}
            resizeMode="contain"
            className="w-full h-full"
          />
        ) : (
          <View className="items-center justify-center">
            <Ionicons name="image" size={60} color="gray" />
            <Text className="mt-2 text-gray-500 dark:text-gray-400 text-lg">
              {assets.length === 0
                ? "No media in this album"
                : "No image selected"}
            </Text>
          </View>
        )}
      </View>

      {/* Bottom Section */}
      <View className="flex-1 border-t border-gray-200 dark:border-gray-800">
        <View className="h-[60px] border-b border-gray-200 dark:border-gray-800">
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
              <Text className="text-gray-500 dark:text-gray-400">
                No albums found
              </Text>
            </View>
          )}
        </View>

        {/* Assets Grid */}
        <View className="flex-1">
          {isLoading ? (
            <View className="flex-1 items-center justify-center">
              <ActivityIndicator size="large" color="#3b82f6" />
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
              <Text className="text-gray-500 dark:text-gray-400">
                No media found in this album
              </Text>
            </View>
          )}
        </View>

        {/* Next Button */}
        <TouchableOpacity
          className={`m-4 p-4 rounded items-center justify-center ${
            !selectedImage
              ? "bg-gray-400 dark:bg-gray-700"
              : "bg-blue-500 dark:bg-blue-600"
          }`}
          onPress={handleNext}
          disabled={!selectedImage}
        >
          <Text className="text-white font-bold text-base">Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
