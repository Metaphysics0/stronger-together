import AddExerciseModal from '@/components/modals/AddExerciseModal';
import { StyleSheet, View } from 'react-native';
import { Modalize, useModalize } from 'react-native-modalize';
import SubmitWorkoutButton from './WorkoutForm/SubmitWorkoutButton';
import { ExerciseList } from './WorkoutForm/ExerciseList';
import { useEffect } from 'react';
import { useAddExerciseModalStore } from '@/hooks/stores/modals/useAddExerciseModalStore';
import { useSelectedExercisesStore } from '@/hooks/stores/useSelectedExercisesStore';

export default function WorkoutContainer() {
  const { ref } = useModalize();
  const { setModalRef } = useAddExerciseModalStore();
  const { exercises } = useSelectedExercisesStore();

  useEffect(() => {
    setModalRef(ref);
  }, [ref, setModalRef]);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.scrollViewContent}>
          <ExerciseList />
        </View>
        <View style={styles.submitButtonContainer}>
          {exercises.length > 0 && <SubmitWorkoutButton />}
        </View>
      </View>
      <Modalize
        ref={ref}
        modalHeight={400}
        snapPoint={400}
        handleStyle={styles.modalHandle}
        onClosed={() => {}}
      >
        <AddExerciseModal />
      </Modalize>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
  },
  scrollViewContent: {
    display: 'flex',
    flexDirection: 'column',
    marginVertical: 'auto',
    minHeight: '60%',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  submitButtonContainer: {
    width: '35%',
    marginHorizontal: 'auto',
  },
  modalHandle: {
    backgroundColor: '#ccc',
    width: 60,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 4,
  },
});
