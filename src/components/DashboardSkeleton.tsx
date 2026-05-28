import React from 'react';

import { View, StyleSheet, StatusBar, ScrollView } from 'react-native';

import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

import LinearGradient from 'react-native-linear-gradient';

import COLORS from '../constants/colors';

const DashboardSkeleton = () => {
  const theme = COLORS;

  return (
    <ScrollView
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
        },
      ]}
      showsVerticalScrollIndicator={false}
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

      {/* 😎 Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryContainer}
      >
        {[1, 2, 3, 4, 5].map(item => (
          <ShimmerPlaceHolder
            key={item}
            LinearGradient={LinearGradient}
            style={styles.categoryBtn}
          />
        ))}
      </ScrollView>

      {/* 😎 Player Cards */}
      {[1, 2, 3, 4, 5].map(item => (
        <View
          key={item}
          style={[
            styles.playerCard,
            {
              backgroundColor: theme.card,
              borderColor: theme.border,
            },
          ]}
        >
          {/* Rank Circle */}
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            style={styles.rankCircle}
          />

          {/* Player Info */}
          <View style={{ flex: 1 }}>
            <ShimmerPlaceHolder
              LinearGradient={LinearGradient}
              style={styles.playerName}
            />

            <ShimmerPlaceHolder
              LinearGradient={LinearGradient}
              style={styles.playerMatch}
            />

            <ShimmerPlaceHolder
              LinearGradient={LinearGradient}
              style={styles.playerValue}
            />
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default DashboardSkeleton;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingHorizontal: 16,

    paddingTop: (StatusBar.currentHeight || 0) + 10,
  },

  header: {
    width: 220,

    height: 36,

    borderRadius: 10,

    marginBottom: 12,
  },

  subHeader: {
    width: 190,

    height: 18,

    borderRadius: 10,

    marginBottom: 24,
  },

  categoryContainer: {
    paddingBottom: 20,

    paddingRight: 30,
  },

  categoryBtn: {
    width: 120,

    height: 44,

    borderRadius: 20,

    marginRight: 12,
  },

  playerCard: {
    flexDirection: 'row',

    alignItems: 'center',

    borderRadius: 22,

    padding: 18,

    marginBottom: 16,

    borderWidth: 1,
  },

  rankCircle: {
    width: 50,

    height: 50,

    borderRadius: 100,

    marginRight: 16,
  },

  playerName: {
    width: '60%',

    height: 20,

    borderRadius: 10,

    marginBottom: 10,
  },

  playerMatch: {
    width: '40%',

    height: 14,

    borderRadius: 10,

    marginBottom: 10,
  },

  playerValue: {
    width: '50%',

    height: 16,

    borderRadius: 10,
  },
});
