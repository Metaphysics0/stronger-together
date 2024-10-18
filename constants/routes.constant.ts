import { ComponentProps } from 'react';
import { FontAwesome6 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { ScreenProps } from 'expo-router/build/useScreens';

export const ROUTES: Route[] = [
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

export const HIDDEN_ROUTES: Omit<Route, 'icon'>[] = [
  {
    name: 'Create Group',
    path: '(groups)/create-group',
    shouldHide: true,
  },
];

interface Route {
  name: string;
  icon: ComponentProps<typeof Ionicons>['name'];
  path: string;
  isFontAwesome?: boolean;
  shouldHide?: boolean;
  options?: Partial<ScreenProps['options']>;
}
