// src/screens/Matches/WinnerScreen.tsx 😎🔥

import React, { useEffect } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  interpolate,
} from 'react-native-reanimated';

import { useRoute, useNavigation } from '@react-navigation/native';

import COLORS from '../../constants/colors';

const { width, height } = Dimensions.get('window');

const WinnerScreen = () => {
  const route = useRoute<any>();

  const navigation = useNavigation<any>();

  const { winnerTeam, resultText } = route.params || {};

  // =====================================================
  // 😎 ANIMATIONS
  // =====================================================

  const glow1 = useSharedValue(0);
  const glow2 = useSharedValue(0);
  const trophyScale = useSharedValue(0.6);
  const contentOpacity = useSharedValue(0);

  useEffect(() => {
    glow1.value = withRepeat(
      withTiming(1, {
        duration: 4000,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true,
    );

    glow2.value = withRepeat(
      withTiming(1, {
        duration: 5000,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true,
    );

    trophyScale.value = withTiming(1, {
      duration: 900,
      easing: Easing.out(Easing.exp),
    });

    contentOpacity.value = withTiming(1, {
      duration: 1200,
    });
  }, []);

  // =====================================================
  // 😎 STYLES
  // =====================================================

  const glowStyle1 = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(glow1.value, [0, 1], [1, 1.3]),
        },
      ],

      opacity: interpolate(glow1.value, [0, 1], [0.25, 0.6]),
    };
  });

  const glowStyle2 = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(glow2.value, [0, 1], [1, 1.4]),
        },
      ],

      opacity: interpolate(glow2.value, [0, 1], [0.2, 0.5]),
    };
  });

  const trophyStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: trophyScale.value,
        },
      ],
    };
  });

  const contentStyle = useAnimatedStyle(() => {
    return {
      opacity: contentOpacity.value,

      transform: [
        {
          translateY: interpolate(contentOpacity.value, [0, 1], [40, 0]),
        },
      ],
    };
  });

  // =====================================================
  // 😎 UI
  // =====================================================

  return (
    <View style={styles.container}>
      {/* 😎 BACKGROUND GLOWS */}

      <Animated.View style={[styles.glow1, glowStyle1]} />

      <Animated.View style={[styles.glow2, glowStyle2]} />

      <Animated.View style={[styles.glow3, glowStyle1]} />

      {/* 😎 CONTENT */}

      <Animated.View style={[styles.contentContainer, contentStyle]}>
        <Animated.Text style={[styles.trophy, trophyStyle]}>
          🏆
        </Animated.Text>

        <Text style={styles.championText}>CHAMPIONS 😎🔥</Text>

        <Text style={styles.winnerText}>
          {winnerTeam?.name || 'Winner Team'}
        </Text>

        <View style={styles.resultCard}>
          <Text style={styles.result}>{resultText}</Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.button}
          onPress={() => navigation.popToTop()}
        >
          <Text style={styles.buttonText}>Back To Home 😎</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default WinnerScreen;

// =====================================================
// 😎 STYLES
// =====================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#020617',

    justifyContent: 'center',
    alignItems: 'center',

    overflow: 'hidden',

    paddingHorizontal: 20,
  },

  contentContainer: {
    width: '100%',

    alignItems: 'center',

    zIndex: 10,
  },

  glow1: {
    position: 'absolute',

    width: 320,
    height: 320,

    borderRadius: 200,

    backgroundColor: '#06B6D455',

    top: -100,
    right: -120,
  },

  glow2: {
    position: 'absolute',

    width: 260,
    height: 260,

    borderRadius: 200,

    backgroundColor: '#06B6D455',

    bottom: -80,
    left: -100,
  },

  glow3: {
    position: 'absolute',

    width: 220,
    height: 220,

    borderRadius: 200,

    backgroundColor: '#06B6D455',

    top: height * 0.35,
    left: width * 0.2,
  },

  trophy: {
    fontSize: 110,

    marginBottom: 18,

    textShadowColor: '#FFD700',

    textShadowOffset: {
      width: 0,
      height: 0,
    },

    textShadowRadius: 25,
  },

  championText: {
    color: '#FACC15',

    fontSize: 18,

    fontWeight: '800',

    letterSpacing: 3,

    marginBottom: 14,
  },

  winnerText: {
    color: '#fff',

    fontSize: 38,

    fontWeight: '900',

    textAlign: 'center',

    marginBottom: 20,
  },

  resultCard: {
    width: '100%',

    backgroundColor: 'rgba(255,255,255,0.06)',

    borderWidth: 1,

    borderColor: 'rgba(255,255,255,0.08)',

    paddingVertical: 22,
    paddingHorizontal: 18,

    borderRadius: 28,

    marginBottom: 34,
  },

  result: {
    color: '#E2E8F0',

    fontSize: 18,

    textAlign: 'center',

    lineHeight: 28,

    fontWeight: '600',
  },

  button: {
    backgroundColor: COLORS.primary,

    paddingHorizontal: 34,
    paddingVertical: 18,

    borderRadius: 22,

    elevation: 10,
  },

  buttonText: {
    color: '#000',

    fontWeight: '900',

    fontSize: 18,
  },
});