// src/screens/Matches/InningScreen2.tsx 😎🔥

import React, { useEffect, useMemo, useState } from 'react';

import {
  ScrollView,
  StyleSheet,
  View,
  StatusBar,
  Modal,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Alert,
} from 'react-native';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';

import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';

import COLORS from '../../constants/colors';

import ScoreHeader from '../../components/ScoreHeader';
import BatterTable from '../../components/BatterTable';
import BowlerCard from '../../components/BowlerCard';
import PartnershipCard from '../../components/PartnershipCard';
import ThisOver from '../../components/ThisOver';
import ScoreButtons from '../../components/ScoreButtons';
import MatchControls from '../../components/MatchControls';
import WicketModal from '../../components/WicketModal';

import {
  handleBallEvent,
  undoBall,
  redoBall,
  InningState,
  PlayerStats,
} from '../../utils/matchEngine';

type RootStackParamList = {
  InningScreen2: {
    matchData: any;
    inningSetup: any;
    firstInningData: any;
  };
};

// =====================================================
// 😎 INITIAL STATE
// =====================================================

const INITIAL_STATE: InningState = {
  totalRuns: 0,
  wickets: 0,

  oversPlayed: '0.0',
  legalBalls: 0,

  currentRunRate: 0,
  projectedScore: 0,

  isSoloBatterMode: false,

  target: 0,
  requiredRunRate: 0,

  thisOver: [],
  overHistory: [],

  usedBatters: [],

  history: [],
  redoStack: [],

  lastWicket: null,

  striker: null,
  nonStriker: null,
  bowler: null,

  battingTeam: null,

  partnership: {
    runs: 0,
    balls: 0,
  },
};

