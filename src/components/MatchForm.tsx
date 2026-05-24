// src/components/MatchForm.tsx 😎🔥

import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { createMatch } from '../api/matchApi';

import { Trophy, Minus, Plus, RefreshCw, Zap } from 'lucide-react-native';

import Animated, {
  FadeInDown,
  FadeInRight,
  FadeInUp,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';

import { getTeams } from '../api/teamApi';

import COLORS from '../constants/colors';

const MatchForm = ({ onSubmit }: any) => {
  const navigation = useNavigation<any>();

  // 😎 Glow Animation
  const glow = useSharedValue(0.6);

  useEffect(() => {
    glow.value = withRepeat(
      withTiming(1, {
        duration: 2000,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true,
    );
  }, []);

  const glowStyle = useAnimatedStyle(() => {
    return {
      opacity: glow.value,
      transform: [
        {
          scale: glow.value,
        },
      ],
    };
  });

  // 😎 States
  const [teams, setTeams] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  const [creating, setCreating] = useState(false);

  const [teamA, setTeamA] = useState<any>(null);

  const [teamB, setTeamB] = useState<any>(null);

  const [overs, setOvers] = useState(5);

  const [coinChoice, setCoinChoice] = useState('');

  const [tossWinner, setTossWinner] = useState<any>(null);

  const [tossDecision, setTossDecision] = useState('');

  const [tossResult, setTossResult] = useState('');

  // 😎 Fetch Teams
  const fetchTeams = async () => {
    try {
      setLoading(true);

      const res = await getTeams().catch(() => null);

      const safeTeams = Array.isArray(res?.teams) ? res.teams : [];

      setTeams(safeTeams);
    } catch (error) {
      console.log('FETCH TEAM ERROR 😭', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  // 😎 Check Common Players Between Teams
  const hasCommonPlayers = (team1: any, team2: any) => {
    if (!team1?.players || !team2?.players) {
      return false;
    }

    const team1PlayerIds = team1.players.map((player: any) =>
      player?._id?.toString(),
    );

    return team2.players.some((player: any) =>
      team1PlayerIds.includes(player?._id?.toString()),
    );
  };

  // 😎 Toss Logic
  const handleToss = () => {
    if (!teamA || !teamB) {
      Alert.alert('Error 😭', 'Please select both teams');

      return;
    }

    if (!coinChoice) {
      Alert.alert('Error 😭', 'Choose Heads or Tails');

      return;
    }

    const toss = Math.random() > 0.5 ? 'Heads' : 'Tails';

    setTossResult(toss);

    const winner = toss === coinChoice ? teamA : teamB;

    setTossWinner(winner);
  };

  // 😎 Create Match
  const handleCreateMatch = async () => {
    if (!teamA || !teamB) {
      Alert.alert('Error 😭', 'Please select teams');
      return;
    }

    if (teamA?._id === teamB?._id) {
      Alert.alert('Error 😭', 'Both teams cannot be same');
      return;
    }

    if (!tossWinner || !tossDecision) {
      Alert.alert('Error 😭', 'Complete toss process');
      return;
    }

    try {
      setCreating(true);

      // ✅ Database mein match create karo
      const response = await createMatch({
        teamA: teamA._id,
        teamB: teamB._id,
        overs,
        tossWinner: tossWinner?.name || '',
        tossDecision,
      });

      const createdMatch = response?.match;

      if (!createdMatch?._id) {
        Alert.alert('Error 😭', 'Match create nahi hua');
        return;
      }

      // ✅ matchData mein _id include karo
      const matchData = {
        ...createdMatch,
        teamA, // populated team objects
        teamB,
        overs,
        tossWinner,
        tossDecision,
      };

      console.log('✅ Match Created:', matchData._id);

      navigation.navigate('PreInningSetup', {
        matchData,
      });
    } catch (error: any) {
      console.log(
        '❌ Create Match Error:',
        error?.response?.data || error?.message || error,
      );
      console.log('❌ Status:', error?.response?.status);
      Alert.alert(
        'Error 😭',
        (error?.response?.data && error.response.data.message) ||
          error?.message ||
          'Match create karne mein problem aayi',
      );
    } finally {
      setCreating(false);
    }
  };
  // 😎 Loader
  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <ScrollView
      style={[
        styles.container,
        {
          backgroundColor: COLORS.background,
        },
      ]}
      showsVerticalScrollIndicator={false}
    >
      {/* 😎 Glow */}
      <Animated.View style={[styles.glowCircle1, glowStyle]} />

      <Animated.View style={[styles.glowCircle2, glowStyle]} />

      {/* 😎 Header */}
      <Animated.View entering={FadeInUp.duration(700)} style={styles.header}>
        <Trophy size={30} color={COLORS.primary} />

        <Text style={styles.title}>Create Match</Text>
      </Animated.View>

      {/* 😎 Match Date */}
      <Animated.View entering={FadeInDown.duration(700)} style={styles.card}>
        <Text style={styles.label}>Match Date</Text>

        <Text style={styles.dateText}>{new Date().toLocaleString()}</Text>
      </Animated.View>

      {/* 😎 Team A */}
      <Animated.View entering={FadeInRight.duration(700)}>
        <Text style={styles.label}>Select Team A</Text>

        <View style={styles.row}>
          {teams.map((team: any) => {
            const active = teamA?._id === team?._id;

            return (
              <TouchableOpacity
                key={team?._id}
                activeOpacity={0.8}
                onPress={() => setTeamA(team)}
                style={[
                  styles.teamBtn,
                  {
                    backgroundColor: active ? COLORS.primary : COLORS.card,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.teamText,
                    {
                      color: active ? '#000' : COLORS.text,
                    },
                  ]}
                >
                  {team?.name || 'No Name'}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </Animated.View>

      {/* 😎 Team B */}
      <Animated.View entering={FadeInRight.duration(700)}>
        <Text style={styles.label}>Select Team B</Text>

        <View style={styles.row}>
          {teams
            .filter((team: any) => {
              // 😎 Same team remove
              if (team?._id === teamA?._id) {
                return false;
              }

              // 😎 Common players wali team remove
              if (teamA && hasCommonPlayers(teamA, team)) {
                return false;
              }

              return true;
            })
            .map((team: any) => {
              const active = teamB?._id === team?._id;

              return (
                <TouchableOpacity
                  key={team?._id}
                  activeOpacity={0.8}
                  onPress={() => setTeamB(team)}
                  style={[
                    styles.teamBtn,
                    {
                      backgroundColor: active ? COLORS.primary : COLORS.card,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.teamText,
                      {
                        color: active ? '#000' : COLORS.text,
                      },
                    ]}
                  >
                    {team?.name || 'No Name'}
                  </Text>
                </TouchableOpacity>
              );
            })}
        </View>
      </Animated.View>

      {/* 😎 Overs */}
      <Animated.View entering={FadeInDown.duration(700)} style={styles.card}>
        <Text style={styles.label}>Match Overs</Text>

        <View style={styles.oversRow}>
          <TouchableOpacity
            style={styles.circleBtn}
            onPress={() => setOvers(prev => (prev > 1 ? prev - 1 : 1))}
          >
            <Minus size={24} color="#000" />
          </TouchableOpacity>

          <Text style={styles.oversText}>{overs}</Text>

          <TouchableOpacity
            style={styles.circleBtn}
            onPress={() => setOvers(prev => prev + 1)}
          >
            <Plus size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* 😎 Coin */}
      <Animated.View entering={FadeInRight.duration(700)}>
        <Text style={styles.label}>Choose Coin</Text>

        <View style={styles.row}>
          {['Heads', 'Tails'].map(item => {
            const active = coinChoice === item;

            return (
              <TouchableOpacity
                key={item}
                onPress={() => setCoinChoice(item)}
                style={[
                  styles.teamBtn,
                  {
                    backgroundColor: active ? COLORS.primary : COLORS.card,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.teamText,
                    {
                      color: active ? '#000' : COLORS.text,
                    },
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </Animated.View>

      {/* 😎 Toss */}
      <Animated.View entering={FadeInDown.duration(700)}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleToss}
          style={styles.tossBtn}
        >
          <RefreshCw size={24} color="#000" />

          <Text style={styles.tossText}>Toss Coin</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* 😎 Toss Result */}
      {tossWinner && (
        <Animated.View entering={FadeInUp.duration(700)} style={styles.card}>
          <Text style={styles.resultText}>Coin Result: {tossResult}</Text>

          <Text style={styles.winText}>Toss Winner: {tossWinner?.name}</Text>

          <Text style={styles.label}>Select Decision</Text>

          <View style={styles.row}>
            {['Bat', 'Bowl'].map(item => {
              const active = tossDecision === item;

              return (
                <TouchableOpacity
                  key={item}
                  onPress={() => setTossDecision(item)}
                  style={[
                    styles.teamBtn,
                    {
                      backgroundColor: active ? COLORS.primary : COLORS.card,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.teamText,
                      {
                        color: active ? '#000' : COLORS.text,
                      },
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </Animated.View>
      )}

      {/* 😎 Start Match */}
      <Animated.View entering={FadeInDown.duration(700)}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleCreateMatch}
          disabled={creating}
          style={[styles.createBtn, creating && { opacity: 0.7 }]}
        >
          {creating ? (
            <ActivityIndicator size="small" color="#000" />
          ) : (
            <Zap size={24} color="#000" />
          )}

          <Text style={styles.createText}>
            {creating ? 'Creating...' : 'Start Match'}
          </Text>
        </TouchableOpacity>
      </Animated.View>

      <View style={{ height: 60 }} />
    </ScrollView>
  );
};

export default MatchForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },

  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },

  glowCircle1: {
    position: 'absolute',

    width: 280,
    height: 280,

    borderRadius: 200,

    backgroundColor: '#22D3EE22',

    top: -80,
    right: -80,
  },

  glowCircle2: {
    position: 'absolute',

    width: 220,
    height: 220,

    borderRadius: 200,

    backgroundColor: '#06B6D422',

    bottom: 80,
    left: -80,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',

    marginTop: 20,
    marginBottom: 24,
  },

  title: {
    color: COLORS.text,

    fontSize: 30,

    fontWeight: 'bold',

    marginLeft: 12,
  },

  card: {
    backgroundColor: COLORS.card,

    borderRadius: 24,

    borderWidth: 1,

    borderColor: COLORS.border,

    padding: 18,

    marginBottom: 22,

    shadowColor: COLORS.glow,

    shadowOffset: {
      width: 0,
      height: 0,
    },

    shadowOpacity: 0.8,

    shadowRadius: 14,

    elevation: 12,
  },

  label: {
    color: COLORS.text,

    fontSize: 17,

    fontWeight: '700',

    marginBottom: 14,
  },

  dateText: {
    color: COLORS.primary,

    fontSize: 16,

    fontWeight: '600',
  },

  row: {
    flexDirection: 'row',

    flexWrap: 'wrap',

    marginBottom: 16,
  },

  teamBtn: {
    paddingVertical: 12,

    paddingHorizontal: 18,

    borderRadius: 16,

    borderWidth: 1,

    borderColor: COLORS.border,

    marginRight: 10,

    marginBottom: 10,

    shadowColor: COLORS.glow,

    shadowOffset: {
      width: 0,
      height: 0,
    },

    shadowOpacity: 0.5,

    shadowRadius: 10,

    elevation: 8,
  },

  teamText: {
    fontWeight: '700',

    fontSize: 15,
  },

  oversRow: {
    flexDirection: 'row',

    justifyContent: 'center',

    alignItems: 'center',
  },

  circleBtn: {
    width: 60,
    height: 60,

    borderRadius: 40,

    backgroundColor: COLORS.primary,

    justifyContent: 'center',

    alignItems: 'center',

    shadowColor: COLORS.glow,

    shadowOffset: {
      width: 0,
      height: 0,
    },

    shadowOpacity: 1,

    shadowRadius: 12,

    elevation: 12,
  },

  oversText: {
    color: COLORS.text,

    fontSize: 34,

    fontWeight: 'bold',

    marginHorizontal: 28,
  },

  tossBtn: {
    backgroundColor: COLORS.primary,

    borderRadius: 22,

    paddingVertical: 18,

    justifyContent: 'center',

    alignItems: 'center',

    flexDirection: 'row',

    marginBottom: 24,

    shadowColor: COLORS.glow,

    shadowOffset: {
      width: 0,
      height: 0,
    },

    shadowOpacity: 1,

    shadowRadius: 16,

    elevation: 12,
  },

  tossText: {
    color: '#000',

    fontSize: 20,

    fontWeight: 'bold',

    marginLeft: 10,
  },

  resultText: {
    color: COLORS.primary,

    fontSize: 18,

    fontWeight: '700',

    marginBottom: 10,
  },

  winText: {
    color: COLORS.text,

    fontSize: 22,

    fontWeight: 'bold',

    marginBottom: 18,
  },

  createBtn: {
    backgroundColor: COLORS.primary,

    borderRadius: 22,

    paddingVertical: 18,

    justifyContent: 'center',

    alignItems: 'center',

    flexDirection: 'row',

    shadowColor: COLORS.glow,

    shadowOffset: {
      width: 0,
      height: 0,
    },

    shadowOpacity: 1,

    shadowRadius: 18,

    elevation: 14,
  },

  createText: {
    color: '#000',

    fontSize: 20,

    fontWeight: 'bold',

    marginLeft: 10,
  },
});
