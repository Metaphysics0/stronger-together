import React from 'react';
import { TabMenuItem as TabMenuItemType } from '@/constants/tab-menu.constant';

interface TabMenuItemProps
  extends Pick<
    TabMenuItemType,
    'iconComponent' | 'iconName' | 'focusedIconName'
  > {
  color: string;
  focused: boolean;
  size?: number;
}

export function TabMenuItem({
  iconComponent: Icon,
  iconName,
  focusedIconName,
  color,
  focused,
  size = 28,
}: TabMenuItemProps) {
  const props = {
    color,
    size,
    style: { marginTop: 4 },
    strokeWidth: 1,
  };

  if (focused && focusedIconName) {
    // @ts-ignore
    return <Icon name={focusedIconName} {...props} />;
  }

  // @ts-ignore
  return <Icon name={iconName} {...props} />;
}
