import * as MediaLibrary from "expo-media-library";
import { useEffect, useState } from "react";

export const useMediaLibrary = () => {
  const [permissionStatus, setPermissionStatus] =
    useState<MediaLibrary.PermissionStatus>();
  const [isLoading, setLoading] = useState(true);

  const checkPermissions = async () => {
    setLoading(true);
    try {
      const { status, canAskAgain } = await MediaLibrary.getPermissionsAsync();
      if (status === "undetermined" && canAskAgain) {
        await MediaLibrary.requestPermissionsAsync();
        setPermissionStatus(status);
      } else {
        setPermissionStatus(status);
      }
    } catch (error) {
      console.error("Permission Error", error);
      throw new Error("Failed to check media permissions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkPermissions();
  }, []);

  return { permissionStatus, isLoading, checkPermissions };
};
