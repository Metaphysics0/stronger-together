import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import WorkoutContainer from '@/components/Screens/Workout/Container';

export default function WorkoutPage() {
  return (
    <SafeAreaView style={styles.container}>
      <WorkoutContainer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
  },
});
