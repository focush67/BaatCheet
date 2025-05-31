import { uploadFileWrapper } from "@/utils/upload";

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
