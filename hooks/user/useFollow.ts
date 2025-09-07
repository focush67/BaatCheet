import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Toast from "react-native-toast-message";
import {
  followUser,
  getFollowStatus,
  unfollowUser,
} from "@/services/userService";

interface UseFollowOptions {
  optimistic?: boolean;
  toastOnError?: boolean;
}

export const useFollow = (
  sourceEmail?: string,
  targetEmail?: string,
  options: UseFollowOptions = {}
) => {
  const { optimistic = false, toastOnError = true } = options;
  const mountedRef = useRef(true);
  const inflightRef = useRef(false);

  const [isFollowing, setIsFollowing] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | string | null>(null);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const safeToastError = useCallback(
    (title: string, message?: string) => {
      if (!toastOnError) return;
      Toast.show({
        type: "error",
        text1: title,
        text2: message ?? "Something went wrong. Please try again",
      });
    },
    [toastOnError]
  );

  const fetchStatus = useCallback(async (): Promise<void> => {
    if (!sourceEmail || !targetEmail) {
      setIsFollowing(null);
      return;
    }
    if (inflightRef.current) return;
    inflightRef.current = true;
    setIsLoading(true);
    setError(null);

    try {
      const result = await getFollowStatus(sourceEmail, targetEmail);
      const status = !!result;
      if (mountedRef.current) {
        setIsFollowing(status);
        setError(null);
      }
    } catch (err: any) {
      const message =
        err?.message ?? String(err ?? "Failed to get follow status");
      if (mountedRef.current) {
        setError(message);
        setIsFollowing(null);
      }
      safeToastError("Failed to get follow status", message);
      console.error("useFollow: fetchStatus error", err);
    } finally {
      inflightRef.current = false;
      if (mountedRef.current) setIsLoading(false);
    }
  }, [sourceEmail, targetEmail, safeToastError]);

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  const toggleFollow = useCallback(async (): Promise<void> => {
    if (!sourceEmail || !targetEmail) {
      safeToastError(
        "Cannot follow/unfollow",
        "Source or target email is missing"
      );
      return;
    }

    if (sourceEmail === targetEmail) return;

    const currentlyFollowing = !!isFollowing;
    const desiredAction = currentlyFollowing ? "unfollow" : "follow";

    let previousState = isFollowing;
    if (optimistic) {
      setIsFollowing(!currentlyFollowing);
    }
    inflightRef.current = true;
    setIsLoading(true);
    setError(null);

    try {
      if (desiredAction === "follow") {
        const response = await followUser(sourceEmail, targetEmail);
        if (!response) {
          throw new Error("Follow API returned empty response");
        }
        if (!optimistic && mountedRef.current) {
          setIsFollowing(true);
        }
      } else {
        const response = await unfollowUser(sourceEmail, targetEmail);
        if (!response) {
          throw new Error("Unfollow API returned empty response");
        }
        if (!optimistic && mountedRef.current) {
          setIsFollowing(false);
        }
      }
    } catch (err: any) {
      const message = err?.message ?? String(err ?? "Follow action failed");
      if (optimistic && mountedRef.current) {
        setIsFollowing(previousState ?? null);
      }
      if (mountedRef.current) {
        setError(message);
      }
      safeToastError("Failed to update follow", message);
      console.error("useFollow: toggleFollow error", err);
    } finally {
      inflightRef.current = false;
      if (mountedRef.current) setIsLoading(false);
    }
  }, [
    isFollowing,
    isLoading,
    optimistic,
    safeToastError,
    sourceEmail,
    targetEmail,
  ]);

  const refresh = useCallback(async () => {
    await fetchStatus();
  }, [fetchStatus]);

  return useMemo(
    () => ({
      isFollowing,
      isLoading,
      error,
      toggleFollow,
      refresh,
    }),
    [isFollowing, isLoading, error, toggleFollow, refresh]
  );
};

export default useFollow;
