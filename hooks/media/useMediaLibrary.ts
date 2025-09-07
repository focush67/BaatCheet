import * as MediaLibrary from "expo-media-library";
import { useCallback, useEffect, useMemo, useState } from "react";

export const useMediaLibrary = () => {
  const [permissionStatus, setPermissionStatus] =
    useState<MediaLibrary.PermissionStatus>();
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const checkPermissions = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { status, canAskAgain } = await MediaLibrary.getPermissionsAsync();
      if (status === "undetermined" && canAskAgain) {
        const requested = await MediaLibrary.requestPermissionsAsync();
        setPermissionStatus(requested.status);
        return requested.status;
      } else {
        setPermissionStatus(status);
        return status;
      }
    } catch (err) {
      console.error("Permission Error", err);
      setError(
        err instanceof Error
          ? err
          : new Error("Failed to check media permissions")
      );
      return undefined;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!mounted) return;
      await checkPermissions();
    })();

    return () => {
      mounted = false;
    };
  }, [checkPermissions]);

  return useMemo(
    () => ({ permissionStatus, isLoading, error, checkPermissions }),
    [permissionStatus, isLoading, error, checkPermissions]
  );
};
