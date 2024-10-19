import { Redirect, router, Tabs } from 'expo-router';
import React, { useState, useRef, useEffect } from 'react';
import {
  TabBarIcon,
  TabBarIconFontAwesome,
} from '@/components/Tabs/TabBarIcon';
import { useSession } from '@/providers/SessionProvider';
import { Button, Text } from 'react-native';
import * as Notifications from 'expo-notifications';
import { usePushNotificationStore } from '@/hooks/stores/usePushNotificationStore';
import { registerForPushNotificationsAsync } from '@/services/push-notifications/register-push-notifications.service';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Group } from '@/types/group.type';
import { StrongerTogetherUser } from '@/types/stronger-together-user.type';
import {
  getAllUsers,
  getGroups,
  updateUserPushToken,
} from '@/services/db.service';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function TabLayout() {
  const { session, isLoading } = useSession();
  const { setExpoPushToken } = usePushNotificationStore();
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
      } catch (error: any) {
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
    members: group.members.map(
      (memberId) =>
        // @ts-ignore
        users?.find((user) => user.uid === memberId) || memberId
    ),
  }));

  queryClient.setQueryData(['groupsWithFullMembers'], groupsWithFullMembers);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  console.log('SESSION in layout', session);

  if (!session) {
    return <Redirect href="/" />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#0a7ea4',
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="workout"
          options={{
            title: 'Workout',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIconFontAwesome name="person-running" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="groups"
          options={{
            title: 'Groups',
            tabBarIcon: ({ color, focused }) =>
              focused ? (
                <TabBarIcon name="people" color={color} />
              ) : (
                <TabBarIcon name="people-outline" color={color} />
              ),
            headerShown: true,
            tabBarLabel: 'Groups',
            headerTitle: 'Groups',
            headerRight: () => {
              return (
                <Button
                  onPress={() => router.push('/(app)/groups/create-group')}
                  title="Create"
                />
              );
            },
          }}
        />
        <Tabs.Screen
          name="statistics"
          options={{
            title: 'Statistics',
            tabBarIcon: ({ color, focused }) =>
              focused ? (
                <TabBarIcon name="bar-chart" color={color} />
              ) : (
                <TabBarIcon name="bar-chart-outline" color={color} />
              ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color, focused }) =>
              focused ? (
                <TabBarIcon name="person-circle" color={color} />
              ) : (
                <TabBarIcon name="person-circle-outline" color={color} />
              ),
          }}
        />
      </Tabs>
    </GestureHandlerRootView>
  );
}
