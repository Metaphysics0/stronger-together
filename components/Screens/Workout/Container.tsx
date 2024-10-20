import AddExerciseModal from '@/components/modals/AddExerciseModal';
import { StyleSheet, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import AddExerciseButton from './WorkoutForm/AddExerciseButton';
import SubmitWorkoutButton from './WorkoutForm/SubmitWorkoutButton';
import { useRef } from 'react';
import { ExerciseList } from './WorkoutForm/ExerciseList';

export default function WorkoutContainer() {
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
      <View style={styles.scrollViewContent}>
        <ExerciseList />
        <AddExerciseButton onOpen={openAddExerciseModal} />
        <SubmitWorkoutButton />
      </View>
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
    // backgroundColor: 'blue',
    marginVertical: 'auto',
    minHeight: '60%',
    // minHeight: 300,
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
