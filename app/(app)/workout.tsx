import React, { useRef } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import ExerciseListItem from '@/components/Screens/Workout/WorkoutFormV2/ExerciseListItem';
import SubmitWorkoutButton from '@/components/Screens/Workout/WorkoutFormV2/SubmitWorkoutButton';
import { useSelectedExercisesStore } from '@/hooks/stores/useSelectedExercisesStore';
import { useAddExerciseModalStore } from '@/hooks/stores/modals/useAddExerciseModalStore';
import { Modalize } from 'react-native-modalize';
import AddExerciseModal from '@/components/modals/AddExerciseModal';
import AddExerciseButton from '@/components/Screens/Workout/WorkoutFormV2/AddExerciseButton';

export default function WorkoutPage() {
  const { exercises } = useSelectedExercisesStore();
  const { setShouldShow: setShouldShowAddExerciseModal } =
    useAddExerciseModalStore();

  const modalizeRef = useRef<Modalize>(null);

  const openAddExerciseModal = () => {
    console.log('Opening modal');
    modalizeRef.current?.open();
  };

  const onClose = () => {
    console.log('Closing modal');
    modalizeRef.current?.close();
  };

  return (
    <View style={styles.container}>
      <ScrollView
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollViewContent}
      >
        {exercises.map((exercise, index) => (
          <ExerciseListItem
            key={index}
            exerciseName={exercise.exerciseName}
            count={exercise.count}
            index={index + 1}
          />
        ))}
        <AddExerciseButton onOpen={openAddExerciseModal} />
      </ScrollView>
      <SubmitWorkoutButton />

      {/* Modalize Component */}
      <Modalize
        ref={modalizeRef}
        modalHeight={350}
        snapPoint={350}
        handleStyle={styles.modalHandle}
        onClosed={() => {}}
      >
        <AddExerciseModal closeModal={onClose} />
      </Modalize>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
  },
  scrollViewContent: {
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'center',
    // backgroundColor: 'red',
    marginVertical: 'auto',
    minHeight: 300,
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  modalHandle: {
    backgroundColor: '#ccc',
    width: 60,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 4,
  },
  marginBottom: {
    marginTop: 50,
  },
});
