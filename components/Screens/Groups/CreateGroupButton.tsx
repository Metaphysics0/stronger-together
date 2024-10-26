import * as DropdownMenu from 'zeego/dropdown-menu';
import { TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function CreateGroupButton() {
  return (
    // @ts-ignore
    <DropdownMenu.Root style={{ marginVertial: 'auto' }}>
      <DropdownMenu.Trigger asChild>
        <TouchableOpacity>
          <Ionicons name="add-circle-outline" size={24} color="#007AFF" />
        </TouchableOpacity>
      </DropdownMenu.Trigger>
      {/* @ts-ignore */}
      <DropdownMenu.Content style={{ width: 200 }}>
        <DropdownMenu.Group>
          {/* @ts-ignore */}
          <DropdownMenu.Item
            textValue="Create Group"
            key="name"
            onSelect={() => console.log('move to create group')}
          >
            <DropdownMenu.ItemTitle>Create Group</DropdownMenu.ItemTitle>
            <DropdownMenu.ItemIcon
              androidIconName="create"
              ios={{ name: 'plus.circle' }}
            >
              <Ionicons name="create" size={15} />
            </DropdownMenu.ItemIcon>
          </DropdownMenu.Item>
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
