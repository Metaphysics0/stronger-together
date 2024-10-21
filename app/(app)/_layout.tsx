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
import { Group } from '@/types/models/group.type';
import { StrongerTogetherUser } from '@/types/models/stronger-together-user.type';
import {
  getAllUsers,
  getGroups,
  updateUserPushToken,
} from '@/services/db.service';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useContactsStore } from '@/hooks/stores/useContactsStore';

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

  if (!session) {
    console.log('NO SESSION');
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
        <Tabs.Screen
          name="index"
          options={{
            tabBarLabelStyle: {
              fontFamily: 'Nunito-Bold',
            },
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
            tabBarLabelStyle: {
              fontFamily: 'Nunito-Bold',
            },
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
            tabBarLabelStyle: {
              fontFamily: 'Nunito-Bold',
            },
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
            tabBarLabelStyle: {
              fontFamily: 'Nunito-Bold',
            },
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
