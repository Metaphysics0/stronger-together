import { usePathname } from 'expo-router';
import { Text, View } from 'react-native';

export default function NotFound() {
  const pathname = usePathname();
  console.log('pathname', pathname);

  return (
    <View>
      <Text>Not Found</Text>
    </View>
  );
}
