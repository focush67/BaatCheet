import { createNewStory } from "@/services/storyService";
import { uploadFileWrapper } from "@/utils/upload";
import { useCallback, useEffect, useRef, useState } from "react";

export const handleStoryCreation = async ({
  user,
  selectedImage,
  setLoading,
}: {
  user: string;
  selectedImage: string;
  setLoading: (_: boolean) => void;
}) => {
  const uploadResults = await uploadFileWrapper({
    selectedImage,
    user,
    setLoading,
    folder: "stories",
    identifier: "story",
    purpose: "upload",
  });

  return uploadResults;
};

export function useStoryUpload() {
  const mountedRef = useRef(true);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const upload = useCallback(
    async (imageUri: string, userEmail?: string): Promise<UploadResult> => {
      if (!userEmail) {
        return { success: false, error: "User email unavailable" };
      }

      if (isUploading) {
        return { success: false, error: "Upload in progress" };
      }

      setIsUploading(true);
      setError(null);

      try {
        const uploadResults = await handleStoryCreation({
          selectedImage: imageUri,
          setLoading: (val: boolean) => {},
          user: userEmail,
        });

        if (!uploadResults || !uploadResults.publicUrl) {
          throw new Error("Upload failed to Supabase");
        }

        await createNewStory({
          coverPhoto: uploadResults.publicUrl,
          email: userEmail,
        });

        if (!mountedRef.current) {
          return { success: false, error: "Component Unmounted" };
        }

        setIsUploading(false);
        return { success: true, publicUrl: uploadResults.publicUrl };
      } catch (err: any) {
        console.error("Story Upload Error", err);
        const message = err?.message ?? "Failed to upload story";
        if (mountedRef.current) {
          setError(message);
        }
        setIsUploading(false);
        return { success: false, error: message };
      }
    },
    [isUploading]
  );

  return {
    upload,
    isUploading,
    error,
  };
}
