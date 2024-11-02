import { type LucideIcon } from 'lucide-react-native';

interface LucideTabMenuIconProps {
  iconName: LucideIcon;
  focusedIconName?: string;
  focusedIconColor?: string;
  color?: string;
  size?: number;
  isFocused: boolean;
}

export function LucideTabMenuIcon({
  iconName: Icon,
  focusedIconName,
  isFocused,
  focusedIconColor,
  color = '#000000',
  size = 28,
}: LucideTabMenuIconProps) {
  const iconColor = isFocused && focusedIconColor ? focusedIconColor : color;
  return <Icon color={iconColor} size={size} strokeWidth={1.5} />;
}
