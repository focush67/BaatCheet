import { uploadFileWrapper } from "@/utils/upload";

export const handleHighlightCreation = async ({
  user,
  selectedImage,
  setLoading,
}: {
  user: any;
  selectedImage: string;
  setLoading: (_: boolean) => void;
}) => {
  const uploadResults = await uploadFileWrapper({
    selectedImage,
    user,
    setLoading,
    folder: "highlights",
    identifier: "highlight",
    purpose: "stories",
  });

  return uploadResults;
};
