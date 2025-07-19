import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getFollowStatus,
  followUser,
  unfollowUser,
} from "@/services/userService";

type FollowState = {
  status: Record<string, boolean>;
  actions: {
    toggleFollow: (sourceEmail: string, targetEmail: string) => Promise<void>;
    hydrateStatus: (sourceEmail: string, targetEmail: string) => Promise<void>;
    bulkHydrate: (sourceEmail: string, targetEmails: string[]) => Promise<void>;
  };
};

export const useFollowStore = create<FollowState>()(
  persist(
    immer((set, get) => ({
      status: {},
      actions: {
        toggleFollow: async (sourceEmail, targetEmail) => {
          const currentStatus = get().status[targetEmail] ?? false;

          // Optimistic update
          set((state) => {
            state.status[targetEmail] = !currentStatus;
          });

          try {
            if (currentStatus) {
              await unfollowUser(sourceEmail, targetEmail);
            } else {
              await followUser(sourceEmail, targetEmail);
            }
          } catch (error) {
            // Revert on error
            set((state) => {
              state.status[targetEmail] = currentStatus;
            });
            throw error;
          }
        },

        hydrateStatus: async (sourceEmail, targetEmail) => {
          try {
            const status = await getFollowStatus(sourceEmail, targetEmail);
            set((state) => {
              state.status[targetEmail] = status;
            });
          } catch (error) {
            console.error(`Error hydrating status for ${targetEmail}:`, error);
          }
        },

        bulkHydrate: async (sourceEmail, targetEmails) => {
          try {
            const statuses = await Promise.all(
              targetEmails.map((email) => getFollowStatus(sourceEmail, email))
            );

            set((state) => {
              targetEmails.forEach((email, index) => {
                state.status[email] = statuses[index];
              });
            });
          } catch (error) {
            console.error("Error bulk hydrating follow statuses:", error);
          }
        },
      },
    })),
    {
      name: "follow-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ status: state.status }),
    }
  )
);

export const useFollowStatus = (targetEmail: string) =>
  useFollowStore((state) => state.status[targetEmail] ?? false);

export const useFollowActions = () => useFollowStore((state) => state.actions);
