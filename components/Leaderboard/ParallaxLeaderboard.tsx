import React, { useRef } from 'react';
import { Animated, StyleSheet, View, ScrollView } from 'react-native';
import TopThreeUsers from './TopThreeUsers';
import LeaderboardListItem from './LeaderboardListItem';
import { StrongerTogetherUser } from '@/types/stronger-together-user.type';

const HEADER_MAX_HEIGHT = 300;
const HEADER_MIN_HEIGHT = 100;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

interface ParallaxLeaderboardProps {
  users: (StrongerTogetherUser & { uid: string })[];
}

export default function ParallaxLeaderboard({
  users,
}: ParallaxLeaderboardProps) {
  const scrollY = useRef(new Animated.Value(0)).current;

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });

  const headerTitleOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 1, 0],
    extrapolate: 'clamp',
  });

  const headerTitleScale = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 1, 0.8],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, { height: headerHeight }]}>
        <Animated.View
          style={[
            styles.headerContent,
            {
              opacity: headerTitleOpacity,
              transform: [{ scale: headerTitleScale }],
            },
          ]}
        >
          <TopThreeUsers users={users.slice(0, 3)} />
        </Animated.View>
      </Animated.View>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      >
        {users.map((user, index) => (
          <LeaderboardListItem key={user.uid} user={user} rank={index + 1} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFA500',
    overflow: 'hidden',
    zIndex: 1,
  },
  headerContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollViewContent: {
    paddingTop: HEADER_MAX_HEIGHT,
  },
});
