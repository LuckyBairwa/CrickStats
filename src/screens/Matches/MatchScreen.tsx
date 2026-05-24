// src/screens/Matches/MatchScreen.tsx 😎🔥

import React, { useCallback, useEffect, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  RefreshControl,
  Platform,
} from 'react-native';

import { Trophy, CalendarClock, CircleX } from 'lucide-react-native';

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
  const [matches, setMatches] = useState<any[]>([]);

  const [selectedMatch, setSelectedMatch] = useState<any>(null);

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
          onPress={() => setSelectedMatch(item)}
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

      {/* 😎 Match Details Modal */}
      <Modal visible={selectedMatch !== null} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View
            style={[
              styles.modalContent,
              {
                backgroundColor: theme.background,
              },
            ]}
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Close Button */}
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setSelectedMatch(null)}
              >
                <CircleX size={28} color={theme.text} />
              </TouchableOpacity>

              {/* Teams */}
              <Text
                style={[
                  styles.modalTeams,
                  {
                    color: theme.text,
                  },
                ]}
              >
                {selectedMatch?.teamA?.name || selectedMatch?.teamA} vs{' '}
                {selectedMatch?.teamB?.name || selectedMatch?.teamB}
              </Text>

              {/* Result */}
              <Text
                style={[
                  styles.modalResult,
                  {
                    color: '#22C55E',
                  },
                ]}
              >
                {selectedMatch?.result || 'Result Pending'}
              </Text>

              {/* Match Info */}
              <View
                style={[
                  styles.section,
                  {
                    backgroundColor: theme.card,
                    borderColor: theme.border,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.sectionTitle,
                    {
                      color: theme.text,
                    },
                  ]}
                >
                  📌 Match Information
                </Text>

                <Text
                  style={[
                    styles.infoText,
                    {
                      color: theme.subText,
                    },
                  ]}
                >
                  📅 Date :{' '}
                  {selectedMatch?.matchDate
                    ? new Date(selectedMatch.matchDate).toLocaleDateString(
                        'en-IN',
                        {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        },
                      )
                    : 'N/A'}
                </Text>

                <Text
                  style={[
                    styles.infoText,
                    {
                      color: theme.subText,
                    },
                  ]}
                >
                  🏏 Overs : {selectedMatch?.overs || 0}
                </Text>

                <Text
                  style={[
                    styles.infoText,
                    {
                      color: theme.subText,
                    },
                  ]}
                >
                  {selectedMatch?.innings1?.battingTeam?.name ||
                    selectedMatch?.innings1?.battingTeam ||
                    'First Innings'}{' '}
                  Score :{' '}
                  {selectedMatch?.innings1
                    ? `${selectedMatch.innings1.totalRuns}/${selectedMatch.innings1.wickets}`
                    : '0/0'}
                </Text>
                <Text
                  style={[
                    styles.infoText,
                    {
                      color: theme.subText,
                    },
                  ]}
                >
                  {selectedMatch?.innings2?.battingTeam?.name ||
                    selectedMatch?.innings2?.battingTeam ||
                    'Second Innings'}{' '}
                  Score :{' '}
                  {selectedMatch?.innings2
                    ? `${selectedMatch.innings2.totalRuns}/${selectedMatch.innings2.wickets}`
                    : '0/0'}
                </Text>
                <Text
                  style={[
                    styles.infoText,
                    {
                      color: theme.subText,
                    },
                  ]}
                >
                  {/* Toss winner N/A why */}
                  🪙 Toss Winner : {selectedMatch?.tossWinner || 'N/A'}
                </Text>

                <Text
                  style={[
                    styles.infoText,
                    {
                      color: theme.subText,
                    },
                  ]}
                >
                  🎯 Decision : {selectedMatch?.tossDecision || 'N/A'}
                </Text>

                <Text
                  style={[
                    styles.infoText,
                    {
                      color: theme.subText,
                    },
                  ]}
                >
                  🏆 Winner : {selectedMatch?.winner?.name || 'N/A'}
                </Text>
              </View>

              {/* Score Section */}
              <View
                style={[
                  styles.section,
                  {
                    backgroundColor: theme.card,
                    borderColor: theme.border,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.sectionTitle,
                    {
                      color: theme.text,
                    },
                  ]}
                >
                  📊 Match Score
                </Text>

                <View style={styles.scoreBox}>
                  <Text
                    style={[
                      styles.scoreTeam,
                      {
                        color: theme.text,
                      },
                    ]}
                  >
                    {selectedMatch?.innings1?.battingTeam?.name || 'Team A'}
                  </Text>

                  <Text
                    style={[
                      styles.score,
                      {
                        color: theme.primary,
                      },
                    ]}
                  >
                    {selectedMatch?.innings1
                      ? `${selectedMatch.innings1.totalRuns}/${selectedMatch.innings1.wickets}`
                      : '0/0'}
                  </Text>
                </View>

                <View style={styles.scoreBox}>
                  <Text
                    style={[
                      styles.scoreTeam,
                      {
                        color: theme.text,
                      },
                    ]}
                  >
                    {selectedMatch?.innings2?.battingTeam?.name || 'Team B'}
                  </Text>

                  <Text
                    style={[
                      styles.score,
                      {
                        color: theme.primary,
                      },
                    ]}
                  >
                    {selectedMatch?.innings2
                      ? `${selectedMatch.innings2.totalRuns}/${selectedMatch.innings2.wickets}`
                      : '0/0'}
                  </Text>
                </View>
              </View>

              <View style={{ height: 60 }} />
            </ScrollView>
          </View>
        </View>
      </Modal>
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

  modalContainer: {
    flex: 1,

    backgroundColor: 'rgba(0,0,0,0.6)',

    justifyContent: 'flex-end',
  },

  modalContent: {
    height: '92%',

    borderTopLeftRadius: 30,

    borderTopRightRadius: 30,

    paddingHorizontal: 18,

    paddingTop: 20,
  },

  closeButton: {
    alignSelf: 'flex-end',
  },

  modalTeams: {
    fontSize: 28,

    fontWeight: 'bold',

    marginTop: 10,
  },

  modalResult: {
    fontSize: 18,

    marginTop: 10,

    fontWeight: '600',
  },

  section: {
    marginTop: 24,

    borderRadius: 22,

    padding: 18,

    borderWidth: 1,
  },

  sectionTitle: {
    fontSize: 22,

    fontWeight: 'bold',

    marginBottom: 16,
  },

  infoText: {
    fontSize: 15,

    marginBottom: 10,
  },

  scoreBox: {
    backgroundColor: '#0B1220',

    borderRadius: 18,

    padding: 18,

    marginBottom: 14,
  },

  scoreTeam: {
    fontSize: 18,

    fontWeight: 'bold',
  },

  score: {
    fontSize: 30,

    fontWeight: 'bold',

    marginTop: 10,
  },
});
