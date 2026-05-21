// src/screens/Dashboard/DashboardScreen.tsx 😎🔥

import React, { useEffect, useMemo, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  Platform,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import {
  Trophy,
  Flame,
  Medal,
  Target,
  Shield,
  CircleDot,
  Award,
  Star,
  ChartNoAxesCombined,
  AlertCircle,
} from 'lucide-react-native';

import Animated, {
  FadeInDown,
  FadeInRight,
  FadeInUp,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';

import COLORS from '../../constants/colors';

import { getPlayers } from '../../api/playerApi';

const DashboardScreen = () => {
  const theme = COLORS;

  const navigation = useNavigation<any>();

  const [loading, setLoading] = useState(true);

  const [players, setPlayers] = useState<any[]>([]);

  const [activeCategory, setActiveCategory] = useState('Most Runs');

  // 😎 Animated Background
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

      const response = await getPlayers();

      const data = Array.isArray(response?.players)
        ? response.players
        : Array.isArray(response)
        ? response
        : [];

      setPlayers(data);
    } catch (error) {
      console.log('Dashboard Fetch Error 😭', error);

      setPlayers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  // 😎 Categories
  const categories = [
    'Most Runs',
    'Most 6s',
    'Most 4s',
    'Most Wickets',
    'Best Economy',
    'Most Catches',
    'Most Dot Balls',
    'Most 30s',
    'Most 40s',
  ];

  // 😎 Dynamic Sorting
  const sortedPlayers = useMemo(() => {
    let sorted = [...players];

    switch (activeCategory) {
      case 'Most Runs':
        return sorted.sort((a, b) => (b?.runs || 0) - (a?.runs || 0));

      case 'Most 6s':
        return sorted.sort((a, b) => (b?.sixes || 0) - (a?.sixes || 0));

      case 'Most 4s':
        return sorted.sort((a, b) => (b?.fours || 0) - (a?.fours || 0));

      case 'Most Wickets':
        return sorted.sort((a, b) => (b?.wickets || 0) - (a?.wickets || 0));

      case 'Best Economy':
        return sorted.sort((a, b) => (a?.economy || 999) - (b?.economy || 999));

      case 'Most Catches':
        return sorted.sort((a, b) => (b?.catches || 0) - (a?.catches || 0));

      case 'Most Dot Balls':
        return sorted.sort((a, b) => (b?.dotBalls || 0) - (a?.dotBalls || 0));

      case 'Most 100s':
        return sorted.sort((a, b) => (b?.centuries || 0) - (a?.centuries || 0));

      case 'Most 50s':
        return sorted.sort(
          (a, b) => (b?.halfCenturies || 0) - (a?.halfCenturies || 0),
        );

      default:
        return sorted;
    }
  }, [players, activeCategory]);

  // 😎 Get Dynamic Value
  const getValue = (player: any) => {
    switch (activeCategory) {
      case 'Most Runs':
        return `${player?.runs || 0} Runs`;

      case 'Most 6s':
        return `${player?.sixes || 0} Sixes`;

      case 'Most 4s':
        return `${player?.fours || 0} Fours`;

      case 'Most Wickets':
        return `${player?.wickets || 0} Wickets`;

      case 'Best Economy':
        return `${player?.economy || 0} Economy`;

      case 'Most Catches':
        return `${player?.catches || 0} Catches`;

      case 'Most Dot Balls':
        return `${player?.dotBalls || 0} Dot Balls`;

      case 'Most 100s':
        return `${player?.centuries || 0} Centuries`;

      case 'Most 50s':
        return `${player?.halfCenturies || 0} Half Centuries`;

      default:
        return '0';
    }
  };

  // 😎 Dynamic Category Icons
  const getCategoryIcon = () => {
    switch (activeCategory) {
      case 'Most Runs':
        return ChartNoAxesCombined;

      case 'Most 6s':
        return Flame;

      case 'Most 4s':
        return Target;

      case 'Most Wickets':
        return Trophy;

      case 'Best Economy':
        return Shield;

      case 'Most Catches':
        return Award;

      case 'Most Dot Balls':
        return CircleDot;

      case 'Most 100s':
        return Medal;

      case 'Most 50s':
        return Star;

      default:
        return Trophy;
    }
  };

  // 😎 Rank Colors
  const getRankColor = (index: number) => {
    if (index === 0) {
      return '#FFD700';
    }

    if (index === 1) {
      return '#C0C0C0';
    }

    if (index === 2) {
      return '#CD7F32';
    }

    return theme.primary;
  };

  // 😎 Loading
  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={theme.primary} />

        <Text style={styles.loadingText}>Loading Dashboard...</Text>
      </View>
    );
  }

  const CategoryIcon = getCategoryIcon();

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
           Dashboard
        </Text>

        <Text
          style={[
            styles.subHeader,
            {
              color: theme.subText,
            },
          ]}
        >
          Player Rankings & Cricket Stats 
        </Text>
      </Animated.View>

      {/* 😎 Categories */}
      <Animated.View entering={FadeInRight.duration(700)}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryContainer}
        >
          {categories.map((item, index) => {
            const isActive = activeCategory === item;

            return (
              <TouchableOpacity
                key={index}
                activeOpacity={0.8}
                style={[
                  styles.categoryButton,
                  {
                    backgroundColor: isActive ? theme.primary : theme.card,

                    borderColor: isActive ? theme.primary : theme.border,
                  },
                ]}
                onPress={() => setActiveCategory(item)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    {
                      color: isActive ? '#000' : theme.text,
                    },
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </Animated.View>

      {/* 😎 Empty State */}
      {sortedPlayers.length === 0 ? (
        <View style={styles.emptyBox}>
          <AlertCircle size={60} color={theme.primary} strokeWidth={2.5} />

          <Text
            style={[
              styles.emptyText,
              {
                color: theme.text,
              },
            ]}
          >
            No Players Found
          </Text>

          <Text
            style={[
              styles.emptySubText,
              {
                color: theme.subText,
              },
            ]}
          >
            Add players to see stats 😎
          </Text>
        </View>
      ) : (
        <FlatList
          data={sortedPlayers}
          keyExtractor={(item, index) =>
            item?._id || item?.id || index.toString()
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 120,
          }}
          renderItem={({ item, index }) => (
            <Animated.View entering={FadeInDown.duration(500 + index * 120)}>
              <TouchableOpacity
                activeOpacity={0.85}
                style={[
                  styles.playerCard,
                  {
                    backgroundColor: theme.card,

                    borderColor: theme.border,

                    shadowColor: theme.glow,
                  },
                ]}
                onPress={() =>
                  navigation.navigate('PlayerDetails', {
                    player: item,
                  })
                }
              >
                {/* 😎 Rank */}
                <View
                  style={[
                    styles.rankCircle,
                    {
                      backgroundColor: getRankColor(index),
                    },
                  ]}
                >
                  <Text style={styles.rankText}>{index + 1}</Text>
                </View>

                {/* 😎 Info */}
                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <Text
                    style={[
                      styles.playerName,
                      {
                        color: theme.text,
                      },
                    ]}
                  >
                    {item?.name || 'Unknown'}
                  </Text>

                  <Text
                    style={[
                      styles.match,
                      {
                        color: theme.subText,
                      },
                    ]}
                  >
                    Matches: {item?.matchesPlayed || 0}
                  </Text>

                  <Text
                    style={[
                      styles.playerValue,
                      {
                        color: theme.primary,
                      },
                    ]}
                  >
                    {getValue(item)}
                  </Text>
                </View>

                {/* 😎 Trophy */}
                <CategoryIcon
                  size={30}
                  color={theme.primary}
                  strokeWidth={2.5}
                />
              </TouchableOpacity>
            </Animated.View>
          )}
        />
      )}
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingTop:
      Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 15 : 50,

    paddingHorizontal: 16,
  },

  loader: {
    flex: 1,

    justifyContent: 'center',

    alignItems: 'center',

    backgroundColor: '#07111F',
  },

  loadingText: {
    color: '#fff',

    marginTop: 14,

    fontSize: 15,
  },

  glowCircleOne: {
    position: 'absolute',

    width: 320,

    height: 320,

    borderRadius: 200,

    backgroundColor: '#22D3EE20',

    top: -100,

    right: -80,
  },

  glowCircleTwo: {
    position: 'absolute',

    width: 250,

    height: 250,

    borderRadius: 200,

    backgroundColor: '#06B6D420',

    bottom: 100,

    left: -80,
  },

  header: {
    fontSize: 32,

    fontWeight: 'bold',
  },

  subHeader: {
    fontSize: 15,

    marginTop: 6,

    marginBottom: 22,
  },

  categoryContainer: {
    paddingBottom: 16,

    paddingRight: 30,
  },

  categoryButton: {
    paddingVertical: 10,

    paddingHorizontal: 18,

    borderRadius: 20,

    marginRight: 12,

    borderWidth: 1,
  },

  categoryText: {
    fontSize: 14,

    fontWeight: '700',
  },

  playerCard: {
    borderRadius: 22,

    padding: 18,

    marginBottom: 16,

    flexDirection: 'row',

    alignItems: 'center',

    borderWidth: 1,

    shadowOffset: {
      width: 0,
      height: 0,
    },

    shadowOpacity: 0.5,

    shadowRadius: 12,

    elevation: 10,
  },

  rankCircle: {
    width: 50,

    height: 50,

    borderRadius: 100,

    justifyContent: 'center',

    alignItems: 'center',

    marginRight: 16,
  },

  rankText: {
    color: '#000',

    fontWeight: 'bold',

    fontSize: 18,
  },

  playerName: {
    fontSize: 18,

    fontWeight: 'bold',
  },

  match: {
    marginTop: 5,

    fontSize: 13,
  },

  playerValue: {
    marginTop: 8,

    fontSize: 15,

    fontWeight: '700',
  },

  emptyBox: {
    flex: 1,

    justifyContent: 'center',

    alignItems: 'center',
  },

  emptyText: {
    fontSize: 22,

    fontWeight: 'bold',

    marginTop: 14,
  },

  emptySubText: {
    fontSize: 14,

    marginTop: 8,
  },
});
