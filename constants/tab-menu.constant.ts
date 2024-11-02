import { CreateGroupButton } from '@/components/Screens/Groups/CreateGroupButton';
import {
  MessagesSquare,
  Dumbbell,
  Users,
  User,
  type LucideIcon,
} from 'lucide-react-native';

export const TAB_MENU_ITEMS: TabMenuItem[] = [
  {
    name: 'index',
    title: 'Workout',
    iconComponent: Dumbbell,
  },
  {
    name: 'feed',
    title: 'Feed',
    iconComponent: MessagesSquare,
  },
  {
    name: 'groups',
    title: 'Groups',
    iconComponent: Users,
    headerRight: CreateGroupButton,
  },
  {
    name: 'profile',
    title: 'Profile',
    iconComponent: User,
  },
];

export interface TabMenuItem {
  name: string;
  title: string;
  iconComponent: LucideIcon;
  iconName?: string;
  focusedIconName?: string;
  headerRight?: React.ComponentType<any>;
}
