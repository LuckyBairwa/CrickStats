import React, { useEffect, useMemo, useState } from 'react';

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  StatusBar,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import Animated, {
  FadeInDown,
  FadeInRight,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  Layout,
} from 'react-native-reanimated';

import {
  Search,
  Users,
  Zap,
  Radio,
  TrendingUp,
  Flame,
  Trophy,
  ChevronRightCircle,
} from 'lucide-react-native';

import { getPlayers } from '../../api/playerApi';

import COLORS from '../../constants/colors';

const sortOptions = ['Latest', 'Oldest', 'A-Z', 'Z-A'];

const PlayersScreen = () => {
  const navigation = useNavigation<any>();

  const theme = COLORS;

  const [players, setPlayers] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  const [refreshing, setRefreshing] = useState(false);

  const [activeSort, setActiveSort] = useState('Latest');
  const [searchText, setSearchText] = useState('');

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

  const glowStyle = useAnimatedStyle(() => {
    return {
      opacity: glow.value,
      transform: [
        {
          scale: glow.value,
        },
      ],
    };
  });

  // 😎 Fetch Players
  const fetchPlayers = async () => {
    try {
      setLoading(true);

      const res = await getPlayers();
      console.log('PLAYERS API RESPONSE 😎', JSON.stringify(res, null, 2));

      const data = Array.isArray(res?.players)
        ? res.players
        : Array.isArray(res?.data)
        ? res.data
        : Array.isArray(res)
        ? res
        : [];

      setPlayers(data);
    } catch (error) {
      console.log('Players Error 😭', error);

      setPlayers([]);
    } finally {
      setLoading(false);

      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);

    await fetchPlayers();
  };

  const filteredPlayers = useMemo(() => {
    return players.filter(player => {
      const search = searchText.toLowerCase();

      return (
        player?.name?.toLowerCase()?.includes(search) ||
        player?.nickName?.toLowerCase()?.includes(search) ||
        player?.jerseyNumber?.toString()?.includes(search)
      );
    });
  }, [players, searchText]);

  // 😎 Sorting
  const sortedPlayers = useMemo(() => {
    return [...filteredPlayers].sort((a, b) => {
      switch (activeSort) {
        case 'Latest':
          return (
            new Date(b?.createdAt || 0).getTime() -
            new Date(a?.createdAt || 0).getTime()
          );

        case 'Oldest':
          return (
            new Date(a?.createdAt || 0).getTime() -
            new Date(b?.createdAt || 0).getTime()
          );

        case 'A-Z':
          return (a?.name || '').localeCompare(b?.name || '');

        case 'Z-A':
          return (b?.name || '').localeCompare(a?.name || '');

        default:
          return 0;
      }
    });
  }, [filteredPlayers, activeSort]);

  // 😎 Loading
  if (loading) {
    return (
      <View
        style={[
          styles.loader,
          {
            backgroundColor: theme.background,
          },
        ]}
      >
        <ActivityIndicator size="large" color={theme.primary} />

        <Text
          style={[
            styles.loadingText,
            {
              color: theme.text,
            },
          ]}
        >
          Loading Players...
        </Text>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
        },
      ]}
    >
      {/* 😎 Status Bar */}
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      {/* 😎 Animated Background */}
      <Animated.View style={[styles.glowCircleOne, glowStyle]} />

      <Animated.View style={[styles.glowCircleTwo, glowStyle]} />

      {/* 😎 Header */}
      <Animated.View
        entering={FadeInDown.duration(700)}
        style={styles.headerRow}
      >
        <View>
          <Text
            style={[
              styles.header,
              {
                color: theme.text,
              },
            ]}
          >
            Players
          </Text>

          <Text
            style={[
              styles.subHeader,
              {
                color: theme.subText,
              },
            ]}
          >
            Manage all cricket players 
          </Text>
        </View>
      </Animated.View>

      {/* 😎 Search Input */}
      <View
        style={[
          styles.searchContainer,
          {
            backgroundColor: theme.card,
            borderColor: theme.border,
          },
        ]}
      >
        <Search size={20} color={theme.primary} strokeWidth={2.4} />

        <TextInput
          placeholder="Search by name, nickname or jersey..."
          placeholderTextColor={theme.subText}
          value={searchText}
          onChangeText={setSearchText}
          style={[
            styles.searchInput,
            {
              color: theme.text,
            },
          ]}
        />
      </View>

      {/* 😎 Sort Buttons */}
      <FlatList
        horizontal
        data={sortOptions}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item}
        style={{
          maxHeight: 65,
        }}
        contentContainerStyle={{
          paddingRight: 20,
        }}
        renderItem={({ item, index }) => {
          const active = activeSort === item;

          return (
            <Animated.View
              entering={FadeInRight.delay(index * 100).springify()}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setActiveSort(item)}
                style={[
                  styles.sortBtn,
                  {
                    backgroundColor: active ? theme.primary : theme.card,

                    borderColor: active ? theme.primary : theme.border,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.sortText,
                    {
                      color: active ? '#000' : theme.text,
                    },
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          );
        }}
      />

      {/* 😎 Empty State */}
      {sortedPlayers.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Users size={90} color={theme.primary} strokeWidth={2.2} />

          <Text
            style={[
              styles.emptyText,
              {
                color: theme.text,
              },
            ]}
          >
            No Players Added Yet 😎
          </Text>

          <Text
            style={[
              styles.emptySubText,
              {
                color: theme.subText,
              },
            ]}
          >
            Add players and track stats easily
          </Text>
        </View>
      ) : (
        <FlatList
          data={sortedPlayers}
          keyExtractor={(item, index) =>
            item?._id?.toString() || index.toString()
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 120,
            paddingTop: 8,
          }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={theme.primary}
            />
          }
          initialNumToRender={8}
          maxToRenderPerBatch={8}
          windowSize={5}
          renderItem={({ item, index }) => (
            <Animated.View
              entering={FadeInDown.delay(index * 120).springify()}
              layout={Layout.springify()}
            >
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() =>
                  navigation.navigate('PlayerDetails', {
                    player: item,
                  })
                }
                style={[
                  styles.card,
                  {
                    backgroundColor: theme.card,
                    borderColor: theme.border,
                    shadowColor: theme.glow,
                  },
                ]}
              >
                {/* 😎 Top Row */}
                <View style={styles.topRow}>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={[
                        styles.name,
                        {
                          color: theme.text,
                        },
                      ]}
                    >
                      {item?.name || 'Unknown'}
                    </Text>

                    <Text
                      style={[
                        styles.nickname,
                        {
                          color: theme.subText,
                        },
                      ]}
                    >
                      @{item?.nickName || 'No Nickname'}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.jerseyBox,
                      {
                        backgroundColor: theme.background,
                        borderColor: theme.border,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.jersey,
                        {
                          color: theme.primary,
                        },
                      ]}
                    >
                      Jersey: {item?.jerseyNumber || 0}
                    </Text>
                  </View>
                </View>

                {/* 😎 Divider */}
                <View
                  style={[
                    styles.divider,
                    {
                      backgroundColor: theme.border,
                    },
                  ]}
                />

                {/* 😎 Stats */}
                <View style={styles.statsContainer}>
                  <View
                    style={[
                      styles.statCard,
                      {
                        backgroundColor: theme.background,
                      },
                    ]}
                  >
                    <Zap size={18} color={theme.primary} strokeWidth={2.5} />

                    <Text
                      style={[
                        styles.stat,
                        {
                          color: theme.text,
                        },
                      ]}
                    >
                      Runs: {item?.runs || 0}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.statCard,
                      {
                        backgroundColor: theme.background,
                      },
                    ]}
                  >
                    <Radio size={18} color={theme.primary} strokeWidth={2.5} />

                    <Text
                      style={[
                        styles.stat,
                        {
                          color: theme.text,
                        },
                      ]}
                    >
                      Wickets: {item?.wickets || 0}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.statCard,
                      {
                        backgroundColor: theme.background,
                      },
                    ]}
                  >
                    <TrendingUp
                      size={18}
                      color={theme.primary}
                      strokeWidth={2.5}
                    />

                    <Text
                      style={[
                        styles.stat,
                        {
                          color: theme.text,
                        },
                      ]}
                    >
                      4s: {item?.fours || 0}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.statCard,
                      {
                        backgroundColor: theme.background,
                      },
                    ]}
                  >
                    <Flame size={18} color={theme.primary} strokeWidth={2.5} />

                    <Text
                      style={[
                        styles.stat,
                        {
                          color: theme.text,
                        },
                      ]}
                    >
                      6s: {item?.sixes || 0}
                    </Text>
                  </View>
                </View>

                {/* 😎 Extra Stats */}
                <View style={styles.extraStatsRow}>
                  <View
                    style={[
                      styles.extraStatBox,
                      {
                        backgroundColor: theme.background,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.extraStatLabel,
                        {
                          color: theme.subText,
                        },
                      ]}
                    >
                      Economy
                    </Text>

                    <Text
                      style={[
                        styles.extraStatValue,
                        {
                          color: theme.primary,
                        },
                      ]}
                    >
                      {item?.economy || 0}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.extraStatBox,
                      {
                        backgroundColor: theme.background,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.extraStatLabel,
                        {
                          color: theme.subText,
                        },
                      ]}
                    >
                      Strike Rate
                    </Text>

                    <Text
                      style={[
                        styles.extraStatValue,
                        {
                          color: theme.primary,
                        },
                      ]}
                    >
                      {item?.strikeRate || 0}
                    </Text>
                  </View>
                </View>

                {/* 😎 Bottom Row */}
                <View style={styles.bottomRow}>
                  <View style={styles.badge}>
                    <Trophy size={16} color={theme.primary} strokeWidth={2.5} />

                    <Text
                      style={[
                        styles.badgeText,
                        {
                          color: theme.primary,
                        },
                      ]}
                    >
                      {item?.matchesPlayed || 0} Matches
                    </Text>
                  </View>

                  <ChevronRightCircle
                    size={28}
                    color={theme.primary}
                    strokeWidth={2.4}
                  />
                </View>
              </TouchableOpacity>
            </Animated.View>
          )}
        />
      )}
    </View>
  );
};

