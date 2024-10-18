import React from 'react';
import { useUserStatsModalStore } from '@/hooks/stores/useUserStatsModalStore';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { ExerciseType, exerciseTypeToName } from '@/types/exercise.type';

export default function UserWorkoutStatsModal() {
  const { isUserStatsModalActive, user, setIsUserStatsModalActive } =
    useUserStatsModalStore();

  if (!user) {
    return null;
  }

  const calculateTotalWorkouts = () => {
    const totals: Record<ExerciseType, number> = {
      [ExerciseType.BURPEES]: 0,
      [ExerciseType.PUSH_UPS]: 0,
      [ExerciseType.PULL_UPS]: 0,
      [ExerciseType.SQUATS]: 0,
      [ExerciseType.SIT_UPS]: 0,
      [ExerciseType.BOXING]: 0,
      [ExerciseType.CYCLING]: 0,
      [ExerciseType.WALKING]: 0,
      [ExerciseType.RUNNING]: 0,
    };

    user.workouts.forEach((workout) => {
      totals[workout.exercise] += workout.count;
    });

    return totals;
  };

  const workoutTotals = calculateTotalWorkouts();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isUserStatsModalActive}
      onRequestClose={() =>
        setIsUserStatsModalActive({
          isUserStatsModalActive: false,
          user: undefined,
        })
      }
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerTextContainer}>
              <Text style={styles.headerText}>
                {user.displayName}'s Workout Stats
              </Text>
              <Text style={styles.subHeaderText}>All Time</Text>
            </View>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() =>
                setIsUserStatsModalActive({
                  isUserStatsModalActive: false,
                  user: undefined,
                })
              }
            >
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.scrollViewWrapper}>
            <ScrollView style={styles.statsContainer}>
              {Object.entries(workoutTotals).map(([exercise, count]) => (
                <View key={exercise} style={styles.statItem}>
                  <Text style={styles.statName}>
                    {exerciseTypeToName[exercise as ExerciseType]}
                  </Text>
                  <Text style={styles.statCount}>{count}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 20,
    backgroundColor: '#FFA500',
  },
  headerTextContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white',
  },
  subHeaderText: {
    fontSize: 16,
    color: 'white',
  },
  closeButton: {
    padding: 5,
  },
  closeButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  statsContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  statItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  statName: {
    fontSize: 16,
    fontWeight: '500',
  },
  statCount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  scrollViewWrapper: {
    flexGrow: 1,
  },
});
