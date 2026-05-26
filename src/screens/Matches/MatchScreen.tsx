// src/screens/Matches/MatchScreen.tsx 😎🔥

import React, { useCallback, useEffect, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { Trophy, CalendarClock } from 'lucide-react-native';

import Animated, {
  FadeInDown,
  FadeInUp,
  FadeInRight,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';

import COLORS from '../../constants/colors';

// 😎 Import Your Match API
import { getMatches } from '../../api/matchApi';

const theme = COLORS;

const MatchesScreen = () => {
  const navigation = useNavigation<any>();
  const [matches, setMatches] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  const [refreshing, setRefreshing] = useState(false);

  // 😎 Glow Animation
  const glow = useSharedValue(0.7);

  useEffect(() => {
    glow.value = withRepeat(
      withTiming(1, {
        duration: 2500,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true,
    );

    return () => {
      glow.value = 0;
    };
  }, []);

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glow.value,
    transform: [
      {
        scale: glow.value,
      },
    ],
  }));

  // 😎 Fetch Matches
  const fetchMatches = useCallback(async () => {
    try {
      setLoading(true);

      const response = await getMatches();

      const data = Array.isArray(response?.matches) ? response.matches : [];

      setMatches(data);
    } catch (error) {
      console.log('Matches Fetch Error 😭', error);

      setMatches([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchMatches();
  }, [fetchMatches]);

  const onRefresh = async () => {
    setRefreshing(true);

    await fetchMatches();
  };

  // 😎 Loading Screen
  if (loading) {
    return (
      <View
        style={[
          styles.loaderContainer,
          {
            backgroundColor: theme.background,
          },
        ]}
      >
        <ActivityIndicator size="large" color={theme.primary} />

        <Text
          style={[
            styles.loaderText,
            {
              color: theme.text,
            },
          ]}
        >
          Loading Matches...
        </Text>
      </View>
    );
  }

  // 😎 Match Card
  const renderMatch = ({ item, index }: any) => {
    return (
      <Animated.View entering={FadeInDown.delay(index * 120).springify()}>
        <TouchableOpacity
          activeOpacity={0.85}
          style={[
            styles.matchCard,
            {
              backgroundColor: theme.card,
              borderColor: theme.border,
              shadowColor: theme.glow,
            },
          ]}
          onPress={() =>
            navigation.navigate('MatchDetails', {
              match: item,
            })
          }
        >
          <View style={styles.topRow}>
            <Text
              style={[
                styles.teams,
                {
                  color: theme.text,
                },
              ]}
            >
              {item?.teamA?.name || item?.teamA || 'Team A'} vs{' '}
              {item?.teamB?.name || item?.teamB || 'Team B'}
            </Text>

            <Trophy size={24} color={theme.primary} />
          </View>

          <Text
            style={[
              styles.info,
              {
                color: theme.subText,
              },
            ]}
          >
            📅Date :{' '}
            {item?.matchDate
              ? new Date(item.matchDate).toLocaleDateString('en-IN', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })
              : 'No Date'}
          </Text>

          <Text
            style={[
              styles.info,
              {
                color: theme.subText,
              },
            ]}
          >
            🏏 Overs : {item?.overs || 0}
          </Text>

          <Text
            style={[
              styles.result,
              {
                color: '#22C55E',
              },
            ]}
          >
            🏆 {item?.result || 'Match Result Pending'}
          </Text>

          <Text
            style={[
              styles.winner,
              {
                color: '#38BDF8',
              },
            ]}
          >
            Winner : {item?.winner?.name || 'N/A'}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
        },
      ]}
    >
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      {/* 😎 Animated Background */}
      <Animated.View style={[styles.glowCircleOne, glowStyle]} />

      <Animated.View style={[styles.glowCircleTwo, glowStyle]} />

      {/* 😎 Header */}
      <Animated.View entering={FadeInUp.duration(700)}>
        <Text
          style={[
            styles.header,
            {
              color: theme.text,
            },
          ]}
        >
          Match History
        </Text>

        <Text
          style={[
            styles.subHeader,
            {
              color: theme.subText,
            },
          ]}
        >
          View all saved cricket battles
        </Text>
      </Animated.View>

      {/* 😎 Empty State */}
      {matches.length === 0 ? (
        <Animated.View
          entering={FadeInRight.duration(700)}
          style={styles.emptyContainer}
        >
          <CalendarClock size={90} color={theme.primary} />

          <Text
            style={[
              styles.emptyTitle,
              {
                color: theme.text,
              },
            ]}
          >
            No Matches Available Yet
          </Text>

          <Text
            style={[
              styles.emptySubTitle,
              {
                color: theme.subText,
              },
            ]}
          >
            Play your first gully cricket match and it will appear here
            automatically 😎
          </Text>
        </Animated.View>
      ) : (
        <FlatList
          data={matches}
          renderItem={renderMatch}
          keyExtractor={(item, index) =>
            item?._id?.toString() || index.toString()
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 120,
          }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={theme.primary}
            />
          }
        />
      )}
    </View>
  );
};

export default MatchesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingHorizontal: 16,

    paddingTop: (StatusBar.currentHeight || 0) + 10,
  },

  loaderContainer: {
    flex: 1,

    justifyContent: 'center',

    alignItems: 'center',
  },

  loaderText: {
    marginTop: 14,

    fontSize: 15,

    fontWeight: '600',
  },

  glowCircleOne: {
    position: 'absolute',

    width: 320,

    height: 320,

    borderRadius: 200,

    backgroundColor: '#22D3EE20',

    top: -120,

    right: -100,
  },

  glowCircleTwo: {
    position: 'absolute',

    width: 260,

    height: 260,

    borderRadius: 200,

    backgroundColor: '#06B6D420',

    bottom: 100,

    left: -100,
  },

  header: {
    fontSize: 32,

    fontWeight: 'bold',
  },

  subHeader: {
    fontSize: 15,

    marginTop: 6,

    marginBottom: 24,
  },

  matchCard: {
    borderRadius: 24,

    padding: 18,

    marginBottom: 16,

    borderWidth: 1,

    shadowOffset: {
      width: 0,
      height: 0,
    },

    shadowOpacity: 0.6,

    shadowRadius: 12,

    elevation: 10,
  },

  topRow: {
    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'center',
  },

  teams: {
    fontSize: 20,

    fontWeight: 'bold',

    flex: 1,

    paddingRight: 10,
  },

  info: {
    marginTop: 8,

    fontSize: 15,
  },

  result: {
    marginTop: 12,

    fontSize: 16,

    fontWeight: 'bold',
  },

  winner: {
    marginTop: 6,

    fontSize: 15,

    fontWeight: '600',
  },

  emptyContainer: {
    flex: 1,

    justifyContent: 'center',

    alignItems: 'center',

    paddingHorizontal: 20,
  },

  emptyTitle: {
    fontSize: 24,

    fontWeight: 'bold',

    marginTop: 20,

    textAlign: 'center',
  },

  emptySubTitle: {
    marginTop: 12,

    fontSize: 15,

    textAlign: 'center',

    lineHeight: 24,
  },
});