export default PlayersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingHorizontal: 16,

    paddingTop: (StatusBar.currentHeight || 0) + 3,
  },

  loader: {
    flex: 1,

    justifyContent: 'center',

    alignItems: 'center',
  },

  loadingText: {
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

    right: -80,
  },

  glowCircleTwo: {
    position: 'absolute',

    width: 250,

    height: 250,

    borderRadius: 200,

    backgroundColor: '#06B6D420',

    bottom: 100,

    left: -90,
  },

  header: {
    fontSize: 32,

    fontWeight: 'bold',
  },

  subHeader: {
    marginTop: 6,

    marginBottom: 20,

    fontSize: 15,
  },

  sortBtn: {
    paddingHorizontal: 18,

    paddingVertical: 10,

    borderRadius: 16,

    marginRight: 12,

    marginBottom: 15,

    borderWidth: 1,

    minHeight: 42,

    justifyContent: 'center',

    alignItems: 'center',
  },

  sortText: {
    fontWeight: 'bold',

    fontSize: 14,

    lineHeight: 18,

    textAlign: 'center',
  },

  card: {
    borderRadius: 24,

    padding: 18,

    marginBottom: 18,

    borderWidth: 1,

    shadowOffset: {
      width: 0,
      height: 0,
    },

    shadowOpacity: 0.6,

    shadowRadius: 14,

    elevation: 10,
  },

  topRow: {
    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'center',
  },

  name: {
    fontSize: 24,

    fontWeight: 'bold',
  },

  nickname: {
    marginTop: 6,

    fontSize: 15,
  },

  jerseyBox: {
    paddingHorizontal: 16,

    paddingVertical: 10,

    borderRadius: 16,

    borderWidth: 1,
  },

  jersey: {
    fontSize: 18,

    fontWeight: 'bold',
  },

  divider: {
    height: 1,

    marginVertical: 18,
  },

  statsContainer: {
    flexDirection: 'row',

    flexWrap: 'wrap',

    justifyContent: 'space-between',
  },

  statCard: {
    width: '48%',

    borderRadius: 16,

    padding: 12,

    marginBottom: 12,

    flexDirection: 'row',

    alignItems: 'center',
  },

  stat: {
    marginLeft: 8,

    fontSize: 14,

    fontWeight: '600',
  },

  bottomRow: {
    marginTop: 8,

    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'center',
  },

  badge: {
    flexDirection: 'row',

    alignItems: 'center',
  },

  badgeText: {
    marginLeft: 6,

    fontSize: 14,

    fontWeight: '700',
  },

  emptyContainer: {
    flex: 1,

    justifyContent: 'center',

    alignItems: 'center',
  },

  emptyText: {
    fontSize: 22,

    fontWeight: 'bold',

    marginTop: 18,
  },

  headerRow: {
    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'center',
  },

  searchBtn: {
    width: 52,

    height: 52,

    borderRadius: 16,

    justifyContent: 'center',

    alignItems: 'center',

    borderWidth: 1,
  },

  searchContainer: {
    flexDirection: 'row',

    alignItems: 'center',

    borderRadius: 18,

    paddingHorizontal: 16,

    marginBottom: 18,

    borderWidth: 1,
  },

  searchInput: {
    flex: 1,

    marginLeft: 10,

    fontSize: 15,

    height: 52,
  },

  extraStatsRow: {
    flexDirection: 'row',

    justifyContent: 'space-between',

    marginTop: 6,

    marginBottom: 10,
  },

  extraStatBox: {
    width: '48%',

    borderRadius: 16,

    paddingVertical: 14,

    alignItems: 'center',
  },

  extraStatLabel: {
    fontSize: 13,
  },

  extraStatValue: {
    fontSize: 18,

    fontWeight: 'bold',

    marginTop: 4,
  },

  emptySubText: {
    marginTop: 8,

    fontSize: 14,
  },
});
