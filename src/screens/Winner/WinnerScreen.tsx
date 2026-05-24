// src/screens/Matches/WinnerScreen.tsx 😎🔥

import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StatusBar } from 'react-native';
import { saveMatch, updatePlayersAfterMatch  } from '../../api/matchApi';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  interpolate,
} from 'react-native-reanimated';

import { useRoute, useNavigation } from '@react-navigation/native';

import COLORS from '../../constants/colors';

const { width, height } = Dimensions.get('window');

const WinnerScreen = () => {
  const route = useRoute<any>();

  const navigation = useNavigation<any>();

  const {
    winnerTeam,
    resultText,
    matchData,
    firstInningData,
    secondInningData,
  } = route.params || {};

  const [saving, setSaving] = useState(true);

  // =====================================================
  // 😎 ANIMATIONS
  // =====================================================

  const glow1 = useSharedValue(0);
  const glow2 = useSharedValue(0);
  const trophyScale = useSharedValue(0.6);
  const contentOpacity = useSharedValue(0);

  // =====================================================
  // 😎 STYLES
  // =====================================================

  const glowStyle1 = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(glow1.value, [0, 1], [1, 1.3]),
        },
      ],

      opacity: interpolate(glow1.value, [0, 1], [0.25, 0.6]),
    };
  });

  const glowStyle2 = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(glow2.value, [0, 1], [1, 1.4]),
        },
      ],

      opacity: interpolate(glow2.value, [0, 1], [0.2, 0.5]),
    };
  });

  const trophyStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: trophyScale.value,
        },
      ],
    };
  });

  const contentStyle = useAnimatedStyle(() => {
    return {
      opacity: contentOpacity.value,

      transform: [
        {
          translateY: interpolate(contentOpacity.value, [0, 1], [40, 0]),
        },
      ],
    };
  });

  useEffect(() => {
    glow1.value = withRepeat(
      withTiming(1, {
        duration: 4000,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true,
    );

    glow2.value = withRepeat(
      withTiming(1, {
        duration: 5000,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true,
    );

    trophyScale.value = withTiming(1, {
      duration: 900,
      easing: Easing.out(Easing.exp),
    });

    contentOpacity.value = withTiming(1, {
      duration: 1200,
    });
  }, []);

  useEffect(() => {
    const save = async () => {
      try {
        if (!matchData?._id) {
          setSaving(false);
          return;
        }

        // =====================================================
        // 😎 INNINGS 1 — BATTERS
        // =====================================================
        const innings1Batters = Object.values(
          firstInningData?.playerStatsMap || {},
        ).map((p: any) => {
          // wicket type dhundho overHistory se
          const dismissalInfo = firstInningData?.overHistory
            ?.flatMap((over: any) =>
              over?.wicketInfo ? [over.wicketInfo] : [],
            )
            ?.find((w: any) => w?.playerName === p?.name);

          return {
            player: p._id,
            runs: p.runs || 0,
            balls: p.balls || 0,
            fours: p.fours || 0,
            sixes: p.sixes || 0,
            strikeRate: p.strikeRate || 0,
            status: p.status === 'Out' ? 'Bowled' : 'Not Out',
          };
        });

        // =====================================================
        // 😎 INNINGS 1 — BOWLERS
        // =====================================================
        const innings1Bowlers = Object.values(
          firstInningData?.bowlerStatsMap || {},
        ).map((b: any) => ({
          player: b._id,
          overs: b.balls ? parseFloat((b.balls / 6).toFixed(1)) : 0,
          runsGiven: b.runsGiven || 0,
          wickets: b.wickets || 0,
          economy: b.economy || 0,
          dotBalls: b.dotBalls || 0,
        }));

        // =====================================================
        // 😎 INNINGS 1 — OVER HISTORY (ball by ball)
        // =====================================================
        const innings1OverHistory: any[] = [];
        firstInningData?.overHistory?.forEach((over: any) => {
          over?.balls?.forEach((ball: string, ballIndex: number) => {
            const isWicket = ball === 'W';
            const isWide = ball === 'WD';
            const isNoBall = ball === 'NB';
            const isBye = ball === 'B';
            const isLegBye = ball === 'LB';

            let runs = 0;
            let extraType = '';

            if (isWide) {
              runs = 1;
              extraType = 'WB';
            } else if (isNoBall) {
              runs = 1;
              extraType = 'NB';
            } else if (isBye) {
              runs = 1;
              extraType = 'B';
            } else if (isLegBye) {
              runs = 1;
              extraType = 'LB';
            } else if (!isWicket) {
              runs = Number(ball) || 0;
            }

            innings1OverHistory.push({
              over: over.overNumber,
              ball: ballIndex + 1,
              runs,
              totalRuns: over.totalRuns,
              extraType,
              wicket: isWicket,
              wicketType: isWicket ? (over.wicketInfo ? 'Bowled' : '') : '',
            });
          });
        });

        // =====================================================
        // 😎 INNINGS 2 — BATTERS
        // =====================================================
        const innings2Batters = Object.values(
          secondInningData?.playerStatsMap || {},
        ).map((p: any) => ({
          player: p._id,
          runs: p.runs || 0,
          balls: p.balls || 0,
          fours: p.fours || 0,
          sixes: p.sixes || 0,
          strikeRate: p.strikeRate || 0,
          status: p.status === 'Out' ? 'Bowled' : 'Not Out',
        }));

        // =====================================================
        // 😎 INNINGS 2 — BOWLERS
        // =====================================================
        const innings2Bowlers = Object.values(
          secondInningData?.bowlerStatsMap || {},
        ).map((b: any) => ({
          player: b._id,
          overs: b.balls ? parseFloat((b.balls / 6).toFixed(1)) : 0,
          runsGiven: b.runsGiven || 0,
          wickets: b.wickets || 0,
          economy: b.economy || 0,
          dotBalls: b.dotBalls || 0,
        }));

        // =====================================================
        // 😎 INNINGS 2 — OVER HISTORY
        // =====================================================
        const innings2OverHistory: any[] = [];
        secondInningData?.overHistory?.forEach((over: any) => {
          over?.balls?.forEach((ball: string, ballIndex: number) => {
            const isWicket = ball === 'W';
            const isWide = ball === 'WD';
            const isNoBall = ball === 'NB';
            const isBye = ball === 'B';
            const isLegBye = ball === 'LB';

            let runs = 0;
            let extraType = '';

            if (isWide) {
              runs = 1;
              extraType = 'WB';
            } else if (isNoBall) {
              runs = 1;
              extraType = 'NB';
            } else if (isBye) {
              runs = 1;
              extraType = 'B';
            } else if (isLegBye) {
              runs = 1;
              extraType = 'LB';
            } else if (!isWicket) {
              runs = Number(ball) || 0;
            }

            innings2OverHistory.push({
              over: over.overNumber,
              ball: ballIndex + 1,
              runs,
              totalRuns: over.totalRuns,
              extraType,
              wicket: isWicket,
              wicketType: isWicket ? (over.wicketInfo ? 'Bowled' : '') : '',
            });
          });
        });

        // =====================================================
        // 😎 WINNER TEAM _id
        // =====================================================
        // winnerTeam object mein _id hai
        const winnerId = winnerTeam?._id || null;

        // =====================================================
        // 😎 TOSS WINNER — matchData mein string hai
        // =====================================================
        const tossWinnerName =
          matchData?.tossWinner?.name || matchData?.tossWinner || '';

        // =====================================================
        // 😎 FINAL PAYLOAD
        // =====================================================
        const payload = {
          status: 'Completed',
          winner: winnerId,
          result: resultText || '',
          target: secondInningData?.target || 0,
          tossWinner: tossWinnerName,
          tossDecision: matchData?.tossDecision || '',

          innings1: {
            battingTeam: firstInningData?.battingTeam?._id,
            totalRuns: firstInningData?.totalRuns || 0,
            wickets: firstInningData?.wickets || 0,
            legalBalls: firstInningData?.legalBalls || 0,
            oversPlayed: firstInningData?.legalBalls
              ? parseFloat((firstInningData.legalBalls / 6).toFixed(1))
              : 0,
            status: 'Completed',
            batters: innings1Batters,
            bowlers: innings1Bowlers,
            overHistory: innings1OverHistory,
          },

          innings2: {
            battingTeam: secondInningData?.battingTeam?._id,
            totalRuns: secondInningData?.totalRuns || 0,
            wickets: secondInningData?.wickets || 0,
            legalBalls: secondInningData?.legalBalls || 0,
            oversPlayed: secondInningData?.legalBalls
              ? parseFloat((secondInningData.legalBalls / 6).toFixed(1))
              : 0,
            status: 'Completed',
            batters: innings2Batters,
            bowlers: innings2Bowlers,
            overHistory: innings2OverHistory,
          },
        };

        console.log('📦 Save Payload:', JSON.stringify(payload, null, 2));

        await saveMatch(matchData._id, payload);
        await saveMatch(matchData._id, payload);

        const allPlayers: any[] = [];

Object.values(firstInningData?.playerStatsMap || {}).forEach((p: any) => {
  allPlayers.push({
    _id: p._id,
    runs: p.runs || 0,
    fours: p.fours || 0,
    sixes: p.sixes || 0,
    ballsPlayed: p.balls || 0,
  });
});

Object.values(firstInningData?.bowlerStatsMap || {}).forEach((b: any) => {
  const existing = allPlayers.find((p) => p._id === b._id);
  if (existing) {
    existing.wickets = b.wickets || 0;
    existing.dotBalls = b.dotBalls || 0;
    existing.runsGiven = b.runsGiven || 0;
    existing.oversBowled = b.balls  || 0;
  } else {
    allPlayers.push({
      _id: b._id,
      wickets: b.wickets || 0,
      dotBalls: b.dotBalls || 0,
      runsGiven: b.runsGiven || 0,
      oversBowled: b.balls ? parseFloat((b.balls / 6).toFixed(1)) : 0,
    });
  }
});

Object.values(secondInningData?.playerStatsMap || {}).forEach((p: any) => {
  const existing = allPlayers.find((x) => x._id === p._id);
  if (existing) {
    existing.runs = (existing.runs || 0) + (p.runs || 0);
    existing.fours = (existing.fours || 0) + (p.fours || 0);
    existing.sixes = (existing.sixes || 0) + (p.sixes || 0);
    existing.ballsPlayed = (existing.ballsPlayed || 0) + (p.balls || 0);
  } else {
    allPlayers.push({
      _id: p._id,
      runs: p.runs || 0,
      fours: p.fours || 0,
      sixes: p.sixes || 0,
      ballsPlayed: p.balls || 0,
    });
  }
});

Object.values(secondInningData?.bowlerStatsMap || {}).forEach((b: any) => {
  const existing = allPlayers.find((p) => p._id === b._id);
  if (existing) {
    existing.wickets = (existing.wickets || 0) + (b.wickets || 0);
    existing.dotBalls = (existing.dotBalls || 0) + (b.dotBalls || 0);
    existing.runsGiven = (existing.runsGiven || 0) + (b.runsGiven || 0);
    existing.oversBowled =
      (existing.oversBowled || 0) +
      (b.balls ? parseFloat((b.balls / 6).toFixed(1)) : 0);
  } else {
    allPlayers.push({
      _id: b._id,
      wickets: b.wickets || 0,
      dotBalls: b.dotBalls || 0,
      runsGiven: b.runsGiven || 0,
      oversBowled: b.balls ? parseFloat((b.balls / 6).toFixed(1)) : 0,
    });
  }
});

await updatePlayersAfterMatch(allPlayers);

console.log('✅ Match Saved!');
        console.log('✅ Match Saved Successfully!');
      } catch (error: any) {
        console.log('❌ Save Error:', error?.response?.data || error);
      } finally {
        setSaving(false);
      }
    };

    save();
  }, []);

  // ✅ Saving loader dikhao
  if (saving) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={{ color: '#fff', marginTop: 16, fontSize: 16 }}>
          Saving Match...
        </Text>
      </View>
    );
  }

  // =====================================================
  // 😎 UI
  // =====================================================

  return (
    <View style={styles.container}>
      {/* 😎 BACKGROUND GLOWS */}

      <Animated.View style={[styles.glow1, glowStyle1]} />

      <Animated.View style={[styles.glow2, glowStyle2]} />

      <Animated.View style={[styles.glow3, glowStyle1]} />

      {/* 😎 CONTENT */}

      <Animated.View style={[styles.contentContainer, contentStyle]}>
        <Animated.Text style={[styles.trophy, trophyStyle]}>🏆</Animated.Text>

        <Text style={styles.championText}>CHAMPIONS 😎🔥</Text>

        <Text style={styles.winnerText}>
          {winnerTeam?.name || 'Winner Team'}
        </Text>

        <View style={styles.resultCard}>
          <Text style={styles.result}>{resultText}</Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.button}
          onPress={() => navigation.popToTop()}
        >
          <Text style={styles.buttonText}>Back To Home 😎</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default WinnerScreen;

// =====================================================
// 😎 STYLES
// =====================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#020617',

    justifyContent: 'center',
    alignItems: 'center',

    overflow: 'hidden',

    paddingHorizontal: 20,
    paddingTop: (StatusBar.currentHeight || 0) + 10,
  },

  contentContainer: {
    width: '100%',

    alignItems: 'center',

    zIndex: 10,
  },

  glow1: {
    position: 'absolute',

    width: 320,
    height: 320,

    borderRadius: 200,

    backgroundColor: '#06B6D455',

    top: -100,
    right: -120,
  },

  glow2: {
    position: 'absolute',

    width: 260,
    height: 260,

    borderRadius: 200,

    backgroundColor: '#06B6D455',

    bottom: -80,
    left: -100,
  },

  glow3: {
    position: 'absolute',

    width: 220,
    height: 220,

    borderRadius: 200,

    backgroundColor: '#06B6D455',

    top: height * 0.35,
    left: width * 0.2,
  },

  trophy: {
    fontSize: 110,

    marginBottom: 18,

    textShadowColor: '#FFD700',

    textShadowOffset: {
      width: 0,
      height: 0,
    },

    textShadowRadius: 25,
  },

  championText: {
    color: '#FACC15',

    fontSize: 18,

    fontWeight: '800',

    letterSpacing: 3,

    marginBottom: 14,
  },

  winnerText: {
    color: '#fff',

    fontSize: 38,

    fontWeight: '900',

    textAlign: 'center',

    marginBottom: 20,
  },

  resultCard: {
    width: '100%',

    backgroundColor: 'rgba(255,255,255,0.06)',

    borderWidth: 1,

    borderColor: 'rgba(255,255,255,0.08)',

    paddingVertical: 22,
    paddingHorizontal: 18,

    borderRadius: 28,

    marginBottom: 34,
  },

  result: {
    color: '#E2E8F0',

    fontSize: 18,

    textAlign: 'center',

    lineHeight: 28,

    fontWeight: '600',
  },

  button: {
    backgroundColor: COLORS.primary,

    paddingHorizontal: 34,
    paddingVertical: 18,

    borderRadius: 22,

    elevation: 10,
  },

  buttonText: {
    color: '#000',

    fontWeight: '900',

    fontSize: 18,
  },
});
