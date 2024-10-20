import React from 'react';
import { StyleSheet, View } from 'react-native';
import WorkoutContainer from '@/components/Screens/Workout/Container';

export default function WorkoutPage() {
  return (
    <View style={styles.container}>
      <WorkoutContainer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
  },
});
