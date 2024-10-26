import * as DropdownMenu from 'zeego/dropdown-menu';
import { Button } from 'react-native';

export default function SortGroupsButton() {
  return (
    // @ts-ignore
    <DropdownMenu.Root style={{ width: 'min-content' }}>
      <DropdownMenu.Trigger asChild>
        <Button title="Sort" />
      </DropdownMenu.Trigger>
      {/* @ts-ignore */}
      <DropdownMenu.Content style={{ width: 200 }}>
        <DropdownMenu.Group>
          {/* @ts-ignore */}
          <DropdownMenu.Item textValue="By Name" key="name">
            <DropdownMenu.ItemTitle>By Name</DropdownMenu.ItemTitle>
          </DropdownMenu.Item>
          {/* @ts-ignore */}
          <DropdownMenu.Item textValue="By Popularity" key="popularity">
            <DropdownMenu.ItemTitle>By Popularity</DropdownMenu.ItemTitle>
          </DropdownMenu.Item>
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
