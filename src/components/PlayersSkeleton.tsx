import React from 'react';
import { View, StyleSheet, StatusBar, ScrollView } from 'react-native';

import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

const PlayersSkeleton = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
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

      {/* 😎 Search Bar */}
      <ShimmerPlaceHolder
        LinearGradient={LinearGradient}
        style={styles.searchBar}
      />

      {/* 😎 Sort Buttons */}
      <View style={styles.sortRow}>
        {[1, 2, 3, 4].map(item => (
          <ShimmerPlaceHolder
            key={item}
            LinearGradient={LinearGradient}
            style={styles.sortBtn}
          />
        ))}
      </View>

      {/* 😎 Player Cards */}
      {[1, 2, 3].map(item => (
        <View key={item} style={styles.card}>
          {/* Top Row */}
          <View style={styles.topRow}>
            <View>
              <ShimmerPlaceHolder
                LinearGradient={LinearGradient}
                style={styles.playerName}
              />

              <ShimmerPlaceHolder
                LinearGradient={LinearGradient}
                style={styles.nickName}
              />
            </View>

            <ShimmerPlaceHolder
              LinearGradient={LinearGradient}
              style={styles.jersey}
            />
          </View>

          {/* Divider */}
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            style={styles.divider}
          />

          {/* Stats */}
          <View style={styles.statsContainer}>
            {[1, 2, 3, 4].map(stat => (
              <ShimmerPlaceHolder
                key={stat}
                LinearGradient={LinearGradient}
                style={styles.statCard}
              />
            ))}
          </View>

          {/* Extra Stats */}
          <View style={styles.extraRow}>
            <ShimmerPlaceHolder
              LinearGradient={LinearGradient}
              style={styles.extraBox}
            />

            <ShimmerPlaceHolder
              LinearGradient={LinearGradient}
              style={styles.extraBox}
            />
          </View>

          {/* Bottom Row */}
          <View style={styles.bottomRow}>
            <ShimmerPlaceHolder
              LinearGradient={LinearGradient}
              style={styles.matches}
            />

            <ShimmerPlaceHolder
              LinearGradient={LinearGradient}
              style={styles.icon}
            />
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default PlayersSkeleton;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: (StatusBar.currentHeight || 0) + 10,
    paddingBottom: 120,
  },

  header: {
    width: 180,
    height: 35,
    borderRadius: 10,
    marginBottom: 10,
  },

  subHeader: {
    width: 240,
    height: 18,
    borderRadius: 10,
    marginBottom: 24,
  },

  searchBar: {
    width: '100%',
    height: 54,
    borderRadius: 18,
    marginBottom: 20,
  },

  sortRow: {
    flexDirection: 'row',
    marginBottom: 24,
  },

  sortBtn: {
    width: 90,
    height: 40,
    borderRadius: 14,
    marginRight: 12,
  },

  card: {
    borderRadius: 24,
    padding: 18,
    marginBottom: 18,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  playerName: {
    width: 150,
    height: 24,
    borderRadius: 8,
    marginBottom: 10,
  },

  nickName: {
    width: 100,
    height: 14,
    borderRadius: 8,
  },

  jersey: {
    width: 90,
    height: 40,
    borderRadius: 14,
  },

  divider: {
    width: '100%',
    height: 1,
    borderRadius: 10,
    marginVertical: 20,
  },

  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  statCard: {
    width: '48%',
    height: 52,
    borderRadius: 16,
    marginBottom: 12,
  },

  extraRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },

  extraBox: {
    width: '48%',
    height: 70,
    borderRadius: 16,
  },

  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },

  matches: {
    width: 120,
    height: 18,
    borderRadius: 8,
  },

  icon: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
});