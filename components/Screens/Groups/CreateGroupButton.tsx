import { router } from 'expo-router';
import { Button } from 'react-native';

export function CreateGroupButton() {
  return (
    <Button
      onPress={() => router.push('/(app)/groups/create-group')}
      title="Create"
    />
  );
}
