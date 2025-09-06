import { uploadFileWrapper } from "@/utils/upload";

export const handlePostCreation = async ({
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
    folder: "posts",
    identifier: "post",
    purpose: "uploads",
  });

  return uploadResults;
};

