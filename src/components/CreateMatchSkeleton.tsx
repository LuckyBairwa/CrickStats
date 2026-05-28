// src/components/CreateMatchSkeleton.tsx 😎🔥

import React from 'react';

import {
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
} from 'react-native';

import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

import LinearGradient from 'react-native-linear-gradient';

import COLORS from '../constants/colors';

const CreateMatchSkeleton = () => {
  return (
    <ScrollView
      style={[
        styles.container,
        {
          backgroundColor: COLORS.background,
        },
      ]}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: 100,
      }}
    >
      {/* 😎 Header */}
      <View style={styles.headerRow}>
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          style={styles.headerIcon}
        />

        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          style={styles.headerText}
        />
      </View>

      {/* 😎 Date Card */}
      <View style={styles.card}>
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          style={styles.label}
        />

        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          style={styles.date}
        />
      </View>

      {/* 😎 Team A */}
      <ShimmerPlaceHolder
        LinearGradient={LinearGradient}
        style={styles.label}
      />

      <View style={styles.row}>
        {[1, 2, 3].map(item => (
          <ShimmerPlaceHolder
            key={item}
            LinearGradient={LinearGradient}
            style={styles.teamBtn}
          />
        ))}
      </View>

      {/* 😎 Team B */}
      <ShimmerPlaceHolder
        LinearGradient={LinearGradient}
        style={styles.label}
      />

      <View style={styles.row}>
        {[1, 2, 3].map(item => (
          <ShimmerPlaceHolder
            key={item}
            LinearGradient={LinearGradient}
            style={styles.teamBtn}
          />
        ))}
      </View>

      {/* 😎 Overs Card */}
      <View style={styles.card}>
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          style={styles.label}
        />

        <View style={styles.oversRow}>
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            style={styles.circle}
          />

          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            style={styles.oversText}
          />

          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            style={styles.circle}
          />
        </View>
      </View>

      {/* 😎 Coin */}
      <ShimmerPlaceHolder
        LinearGradient={LinearGradient}
        style={styles.label}
      />

      <View style={styles.row}>
        {[1, 2].map(item => (
          <ShimmerPlaceHolder
            key={item}
            LinearGradient={LinearGradient}
            style={styles.teamBtn}
          />
        ))}
      </View>

      {/* 😎 Toss Button */}
      <ShimmerPlaceHolder
        LinearGradient={LinearGradient}
        style={styles.bigBtn}
      />

      {/* 😎 Toss Result Card */}
      <View style={styles.card}>
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          style={styles.result}
        />

        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          style={styles.win}
        />

        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          style={styles.label}
        />

        <View style={styles.row}>
          {[1, 2].map(item => (
            <ShimmerPlaceHolder
              key={item}
              LinearGradient={LinearGradient}
              style={styles.teamBtn}
            />
          ))}
        </View>
      </View>

      {/* 😎 Create Button */}
      <ShimmerPlaceHolder
        LinearGradient={LinearGradient}
        style={styles.bigBtn}
      />
    </ScrollView>
  );
};

export default CreateMatchSkeleton;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingHorizontal: 16,

    paddingTop: (StatusBar.currentHeight || 0) + 10,
  },

  headerRow: {
    flexDirection: 'row',

    alignItems: 'center',

    marginTop: 20,

    marginBottom: 30,
  },

  headerIcon: {
    width: 36,

    height: 36,

    borderRadius: 100,

    marginRight: 12,
  },

  headerText: {
    width: 180,

    height: 34,

    borderRadius: 12,
  },

  card: {
    backgroundColor: '#111827',

    borderRadius: 24,

    padding: 18,

    marginBottom: 22,
  },

  label: {
    width: 140,

    height: 18,

    borderRadius: 10,

    marginBottom: 16,
  },

  date: {
    width: '75%',

    height: 18,

    borderRadius: 10,
  },

  row: {
    flexDirection: 'row',

    flexWrap: 'wrap',

    marginBottom: 16,
  },

  teamBtn: {
    width: 100,

    height: 46,

    borderRadius: 16,

    marginRight: 12,

    marginBottom: 12,
  },

  oversRow: {
    flexDirection: 'row',

    justifyContent: 'center',

    alignItems: 'center',
  },

  circle: {
    width: 60,

    height: 60,

    borderRadius: 100,
  },

  oversText: {
    width: 70,

    height: 36,

    borderRadius: 10,

    marginHorizontal: 24,
  },

  bigBtn: {
    width: '100%',

    height: 64,

    borderRadius: 22,

    marginBottom: 24,
  },

  result: {
    width: '55%',

    height: 18,

    borderRadius: 10,

    marginBottom: 16,
  },

  win: {
    width: '70%',

    height: 28,

    borderRadius: 10,

    marginBottom: 20,
  },
});