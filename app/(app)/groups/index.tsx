import GroupsContainer from '@/components/Screens/Groups/GroupsContainer';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

export default function Groups() {
  return (
    <SafeAreaView style={styles.container}>
      <GroupsContainer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});
