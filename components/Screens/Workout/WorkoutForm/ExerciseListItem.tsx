import React, { useRef } from 'react';
import { StyleSheet, Text, Animated, Platform } from 'react-native';
import { State } from 'react-native-gesture-handler';
import { ExerciseType } from '@/types/enums/exercise-type.enum';
import { ListItem } from 'react-native-ui-lib';

type ExerciseListItemProps = {
  exerciseName: ExerciseType;
  count: number;
  index: number;
  onDelete: () => void;
};

export default function ExerciseListItem({
  exerciseName,
  count,
  index,
  onDelete,
}: ExerciseListItemProps) {
  const translateX = useRef(new Animated.Value(0)).current;
  const itemHeight = 60; // Adjust this value based on your desired item height

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: translateX } }],
    { useNativeDriver: true }
  );

  const onHandlerStateChange = ({ nativeEvent }: { nativeEvent: any }) => {
    if (nativeEvent.oldState === State.ACTIVE) {
      Animated.spring(translateX, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  };

  const deleteButtonOpacity = translateX.interpolate({
    inputRange: [-75, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    // <View style={styles.container}>
    //   <View style={styles.itemContainer}>
    //     <View style={styles.indexContainer}>
    //       <Text style={styles.index}>{index}</Text>
    //       <Text style={styles.exerciseName}>{exerciseName}</Text>
    //       <Text style={styles.count}>{count}</Text>
    //     </View>
    //   </View>
    // </View>
    <ListItem onPress={() => console.log('pressed')} style={styles.container}>
      <Text style={styles.index}>{index}</Text>
      <Text style={styles.exerciseName}>{exerciseName}</Text>
      <Text style={styles.count}>{count}</Text>
    </ListItem>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 100,
    borderColor: Platform.OS === 'ios' ? 'transparent' : '#000',
    backgroundColor: 'red',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    borderRadius: 30,
    height: '100%',
  },
  deleteButton: {
    position: 'absolute',
    left: 0,
    height: '100%',
    width: 75,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  deleteButtonTouchable: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indexContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // width: 30,
    // width: '100%',
    // height: 30,
    padding: 5,
    margin: 5,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    // justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  index: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  count: {
    fontSize: 14,
    color: '#666',
  },
  dragHandle: {
    paddingHorizontal: 16,
    height: '100%',
    justifyContent: 'center',
  },
});