const InningScreen2 = () => {
  type InningScreenRouteProp = RouteProp<RootStackParamList, 'InningScreen2'>;

  const route = useRoute<InningScreenRouteProp>();

  const [autoPosition, setAutoPosition] = useState<
    'striker' | 'nonStriker' | null
  >(null);

  const [showSurvivorModal, setShowSurvivorModal] = useState(false);
  const [survivorData, setSurvivorData] = useState<{
    survivingPlayer: any;
    newBatterPosition: 'striker' | 'nonStriker';
  } | null>(null);

  const navigation = useNavigation<any>();

  const { matchData, inningSetup, firstInningData } = route.params || {};

  // =====================================================
  // 😎 STATES
  // =====================================================

  const [loading, setLoading] = useState(true);

  const [inningEnded, setInningEnded] = useState(false);

  const [restPlayer, setRestPlayer] = useState<any>(null);

  const [showRestModal, setShowRestModal] = useState(false);

  const [inning, setInning] = useState<any>(INITIAL_STATE);

  const [showBowlerModal, setShowBowlerModal] = useState(false);

  const [showBatterModal, setShowBatterModal] = useState(false);

  const [showWicketModal, setShowWicketModal] = useState(false);

  const [playerStatsMap, setPlayerStatsMap] = useState<any>({});

  const [showOverHistoryModal, setShowOverHistoryModal] = useState(false);

  const [bowlerStatsMap, setBowlerStatsMap] = useState<any>({});

  const [matchResult, setMatchResult] = useState<any>(null);

  // =====================================================
  // 😎 PLAYERS
  // =====================================================

  const battingPlayers = useMemo(
    () => inningSetup?.battingPlayers || [],
    [inningSetup],
  );

  const bowlingPlayers = useMemo(
    () => inningSetup?.bowlingPlayers || [],
    [inningSetup],
  );

  // =====================================================
  // 😎 TARGET
  // =====================================================

  const TARGET = (firstInningData?.totalRuns || 0) + 1;

  const TOTAL_OVERS = matchData?.overs || 0;

  const TEAM_SIZE = battingPlayers.length;

  // =====================================================
  // 😎 OUT PLAYERS
  // =====================================================

  const outPlayers = useMemo(() => {
    return Object.values(playerStatsMap)
      .filter((player: any) => player?.status === 'Out')
      .map((player: any) => player?._id);
  }, [playerStatsMap]);

  // =====================================================
  // 😎 GLOW EFFECT
  // =====================================================

  const glow = useSharedValue(0.5);

  useEffect(() => {
    glow.value = withRepeat(
      withTiming(1, {
        duration: 2200,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true,
    );
  }, [glow]);

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

  useEffect(() => {
    if (!matchResult) return;

    setInningEnded(true);
    navigation.replace('WinnerScreen', {
      matchData,
      firstInningData,
      secondInningData: matchResult.secondInningData,
      winnerTeam: matchResult.winnerTeam,
      resultText: matchResult.resultText,
    });
  }, [matchResult]);

  // =====================================================
  // 😎 INIT MATCH
  // =====================================================

  useEffect(() => {
    const strikerData = {
      _id: inningSetup?.striker?._id,

      name: inningSetup?.striker?.name,

      battingStyle: inningSetup?.striker?.batsmanType,

      runs: 0,
      balls: 0,

      fours: 0,
      sixes: 0,

      strikeRate: 0,

      isStriker: true,
    };

    const nonStrikerData = {
      _id: inningSetup?.nonStriker?._id,

      name: inningSetup?.nonStriker?.name,

      battingStyle: inningSetup?.nonStriker?.batsmanType,

      runs: 0,
      balls: 0,

      fours: 0,
      sixes: 0,

      strikeRate: 0,

      isStriker: false,
    };

    setPlayerStatsMap({
      [strikerData._id]: strikerData,

      [nonStrikerData._id]: nonStrikerData,
    });

    const initialBowler = {
      _id: inningSetup?.bowler?._id,

      name: inningSetup?.bowler?.name,

      bowlingStyle: `${inningSetup?.bowler?.bowlerType || ''} ${
        inningSetup?.bowler?.bowlingStyle || ''
      }`,

      overs: '0.0',

      balls: 0,

      runsGiven: 0,

      wickets: 0,

      economy: 0,

      dotBalls: 0,
    };

    setBowlerStatsMap({
      [initialBowler._id]: initialBowler,
    });

    setInning({
      ...INITIAL_STATE,

      target: TARGET,

      ballsLeft: TOTAL_OVERS * 6,
      runsNeeded: TARGET,
      requiredRunRate:
        TARGET > 0 ? Number(((TARGET * 6) / (TOTAL_OVERS * 6)).toFixed(2)) : 0,

      battingTeam: inningSetup?.battingTeam,

      usedBatters: [inningSetup?.striker?._id, inningSetup?.nonStriker?._id],

      striker: strikerData,

      nonStriker: nonStrikerData,

      bowler: initialBowler,
    });

    setLoading(false);
  }, [inningSetup, TARGET, TOTAL_OVERS]);

  // =====================================================
  // 😎 UPDATE PLAYER MAP
  // =====================================================

  useEffect(() => {
    setPlayerStatsMap((prev: any) => {
      const updated = { ...prev };

      if (inning.striker?._id) {
        updated[inning.striker._id] = inning.striker;
      }

      if (inning.nonStriker?._id) {
        updated[inning.nonStriker._id] = inning.nonStriker;
      }

      return updated;
    });
  }, [inning]);

  // 😎 SAVE CURRENT BOWLER STATS
  useEffect(() => {
    setBowlerStatsMap((prev: any) => {
      const updated = { ...prev };

      if (inning.bowler?._id) {
        updated[inning.bowler._id] = inning.bowler;
      }

      return updated;
    });
  }, [inning.bowler]);

  // =====================================================
  // 😎 SCORE HANDLER
  // =====================================================

  const handleScore = (type: string) => {
    if (inningEnded) {
      return;
    }

    if (type === 'WKT') {
      setShowWicketModal(true);

      return;
    }

    if (type === 'REST') {
      setShowRestModal(true);
      return;
    }

    processBall(type);
  };

  // =====================================================
  // 😎 PROCESS BALL
  // =====================================================

  const processBall = (type: string, wicketData?: any) => {
    setInning((prev: any) => {
      const updated = handleBallEvent(prev, type, TOTAL_OVERS, {
        ...wicketData,
        totalPlayers: TEAM_SIZE,
      });

      // 😎 CHASE CALCULATIONS

      const totalBalls = TOTAL_OVERS * 6;

      const ballsLeft = totalBalls - updated.legalBalls;

      const runsNeeded = Math.max(updated.target - updated.totalRuns, 0);

      const requiredRunRate =
        ballsLeft > 0 ? Number(((runsNeeded * 6) / ballsLeft).toFixed(2)) : 0;

      updated.ballsLeft = ballsLeft;

      updated.runsNeeded = runsNeeded;

      updated.requiredRunRate = requiredRunRate;

      // 😎 WON

      if (updated.totalRuns >= updated.target) {
        const finalPlayerMap = { ...playerStatsMap };
        if (updated.striker?._id)
          finalPlayerMap[updated.striker._id] = updated.striker;
        if (updated.nonStriker?._id)
          finalPlayerMap[updated.nonStriker._id] = updated.nonStriker;
        const finalBowlerMap = { ...bowlerStatsMap };
        if (updated.bowler?._id)
          finalBowlerMap[updated.bowler._id] = updated.bowler;
        setTimeout(() => {
          setInningEnded(true);

          setMatchResult({
            winnerTeam: updated.battingTeam,
            resultText: `${updated.battingTeam?.name} won by ${
              TEAM_SIZE - updated.wickets
            } wickets 😎🔥`,
            secondInningData: {
              ...updated,
              playerStatsMap: finalPlayerMap,
              bowlerStatsMap: finalBowlerMap,
            },
          });
        }, 500);
      }

      // 😎 OVER COMPLETE

      if (
        updated.legalBalls > 0 &&
        updated.legalBalls % 6 === 0 &&
        updated.legalBalls < TOTAL_OVERS * 6
      ) {
        setTimeout(() => {
          setShowBowlerModal(true);
        }, 300);
      }

      // 😎 ALL OVERS END

      // ✅ AISE KARO
      if (updated.legalBalls >= TOTAL_OVERS * 6) {
        const firstTeamRuns = firstInningData?.totalRuns || 0;
        const secondTeamRuns = updated.totalRuns;

        let winnerTeam;
        let resultText;

        if (secondTeamRuns > firstTeamRuns) {
          winnerTeam = updated.battingTeam;
          resultText = `${updated.battingTeam?.name} won the match 😎🔥`;
        } else if (secondTeamRuns < firstTeamRuns) {
          winnerTeam = firstInningData?.battingTeam;
          resultText = `${firstInningData?.battingTeam?.name} won by ${
            firstTeamRuns - secondTeamRuns
          } runs 😎🔥`;
        } else {
          winnerTeam = null;
          resultText = 'Match Draw 😎';
        }

        const finalPlayerMap = { ...playerStatsMap };
        if (updated.striker?._id)
          finalPlayerMap[updated.striker._id] = updated.striker;
        if (updated.nonStriker?._id)
          finalPlayerMap[updated.nonStriker._id] = updated.nonStriker;
        const finalBowlerMap = { ...bowlerStatsMap };
        if (updated.bowler?._id)
          finalBowlerMap[updated.bowler._id] = updated.bowler;

        setTimeout(() => {
          setMatchResult({
            winnerTeam,
            resultText,
            secondInningData: {
              ...updated,
              playerStatsMap: finalPlayerMap,
              bowlerStatsMap: finalBowlerMap,
            },
          });
        }, 500);
      }

      // 😎 WICKET FLOW
      if (type === 'WKT') {
        const isRunOut = wicketData?.wicketType === 'Run Out';
        const runsCompleted = wicketData?.runsCompleted || 0;
        const outPlayer = wicketData?.outPlayer || 'striker';

        const outPlayerId =
          wicketData?.outPlayer === 'nonStriker'
            ? prev.nonStriker?._id
            : prev.striker?._id;

        if (outPlayerId) {
          setPlayerStatsMap((prevMap: any) => ({
            ...prevMap,
            [outPlayerId]: {
              ...prevMap[outPlayerId],
              status: 'Out',
            },
          }));
        }

        const allOut = updated.wickets >= TEAM_SIZE;

        // ✅ AISE KARO
        if (allOut) {
          setTimeout(() => {
            setInningEnded(true);
            Alert.alert('All Out! ', 'All players are out!');
          }, 300);
        } else if (updated.wickets >= TEAM_SIZE - 1) {
          setShowBatterModal(false);
          setAutoPosition(null);
        } else if (isRunOut) {
          const isOdd = runsCompleted % 2 === 1;
          if (runsCompleted === 0) {
            if (outPlayer === 'striker') {
              updated.striker = { ...prev.nonStriker!, isStriker: true };
              updated.nonStriker = null;
              setAutoPosition('nonStriker');
            } else {
              updated.nonStriker = null;
              setAutoPosition('nonStriker');
            }

            setTimeout(() => setShowBatterModal(true), 300);
          } else if (isOdd) {
            if (outPlayer === 'striker') {
              updated.striker = null; // new batter
              updated.nonStriker = { ...prev.nonStriker!, isStriker: false };
              setAutoPosition('striker');
            } else {
              updated.striker = { ...prev.striker!, isStriker: true };
              updated.nonStriker = null; // new batter
              setAutoPosition('nonStriker');
            }

            setTimeout(() => setShowBatterModal(true), 300);
          } else {
            if (outPlayer === 'striker') {
              updated.striker = { ...prev.nonStriker!, isStriker: true };
              updated.nonStriker = null;
              setAutoPosition('nonStriker');
            } else {
              updated.nonStriker = null;
              setAutoPosition('striker');
            }

            setTimeout(() => setShowBatterModal(true), 300);
          }
        } else {
          setAutoPosition(null);
          setTimeout(() => setShowBatterModal(true), 300);
        }
      }

      return updated;
    });
  };

  // =====================================================
  // 😎 UNDO
  // =====================================================

  const handleUndo = () => {
    setInning((prev: any) => undoBall(prev));

    setInningEnded(false);
  };

  // =====================================================
  // 😎 REDO
  // =====================================================

  const handleRedo = () => {
    setInning((prev: any) => redoBall(prev));
  };

  // =====================================================
  // 😎 SELECT BATTER
  // =====================================================

  const selectNewBatter = (
    player: any,
    battingPosition: 'striker' | 'nonStriker',
  ) => {
    setInning((prev: any) => {
      const existingPlayer = playerStatsMap[player._id];

      const newBatter: PlayerStats = existingPlayer || {
        _id: player._id,

        name: player.name,

        battingStyle: player.batsmanType,

        runs: 0,
        balls: 0,

        fours: 0,
        sixes: 0,

        strikeRate: 0,

        isStriker: battingPosition === 'striker',
      };

      return {
        ...prev,

        striker:
          battingPosition === 'striker'
            ? {
                ...newBatter,
                isStriker: true,
              }
            : prev.striker,

        nonStriker:
          battingPosition === 'nonStriker'
            ? {
                ...newBatter,
                isStriker: false,
              }
            : prev.nonStriker,
      };
    });

    setShowBatterModal(false);
  };

  // =====================================================
  // 😎 NEW BOWLER
  // =====================================================

  const selectNewBowler = (player: any) => {
    setInning((prev: any) => {
      const existingBowler = bowlerStatsMap[player._id];

      const bowlerData = existingBowler || {
        _id: player._id,

        name: player.name,

        bowlingStyle: `${player.bowlerType || ''} ${player.bowlingStyle || ''}`,

        overs: '0.0',

        balls: 0,

        runsGiven: 0,

        wickets: 0,

        economy: 0,

        dotBalls: 0,
      };

      return {
        ...prev,

        bowler: bowlerData,
      };
    });

    setShowBowlerModal(false);
  };

  // =====================================================
  // 😎 LOADING
  // =====================================================

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  // =====================================================
  // 😎 UI
  // =====================================================

  return (
    <>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Animated.View style={[styles.glow1, glowStyle]} />

        <Animated.View style={[styles.glow2, glowStyle]} />

        {/* 😎 SCORE HEADER */}
        <ScoreHeader
          inning={inning}
          totalOvers={TOTAL_OVERS}
          isSecondInnings={true}
        />

        {/* 😎 BATTERS */}
        {!!inning?.striker && (
          <BatterTable
            striker={inning.striker}
            nonStriker={inning.nonStriker}
          />
        )}

        {/* 😎 BOWLER */}
        {!!inning?.bowler && <BowlerCard bowler={inning.bowler} />}

        {/* 😎 PARTNERSHIP */}
        <PartnershipCard partnership={inning.partnership} />

        {/* 😎 THIS OVER */}
        <ThisOver
          balls={inning.thisOver}
          overHistory={inning.overHistory}
          onPress={() => setShowOverHistoryModal(true)}
        />

        {/* 😎 SCORE BUTTONS */}
        {!inningEnded && <ScoreButtons onPress={handleScore} />}

        {/* 😎 CONTROLS */}
        <MatchControls
          onUndo={handleUndo}
          onRedo={handleRedo}
          onRest={() => setShowRestModal(true)}
          onEnd={() => {
            setInningEnded(true);

            Alert.alert('Innings Ended 😎', 'You ended the innings manually.');
          }}
        />

        {/* 😎 MATCH FINISHED */}
        {inningEnded && (
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.finishBtn}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.finishText}>Finish Match 😎🔥</Text>
          </TouchableOpacity>
        )}

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* ===================================================== */}
      {/* 😎 WICKET MODAL */}
      {/* ===================================================== */}

      <WicketModal
        visible={showWicketModal}
        inning={inning}
        bowlingPlayers={bowlingPlayers}
        onClose={() => setShowWicketModal(false)}
        onConfirm={(data: any) => {
          setShowWicketModal(false);

          processBall('WKT', data);
        }}
      />

      {/* ===================================================== */}
      {/* 😎 REST MODAL */}
      {/* ===================================================== */}

      <Modal visible={showRestModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <ScrollView
            style={styles.modalContainer}
            contentContainerStyle={{ paddingBottom: 40 }}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.modalTitle}>Select Player For Rest 😎</Text>

            {[inning?.striker, inning?.nonStriker].map((player: any) => {
              if (!player) return null;

              return (
                <TouchableOpacity
                  key={player._id}
                  activeOpacity={0.8}
                  style={[
                    styles.playerBtn,
                    restPlayer?._id === player?._id && {
                      borderWidth: 2,
                      borderColor: COLORS.primary,
                    },
                  ]}
                  onPress={() => setRestPlayer(player)}
                >
                  <Text style={styles.playerName}>{player.name}</Text>
                  <Text style={styles.playerInfo}>
                    {player.isStriker ? 'Currently Striking' : 'Non-Striker'}
                  </Text>
                </TouchableOpacity>
              );
            })}

            {!!restPlayer && (
              <>
                <Text
                  style={[styles.modalTitle, { fontSize: 18, marginTop: 10 }]}
                >
                  Replacement Player 😎
                </Text>

                {battingPlayers
                  .filter(
                    (item: any) =>
                      !outPlayers.includes(item._id) &&
                      item._id !== inning?.striker?._id &&
                      item._id !== inning?.nonStriker?._id,
                  )
                  .map((item: any) => (
                    <TouchableOpacity
                      key={item._id}
                      activeOpacity={0.8}
                      style={styles.playerBtn}
                      onPress={() => {
                        setInning((prev: any) => {
                          const existingPlayer = playerStatsMap[item._id];

                          const isRestingStriker =
                            prev.striker?._id === restPlayer?._id;

                          const newPlayer = existingPlayer || {
                            _id: item._id,
                            name: item.name,
                            battingStyle: item.batsmanType,
                            runs: 0,
                            balls: 0,
                            fours: 0,
                            sixes: 0,
                            strikeRate: 0,
                            isStriker: isRestingStriker,
                          };

                          return {
                            ...prev,
                            partnership: { runs: 0, balls: 0 },
                            striker: isRestingStriker
                              ? { ...newPlayer, isStriker: true }
                              : prev.striker,
                            nonStriker: !isRestingStriker
                              ? { ...newPlayer, isStriker: false }
                              : prev.nonStriker,
                          };
                        });

                        setRestPlayer(null);
                        setShowRestModal(false);
                      }}
                    >
                      <Text style={styles.playerName}>{item.name}</Text>
                      <Text style={styles.playerInfo}>{item.batsmanType}</Text>
                    </TouchableOpacity>
                  ))}
              </>
            )}
          </ScrollView>
        </View>
      </Modal>

      {/* ===================================================== */}
      {/* 😎 BATTER MODAL */}
      {/* ===================================================== */}

      <Modal visible={showBatterModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <ScrollView style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Select New Batter 😎</Text>

            {battingPlayers
              .filter((item: any) => {
                const isOut = outPlayers.includes(item._id);

                const alreadyPlaying =
                  item._id === inning?.striker?._id ||
                  item._id === inning?.nonStriker?._id;

                const lastOutPlayerId = inning?.lastWicket?.playerId;

                const isLastOutPlayer = item._id === lastOutPlayerId;

                return !isOut && !alreadyPlaying && !isLastOutPlayer;
              })
              .map((item: any) => (
                <View key={item._id} style={{ marginBottom: 14 }}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.playerBtn}
                  >
                    <Text style={styles.playerName}>{item.name}</Text>
                    <Text style={styles.playerInfo}>{item.batsmanType}</Text>
                  </TouchableOpacity>

                  <View style={styles.positionRow}>
                    <TouchableOpacity
                      style={[
                        styles.positionBtn,
                        { backgroundColor: '#06B6D4' },
                      ]}
                      onPress={() => selectNewBatter(item, 'striker')}
                    >
                      <Text style={styles.positionText}>Striker</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.positionBtn,
                        { backgroundColor: '#8B5CF6' },
                      ]}
                      onPress={() => selectNewBatter(item, 'nonStriker')}
                    >
                      <Text style={styles.positionText}>Non-Striker</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
          </ScrollView>
        </View>
      </Modal>

      {/* ===================================================== */}
      {/* 😎 BOWLER MODAL */}
      {/* ===================================================== */}

      <Modal visible={showBowlerModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Select New Bowler 😎</Text>

            {bowlingPlayers
              .filter((item: any) => item._id !== inning?.bowler?._id)
              .map((item: any) => (
                <TouchableOpacity
                  key={item._id}
                  activeOpacity={0.8}
                  style={styles.playerBtn}
                  onPress={() => selectNewBowler(item)}
                >
                  <Text style={styles.playerName}>{item.name}</Text>
                  <Text style={styles.playerInfo}>
                    {item.bowlerType} {item.bowlingStyle}
                  </Text>
                </TouchableOpacity>
              ))}
          </View>
        </View>
      </Modal>

      <Modal visible={showOverHistoryModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Over History 😎🔥</Text>

            <ScrollView showsVerticalScrollIndicator={false}>
              {inning?.overHistory?.length > 0 ? (
                inning.overHistory.map((over: any, index: number) => (
                  <View
                    key={index}
                    style={{
                      marginBottom: 16,
                      padding: 14,
                      borderRadius: 16,
                      backgroundColor: '#111827',
                    }}
                  >
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 10,
                      }}
                    >
                      <Text
                        style={{
                          color: COLORS.primary,
                          fontWeight: 'bold',
                          fontSize: 16,
                        }}
                      >
                        Over {over.overNumber}
                      </Text>

                      <Text
                        style={{
                          color: COLORS.subText,
                          fontSize: 13,
                        }}
                      >
                        {over.bowlerName}
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                      }}
                    >
                      {over?.balls?.map((ball: any, i: number) => (
                        <View
                          key={i}
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: 20,
                            backgroundColor: COLORS.primary,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginRight: 8,
                            marginBottom: 8,
                          }}
                        >
                          <Text
                            style={{
                              color: '#000',
                              fontWeight: 'bold',
                            }}
                          >
                            {ball}
                          </Text>
                        </View>
                      ))}
                    </View>

                    <View
                      style={{
                        marginTop: 8,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Text style={{ color: COLORS.text }}>
                        Runs: {over.runsThisOver}
                      </Text>

                      <Text style={{ color: COLORS.text }}>
                        Score: {over.totalRuns}/{over.totalWickets}
                      </Text>
                    </View>
                  </View>
                ))
              ) : (
                <Text style={{ color: COLORS.subText }}>
                  No over history yet 😎
                </Text>
              )}
            </ScrollView>

            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                marginTop: 20,
                backgroundColor: COLORS.primary,
                paddingVertical: 14,
                borderRadius: 16,
                alignItems: 'center',
              }}
              onPress={() => setShowOverHistoryModal(false)}
            >
              <Text
                style={{
                  color: '#000',
                  fontWeight: 'bold',
                  fontSize: 16,
                }}
              >
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default InningScreen2;

