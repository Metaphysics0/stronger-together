import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SharedValue } from 'react-native-reanimated';
import AccordionItem from './AccordionItem';
import { SHARED_STYLES } from '@/constants/shared-styles.constant';

interface InputPickerDropdownProps {
  label: string;
  value: string;
  onPress: () => void;
  isPickerOpen: SharedValue<boolean>;
  pickerKey: string;
  pickerComponent: React.ReactNode;
}

export default function InputPickerDropdown({
  label,
  value,
  onPress,
  isPickerOpen,
  pickerKey,
  pickerComponent,
}: InputPickerDropdownProps) {
  return (
    <>
      <View style={styles.formRowContainer}>
        <View style={styles.formRow}>
          <Text style={styles.formLabel}>{label}</Text>
          <TouchableOpacity
            style={styles.inlinePickerInputLabel}
            onPress={onPress}
          >
            <Text style={styles.inlinePickerInputText}>{value}</Text>
          </TouchableOpacity>
        </View>
        {/* @ts-ignore */}
        <AccordionItem isExpanded={isPickerOpen} viewKey={pickerKey}>
          {isPickerOpen.value && (
            <View style={{ width: '100%' }}>{pickerComponent}</View>
          )}
        </AccordionItem>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  formRowContainer: {
    display: 'flex',
    flexDirection: 'column',
    ...SHARED_STYLES.formRowBorder,
  },
  formRow: SHARED_STYLES.formRowWithoutBorder,
  formLabel: SHARED_STYLES.formLabel,
  inlinePickerInputLabel: {
    backgroundColor: '#e1e1e3',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  inlinePickerInputText: {
    fontSize: 16,
    color: '#363638',
  },
});
