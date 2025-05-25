import { supabase } from "@/utils/supabase";
import * as FileSystem from "expo-file-system";
import * as Network from "expo-network";
import mime from "mime";
import { Platform } from "react-native";

const MAX_FILE_SIZE_BYTES = 3 * 1024 * 1024;

export const uploadFile = async (
  fileUri: string,
  fileName: string,
  options: UploadOptions
): Promise<{ publicUrl: string; filePath: string; blob?: Blob }> => {
  console.log("[uploadFile] Starting upload process", {
    fileUri,
    fileName,
    options,
  });

  try {
    // 1. Check network connection
    console.log("[uploadFile] Checking network connection");
    const networkState = await Network.getNetworkStateAsync();
    if (!networkState.isConnected) {
      throw new Error("NETWORK_ERROR: No internet connection detected");
    }

    // 2. Verify file exists
    console.log("[uploadFile] Checking file existence", { fileUri });
    const fileInfo = await FileSystem.getInfoAsync(fileUri);
    if (!fileInfo.exists) {
      throw new Error("FILE_ERROR: Selected image could not be accessed");
    }

    // 3. Check file size
    console.log("[uploadFile] Checking file size", { size: fileInfo.size });
    if (fileInfo.size && fileInfo.size > MAX_FILE_SIZE_BYTES) {
      throw new Error(
        `FILE_SIZE_ERROR: File exceeds maximum size of ${
          MAX_FILE_SIZE_BYTES / (1024 * 1024)
        }MB`
      );
    }

    // 4. Prepare file metadata
    const fileExt = fileUri.split(".").pop() || "jpeg";
    const fileType = mime.getType(fileUri) || "image/jpeg";
    const fullPath = options.pathPrefix
      ? `${options.pathPrefix}/${fileName}.${fileExt}`
      : `${fileName}.${fileExt}`;

    console.log("[uploadFile] Prepared file metadata", {
      fileExt,
      fileType,
      fullPath,
      size: fileInfo.size,
    });

    let uploadData: Blob | ArrayBuffer;
    let blobForClerk: Blob | undefined;

    // 5. Prepare file data based on platform
    if (Platform.OS === "web") {
      console.log("[uploadFile] Web platform detected - using fetch");
      const response = await fetch(fileUri);
      uploadData = await response.blob();
      blobForClerk = uploadData;
      console.log("[uploadFile] Web file data prepared", {
        size: uploadData.size,
      });
    } else {
      console.log(
        "[uploadFile] Mobile platform detected - using base64 conversion"
      );
      const base64Data = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Convert Base64 to ArrayBuffer
      const byteString = atob(base64Data);
      const arrayBuffer = new ArrayBuffer(byteString.length);
      const uintArray = new Uint8Array(arrayBuffer);

      for (let i = 0; i < byteString.length; i++) {
        uintArray[i] = byteString.charCodeAt(i);
      }

      uploadData = arrayBuffer;
      console.log("[uploadFile] Mobile file data converted", {
        size: arrayBuffer.byteLength,
      });

      if (options.updateClerkUser?.updateProfileImage) {
        console.log("[uploadFile] Preparing Clerk blob for profile update");
        const response = await fetch(fileUri);
        blobForClerk = await response.blob();
      }
    }

    // 6. Upload to Supabase
    console.log("[uploadFile] Starting Supabase upload", {
      bucket: options.bucket,
      path: fullPath,
      contentType: fileType,
    });

    const { error: uploadError } = await supabase.storage
      .from(options.bucket)
      .upload(fullPath, uploadData, {
        contentType: fileType,
        upsert: options.upsert || false,
      });

    if (uploadError) {
      console.error("[uploadFile] Supabase upload failed", {
        error: uploadError,
        fileInfo: {
          size: fileInfo.size,
          type: fileType,
          uri: fileUri,
        },
      });
      throw new Error(`UPLOAD_ERROR: ${uploadError.message}`);
    }

    console.log("[uploadFile] File uploaded successfully");

    // 7. Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from(options.bucket).getPublicUrl(fullPath);

    if (!publicUrl) {
      throw new Error("URL_ERROR: Failed to generate public URL");
    }

    console.log("[uploadFile] Upload completed successfully", {
      publicUrl,
      filePath: fullPath,
      blobSize: blobForClerk?.size,
    });

    return {
      publicUrl,
      filePath: fullPath,
      blob: blobForClerk,
    };
  } catch (error: any) {
    console.error("[uploadFile] Error during file upload", {
      error: error.message,
      stack: error.stack,
      fileUri,
      fileName,
    });

    let errorMessage = error.message;
    if (!errorMessage.includes(":")) {
      errorMessage = `UNKNOWN_ERROR: ${errorMessage}`;
    }

    if (error.isAxiosError) {
      errorMessage = `NETWORK_ERROR: API request failed - ${
        error.response?.status || "No status"
      }`;
      console.error("[uploadFile] Axios error details:", {
        config: error.config,
        response: error.response?.data,
      });
    }

    const enhancedError = new Error(errorMessage);
    enhancedError.stack = error.stack;
    throw enhancedError;
  }
};
