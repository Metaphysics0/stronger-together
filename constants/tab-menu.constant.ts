import {
  Entypo,
  FontAwesome,
  FontAwesome6,
  Ionicons,
} from '@expo/vector-icons';

export const TAB_MENU_ITEMS: TabMenuItem[] = [
  {
    name: 'index',
    title: 'Workout',
    iconComponent: FontAwesome6,
    iconName: 'person-running',
  },
  {
    name: 'feed',
    title: 'Feed',
    iconComponent: Entypo,
    iconName: 'list',
  },
  {
    name: 'profile',
    title: 'Profile',
    iconComponent: Ionicons,
    iconName: 'person-circle',
  },
];

export interface TabMenuItem {
  name: string;
  title: string;
  iconComponent: typeof FontAwesome | typeof Ionicons | typeof Entypo;
  iconName: string;
  focusedIconName?: string;
}
