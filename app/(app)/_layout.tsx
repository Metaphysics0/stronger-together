import { Redirect, Tabs } from 'expo-router';
import React, { ComponentProps, useState } from 'react';
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
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function TabLayout() {
  const { session, isLoading } = useSession();
  const { setExpoPushToken } = usePushNotificationStore();

  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >(undefined);
  const notificationListener = useRef<Notifications.Subscription>();

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

  const ROUTES: {
    name: string;
    icon: ComponentProps<typeof Ionicons>['name'];
    path: string;
    isFontAwesome?: boolean;
  }[] = [
    {
      name: 'Workout',
      icon: 'person-running' as ComponentProps<typeof FontAwesome6>['name'],
      isFontAwesome: true,
      path: 'index',
    },
    {
      name: 'Groups',
      icon: 'people',
      path: 'groups',
    },
    {
      name: 'Leaderboard',
      icon: 'ribbon',
      path: 'leaderboard',
    },
    {
      name: 'Profile',
      icon: 'person-circle',
      path: 'profile',
    },
  ];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#0a7ea4',
        headerShown: false,
      }}
    >
      {ROUTES.map((route) => (
        <Tabs.Screen
          key={route.name}
          name={route.path}
          options={{
            title: route.name,
            tabBarIcon: ({ color, focused }) =>
              route.isFontAwesome ? (
                <TabBarIconFontAwesome name={route.icon} color={color} />
              ) : (
                <TabBarIcon
                  // @ts-ignore
                  name={focused ? route.icon : `${route.icon}-outline`}
                  color={color}
                />
              ),
          }}
        />
      ))}
    </Tabs>
  );
}
