// src/screens/Rules/RulesScreen.tsx 😎🔥

import React, { useEffect } from 'react';

import { View, Text, StyleSheet, ScrollView, StatusBar } from 'react-native';

import {
  BookOpen,
  Trophy,
  ShieldCheck,
  Goal,
  CircleDot,
  Gavel,
  Handshake,
  Award,
} from 'lucide-react-native';

import Animated, {
  FadeInDown,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import COLORS from '../../constants/colors';

const theme = COLORS;

const RulesScreen = () => {
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

  const rules = [
    {
      text: 'Each team can play with 11 players.',
      icon: ShieldCheck,
    },

    {
      text: 'The toss winner chooses batting or bowling first.',
      icon: Goal,
    },

    {
      text: 'A legal delivery must be bowled within the crease line.',
      icon: CircleDot,
    },

    {
      text: 'Wide and No Ball deliveries give extra runs.',
      icon: Award,
    },

    {
      text: 'A batsman is out if the stumps are broken while batting.',
      icon: Gavel,
    },

    {
      text: 'Catch-out is valid only if the ball is caught before touching ground.',
      icon: Handshake,
    },

    {
      text: 'A run-out happens when the batsman fails to reach the crease.',
      icon: Goal,
    },

    {
      text: 'LBW can be considered if the ball hits the leg before the bat.',
      icon: ShieldCheck,
    },

    {
      text: 'Boundary touching the rope gives 4 runs.',
      icon: Award,
    },

    {
      text: 'If the ball crosses boundary without bounce, it gives 6 runs.',
      icon: Trophy,
    },

    {
      text: 'Every over contains 6 legal deliveries.',
      icon: CircleDot,
    },

    {
      text: 'Bowler cannot bowl two consecutive overs in some local formats.',
      icon: Gavel,
    },

    {
      text: 'Umpire decision is final during the match.',
      icon: ShieldCheck,
    },

    {
      text: 'Strike rate and economy are important player statistics.',
      icon: Award,
    },

    {
      text: 'Fair play and sportsmanship must always be maintained.',
      icon: Handshake,
    },
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
        {/* 😎 Header */}
        <Animated.View entering={FadeInDown.duration(700)}>
          <Text
            style={[
              styles.title,
              {
                color: theme.text,
              },
            ]}
          >
            Gully Cricket Rules
          </Text>

          <Text
            style={[
              styles.subtitle,
              {
                color: theme.subText,
              },
            ]}
          >
            Important cricket rules every player should know
          </Text>
        </Animated.View>

        {/* 😎 Intro Card */}
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
            <BookOpen size={24} color={theme.primary} strokeWidth={2.5} />

            <Text style={styles.cardTitle}>Cricket Rule Book</Text>
          </View>

          <Text
            style={[
              styles.description,
              {
                color: theme.subText,
              },
            ]}
          >
            These rules are inspired by official IPL cricket formats along with
            common gully cricket gameplay styles. Understanding these rules
            helps players improve discipline, gameplay quality and overall match
            experience.
          </Text>
        </Animated.View>

        {/* 😎 Rules List */}
        {rules.map((rule, index) => {
          const RuleIcon = rule.icon;
          return (
            <Animated.View
              key={index}
              entering={FadeInDown.delay(index * 80)}
              style={[
                styles.ruleCard,
                {
                  backgroundColor: theme.card,
                  borderColor: theme.border,
                },
              ]}
            >
              <View style={styles.ruleTop}>
                <View
                  style={[
                    styles.numberBox,
                    {
                      backgroundColor: theme.primary,
                    },
                  ]}
                >
                  <RuleIcon size={18} color="#000" strokeWidth={3} />
                </View>

                <Text
                  style={[
                    styles.ruleText,
                    {
                      color: theme.text,
                    },
                  ]}
                >
                  {rule.text}
                </Text>
              </View>
            </Animated.View>
          );
        })}

        {/* 😎 Footer */}
        <Animated.View entering={FadeInDown.delay(1200)}>
          <View
            style={[
              styles.footerCard,
              {
                backgroundColor: theme.card,
                borderColor: theme.border,
              },
            ]}
          >
            <Trophy size={32} color={theme.primary} strokeWidth={2.5} />

            <Text
              style={[
                styles.footerTitle,
                {
                  color: theme.text,
                },
              ]}
            >
              Play Fair & Enjoy Cricket 
            </Text>

            <Text
              style={[
                styles.footerText,
                {
                  color: theme.subText,
                },
              ]}
            >
              Cricket is not only about winning. Respect your teammates,
              opponents and enjoy the game with sportsmanship spirit.
            </Text>
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
};

export default RulesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: (StatusBar.currentHeight || 0) + 15,
  },

  glow1: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 200,
    backgroundColor: '#00C2FF22',
    top: -100,
    right: -90,
  },

  glow2: {
    position: 'absolute',
    width: 240,
    height: 240,
    borderRadius: 200,
    backgroundColor: '#00C2FF22',
    bottom: 120,
    left: -70,
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 26,
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

    shadowOpacity: 0.4,

    shadowRadius: 10,

    elevation: 8,
  },

  headingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },

  cardTitle: {
    color: '#00F5FF',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },

  description: {
    fontSize: 15,
    lineHeight: 24,
  },

  ruleCard: {
    borderRadius: 22,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,

    shadowColor: '#00F5FF',

    shadowOffset: {
      width: 0,
      height: 0,
    },

    shadowOpacity: 0.25,

    shadowRadius: 8,

    elevation: 5,
  },

  ruleTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  numberBox: {
    width: 36,
    height: 36,
    borderRadius: 18,

    justifyContent: 'center',
    alignItems: 'center',

    marginRight: 14,
  },

  numberText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 15,
  },

  ruleText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 24,
    fontWeight: '600',
  },

  footerCard: {
    marginTop: 10,
    borderRadius: 24,
    padding: 22,
    alignItems: 'center',
    borderWidth: 1,
  },

  footerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 14,
    marginBottom: 10,
  },

  footerText: {
    fontSize: 15,
    lineHeight: 24,
    textAlign: 'center',
  },
});
