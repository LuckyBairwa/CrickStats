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
import { Laptop, UserRoundPen } from 'lucide-react-native';

const AboutDeveloper = () => {
  const glow = useSharedValue(0.5);

  const theme = COLORS;

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
          {/* 😎 Icon + Heading Row */}
          <View style={styles.headingRow}>
            <View style={styles.iconBox}>
              <UserRoundPen size={30} color={theme.primary} />
            </View>

            <Text style={styles.heading}>About Developer</Text>
          </View>

          <Text style={styles.subHeading}>
            Meet the creator behind Gully Cricket Scoring App
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

          <Text style={styles.name}>Lucky Bairwa </Text>

          <Text style={styles.role}>
            React Native Developer • Learner • Trainer
          </Text>
        </Animated.View>

        {/* 😎 ABOUT */}
        <Animated.View entering={FadeInUp.delay(500)} style={styles.infoCard}>
          <Text style={styles.sectionTitle}> About Me</Text>

          <Text style={styles.desc}>
            Hey I'm Lucky Bairwa from Rajasthan, India
            {'\n\n'}Currently, I am pursuing my Bachelor of Computer
            Applications (BCA) and deeply exploring the world of modern app
            development, UI/UX, animations, AI, and full-stack technologies.
            {'\n\t\t'}I specialize in React Native and React JS development and
            love creating futuristic, smooth and premium mobile applications
            with powerful user experiences.
            {'\n\n'}Some of my major projects include:
            {'\n'}• Gully Cricket Scoring App 
            {'\n'}• Modern Portfolio Apps 
            {'\n'}• Animated Mobile UI Systems {'\n\n\t\t'}Apart from development,
            I also enjoy teaching programming in simple and practical ways. I
            continuously learn new technologies and improve my problem-solving,
            design and development skills every day to create amazing apps and share my knowledge with the community.
          </Text>
        </Animated.View>

        {/* 😎 SKILLS */}
        <Animated.View entering={FadeInUp.delay(700)} style={styles.infoCard}>
          <Text style={styles.sectionTitle}> Skills</Text>

          <Text style={styles.desc}>
            • React Native{'\n'}• React JS{'\n'}• JavaScript{'\n'}• HTML & CSS
            {'\n'}• Node.js{'\n'}• Reanimated Animations
            {'\n'}• C++ programming{'\n'}• C programming
          </Text>
        </Animated.View>

        {/* 😎 GOAL */}
        <Animated.View entering={FadeInUp.delay(900)} style={styles.infoCard}>
          <Text style={styles.sectionTitle}> Mission</Text>

          <Text style={styles.desc}>
            Building modern apps that feel premium, futuristic and powerful
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
    backgroundColor: '#00F5FF22',
    bottom: 50,
    left: -70,
  },
  header: {
    marginBottom: 30,
  },

  headingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconBox: {
    justifyContent: 'center',
    alignItems: 'center',

    marginRight: 12,
  },

  heading: {
    color: COLORS.text,
    fontSize: 30,
    fontWeight: 'bold',
  },

  subHeading: {
    color: COLORS.subText,
    marginTop: 10,
    fontSize: 15,
    marginLeft: 56,
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
