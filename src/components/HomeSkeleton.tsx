import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';

import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

const HomeSkeleton = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <ShimmerPlaceHolder
        LinearGradient={LinearGradient}
        style={styles.greeting}
      />

      <ShimmerPlaceHolder
        LinearGradient={LinearGradient}
        style={styles.subText}
      />

      {/* Dashboard */}
      <View style={styles.dashboard}>
        {[1, 2, 3, 4].map(item => (
          <ShimmerPlaceHolder
            key={item}
            LinearGradient={LinearGradient}
            style={styles.statBox}
          />
        ))}
      </View>

      {/* Quick Actions */}
      <View style={styles.grid}>
        {[1, 2, 3, 4].map(item => (
          <ShimmerPlaceHolder
            key={item}
            LinearGradient={LinearGradient}
            style={styles.actionBtn}
          />
        ))}
      </View>
      {/* Top performers */}
      <View style={styles.grid}>
        {[1, 2, 3, 4].map(item => (
          <ShimmerPlaceHolder
            key={item}
            LinearGradient={LinearGradient}
            style={styles.actionBtn}
          />
        ))}
      </View>
    </View>
  );
};

export default HomeSkeleton;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: (StatusBar.currentHeight || 0) + 16,
  },

  greeting: {
    width: 220,
    height: 35,
    borderRadius: 10,
    marginBottom: 12,
  },

  subText: {
    width: 180,
    height: 18,
    borderRadius: 10,
    marginBottom: 30,
  },

  dashboard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  statBox: {
    width: '48%',
    height: 100,
    borderRadius: 20,
    marginBottom: 14,
  },

  grid: {
    marginTop: 30,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  actionBtn: {
    width: '48%',
    height: 110,
    borderRadius: 20,
    marginBottom: 14,
  },
});