// src/screens/Setting/AboutDeveloper.tsx 😎🔥

import React, { useEffect } from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  StatusBar,
} from 'react-native';

import COLORS from '../../constants/colors';

import Animated, {
  FadeInDown,
  FadeInUp,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const AboutDeveloper = () => {
  const glow = useSharedValue(0.5);

  useEffect(() => {
    glow.value = withRepeat(
      withTiming(1, {
        duration: 2500,
      }),
      -1,
      true,
    );
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

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      {/* 😎 Glow BG */}
      <Animated.View style={[styles.glow1, glowStyle]} />

      <Animated.View style={[styles.glow2, glowStyle]} />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 😎 HEADER */}
        <Animated.View
          entering={FadeInDown.duration(700)}
          style={styles.header}
        >
          <Text style={styles.heading}>👨‍💻 About Developer</Text>

          <Text style={styles.subHeading}>
            Meet the creator behind Gully Cricket 😎
          </Text>
        </Animated.View>

        {/* 😎 PROFILE */}
        <Animated.View
          entering={FadeInUp.delay(300)}
          style={styles.profileCard}
        >
          <Image
            source={require('../../assets/images/lucky.jpeg')}
            style={styles.image}
          />

          <Text style={styles.name}>Lucky Bairwa 😎</Text>

          <Text style={styles.role}>
            React Native Developer • UI Designer • Trainer
          </Text>
        </Animated.View>

        {/* 😎 ABOUT */}
        <Animated.View entering={FadeInUp.delay(500)} style={styles.infoCard}>
          <Text style={styles.sectionTitle}>🚀 About Me</Text>

          <Text style={styles.desc}>
            Hey 👋 I'm Lucky from Rajasthan, India. I'm passionate about
            building modern mobile apps with React Native and creating beautiful
            futuristic UI/UX experiences.
            {'\n\n'}I love teaching programming in simple ways and continuously
            improving my skills in full-stack development, animations, AI, and
            mobile technologies 😎
          </Text>
        </Animated.View>

        {/* 😎 SKILLS */}
        <Animated.View entering={FadeInUp.delay(700)} style={styles.infoCard}>
          <Text style={styles.sectionTitle}>⚡ Skills</Text>

          <Text style={styles.desc}>
            • React Native{'\n'}• React JS{'\n'}• TypeScript{'\n'}• Firebase
            {'\n'}• Node.js{'\n'}• UI/UX Design{'\n'}• Reanimated Animations
            {'\n'}• AI & ML Learning
          </Text>
        </Animated.View>

        {/* 😎 GOAL */}
        <Animated.View entering={FadeInUp.delay(900)} style={styles.infoCard}>
          <Text style={styles.sectionTitle}>🎯 Mission</Text>

          <Text style={styles.desc}>
            Building modern apps that feel premium, futuristic and powerful 😎🔥
          </Text>
        </Animated.View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
};

export default AboutDeveloper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: (StatusBar.currentHeight || 0) + 10,
    paddingHorizontal: 18,
  },

  glow1: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 200,
    backgroundColor: '#00F5FF22',
    top: -100,
    right: -80,
  },

  glow2: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 200,
    // backgroundColor: '#8B5CF622',
    backgroundColor: '#00F5FF22',
    bottom: 50,
    left: -70,
  },

  header: {
    marginBottom: 30,
  },

  heading: {
    color: COLORS.text,
    fontSize: 32,
    fontWeight: 'bold',
  },

  subHeading: {
    color: COLORS.subText,
    marginTop: 6,
    fontSize: 15,
  },

  profileCard: {
    backgroundColor: COLORS.card,
    borderRadius: 28,
    padding: 24,
    alignItems: 'center',
    marginBottom: 22,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  image: {
    width: 130,
    height: 130,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: COLORS.primary,
  },

  name: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 18,
  },

  role: {
    color: COLORS.primary,
    fontSize: 15,
    marginTop: 8,
    textAlign: 'center',
  },

  infoCard: {
    backgroundColor: COLORS.card,
    borderRadius: 24,
    padding: 22,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  sectionTitle: {
    color: COLORS.primary,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },

  desc: {
    color: COLORS.text,
    fontSize: 15,
    lineHeight: 28,
  },
});
