import React from 'react';
import { TabMenuItem as TabMenuItemType } from '@/constants/tab-menu.constant';

interface TabMenuItemProps {
  iconComponent: TabMenuItemType['iconComponent'];
  iconName: TabMenuItemType['iconName'];
  focusedIconName?: TabMenuItemType['focusedIconName'];
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
  const sharedProps = { color, size, style: { marginTop: 4 } };

  if (focused && focusedIconName) {
    return (
      <Icon
        // @ts-ignore
        name={focusedIconName}
        {...sharedProps}
      />
    );
  }

  // @ts-ignore
  return <Icon name={iconName} {...sharedProps} />;
}
