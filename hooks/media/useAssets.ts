// hooks/useAssets.ts
import * as MediaLibrary from "expo-media-library";
import { useEffect, useState } from "react";

export const useAssets = (selectedAlbum: MediaLibrary.Album | null) => {
  const [assets, setAssets] = useState<MediaLibrary.Asset[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
      throw new Error("Could not load media from this album");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedAlbum) {
      fetchAssets(selectedAlbum);
    }
  }, [selectedAlbum]);

  return { assets, selectedImage, setSelectedImage, isLoading };
};
