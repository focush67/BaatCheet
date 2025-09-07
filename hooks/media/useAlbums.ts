import * as MediaLibrary from "expo-media-library";
import { useEffect, useState, useCallback, useMemo } from "react";

export const useAlbums = (
  permissionStatus: MediaLibrary.PermissionStatus | undefined
) => {
  const [albums, setAlbums] = useState<MediaLibrary.Album[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState<MediaLibrary.Album | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchAlbums = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      let allAlbums: MediaLibrary.Album[] = [];
      try {
        const both = await MediaLibrary.getAlbumsAsync({
          includeSmartAlbums: true,
        });
        allAlbums = both;
      } catch (err) {
        const userAlbums = await MediaLibrary.getAlbumsAsync({
          includeSmartAlbums: false,
        });
        const smartAlbums = await MediaLibrary.getAlbumsAsync({
          includeSmartAlbums: true,
        });
        allAlbums = [...userAlbums, ...smartAlbums];
      }

      const deduped = allAlbums.filter(
        (album, index, self) =>
          index === self.findIndex((a) => a.id === album.id)
      );

      const sortedAlbums = deduped.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
      setAlbums(sortedAlbums);

      if (!selectedAlbum) {
        const defaultAlbum =
          sortedAlbums.find((a) => a.title === "Camera Roll") ||
          sortedAlbums.find((a) => a.title === "All Photos") ||
          sortedAlbums[0] ||
          null;
        setSelectedAlbum(defaultAlbum);
      }
    } catch (err) {
      console.error("Album fetch error:", err);
      setError(
        err instanceof Error ? err : new Error("Could not load media albums")
      );
    } finally {
      setIsLoading(false);
    }
  }, [selectedAlbum]);

  useEffect(() => {
    let mounted = true;
    if (permissionStatus === "granted") {
      (async () => {
        if (!mounted) return;
        await fetchAlbums();
      })();
    }
    return () => {
      mounted = false;
    };
  }, [permissionStatus, fetchAlbums]);

  return useMemo(
    () => ({
      albums,
      selectedAlbum,
      setSelectedAlbum,
      isLoading,
      error,
      fetchAlbums,
    }),
    [albums, selectedAlbum, isLoading, error, fetchAlbums]
  );
};
