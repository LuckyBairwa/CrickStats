// src/screens/AboutApp/AboutAppScreen.tsx 😎🔥

import React, { useEffect } from 'react';

import { View, Text, StyleSheet, ScrollView, StatusBar } from 'react-native';

import {
  Info,
  Zap,
  Trophy,
  BarChart3,
  Palette,
  Rocket,
  CheckCircle2,
  Shield,
} from 'lucide-react-native';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  FadeInUp,
  FadeInDown,
} from 'react-native-reanimated';

import COLORS from '../../constants/colors';

const theme = COLORS;

const AboutAppScreen = () => {
  const glow = useSharedValue(0.6);

  useEffect(() => {
    glow.value = withRepeat(
      withTiming(1, {
        duration: 2200,
      }),
      -1,
      true,
    );
  }, []);

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glow.value,
    transform: [
      {
        scale: glow.value,
      },
    ],
  }));

  const features = [
    'Live Match Management',
    'Player Stats Tracking',
    'Team Builder System',
    'Toss & Match Simulation',
    'Performance Dashboard',
    'Animated Modern UI',
    'Realtime Match Flow',
    'Detailed Player Analytics',
  ];

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
      <Animated.View style={[styles.glow1, glowStyle]} />

      <Animated.View style={[styles.glow2, glowStyle]} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 120,
        }}
      >
        {/* 😎 Hero Section */}
        <Animated.View entering={FadeInUp.duration(700)}>
          {/* Title Row with Version Badge */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
            }}
          >
            <Text
              style={[
                styles.mainTitle,
                {
                  color: theme.text,
                  marginBottom: 2,
                  flex: 1,
                },
              ]}
            >
              About GCPL
            </Text>

            {/* Version Badge */}
            <View
              style={{
                backgroundColor: '#00C2FF18',
                borderColor: '#00F5FF',
                borderWidth: 1,
                borderRadius: 20,
                paddingHorizontal: 10,
                paddingVertical: 4,
                marginTop: 6,
                marginLeft: 8,
              }}
            >
              <Text
                style={{
                  color: '#00F5FF',
                  fontSize: 16,
                  fontWeight: '700',
                  letterSpacing: 0.5,
                }}
              >
                v1.1.1
              </Text>
            </View>
          </View>

          <Text
            style={[
              styles.tagline,
              {
                color: theme.primary,
              },
            ]}
          >
            Gully Cricket Premier League
          </Text>

          <Text
            style={[
              styles.description,
              {
                color: theme.subText,
              },
            ]}
          >
            Gully Cricket Scorer is a modern mobile application specially
            designed for street cricket lovers who want to manage teams,
            players, matches and statistics in a professional way.
          </Text>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(100)}
          style={[
            styles.card,
            {
              backgroundColor: theme.card,
              borderColor: theme.border,
            },
          ]}
        >
          <View style={styles.headingRow}>
            <Info size={24} color={theme.primary} strokeWidth={2.5} />

            <Text style={styles.sectionTitle}>App Overview</Text>
          </View>

          <Text
            style={[
              styles.paragraph,
              {
                color: theme.subText,
              },
            ]}
          >
            This application helps users organize cricket matches easily with
            proper score management, player statistics, team creation and toss
            simulation features. The app focuses on providing a smooth,
            beautiful and modern experience with futuristic UI design and
            animated screens.
          </Text>

          <Text
            style={[
              styles.paragraph,
              {
                color: theme.subText,
              },
            ]}
          >
            Instead of writing scores manually on paper, users can digitally
            manage all cricket activities directly from their phone with fast
            performance and easy navigation.
          </Text>
        </Animated.View>

        {/*  Features */}
        <Animated.View
          entering={FadeInDown.delay(200)}
          style={[
            styles.card,
            {
              backgroundColor: theme.card,
              borderColor: theme.border,
            },
          ]}
        >
          <View style={styles.headingRow}>
            <Zap size={24} color={theme.primary} strokeWidth={2.5} />

            <Text style={styles.sectionTitle}>Core Features</Text>
          </View>

          {features.map((item, index) => (
            <View key={index} style={styles.featureRow}>
              <CheckCircle2 size={20} color={theme.primary} strokeWidth={2.5} />

              <Text
                style={[
                  styles.featureText,
                  {
                    color: theme.text,
                  },
                ]}
              >
                {item}
              </Text>
            </View>
          ))}
        </Animated.View>

        {/*  Match System */}
        <Animated.View
          entering={FadeInDown.delay(300)}
          style={[
            styles.card,
            {
              backgroundColor: theme.card,
              borderColor: theme.border,
            },
          ]}
        >
          <View style={styles.headingRow}>
            <Trophy size={24} color={theme.primary} strokeWidth={2.5} />

            <Text style={styles.sectionTitle}>Match Management System</Text>
          </View>

          <Text
            style={[
              styles.paragraph,
              {
                color: theme.subText,
              },
            ]}
          >
            The app allows users to create matches between teams, manage toss
            results, select batting or bowling decisions and track complete
            match progress with interactive controls.
          </Text>

          <Text
            style={[
              styles.paragraph,
              {
                color: theme.subText,
              },
            ]}
          >
            Every match is organized with proper structure so players can enjoy
            a professional scoring experience even in local gully cricket
            tournaments
          </Text>
        </Animated.View>

        {/* Player Analytics */}
        <Animated.View
          entering={FadeInDown.delay(400)}
          style={[
            styles.card,
            {
              backgroundColor: theme.card,
              borderColor: theme.border,
            },
          ]}
        >
          <View style={styles.headingRow}>
            <BarChart3 size={24} color={theme.primary} strokeWidth={2.5} />

            <Text style={styles.sectionTitle}>
              Player Performance Analytics
            </Text>
          </View>

          <Text
            style={[
              styles.paragraph,
              {
                color: theme.subText,
              },
            ]}
          >
            Detailed player statistics are available including runs, wickets,
            strike rate, economy, boundaries, catches and match performance.
          </Text>

          <Text
            style={[
              styles.paragraph,
              {
                color: theme.subText,
              },
            ]}
          >
            Users can easily identify top performers, best bowlers and powerful
            batsmen using the dashboard analytics system.
          </Text>
        </Animated.View>

        {/*  UI Design */}
        <Animated.View
          entering={FadeInDown.delay(500)}
          style={[
            styles.card,
            {
              backgroundColor: theme.card,
              borderColor: theme.border,
            },
          ]}
        >
          <View style={styles.headingRow}>
            <Palette size={24} color={theme.primary} strokeWidth={2.5} />

            <Text style={styles.sectionTitle}>Modern UI Experience</Text>
          </View>

          <Text
            style={[
              styles.paragraph,
              {
                color: theme.subText,
              },
            ]}
          >
            The application uses animated transitions, glowing backgrounds,
            modern cards and neon styled components to create a futuristic user
            experience.
          </Text>

          <Text
            style={[
              styles.paragraph,
              {
                color: theme.subText,
              },
            ]}
          >
            Smooth animations and responsive layouts make the app feel premium
            and visually attractive for every cricket fan
          </Text>
        </Animated.View>

        {/* 😎 Future Updates */}
        <Animated.View
          entering={FadeInDown.delay(600)}
          style={[
            styles.card,
            {
              backgroundColor: theme.card,
              borderColor: theme.border,
            },
          ]}
        >
          <View style={styles.headingRow}>
            <Rocket size={24} color={theme.primary} strokeWidth={2.5} />

            <Text style={styles.sectionTitle}>Future Improvements</Text>
          </View>

          <Text
            style={[
              styles.paragraph,
              {
                color: theme.subText,
              },
            ]}
          >
            Upcoming versions may include live online scoring, cloud sync,
            tournament systems, leaderboard rankings, AI powered insights,
            multiplayer support and advanced scorecards.
          </Text>

          <Text
            style={[
              styles.paragraph,
              {
                color: theme.subText,
              },
            ]}
          >
            The vision is to transform local cricket management into a complete
            digital ecosystem
          </Text>
        </Animated.View>

        {/*  Footer */}
        <Animated.View entering={FadeInDown.delay(700)}>
          <Text
            style={[
              styles.footer1,
              {
                color: theme.primary,
              },
            ]}
          >
            Made by @Lucky Shairwal
          </Text>
          <Text
            style={[
              styles.footer2,
              {
                color: theme.primary,
              },
            ]}
          >
            For Gully Cricket Lovers
          </Text>
        </Animated.View>
      </ScrollView>
    </View>
  );
};

