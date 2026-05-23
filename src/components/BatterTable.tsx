// src/components/BatterTable.tsx 😎🔥

import React from 'react';

import { View, Text, StyleSheet } from 'react-native';

import COLORS from '../constants/colors';

const BatterTable = ({ striker, nonStriker }: any) => {
  // 😎 FORCE ONLY ONE STRIKER
  const batterOne = {
    ...striker,
    isStriker: true,
  };

  const batterTwo = {
    ...nonStriker,
    isStriker: false,
  };

  const batters = [batterOne, batterTwo];

  return (
    <View style={styles.card}>
      <Text style={styles.heading}>Batters </Text>

      {/* 😎 Header */}
      <View style={[styles.row, styles.headerRow]}>
        <Text style={[styles.headerText, styles.batterColumn]}>Batter</Text>

        <Text style={styles.headerText}>R</Text>

        <Text style={styles.headerText}>B</Text>

        <Text style={styles.headerText}>4s</Text>

        <Text style={styles.headerText}>6s</Text>

        <Text style={styles.headerText}>SR</Text>
      </View>

      {/* 😎 Batter Rows */}
      {batters.map((item, index) => (
        <View key={index} style={styles.row}>
          {/* 😎 PLAYER NAME + STRIKE DOT */}
          <View style={styles.nameContainer}>
            <Text
              numberOfLines={1}
              style={[styles.playerName, styles.batterColumn]}
            >
              {item?.name || 'Player'}
            </Text>

            {item?.isStriker && <View style={styles.strikeDot} />}
          </View>

          <Text style={styles.value}>{item?.runs || 0}</Text>

          <Text style={styles.value}>{item?.balls || 0}</Text>

          <Text style={styles.value}>{item?.fours || 0}</Text>

          <Text style={styles.value}>{item?.sixes || 0}</Text>

          <Text style={styles.value}>
            {Number(item?.strikeRate || 0).toFixed(2)}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default BatterTable;

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,

    marginBottom: 8,

    borderRadius: 22,

    backgroundColor: COLORS.card,

    padding: 16,

    borderWidth: 1,

    borderColor: COLORS.border,
  },

  heading: {
    color: COLORS.primary,

    fontSize: 18,

    fontWeight: '700',

    marginBottom: 18,
  },

  // 😎 Shared Row
  row: {
    flexDirection: 'row',

    alignItems: 'center',

    marginBottom: 14,
  },

  // 😎 Header
  headerRow: {
    borderBottomWidth: 1,

    borderBottomColor: COLORS.border,

    paddingBottom: 10,

    marginBottom: 14,
  },

  // 😎 Batter Column Wider
  batterColumn: {
    flex: 2.5,

    textAlign: 'left',
  },

  // 😎 Name Area
  nameContainer: {
    flex: 2.5,

    flexDirection: 'row',

    alignItems: 'center',
  },

  // 😎 Strike Dot
  strikeDot: {
    width: 8,

    height: 8,

    borderRadius: 100,

    backgroundColor: COLORS.primary,
    marginLeft: 6,
  },

  // 😎 Other Columns
  headerText: {
    flex: 1,

    color: COLORS.subText,

    fontWeight: '700',

    fontSize: 12,

    textAlign: 'center',
  },

  playerName: {
    color: COLORS.text,

    fontWeight: '700',

    fontSize: 14,

    flexShrink: 1,
  },

  value: {
    flex: 1,

    color: COLORS.text,

    textAlign: 'center',

    fontWeight: '600',

    fontSize: 13,
  },
});
