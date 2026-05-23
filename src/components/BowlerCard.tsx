import React from 'react';

import { View, Text, StyleSheet } from 'react-native';

import COLORS from '../constants/colors';

const BowlerCard = ({ bowler }: any) => {
  return (
    <View style={styles.card}>
      <Text style={styles.heading}>Current Bowler</Text>

      <Text style={styles.name}>
        {bowler?.name || 'Bowler'}
      </Text>

      <View style={styles.row}>
        <Text style={styles.value}>
          O: {bowler?.overs || 0}
        </Text>

        <Text style={styles.value}>
          R: {bowler?.runsGiven || 0}
        </Text>

        <Text style={styles.value}>
          W: {bowler?.wickets || 0}
        </Text>

        <Text style={styles.value}>
          ECO: {bowler?.economy || 0}
        </Text>
      </View>
    </View>
  );
};

export default BowlerCard;

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 22,
    backgroundColor: COLORS.card,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  heading: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: 18,
  },

  name: {
    color: COLORS.text,
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 12,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 18,
  },

  value: {
    color: COLORS.text,
    fontWeight: '700',
  },
});