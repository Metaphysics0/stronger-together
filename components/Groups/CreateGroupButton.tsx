import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

interface CreateGroupButtonProps {
  onCreateGroup: () => void;
}

export default function CreateGroupButton({
  onCreateGroup,
}: CreateGroupButtonProps) {
  return (
    <Menu>
      <MenuTrigger customStyles={triggerStyles}>
        <TouchableOpacity>
          <Ionicons
            name="add-circle-outline"
            size={24}
            color="black"
            style={styles.addIcon}
          />
        </TouchableOpacity>
      </MenuTrigger>
      <MenuOptions>
        <MenuOption onSelect={onCreateGroup} text="Create Group" />
      </MenuOptions>
    </Menu>
  );
}

const styles = StyleSheet.create({
  addIcon: {
    padding: 5,
  },
});

const triggerStyles = {
  triggerWrapper: {
    padding: 5,
  },
};