export default AboutAppScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: (StatusBar.currentHeight || 0) + 10,
  },

  glow1: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 200,
    backgroundColor: '#00C2FF22',
    top: -100,
    right: -80,
  },

  glow2: {
    position: 'absolute',
    width: 240,
    height: 240,
    borderRadius: 200,
    backgroundColor: '#00C2FF22',
    bottom: 80,
    left: -80,
  },

  mainTitle: {
    fontSize: 34,
    fontWeight: 'bold',
    marginTop: 10,
  },

  tagline: {
    fontSize: 17,
    fontWeight: '700',
    marginTop: 8,
    marginBottom: 18,
  },

  description: {
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 24,
  },

  card: {
    borderRadius: 24,
    padding: 18,
    marginBottom: 20,
    borderWidth: 1,

    shadowColor: '#00F5FF',

    shadowOffset: {
      width: 0,
      height: 0,
    },

    shadowOpacity: 0.35,

    shadowRadius: 10,

    elevation: 8,
  },

  headingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },

  sectionTitle: {
    color: '#00F5FF',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },

  paragraph: {
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 14,
  },

  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  featureText: {
    fontSize: 15,
    marginLeft: 10,
    fontWeight: '600',
  },

  footer1: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    marginTop: 10,
  },
  footer2: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '500',
    marginTop: 4,
  },
});
