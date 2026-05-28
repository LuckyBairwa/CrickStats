// src/components/MatchSkeleton.tsx 😎🔥

import React from 'react';

import {
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
} from 'react-native';

import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

import LinearGradient from 'react-native-linear-gradient';

const MatchSkeleton = () => {
  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: 120,
      }}
    >
      {/* 😎 Header */}
      <ShimmerPlaceHolder
        LinearGradient={LinearGradient}
        style={styles.header}
      />

      <ShimmerPlaceHolder
        LinearGradient={LinearGradient}
        style={styles.subHeader}
      />

      {/* 😎 Match Cards */}
      {[1, 2, 3, 4, 5].map(item => (
        <View key={item} style={styles.matchCard}>
          {/* 😎 Top Row */}
          <View style={styles.topRow}>
            <ShimmerPlaceHolder
              LinearGradient={LinearGradient}
              style={styles.teamText}
            />

            <ShimmerPlaceHolder
              LinearGradient={LinearGradient}
              style={styles.icon}
            />
          </View>

          {/* 😎 Date */}
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            style={styles.info}
          />

          {/* 😎 Overs */}
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            style={styles.infoSmall}
          />

          {/* 😎 Result */}
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            style={styles.result}
          />

          {/* 😎 Winner */}
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            style={styles.winner}
          />
        </View>
      ))}
    </ScrollView>
  );
};

export default MatchSkeleton;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingHorizontal: 16,

    paddingTop: (StatusBar.currentHeight || 0) + 10,
  },

  header: {
    width: 220,

    height: 38,

    borderRadius: 12,

    marginBottom: 14,
  },

  subHeader: {
    width: 260,

    height: 18,

    borderRadius: 10,

    marginBottom: 28,
  },

  matchCard: {
    borderRadius: 24,

    padding: 18,

    marginBottom: 18,

    backgroundColor: '#111827',
  },

  topRow: {
    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'center',
  },

  teamText: {
    width: '75%',

    height: 24,

    borderRadius: 10,
  },

  icon: {
    width: 28,

    height: 28,

    borderRadius: 100,
  },

  info: {
    width: '70%',

    height: 16,

    borderRadius: 8,

    marginTop: 18,
  },

  infoSmall: {
    width: '40%',

    height: 16,

    borderRadius: 8,

    marginTop: 12,
  },

  result: {
    width: '60%',

    height: 18,

    borderRadius: 8,

    marginTop: 18,
  },

  winner: {
    width: '45%',

    height: 16,

    borderRadius: 8,

    marginTop: 12,
  },
});