// =====================================================
// 😎 STYLES
// =====================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingHorizontal: 16,

    paddingTop: (StatusBar.currentHeight || 0) + 10,

    backgroundColor: COLORS.background,
  },

  loader: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: COLORS.background,
  },

  glow1: {
    position: 'absolute',

    width: 280,
    height: 280,

    borderRadius: 200,

    backgroundColor: '#22D3EE22',

    top: -80,
    right: -100,
  },

  glow2: {
    position: 'absolute',

    width: 220,
    height: 220,

    borderRadius: 200,

    backgroundColor: '#06B6D422',

    bottom: 100,
    left: -80,
  },

  modalOverlay: {
    flex: 1,

    backgroundColor: 'rgba(0,0,0,0.7)',

    justifyContent: 'flex-end',
  },

  modalContainer: {
    backgroundColor: COLORS.card,

    padding: 20,

    maxHeight: '85%',

    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
  },

  modalTitle: {
    color: COLORS.text,

    fontSize: 24,

    fontWeight: 'bold',

    marginBottom: 20,
  },

  playerBtn: {
    backgroundColor: '#111827',

    padding: 16,

    borderRadius: 18,

    marginBottom: 12,
  },

  playerName: {
    color: COLORS.text,

    fontSize: 18,

    fontWeight: '700',
  },

  playerInfo: {
    color: COLORS.subText,

    marginTop: 6,

    fontSize: 13,
  },

  positionRow: {
    flexDirection: 'row',

    gap: 10,

    marginTop: 8,
  },

  positionBtn: {
    flex: 1,

    paddingVertical: 12,

    borderRadius: 14,

    alignItems: 'center',
  },

  positionText: {
    color: '#fff',

    fontWeight: '700',
  },

  finishBtn: {
    backgroundColor: COLORS.primary,

    marginHorizontal: 16,

    marginTop: 20,

    borderRadius: 20,

    padding: 18,

    alignItems: 'center',
  },

  finishText: {
    color: '#000',

    fontWeight: 'bold',

    fontSize: 18,
  },
});
