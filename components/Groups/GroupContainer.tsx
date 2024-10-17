import React, { useMemo, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  Button,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { getGroups } from '@/services/db.service';
import { GroupListItem } from './GroupListItem';
import { Group } from '@/types/group.type';
import CreateGroupButton from './CreateGroupButton';

export default function GroupContainer() {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: groups } = useQuery({
    queryKey: ['groupsWithFullMembers'],
    queryFn: getGroups,
  });

  const filteredGroups = useMemo(
    () =>
      groups?.filter((group) =>
        group.group_name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [groups, searchQuery]
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Button title="Sort" />
        <Text style={styles.header}>Groups</Text>
        <CreateGroupButton />
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search groups..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {filteredGroups?.map((group) => (
          <GroupListItem key={group.group_id} group={group as Group} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  searchContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchInput: {
    height: 40,
    flexGrow: 1,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  groupList: {
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 10,
  },
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingHorizontal: 10,
  },
  headerContainer: {
    paddingTop: 60,
    paddingBottom: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
