import { StyleSheet, View } from 'react-native';
import CreateGroupForm from './Form';

export default function CreateGroupContainer() {
  return (
    <View style={styles.container}>
      <CreateGroupForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Nunito-Bold',
  },
});
