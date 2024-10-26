import { StyleSheet, View } from 'react-native';
import Text from '../../common/Text';

export default function Header() {
  return (
    <View>
      <Text style={styles.headerText}>Stronger Together 💪</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 30,
    fontFamily: 'Nunito',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
