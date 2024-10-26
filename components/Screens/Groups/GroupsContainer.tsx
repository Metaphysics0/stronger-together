import React, { useMemo, useState } from 'react';
import { View, StyleSheet, ScrollView, TextInput } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { getGroups } from '@/services/db.service';
import { GroupListItem } from './GroupListItem';
import { Group } from '@/types/models/group.type';

export default function GroupsContainer() {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: groups } = useQuery({
    queryKey: ['groupsWithFullMembers'],
    queryFn: getGroups,
  });

  const filteredGroups = useMemo(
    () =>
      groups?.filter((group) =>
        group.groupName.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [groups, searchQuery]
  );

  return (
    <View style={styles.container}>
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
          <GroupListItem key={group.groupId} group={group as Group} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: 'bold',
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
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingHorizontal: 10,
  },
});
