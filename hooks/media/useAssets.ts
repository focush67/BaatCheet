import * as MediaLibrary from "expo-media-library";
import { useEffect, useState, useMemo, useCallback } from "react";

interface UseAssetOptions {
  pageSize?: number;
  maxAssets?: number;
}

export const useAssets = (
  selectedAlbum: MediaLibrary.Album | null,
  options: UseAssetOptions = {}
) => {
  const { pageSize = 10, maxAssets = 500 } = options;
  const [assets, setAssets] = useState<MediaLibrary.Asset[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchAssets = useCallback(
    async (album: MediaLibrary.Album) => {
      setIsLoading(true);
      setError(null);
      try {
        let fetchedAssets: MediaLibrary.Asset[] = [];
        let hasNextPage = true;
        let endCursor: string | undefined;

        while (hasNextPage && fetchedAssets.length < maxAssets) {
          const result = await MediaLibrary.getAssetsAsync({
            first: pageSize,
            after: endCursor,
            album: album,
            sortBy: ["creationTime"],
            mediaType: ["photo"],
          });

          fetchedAssets = [...fetchedAssets, ...result.assets];
          endCursor = result.endCursor;
          hasNextPage = result.hasNextPage;
        }

        setAssets(fetchedAssets);
        if (!selectedImage && fetchAssets.length > 0) {
          setSelectedImage(fetchedAssets[0].uri);
        }
      } catch (err) {
        console.error("Asset fetch error:", err);
        setError(
          err instanceof Error
            ? err
            : new Error("Could not load media from this album")
        );
      } finally {
        setIsLoading(false);
      }
    },
    [pageSize, maxAssets, selectedImage]
  );

  useEffect(() => {
    let mounted = true;
    if (selectedAlbum) {
      (async () => {
        if (!mounted) return;
        await fetchAssets(selectedAlbum);
      })();
    } else {
      setAssets([]);
    }

    return () => {
      mounted = false;
    };
  }, [selectedAlbum, fetchAssets]);

  return useMemo(
    () => ({
      assets,
      selectedImage,
      setSelectedImage,
      isLoading,
      error,
      fetchAssets,
    }),
    [assets, selectedImage, isLoading, error, fetchAssets]
  );
};
