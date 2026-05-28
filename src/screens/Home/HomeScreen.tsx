// src/screens/Home/HomeScreen.tsx

import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { useFocusEffect, useNavigation } from '@react-navigation/native';


import HomeSkeleton from '../../components/HomeSkeleton';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  Platform,
} from 'react-native';

import {
  UserPlus,
  Users,
  Swords,
  RefreshCcw,
  ChartBar,
} from 'lucide-react-native';

import Animated, {
  FadeInDown,
  FadeInUp,
  FadeInRight,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  Easing,
} from 'react-native-reanimated';

import TopPerformers from '../../components/TopPerformers';

import { getPlayers } from '../../api/playerApi';

import { getTeams } from '../../api/teamApi';

import { getDashboard, getTopPerformers } from '../../api/dashboardApi';

import COLORS from '../../constants/colors';

const HomeScreen = () => {
  const theme = COLORS;

  const navigation = useNavigation<any>();

  // 😎 States
  const [loading, setLoading] = useState(true);

  const [dashboard, setDashboard] = useState({
    totalPlayers: 0,
    totalRuns: 0,
    totalWickets: 0,
    totalMatches: 0,
  });

  const [topStats, setTopStats] = useState<any[]>([]);

  // 😎 Neon Glow Animation
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

  // 😎 Fetch Dashboard Data
  const fetchDashboard = async () => {
    try {
      setLoading(true);

      // 😎 Dashboard Stats API
      const dashboardRes = await getDashboard();

      console.log('Dashboard Response 😎', dashboardRes);

      const stats = dashboardRes?.stats || {};

      setDashboard({
        totalPlayers: stats?.totalPlayers || 0,

        totalRuns: stats?.totalRuns || 0,

        totalWickets: stats?.totalWickets || 0,

        totalMatches: stats?.totalMatches || 0,
      });

      // 😎 Top Performers API
      const performersRes = await getTopPerformers();

      console.log('Performers Response ', performersRes);

      const performers = performersRes?.performers || [];

      setTopStats(
        performers.map((item: any) => ({
          title: item?.title || 'N/A',

          player: item?.player || 'N/A',

          value: item?.value || '0',

          icon: item?.icon || 'trophy-outline',
        })),
      );
    } catch (error) {
      console.log('Dashboard Fetch Error 😭', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchDashboard();
    }, []),
  );

  // 😎 Greeting
  const greeting = useMemo(() => {
    const hour = new Date().getHours();

    if (hour < 12) {
      return 'Good Morning';
    }

    if (hour < 17) {
      return 'Good Afternoon';
    }

    if (hour < 21) {
      return 'Good Evening';
    }

    return 'Good Night';
  }, []);

  // 😎 Quick Actions
  const quickActions = [
    {
      title: 'Add Player',
      icon: UserPlus,
      screen: 'AddPlayer',
    },

    {
      title: 'Create Team',
      icon: Users,
      screen: 'CreateTeam',
    },

    {
      title: 'Create Match',
      icon: Swords,
      screen: 'CreateMatch',
    },

    {
      title: 'Refresh',
      icon: RefreshCcw,
      action: fetchDashboard,
    },
  ];

  if (loading) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.background,
      }}
    >
      <HomeSkeleton />
    </View>
  );
}

  return (
    <View
      style={[
        styles.mainContainer,
        {
          backgroundColor: COLORS.background,
        },
      ]}
    >
      {/* 😎 StatusBar */}
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      {/* 😎 Animated Glow */}
      <Animated.View style={[styles.glowCircleOne, glowStyle]} />

      <Animated.View style={[styles.glowCircleTwo, glowStyle]} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 120,
        }}
      >
        {/* 😎 Header */}
        <Animated.View entering={FadeInUp.duration(700)} style={styles.header}>
          <Text
            style={[
              styles.greeting,
              {
                color: COLORS.text,
              },
            ]}
          >
            {greeting}
          </Text>

          <Text
            style={[
              styles.subText,
              {
                color: COLORS.subText,
              },
            ]}
          >
            Welcome Back to Gully Cricket
          </Text>
        </Animated.View>

        {/* 😎 Dashboard */}
        <Animated.View
          entering={FadeInDown.duration(700)}
          style={[
            styles.dashboard,
            {
              backgroundColor: COLORS.card,
              borderColor: COLORS.border,
              shadowColor: COLORS.glow,
            },
          ]}
        >
          <View style={styles.dashboardTop}>
            <ChartBar size={28} color={COLORS.primary} />

            <Text
              style={[
                styles.dashboardTitle,
                {
                  color: COLORS.text,
                },
              ]}
            >
              Cricket Dashboard
            </Text>
          </View>

          <View style={styles.statsGrid}>
            {[
              {
                label: 'Players',
                value: dashboard.totalPlayers,
              },

              {
                label: 'Runs',
                value: dashboard.totalRuns,
              },

              {
                label: 'Wickets',
                value: dashboard.totalWickets,
              },

              {
                label: 'Matches',
                value: dashboard.totalMatches,
              },
            ].map((item, index) => (
              <Animated.View
                key={index}
                entering={FadeInDown.duration(500 + index * 120)}
                style={styles.statBox}
              >
                <Text
                  style={[
                    styles.statValue,
                    {
                      color: COLORS.primary,
                    },
                  ]}
                >
                  {item.value}
                </Text>

                <Text
                  style={[
                    styles.statLabel,
                    {
                      color: COLORS.subText,
                    },
                  ]}
                >
                  {item.label}
                </Text>
              </Animated.View>
            ))}
          </View>
        </Animated.View>

        {/* 😎 Quick Actions */}
        <Animated.Text
          entering={FadeInRight.duration(700)}
          style={[
            styles.sectionTitle,
            {
              color: COLORS.text,
            },
          ]}
        >
          Quick Actions
        </Animated.Text>

        <View style={styles.grid}>
          {quickActions.map((item, index) => (
            <Animated.View
              key={index}
              entering={FadeInDown.duration(500 + index * 120)}
              style={{
                width: '48%',
              }}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                style={[
                  styles.actionBtn,
                  {
                    backgroundColor: COLORS.card,
                    borderColor: COLORS.border,
                    shadowColor: COLORS.glow,
                  },
                ]}
                onPress={() => {
                  try {
                    if (item.screen) {
                      navigation.navigate(item.screen);
                    }

                    if (item.action) {
                      item.action();
                    }
                  } catch (err) {
                    console.log('Navigation Error 😭', err);
                  }
                }}
              >
                <item.icon size={30} color={COLORS.primary} />

                <Text
                  style={[
                    styles.actionText,
                    {
                      color: COLORS.text,
                    },
                  ]}
                >
                  {item.title}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>

        {/* 😎 Top Performers */}
        <Animated.Text
          entering={FadeInRight.duration(700)}
          style={[
            styles.sectionTitle,
            {
              color: COLORS.text,
            },
          ]}
        >
          Top Performers
        </Animated.Text>

        <View style={styles.performersGrid}>
          {topStats.length === 0 ? (
            <Text style={{ color: COLORS.subText }}>No stats available</Text>
          ) : (
            topStats.map((item, index) => (
              <Animated.View
                key={index}
                entering={FadeInDown.duration(600 + index * 120)}
                style={styles.performerWrapper}
              >
                {/* 😎 Crash Safe Component */}
                <TopPerformers
                  item={{
                    ...item,
                    index,
                  }}
                  theme={COLORS}
                />
              </Animated.View>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,

    paddingHorizontal: 16,

    paddingTop: (StatusBar.currentHeight || 0) + 10,
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
    marginTop: 10,

    marginBottom: 24,
  },

  greeting: {
    fontSize: 32,

    fontWeight: 'bold',
  },

  subText: {
    marginTop: 8,

    fontSize: 15,
  },

  dashboard: {
    borderRadius: 24,

    padding: 20,

    borderWidth: 1,

    shadowOffset: {
      width: 0,
      height: 0,
    },

    shadowOpacity: 0.6,

    shadowRadius: 14,

    elevation: 10,
  },

  dashboardTop: {
    flexDirection: 'row',

    alignItems: 'center',

    marginBottom: 20,
  },

  dashboardTitle: {
    fontSize: 22,

    fontWeight: 'bold',

    marginLeft: 10,
  },

  statsGrid: {
    flexDirection: 'row',

    flexWrap: 'wrap',

    justifyContent: 'space-between',
  },

  statBox: {
    width: '48%',

    backgroundColor: '#0F172A',

    borderRadius: 18,

    paddingVertical: 18,

    alignItems: 'center',

    marginBottom: 14,

    borderWidth: 1,

    borderColor: '#164E63',
  },

  statValue: {
    fontSize: 28,

    fontWeight: 'bold',
  },

  statLabel: {
    marginTop: 6,

    fontSize: 15,
  },

  sectionTitle: {
    fontSize: 24,

    fontWeight: 'bold',

    marginTop: 28,

    marginBottom: 16,
  },

  performersGrid: {
    flexDirection: 'row',

    flexWrap: 'wrap',

    justifyContent: 'space-between',
  },

  performerWrapper: {
    width: '48%',

    marginBottom: 14,
  },

  grid: {
    flexDirection: 'row',

    flexWrap: 'wrap',

    justifyContent: 'space-between',
  },

  actionBtn: {
    borderRadius: 22,

    paddingVertical: 24,

    alignItems: 'center',

    marginBottom: 14,

    borderWidth: 1,

    shadowOffset: {
      width: 0,
      height: 0,
    },

    shadowOpacity: 0.5,

    shadowRadius: 12,

    elevation: 10,
  },

  actionText: {
    marginTop: 10,

    fontSize: 16,

    fontWeight: 'bold',
  },
});
