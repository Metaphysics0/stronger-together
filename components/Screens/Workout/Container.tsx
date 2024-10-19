import AddExerciseModal from '@/components/modals/AddExerciseModal';
import { ScrollView, StyleSheet } from 'react-native';
import { Modalize } from 'react-native-modalize';
import AddExerciseButton from './WorkoutForm/AddExerciseButton';
import ExerciseListItem from './WorkoutForm/ExerciseListItem';
import SubmitWorkoutButton from './WorkoutForm/SubmitWorkoutButton';
import { Fragment, useRef } from 'react';
import { useSelectedExercisesStore } from '@/hooks/stores/useSelectedExercisesStore';

export default function WorkoutContainer() {
  const modalizeRef = useRef<Modalize>(null);
  const { exercises } = useSelectedExercisesStore();

  const openAddExerciseModal = () => {
    console.log('Opening modal');
    modalizeRef.current?.open();
  };

  const onClose = () => {
    console.log('Closing modal');
    modalizeRef.current?.close();
  };

  return (
    <Fragment>
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

      <Modalize
        ref={modalizeRef}
        modalHeight={350}
        snapPoint={350}
        handleStyle={styles.modalHandle}
        onClosed={() => {}}
      >
        <AddExerciseModal closeModal={onClose} />
      </Modalize>
    </Fragment>
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
