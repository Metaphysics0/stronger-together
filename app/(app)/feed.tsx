import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import FeedContainer from '@/components/Screens/Feed/FeedContainer';

export default function FeedScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <FeedContainer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});
