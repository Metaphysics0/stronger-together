import { Redirect, Tabs } from 'expo-router';
import React from 'react';

import {
  TabBarIcon,
  TabBarIconFontAwesome,
} from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useSession } from '@/providers/SessionProvider';
import { Text } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { session, isLoading } = useSession();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!session) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
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
        name="scoreboard"
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
