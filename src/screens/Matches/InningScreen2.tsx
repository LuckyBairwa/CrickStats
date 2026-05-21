import React from 'react';

import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import { useRoute } from '@react-navigation/native';

import COLORS from '../../constants/colors';

const InningScreen2 = () => {

  const route = useRoute<any>();

  const {
    firstInningData,
    matchData,
    inningSetup,
  } = route.params || {};

  // =====================================================
  // 😎 TARGET
  // =====================================================

  const target = (firstInningData?.totalRuns || 0) + 1;

  // =====================================================
  // 😎 REQUIRED INFO
  // =====================================================

  const currentRuns = 0;

  const ballsPlayed = 0;

  const totalBalls = (matchData?.overs || 0) * 6;

  const ballsLeft = totalBalls - ballsPlayed;

  const runsNeeded = target - currentRuns;

  const requiredRunRate =
    ballsLeft > 0
      ? ((runsNeeded * 6) / ballsLeft).toFixed(2)
      : '0.00';

  return (
    <View style={styles.container}>

      {/* 😎 HEADER */}
      <View style={styles.scoreCard}>

        <View>
          <Text style={styles.score}>
            0/0
          </Text>

          <Text style={styles.over}>
            Overs: 0.0
          </Text>
        </View>

        {/* 😎 TARGET */}
        <View style={styles.targetBox}>
          <Text style={styles.targetLabel}>
            TARGET
          </Text>

          <Text style={styles.targetValue}>
            {target}
          </Text>
        </View>
      </View>

      {/* 😎 CHASE INFO */}
      <View style={styles.chaseCard}>

        <Text style={styles.chaseText}>
          Need {runsNeeded} runs in {ballsLeft} balls
        </Text>

        <Text style={styles.rrr}>
          Required RR: {requiredRunRate}
        </Text>

      </View>

    </View>
  );
};

export default InningScreen2;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 16,
  },

  scoreCard: {
    backgroundColor: COLORS.card,

    borderRadius: 24,

    padding: 20,

    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'center',

    borderWidth: 1,
    borderColor: COLORS.border,
  },

  score: {
    color: COLORS.text,

    fontSize: 42,

    fontWeight: 'bold',
  },

  over: {
    color: COLORS.subText,

    marginTop: 6,

    fontSize: 16,
  },

  targetBox: {
    alignItems: 'center',
  },

  targetLabel: {
    color: COLORS.primary,

    fontWeight: '700',

    fontSize: 14,
  },

  targetValue: {
    color: COLORS.text,

    fontSize: 34,

    fontWeight: 'bold',
  },

  chaseCard: {
    marginTop: 20,

    backgroundColor: COLORS.card,

    borderRadius: 20,

    padding: 20,

    borderWidth: 1,
    borderColor: COLORS.border,
  },

  chaseText: {
    color: COLORS.text,

    fontSize: 18,

    fontWeight: '700',
  },

  rrr: {
    color: COLORS.primary,

    fontSize: 18,

    fontWeight: '700',

    marginTop: 10,
  },
});