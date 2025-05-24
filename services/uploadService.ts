import { supabase } from "@/utils/supabase";
import * as FileSystem from "expo-file-system";
import mime from "mime";

export const uploadFile = async (
  fileUri: string,
  fileName: string,
  options: UploadOptions
): Promise<{ publicUrl: string; filePath: string; blob?: Blob }> => {
  try {
    const fileExt = fileUri.split(".").pop();
    const fileType = mime.getType(fileUri) || "application/octet-stream";
    const fullPath = options.pathPrefix
      ? `${options.pathPrefix}/${fileName}.${fileExt}`
      : `${fileName}.${fileExt}`;

    const base64Data = await FileSystem.readAsStringAsync(fileUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const bytes = new Uint8Array(base64Data.length);
    for (let i = 0; i < base64Data.length; i++) {
      bytes[i] = base64Data.charCodeAt(i);
    }

    const { error } = await supabase.storage
      .from(options.bucket)
      .upload(fullPath, bytes, {
        contentType: fileType,
        upsert: options.upsert || false,
      });

    if (error) throw error;

    const {
      data: { publicUrl },
    } = supabase.storage.from(options.bucket).getPublicUrl(fullPath);

    if (!publicUrl) throw new Error("Failed to get public URL");

    const result: { publicUrl: string; filePath: string; blob?: Blob } = {
      publicUrl,
      filePath: fullPath,
    };

    if (options.updateClerkUser?.updateProfileImage) {
      const response = await fetch(fileUri);
      result.blob = await response.blob();
    }

    return result;
  } catch (error: any) {
    console.error("Upload error:", error);
    throw new Error(`Upload failed: ${error.message}`);
  }
};

export const deleteFile = async (
  bucket: string,
  filePath: string
): Promise<void> => {
  const { error } = await supabase.storage.from(bucket).remove([filePath]);
  if (error) throw error;
};
