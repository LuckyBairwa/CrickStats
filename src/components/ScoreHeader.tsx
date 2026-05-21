import React from 'react';

import { View, Text, StyleSheet } from 'react-native';

import COLORS from '../constants/colors';

const ScoreHeader = ({ inning, totalOvers }: any) => {
  return (
    <View style={styles.card}>
      <Text style={styles.team}>{inning?.battingTeam?.name || 'Team'}</Text>

      <Text style={styles.score}>
        {inning?.totalRuns || 0}/{inning?.wickets || 0}
      </Text>

      <Text style={styles.overs}>
        Overs: {inning?.oversPlayed || 0}/{totalOvers || 0}
      </Text>

      <View style={styles.row}>
        <Text style={styles.info}>CRR: {inning?.currentRunRate || 0}</Text>

        <Text style={styles.info}>
          Projected Score: {inning?.projectedScore || 0}
        </Text>
      </View>

      {inning?.target > 0 && (
        <View style={styles.row}>
          <Text style={styles.info}>Target: {inning?.target}</Text>

          <Text style={styles.info}>RRR: {inning?.requiredRunRate || 0}</Text>
        </View>
      )}
    </View>
  );
};

export default ScoreHeader;

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    margin: 16,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  team: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: '700',
  },

  score: {
    color: COLORS.text,
    fontSize: 48,
    fontWeight: 'bold',
    marginTop: 8,
  },

  overs: {
    color: COLORS.subText,
    marginTop: 6,
    fontSize: 16,
  },

  oversContainer: {
    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'center',

    marginTop: 8,
  },

  totalOvers: {
    color: COLORS.primary,

    fontSize: 15,

    fontWeight: '700',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },

  info: {
    color: COLORS.primary,
    fontWeight: '700',
  },
});
