import { create } from "zustand";
import { persist } from "zustand/middleware";

const useNotificationStore = create(
  persist(
    (set) => ({
      notifications: [],

      addNotification: (notification) =>
        set((state) => ({
          notifications: [
            {
              id: Date.now(),
              timestamp: new Date().toISOString(),
              ...notification,
            },
            ...state.notifications,
          ],
        })),

      removeNotification: (id) =>
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        })),

      clearNotifications: () => set({ notifications: [] }),
    }),
    {
      name: "smartfood-notifications",
    }
  )
);

export default useNotificationStore;
