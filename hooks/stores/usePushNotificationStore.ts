import { create } from 'zustand';

interface PushNotificationState {
  expoPushToken: string;
  setExpoPushToken: (token: string) => void;
}

export const usePushNotificationStore = create<PushNotificationState>(
  (set) => ({
    expoPushToken: getDefaultPushNotificationToken(),
    setExpoPushToken: (token) => set({ expoPushToken: token }),
  })
);

function getDefaultPushNotificationToken() {
  return process.env.EXPO_DEVELOPMENT_PUSH_NOTIFICATION_TOKEN ?? '';
}
