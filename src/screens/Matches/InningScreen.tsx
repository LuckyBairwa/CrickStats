// src/screens/Matches/InningScreen.tsx 😎🔥

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

import { useRoute, useNavigation } from '@react-navigation/native';

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

// 😎 TYPES

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

const InningScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();

  const { matchData, inningSetup } = route.params || {};

  // =====================================================
  // 😎 STATES
  // =====================================================

  const [loading, setLoading] = useState(true);

  const [inningEnded, setInningEnded] = useState(false);

  const [inning, setInning] = useState<InningState>(INITIAL_STATE);

  const [restPlayer, setRestPlayer] = useState<any>(null);

  const [showRestModal, setShowRestModal] = useState(false);

  const [showBowlerModal, setShowBowlerModal] = useState(false);

  // States mein add karo
  const [isRunOutFlow, setIsRunOutFlow] = useState(false);

  const [showBatterModal, setShowBatterModal] = useState(false);

  const [showWicketModal, setShowWicketModal] = useState(false);

  const [autoPosition, setAutoPosition] = useState<
    'striker' | 'nonStriker' | null
  >(null);
  const [showSurvivorModal, setShowSurvivorModal] = useState(false);
  const [survivorData, setSurvivorData] = useState<{
    survivingPlayer: any;
    newBatterPosition: 'striker' | 'nonStriker';
  } | null>(null);

  const [showOverHistoryModal, setShowOverHistoryModal] = useState(false);

  const [activeTab, setActiveTab] = useState<'bowling' | 'batting'>('bowling');

  const [playerStatsMap, setPlayerStatsMap] = useState<any>({});

  const [bowlerStatsMap, setBowlerStatsMap] = useState<any>({});

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
  // 😎 OVERS
  // =====================================================

  const TOTAL_OVERS = matchData?.overs || 0;
  const TEAM_SIZE = battingPlayers.length;

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

  // =====================================================
  // 😎 INIT MATCH
  // =====================================================

  useEffect(() => {
    if (!inningSetup) {
      Alert.alert('Error 😭', 'Inning setup data missing');

      return;
    }

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

      battingTeam: inningSetup?.battingTeam,

      usedBatters: [inningSetup?.striker?._id, inningSetup?.nonStriker?._id],

      striker: strikerData,

      nonStriker: nonStrikerData,

      bowler: initialBowler,
    });

    setLoading(false);
  }, [inningSetup]);

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

    switch (type) {
      case 'REST':
        setShowRestModal(true);
        return;

      case 'END':
        setInningEnded(true);

        Alert.alert('Innings Ended 😎', 'You ended the innings manually.');

        return;

      case 'WKT':
        setShowWicketModal(true);
        return;

      default:
        processBall(type);
    }
  };

  // =====================================================
  // 😎 PROCESS BALL
  // =====================================================

  const processBall = (type: string, wicketData?: any) => {
    setInning(prev => {
      const prevBalls = prev.legalBalls;

      const updated = handleBallEvent(prev, type, TOTAL_OVERS, {
        ...wicketData,
        totalPlayers: TEAM_SIZE,
      });

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
          // 😎 MARK PLAYER OUT
          setPlayerStatsMap((prevMap: any) => ({
            ...prevMap,

            [outPlayerId]: {
              ...prevMap[outPlayerId],

              status: 'Out',
            },
          }));
        }

        updated.partnership = {
          runs: 0,
          balls: 0,
        };

        const allOut = updated.wickets >= TEAM_SIZE;

        if (allOut) {
          setTimeout(() => {
            setInningEnded(true);
            Alert.alert('All Out! ', 'All players are out!');
          }, 300);
        } else if (updated.wickets >= TEAM_SIZE - 1) {
          setShowBatterModal(false);
          setAutoPosition(null);
          setSurvivorData(null);
          setIsRunOutFlow(false);
        } else if (isRunOut) {
          setIsRunOutFlow(true);
          if (runsCompleted > 0 && prev.striker) {
            updated.striker = {
              ...updated.striker!,
              runs: (updated.striker?.runs || 0) + runsCompleted,
              balls: updated.striker?.balls || 0,
            };
          }

          const survivingPlayer =
            outPlayer === 'striker'
              ? { ...prev.nonStriker! }
              : { ...prev.striker! };

          updated.striker = null;
          updated.nonStriker = null;

          setSurvivorData({
            survivingPlayer,
            newBatterPosition: 'striker',
          });
          setAutoPosition(null);
          setTimeout(() => setShowBatterModal(true), 300);
        } else {
          setSurvivorData(null);
          setIsRunOutFlow(false);
          setAutoPosition('striker');
          setTimeout(() => setShowBatterModal(true), 300);
        }
      } else {
        setSurvivorData(null);
        setIsRunOutFlow(false);
        setAutoPosition('striker');
      }

      // 😎 OVER COMPLETE
      const overCompleted =
        updated.legalBalls > prevBalls && updated.legalBalls % 6 === 0;

      if (overCompleted && updated.legalBalls < TOTAL_OVERS * 6) {
        setTimeout(() => {
          setShowBowlerModal(true);
        }, 300);
      }

      // 😎 INNING COMPLETE
      if (updated.legalBalls >= TOTAL_OVERS * 6) {
        setTimeout(() => {
          setInningEnded(true);

          Alert.alert('Innings Complete 😎', `${TOTAL_OVERS} overs completed`);
        }, 300);
      }

      return updated;
    });
  };

  // =====================================================
  // 😎 UNDO
  // =====================================================

  const handleUndo = () => {
    setInning(prev => {
      const restored = undoBall(prev);

      return restored;
    });

    setInningEnded(false);
  };

  // 😎 REDO

  const handleRedo = () => {
    setInning(prev => {
      const restored = redoBall(prev);

      return restored;
    });
  };

  // 😎 NEW BATTER

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

      const newStriker =
        battingPosition === 'striker'
          ? { ...newBatter, isStriker: true }
          : prev.striker
          ? { ...prev.striker, isStriker: true }
          : null;

      const newNonStriker =
        battingPosition === 'nonStriker'
          ? { ...newBatter, isStriker: false }
          : prev.nonStriker
          ? { ...prev.nonStriker, isStriker: false }
          : null;

      return {
        ...prev,
        usedBatters: [...new Set([...prev.usedBatters, player._id])],

        striker: newStriker,
        nonStriker: newNonStriker,
      };
    });

    setAutoPosition(null);
    setSurvivorData(null);
    setShowBatterModal(false);
    setIsRunOutFlow(false);
  };

  // 😎 NEW BOWLER

  const selectNewBowler = (player: any) => {
    setInning(prev => {
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

  // 😎 LOADING

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  // 😎 UI

  return (
    <>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Animated.View style={[styles.glow1, glowStyle]} />

        <Animated.View style={[styles.glow2, glowStyle]} />

        {/* 😎 HEADER */}
        <ScoreHeader inning={inning} totalOvers={TOTAL_OVERS} />

        {/* 😎 BATTERS */}
        {(inning?.striker || inning?.nonStriker) && (
          <BatterTable
            striker={inning.striker ?? null}
            nonStriker={inning.nonStriker ?? null}
          />
        )}

        {/* 😎 BOWLER */}
        {!!inning?.bowler && <BowlerCard bowler={inning.bowler} />}

        {/* 😎 PARTNERSHIP */}
        <PartnershipCard partnership={inning.partnership} />

        {/* 😎 THIS OVER */}
        <ThisOver
          balls={inning.thisOver}
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

        {/* 😎 NEXT INNING */}
        {inningEnded && (
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.nextBtn}
            onPress={() => {
              navigation.navigate('PreInningSetup', {
                matchData,

                inningNumber: 2,

                firstInningData: {
                  ...inning,
                  playerStatsMap,
                  bowlerStatsMap,
                },
              });
            }}
          >
            <Text style={styles.nextBtnText}>Start Next Inning </Text>
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
            contentContainerStyle={{
              paddingBottom: 40,
            }}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.modalTitle}>Select Player For Rest 😎</Text>

            {[inning?.striker, inning?.nonStriker].map((player: any) => {
              if (!player) {
                return null;
              }

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
                  style={[
                    styles.modalTitle,
                    {
                      fontSize: 18,
                      marginTop: 10,
                    },
                  ]}
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
                        setInning(prev => {
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
      {/* 😎 NEW BATTER MODAL */}
      {/* ===================================================== */}

      {/* <Modal visible={showBatterModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <ScrollView
            style={styles.modalContainer}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.modalTitle}>Select New Batter</Text>

             
            {autoPosition === null ? (
              <>
                <Text
                  style={[
                    styles.playerInfo,
                    {
                      marginBottom: 16,
                      fontSize: 14,
                      color: COLORS.subText,
                    },
                  ]}
                >
                  Surviving player ki position confirm karo:
                </Text>

                <View
                  style={{ flexDirection: 'row', gap: 10, marginBottom: 20 }}
                >
                  
                  {inning?.striker && (
                    <TouchableOpacity
                      style={[
                        styles.positionBtn,
                        { backgroundColor: '#06B6D4' },
                      ]}
                      onPress={() => setAutoPosition('nonStriker')}
                    >
                      <Text style={styles.positionBtnText}>
                        {inning.striker.name}
                        {'\n'}
                        <Text style={{ fontSize: 11 }}>Striker rahega</Text>
                      </Text>
                    </TouchableOpacity>
                  )}

                  
                  {inning?.nonStriker && (
                    <TouchableOpacity
                      style={[
                        styles.positionBtn,
                        { backgroundColor: '#8B5CF6' },
                      ]}
                      onPress={() => setAutoPosition('striker')}
                    >
                      <Text style={styles.positionBtnText}>
                        {inning.nonStriker.name}
                        {'\n'}
                        <Text style={{ fontSize: 11 }}>Non-Striker rahega</Text>
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </>
            ) : (
            
              <>
                <View
                  style={{
                    backgroundColor: '#0F172A',
                    borderRadius: 14,
                    padding: 12,
                    marginBottom: 16,
                    borderWidth: 1,
                    borderColor: COLORS.primary,
                  }}
                >
                  <Text
                    style={{
                      color: COLORS.primary,
                      fontWeight: 'bold',
                      fontSize: 13,
                    }}
                  >
                    📍 New batter will be{' '}
                    {autoPosition === 'striker' ? 'Striker ⭐' : 'Non-Striker'}
                  </Text>
                </View>

                {battingPlayers
                  .filter((item: any) => {
                    const playerStats = playerStatsMap[item._id];
                    const isOut = playerStats?.status === 'Out';
                    const alreadyPlaying =
                      (inning?.striker?._id &&
                        item._id === inning.striker._id) ||
                      (inning?.nonStriker?._id &&
                        item._id === inning.nonStriker._id);
                    const lastOutPlayerId = inning?.lastWicket?.outPlayerId;
                    const isLastOut = item._id === lastOutPlayerId;
                    return !isOut && !alreadyPlaying && !isLastOut;
                  })
                  .map((item: any) => (
                    <TouchableOpacity
                      key={item._id}
                      activeOpacity={0.8}
                      style={styles.playerBtn}
                      onPress={() => selectNewBatter(item, autoPosition)}
                    >
                      <Text style={styles.playerName}>{item.name}</Text>
                      <Text style={styles.playerInfo}>{item.batsmanType}</Text>
                    </TouchableOpacity>
                  ))}
              </>
            )}
          </ScrollView>
        </View>
      </Modal> */}

      <Modal visible={showBatterModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <ScrollView
            style={styles.modalContainer}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.modalTitle}>Select New Batter 😎</Text>

            {/* =====================================================
          😎 STEP 1: Surviving player ki position choose karo
          survivorData set hai aur autoPosition null hai
      ===================================================== */}
            {survivorData !== null && autoPosition === null ? (
              <>
                <Text
                  style={[
                    styles.playerInfo,
                    { marginBottom: 20, fontSize: 15 },
                  ]}
                >
                  <Text style={{ color: COLORS.text, fontWeight: 'bold' }}>
                    {survivorData.survivingPlayer.name}
                  </Text>{' '}
                  ki position choose karo:
                </Text>

                {/* Striker button */}
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{
                    backgroundColor: '#06B6D4',
                    padding: 20,
                    borderRadius: 18,
                    alignItems: 'center',
                    marginBottom: 12,
                  }}
                  onPress={() => {
                    setInning((prev: any) => ({
                      ...prev,
                      striker: {
                        ...survivorData.survivingPlayer,
                        isStriker: true,
                      },
                      nonStriker: null,
                    }));
                    setSurvivorData(null);
                    setAutoPosition('nonStriker');
                  }}
                >
                  <Text
                    style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}
                  >
                    ⭐ Striker
                  </Text>
                  <Text
                    style={{
                      color: 'rgba(255,255,255,0.7)',
                      fontSize: 13,
                      marginTop: 4,
                    }}
                  >
                    New batter → Non-Striker
                  </Text>
                </TouchableOpacity>

                {/* NonStriker button */}
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{
                    backgroundColor: '#8B5CF6',
                    padding: 20,
                    borderRadius: 18,
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    // Surviving player → NonStriker
                    // New batter → Striker (auto)
                    setInning((prev: any) => ({
                      ...prev,
                      striker: null,
                      nonStriker: {
                        ...survivorData.survivingPlayer,
                        isStriker: false,
                      },
                    }));
                    setSurvivorData(null);
                    setAutoPosition('striker');
                  }}
                >
                  <Text
                    style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}
                  >
                    Non-Striker
                  </Text>
                  <Text
                    style={{
                      color: 'rgba(255,255,255,0.7)',
                      fontSize: 13,
                      marginTop: 4,
                    }}
                  >
                    New batter → Striker ⭐
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              /* =====================================================
           😎 STEP 2: autoPosition set — new batter list
        ===================================================== */
              <>
                {/* Context box */}
                {isRunOutFlow &&
                  survivorData === null &&
                  autoPosition !== null && (
                    <View
                      style={{
                        backgroundColor: '#0F172A',
                        borderRadius: 14,
                        padding: 12,
                        marginBottom: 16,
                        borderWidth: 1,
                        borderColor: COLORS.primary,
                      }}
                    >
                      <Text
                        style={{
                          color: COLORS.primary,
                          fontWeight: 'bold',
                          fontSize: 13,
                        }}
                      >
                        📍 New batter →{' '}
                        {autoPosition === 'striker'
                          ? 'Striker ⭐'
                          : 'Non-Striker'}
                      </Text>
                    </View>
                  )}

                {battingPlayers
                  .filter((item: any) => {
                    const playerStats = playerStatsMap[item._id];
                    const isOut = playerStats?.status === 'Out';
                    const alreadyPlaying =
                      (inning?.striker?._id &&
                        item._id === inning.striker._id) ||
                      (inning?.nonStriker?._id &&
                        item._id === inning.nonStriker._id);
                    return !isOut && !alreadyPlaying;
                  })
                  .map((item: any) => (
                    <TouchableOpacity
                      key={item._id}
                      activeOpacity={0.8}
                      style={styles.playerBtn}
                      onPress={() => selectNewBatter(item, autoPosition!)}
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
      {/* 😎 NEW BOWLER MODAL */}
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

      {/* ===================================================== */}
      {/* 😎 OVER HISTORY MODAL */}
      {/* ===================================================== */}

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

export default InningScreen;

// 😎 STYLES

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

  nextBtn: {
    backgroundColor: COLORS.primary,

    marginHorizontal: 16,

    marginTop: 20,

    borderRadius: 20,

    padding: 18,

    alignItems: 'center',
  },

  nextBtnText: {
    color: '#000',

    fontWeight: 'bold',

    fontSize: 18,
  },

  positionBtn: {
    flex: 1,

    paddingVertical: 12,

    borderRadius: 14,

    alignItems: 'center',
  },

  positionBtnText: {
    color: '#fff',

    fontWeight: '700',
  },
});
