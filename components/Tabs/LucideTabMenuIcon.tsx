import { type LucideIcon } from 'lucide-react-native';

interface LucideTabMenuIconProps {
  iconName: LucideIcon;
  focusedIconName?: string;
  color?: string;
  size?: number;
}

export function LucideTabMenuIcon({
  iconName: Icon,
  focusedIconName,
  color = '#007AFF',
  size = 28,
}: LucideTabMenuIconProps) {
  return <Icon color={color} size={size} />;
}
