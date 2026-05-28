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
    },

    {
      text: 'The toss winner chooses batting or bowling first.',
    },

    {
      text: 'Every over contains 6 legal deliveries.',
    },

    {
      text: 'Wide ball gives 1 extra run and the ball is rebowled.',
    },

    {
      text: 'No Ball gives 1 extra run and batsman can score free runs.',
    },

    {
      text: 'Free Hit allows batsman to play without getting out except run out.',
    },

    {
      text: 'Bye runs are scored when ball misses bat and body completely.',
    },

    {
      text: 'Leg Bye runs are counted when ball touches batsman body or pad.',
    },

    {
      text: 'LBW occurs if ball hits leg before bat and would hit stumps.',
    },

    {
      text: 'A batsman is out if stumps are broken before reaching crease.',
    },

    {
      text: 'Catch out is valid only before ball touches the ground.',
    },

    {
      text: 'Boundary touching rope gives 4 runs.',
    },

    {
      text: 'Ball crossing boundary without bounce gives 6 runs.',
    },

    {
      text: 'Run out happens if fielders break stumps while batsman is outside crease.',
    },

    {
      text: 'Dot ball means no run scored on a legal delivery.',
    },

    {
      text: 'Strike Rate shows how fast a batsman scores runs.',
    },

    {
      text: 'Economy Rate shows runs given by bowler per over.',
    },

    {
      text: 'Dead ball means delivery is cancelled and not counted.',
    },

    {
      text: 'Overthrow runs are counted if fielding team throws ball away.',
    },

    {
      text: 'If wickets fall completely, innings is declared all out.',
    },

    {
      text: 'Late run means batsmen complete run before wicket is broken.',
    },

    {
      text: 'A batsman must stand inside crease to stay safe from run out.',
    },

    {
      text: 'Bowler foot crossing crease line results in No Ball.',
    },

    {
      text: 'Fair play and sportsmanship must always be maintained.',
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
                  <Text style={styles.numberText}>{index + 1}</Text>
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
    paddingTop: (StatusBar.currentHeight || 0) + 10,
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
