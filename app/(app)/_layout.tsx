import { Redirect, Tabs } from 'expo-router';
import React, { useState, useRef, useEffect } from 'react';
import { useSession } from '@/providers/SessionProvider';
import { Text } from 'react-native';
import * as Notifications from 'expo-notifications';
import { usePushNotificationStore } from '@/hooks/stores/usePushNotificationStore';
import { registerForPushNotificationsAsync } from '@/services/push-notifications/register-push-notifications.service';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Group } from '@/types/models/group.type';
import { StrongerTogetherUser } from '@/types/models/stronger-together-user.type';
import {
  getAllUsers,
  getGroups,
  updateUserPushToken,
} from '@/services/db.service';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useContactsStore } from '@/hooks/stores/useContactsStore';
import { TAB_MENU_ITEMS } from '@/constants/tab-menu.constant';
import { LucideTabMenuIcon } from '@/components/Tabs/LucideTabMenuIcon';

export default function TabLayout() {
  const { session, isLoading } = useSession();
  const { setExpoPushToken } = usePushNotificationStore();
  const { setContacts } = useContactsStore();
  const queryClient = useQueryClient();

  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >(undefined);
  const notificationListener = useRef<Notifications.Subscription>();

  useEffect(() => {
    async function setupPushNotifications() {
      try {
        const expoPushToken = await registerForPushNotificationsAsync();
        setExpoPushToken(expoPushToken ?? '');
        if (session && expoPushToken) {
          await updateUserPushToken({ uid: session, expoPushToken });
        }
      } catch (error) {
        console.log('setupPushNotifications error', error);
      }
    }

    setupPushNotifications();
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });
  }, []);

  const { data: groups } = useQuery<Group[]>({
    queryKey: ['groups'],
    queryFn: getGroups,
  });

  const { data: users } = useQuery<StrongerTogetherUser[]>({
    queryKey: ['users'],
    queryFn: getAllUsers,
  });

  const groupsWithFullMembers = groups?.map((group) => ({
    ...group,
    members: (group.members || []).map(
      (memberId) =>
        // @ts-ignore
        users?.find((user) => user.uid === memberId) || memberId
    ),
  }));

  queryClient.setQueryData(['groupsWithFullMembers'], groupsWithFullMembers);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!session) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#007AFF',
          headerShown: false,
        }}
      >
        {TAB_MENU_ITEMS.map((item) => (
          <Tabs.Screen
            key={item.name}
            name={item.name}
            options={{
              title: item.title,
              tabBarLabelStyle: {
                fontFamily: 'Nunito-Bold',
              },
              headerShown: !!item.headerRight,
              headerRight: () =>
                item.headerRight ? <item.headerRight /> : null,
              tabBarIcon: ({ color, focused }) => (
                <LucideTabMenuIcon
                  iconName={item.iconComponent}
                  focusedIconName={item.focusedIconName}
                  isFocused={focused}
                  color={color}
                />
              ),
            }}
          />
        ))}
      </Tabs>
    </GestureHandlerRootView>
  );
}
