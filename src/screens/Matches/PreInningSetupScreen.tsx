// src/screens/Matches/PreInningSetupScreen.tsx 😎🔥

import React, { useEffect, useMemo, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StatusBar,
} from 'react-native';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';

import { useNavigation, useRoute } from '@react-navigation/native';

import COLORS from '../../constants/colors';

import { getTeamById } from '../../api/teamApi';

const PreInningSetupScreen = () => {
  const glow = useSharedValue(0.7);

  useEffect(() => {
    glow.value = withRepeat(
      withTiming(1, {
        duration: 2500,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true,
    );
    return () => {
      glow.value = 0;
    };
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
  const navigation = useNavigation<any>();

  const route = useRoute<any>();

  const { matchData } = route.params;

  const [loading, setLoading] = useState(true);

  const [battingPlayers, setBattingPlayers] = useState<any[]>([]);

  const [bowlingPlayers, setBowlingPlayers] = useState<any[]>([]);

  const [striker, setStriker] = useState<any>(null);

  const [nonStriker, setNonStriker] = useState<any>(null);

  const [bowler, setBowler] = useState<any>(null);

  const [setupStep, setSetupStep] = useState<'batters' | 'bowler'>('batters');

  // 😎 LOAD DATA
  useEffect(() => {
    loadTeams();
  }, []);

  const loadTeams = async () => {
    try {
      setLoading(true);

      const tossWinnerId = matchData?.tossWinner?._id;

      const isTeamAWinner = tossWinnerId === matchData?.teamA?._id;

      let battingTeamId = '';
      let bowlingTeamId = '';

      // 😎 Toss winner chooses BAT
      if (matchData?.tossDecision === 'Bat') {
        battingTeamId = isTeamAWinner
          ? matchData?.teamA?._id
          : matchData?.teamB?._id;

        bowlingTeamId = isTeamAWinner
          ? matchData?.teamB?._id
          : matchData?.teamA?._id;
      }

      // 😎 Toss winner chooses BOWL
      else {
        bowlingTeamId = isTeamAWinner
          ? matchData?.teamA?._id
          : matchData?.teamB?._id;

        battingTeamId = isTeamAWinner
          ? matchData?.teamB?._id
          : matchData?.teamA?._id;
      }
      const battingRes = await getTeamById(battingTeamId);

      const bowlingRes = await getTeamById(bowlingTeamId);

      const battingTeam = battingRes?.team;

      const bowlingTeam = bowlingRes?.team;

      // 😎 SAFE ARRAY
      const battingPlayersArray = Array.isArray(battingTeam?.players)
        ? battingTeam.players
        : [];

      const bowlingPlayersArray = Array.isArray(bowlingTeam?.players)
        ? bowlingTeam.players
        : [];

      // 😎 ADD CAPTAIN
      const battingAllPlayers = [
        battingTeam?.captain,
        ...battingPlayersArray,
      ].filter(Boolean);

      const bowlingAllPlayers = [
        bowlingTeam?.captain,
        ...bowlingPlayersArray,
      ].filter(Boolean);

      // 😎 REMOVE DUPLICATES
      const uniqueBatters = battingAllPlayers.filter(
        (player, index, self) =>
          index === self.findIndex(p => String(p?._id) === String(player?._id)),
      );

      const uniqueBowlers = bowlingAllPlayers.filter(
        (player, index, self) =>
          index === self.findIndex(p => String(p?._id) === String(player?._id)),
      );

      console.log('BATTERS 😎', uniqueBatters);

      console.log('BOWLERS 😎', uniqueBowlers);

      setBattingPlayers(uniqueBatters);

      setBowlingPlayers(uniqueBowlers);
    } catch (error) {
      console.log('TEAM LOAD ERROR 😭', error);
    } finally {
      setLoading(false);
    }
  };

  // 😎 START MATCH
  const handleStartInning = () => {
    navigation.navigate('InningScreen', {
      matchData,

      inningSetup: {
        battingPlayers,
        bowlingPlayers,

        striker,
        nonStriker,
        bowler,

        battingTeam: {
          name:
            matchData?.tossDecision === 'Bat'
              ? matchData?.tossWinner?.name
              : matchData?.tossWinner?._id === matchData?.teamA?._id
              ? matchData?.teamB?.name
              : matchData?.teamA?.name,
        },
      },
    });
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.glow1, glowStyle]} />

      <Animated.View style={[styles.glow2, glowStyle]} />

      <StatusBar backgroundColor={COLORS.background} barStyle="light-content" />

      {/* 😎 HEADER */}
      <View style={styles.topCard}>
        <Text style={styles.title}>Match Setup </Text>

        <Text style={styles.subTitle}>Select opening players</Text>
      </View>

      {/* 😎 SELECTION STATUS */}
      <View style={styles.selectionBox}>
        <Text style={styles.selectionText}>
          Striker: {striker?.name || 'Not Selected'}
        </Text>

        <Text style={styles.selectionText}>
          Non-Striker: {nonStriker?.name || 'Not Selected'}
        </Text>

        <Text style={styles.selectionText}>
          Bowler: {bowler?.name || 'Not Selected'}
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 120,
        }}
      >
        {/* ================================================= */}
        {/* 😎 BATTER SELECTION SCREEN */}
        {/* ================================================= */}

        {setupStep === 'batters' && (
          <>
            {/* 😎 Heading */}
            <Text style={styles.bigHeading}>
              {striker ? 'Choose Non-Striker ' : 'Choose Striker '}
            </Text>

            <Text style={styles.stepText}>
              {!striker
                ? 'Select the opening striker batter'
                : 'Now select the non-striker batter'}
            </Text>

            {/* 😎 Players List */}
            {battingPlayers.map((player: any) => {
              const isSelected =
                striker?._id === player._id || nonStriker?._id === player._id;

              return (
                <TouchableOpacity
                  key={player._id}
                  activeOpacity={0.8}
                  style={[
                    styles.playerCard,

                    isSelected && styles.selectedPlayerCard,
                  ]}
                  onPress={() => {
                    // 😎 Select Striker
                    if (!striker) {
                      setStriker(player);

                      return;
                    }

                    // 😎 Select Non Striker
                    if (!nonStriker && striker?._id !== player._id) {
                      setNonStriker(player);
                    }
                  }}
                >
                  {/* 😎 LEFT */}
                  <View style={{ flex: 1 }}>
                    <Text style={styles.playerName}>{player?.name}</Text>

                    <Text style={styles.playerInfo}>
                      {player?.batsmanType} Batsman
                    </Text>

                    {/* <Text style={styles.playerInfo}>
                      Role: {player?.role || 'Player'}
                    </Text> */}
                  </View>

                  {/* 😎 RIGHT */}
                  <View style={styles.rightBox}>
                    <Text style={styles.stats}>
                      SR {player?.strikeRate || 0}
                    </Text>

                    <Text style={styles.stats}>
                      Total Runs {player?.runs || 0}
                    </Text>

                    {striker?._id === player._id && (
                      <View style={styles.tag}>
                        <Text style={styles.tagText}>STRIKER</Text>
                      </View>
                    )}

                    {nonStriker?._id === player._id && (
                      <View style={styles.tag}>
                        <Text style={styles.tagText}>NON-STRIKER</Text>
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}

            {/* 😎 NEXT BUTTON */}
            {striker && nonStriker && (
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.nextBtn}
                onPress={() => setSetupStep('bowler')}
              >
                <Text style={styles.nextText}>Continue To Bowler </Text>
              </TouchableOpacity>
            )}
          </>
        )}

        {/* ================================================= */}
        {/* 😎 BOWLER SELECTION SCREEN */}
        {/* ================================================= */}

        {setupStep === 'bowler' && (
          <>
            <Text style={styles.bigHeading}>Choose Opening Bowler </Text>

            <Text style={styles.stepText}>
              Select the bowler who will bowl first over
            </Text>

            {/* 😎 Bowler List */}
            {bowlingPlayers.map((player: any) => (
              <TouchableOpacity
                key={player._id}
                activeOpacity={0.8}
                style={[
                  styles.playerCard,

                  bowler?._id === player._id && styles.selectedPlayerCard,
                ]}
                onPress={() => setBowler(player)}
              >
                {/* 😎 LEFT */}
                <View style={{ flex: 1 }}>
                  <Text style={styles.playerName}>{player?.name}</Text>

                  <Text style={styles.playerInfo}>
                    {player?.bowlerType} • {player?.bowlingStyle}
                  </Text>

                  <Text style={styles.playerInfo}>
                    Role: {player?.role || 'Player'}
                  </Text>
                </View>

                {/* 😎 RIGHT */}
                <View style={styles.rightBox}>
                  <Text style={styles.stats}>Wkts {player?.wickets || 0}</Text>

                  <Text style={styles.stats}>Eco {player?.economy || 0}</Text>

                  {bowler?._id === player._id && (
                    <View style={styles.tag}>
                      <Text style={styles.tagText}>SELECTED</Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            ))}

            {/* 😎 START MATCH */}
            {bowler && (
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.startBtn}
                onPress={handleStartInning}
              >
                <Text style={styles.startText}>START MATCH </Text>
              </TouchableOpacity>
            )}

            {/* 😎 BACK BUTTON */}
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.backBtn}
              onPress={() => {
                setSetupStep('batters');

                setBowler(null);
              }}
            >
              <Text style={styles.backText}>Back To Batters</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default PreInningSetupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: (StatusBar.currentHeight || 0) + 3,
    backgroundColor: COLORS.background,
  },

  loader: {
    flex: 1,

    justifyContent: 'center',

    alignItems: 'center',

    backgroundColor: COLORS.background,
  },

  topCard: {
    paddingTop: (StatusBar.currentHeight || 0) + 20,

    paddingHorizontal: 20,

    paddingBottom: 20,
  },

  title: {
    color: COLORS.primary,

    fontSize: 30,

    fontWeight: 'bold',
  },

  subTitle: {
    color: COLORS.subText,

    marginTop: 6,

    fontSize: 15,
  },

  selectionBox: {
    backgroundColor: COLORS.card,

    marginHorizontal: 16,

    borderRadius: 20,

    padding: 16,

    marginBottom: 10,

    borderWidth: 1,

    borderColor: COLORS.border,
  },

  selectionText: {
    color: COLORS.text,

    marginBottom: 8,

    fontWeight: '600',
  },

  heading: {
    color: COLORS.primary,

    fontSize: 22,

    fontWeight: 'bold',

    marginVertical: 18,

    marginHorizontal: 16,
  },

  playerCard: {
    marginHorizontal: 16,

    backgroundColor: COLORS.card,

    borderRadius: 22,

    padding: 18,

    marginBottom: 14,

    borderWidth: 1,

    borderColor: COLORS.border,

    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'center',
  },

  selectedPlayerCard: {
    borderWidth: 2,

    borderColor: COLORS.primary,

    backgroundColor: '#0F172A',
  },

  playerName: {
    color: COLORS.text,

    fontSize: 18,

    fontWeight: 'bold',
  },

  playerInfo: {
    color: COLORS.subText,

    marginTop: 6,
  },

  rightBox: {
    alignItems: 'flex-end',
  },

  stats: {
    color: COLORS.primary,

    fontWeight: '700',

    marginBottom: 6,
  },

  startBtn: {
    height: 62,

    backgroundColor: COLORS.primary,

    marginHorizontal: 16,

    borderRadius: 20,

    justifyContent: 'center',

    alignItems: 'center',

    marginTop: 20,
  },

  startText: {
    color: '#000',

    fontSize: 18,

    fontWeight: 'bold',
  },

  bigHeading: {
    color: COLORS.primary,

    fontSize: 30,

    fontWeight: 'bold',

    marginHorizontal: 16,

    marginTop: 20,

    marginBottom: 10,
  },

  stepText: {
    color: COLORS.subText,

    marginHorizontal: 16,

    marginBottom: 20,

    fontSize: 15,
  },

  nextBtn: {
    height: 60,

    backgroundColor: COLORS.primary,

    marginHorizontal: 16,

    borderRadius: 20,

    justifyContent: 'center',

    alignItems: 'center',

    marginTop: 20,
  },

  nextText: {
    color: '#000',

    fontWeight: 'bold',

    fontSize: 18,
  },

  backBtn: {
    height: 58,

    borderWidth: 1,

    borderColor: COLORS.primary,

    marginHorizontal: 16,

    borderRadius: 20,

    justifyContent: 'center',

    alignItems: 'center',

    marginTop: 20,
  },

  backText: {
    color: COLORS.primary,

    fontWeight: 'bold',

    fontSize: 17,
  },
  tag: {
    marginTop: 10,

    backgroundColor: COLORS.primary,

    paddingHorizontal: 10,

    paddingVertical: 4,

    borderRadius: 50,

    alignSelf: 'flex-end',
  },

  tagText: {
    color: '#000',

    fontWeight: 'bold',

    fontSize: 11,
  },

  glow1: {
    position: 'absolute',

    width: 320,

    height: 320,

    borderRadius: 200,

    backgroundColor: '#22D3EE20',

    top: -100,

    right: -80,
  },

  glow2: {
    position: 'absolute',

    width: 250,

    height: 250,

    borderRadius: 200,

    backgroundColor: '#06B6D420',

    bottom: 100,

    left: -80,
  },
});
