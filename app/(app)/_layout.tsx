import { Redirect, Tabs } from 'expo-router';
import React, { useState } from 'react';
import {
  TabBarIcon,
  TabBarIconFontAwesome,
} from '@/components/navigation/TabBarIcon';
import { useSession } from '@/providers/SessionProvider';
import { Text } from 'react-native';
import { useRef, useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { usePushNotificationStore } from '@/hooks/stores/usePushNotificationStore';
import { registerForPushNotificationsAsync } from '@/services/push-notifications/register-push-notifications.service';

export default function TabLayout() {
  const { session, isLoading } = useSession();
  const { setExpoPushToken } = usePushNotificationStore();

  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >(undefined);
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => setExpoPushToken(token ?? ''))
      .catch((error: any) => {
        console.log('ERROR', error);
      });

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });
  }, []);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!session) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#0a7ea4',
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Workout',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIconFontAwesome
              name={focused ? 'person-running' : 'person-running'}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="leaderboard"
        options={{
          title: 'Leaderboard',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'ribbon' : 'ribbon-outline'}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'person-circle' : 'person-circle-outline'}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
