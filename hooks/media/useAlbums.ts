import * as MediaLibrary from "expo-media-library";
import { useEffect, useState } from "react";

export const useAlbums = (
  permissionStatus: MediaLibrary.PermissionStatus | undefined
) => {
  const [albums, setAlbums] = useState<MediaLibrary.Album[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState<MediaLibrary.Album | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

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
      throw new Error("Could not load media albums");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (permissionStatus === "granted") {
      fetchAlbums();
    }
  }, [permissionStatus]);

  return { albums, selectedAlbum, setSelectedAlbum, isLoading, fetchAlbums };
};
