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
  swapStrike,
  formatOvers,
  updateStrikeRate,
  updateEconomy,
  updateMatchStats,
  InningState,
  PlayerStats,
} from '../../utils/matchEngine';

// =====================================================
// 😎 TYPES
// =====================================================

const INITIAL_STATE: InningState = {
  totalRuns: 0,
  wickets: 0,

  oversPlayed: '0.0',
  legalBalls: 0,

  currentRunRate: 0,
  projectedScore: 0,

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

  const [showBatterModal, setShowBatterModal] = useState(false);

  const [showWicketModal, setShowWicketModal] = useState(false);

  const [showOverHistoryModal, setShowOverHistoryModal] = useState(false);

  const [activeTab, setActiveTab] = useState<'bowling' | 'batting'>('bowling');

  const [playerStatsMap, setPlayerStatsMap] = useState<any>({});

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

  const isLastManStanding = outPlayers.length >= TEAM_SIZE - 2;

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

    setInning({
      ...INITIAL_STATE,

      battingTeam: inningSetup?.battingTeam,

      usedBatters: [inningSetup?.striker?._id, inningSetup?.nonStriker?._id],

      striker: strikerData,

      nonStriker: nonStrikerData,

      bowler: {
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
      },
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

      const updated = handleBallEvent(prev, type, TOTAL_OVERS, wicketData);

      // 😎 WICKET FLOW
      if (type === 'WKT') {
        const outId =
          wicketData?.outPlayer === 'nonStriker'
            ? prev.nonStriker?._id
            : prev.striker?._id;

        // if (outId && !outPlayers.includes(outId)) {
        //   setOutPlayers(old => [...old, outId]);
        // }

        updated.partnership = {
          runs: 0,
          balls: 0,
        };

        const remainingPlayers = TEAM_SIZE - (outPlayers.length + 1);

        if (remainingPlayers > 1) {
          setTimeout(() => {
            setShowBatterModal(true);
          }, 300);
        }
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

  // =====================================================
  // 😎 REDO
  // =====================================================


  const handleRedo = () => {
  setInning(prev => {
    const restored = redoBall(prev);

    return restored;
  });
};

  // =====================================================
  // 😎 NEW BATTER
  // =====================================================

  const selectNewBatter = (
    player: any,
    battingPosition: 'striker' | 'nonStriker',
  ) => {
    setInning(prev => {
      // 😎 EXISTING PLAYER STATS CHECK
      const existingPlayer = playerStatsMap[player._id];

      // 😎 IF PLAYER ALREADY PLAYED BEFORE
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
    setInning(prev => ({
      ...prev,

      bowler: {
        _id: player._id,

        name: player.name,

        bowlingStyle: `${player.bowlerType || ''} ${player.bowlingStyle || ''}`,

        overs: '0.0',

        balls: 0,

        runsGiven: 0,
        wickets: 0,

        economy: 0,
        dotBalls: 0,
      },
    }));

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

        {/* 😎 HEADER */}
        <ScoreHeader inning={inning} totalOvers={TOTAL_OVERS} />

        {/* 😎 BATTERS */}
        {!!inning?.striker && !!inning?.nonStriker && (
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
              navigation.navigate('InningScreen2', {
                firstInningData: inning,
                matchData,
                inningSetup,
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

                          const newPlayer = existingPlayer || {
                            _id: item._id,

                            name: item.name,

                            battingStyle: item.batsmanType,

                            runs: 0,
                            balls: 0,

                            fours: 0,
                            sixes: 0,

                            strikeRate: 0,

                            isStriker: restPlayer?.isStriker,
                          };

                          return {
                            ...prev,

                            partnership: {
                              runs: 0,
                              balls: 0,
                            },

                            striker: restPlayer?.isStriker
                              ? newPlayer
                              : prev.striker,

                            nonStriker: !restPlayer?.isStriker
                              ? newPlayer
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

      <Modal visible={showBatterModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <ScrollView
            style={styles.modalContainer}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.modalTitle}>Select New Batter 😎</Text>

            {battingPlayers
              .filter((item: any) => {
                const isOut = outPlayers.includes(item._id);

                const alreadyPlaying =
                  item._id === inning?.striker?._id ||
                  item._id === inning?.nonStriker?._id;

                return !isOut && !alreadyPlaying;
              })
              .map((item: any) => (
                <View
                  key={item._id}
                  style={{
                    marginBottom: 14,
                  }}
                >
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.playerBtn}
                  >
                    <Text style={styles.playerName}>{item.name}</Text>

                    <Text style={styles.playerInfo}>{item.batsmanType}</Text>
                  </TouchableOpacity>

                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 10,
                      marginTop: 8,
                    }}
                  >
                    <TouchableOpacity
                      style={[
                        styles.positionBtn,
                        {
                          backgroundColor: '#06B6D4',
                        },
                      ]}
                      onPress={() => selectNewBatter(item, 'striker')}
                    >
                      <Text style={styles.positionBtnText}>
                        Play as Striker
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.positionBtn,
                        {
                          backgroundColor: '#8B5CF6',
                        },
                      ]}
                      onPress={() => selectNewBatter(item, 'nonStriker')}
                    >
                      <Text style={styles.positionBtnText}>
                        Play as Non-Striker
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
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
          <View
            style={[
              styles.modalContainer,
              {
                maxHeight: '88%',
              },
            ]}
          >
            {/* 😎 HEADER */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 20,
              }}
            >
              <Text style={styles.modalTitle}>Over By Over 😎</Text>

              <TouchableOpacity onPress={() => setShowOverHistoryModal(false)}>
                <Text
                  style={{
                    color: COLORS.primary,
                    fontWeight: '700',
                  }}
                >
                  Close
                </Text>
              </TouchableOpacity>
            </View>

            {/* 😎 TABS */}
            <View
              style={{
                flexDirection: 'row',
                marginBottom: 20,
                gap: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => setActiveTab('bowling')}
                style={{
                  flex: 1,
                  padding: 14,
                  borderRadius: 14,
                  backgroundColor:
                    activeTab === 'bowling' ? COLORS.primary : '#111827',
                }}
              >
                <Text
                  style={{
                    textAlign: 'center',
                    fontWeight: '700',
                    color: activeTab === 'bowling' ? '#000' : COLORS.text,
                  }}
                >
                  Bowling
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setActiveTab('batting')}
                style={{
                  flex: 1,
                  padding: 14,
                  borderRadius: 14,
                  backgroundColor:
                    activeTab === 'batting' ? COLORS.primary : '#111827',
                }}
              >
                <Text
                  style={{
                    textAlign: 'center',
                    fontWeight: '700',
                    color: activeTab === 'batting' ? '#000' : COLORS.text,
                  }}
                >
                  Batting
                </Text>
              </TouchableOpacity>
            </View>

            {/* 😎 CONTENT */}
            <ScrollView showsVerticalScrollIndicator={false}>
              {inning.overHistory
                ?.slice()
                .reverse()
                .map((over: any, index: number) => (
                  <View
                    key={index}
                    style={{
                      backgroundColor: '#111827',
                      borderRadius: 18,
                      padding: 16,
                      marginBottom: 14,
                    }}
                  >
                    {/* 😎 BOWLING TAB */}
                    {activeTab === 'bowling' ? (
                      <>
                        <Text
                          style={{
                            color: COLORS.primary,
                            fontWeight: '700',
                            fontSize: 17,
                          }}
                        >
                          Over {over.overNumber}
                        </Text>

                        <Text
                          style={{
                            color: COLORS.subText,
                            marginTop: 4,
                            marginBottom: 14,
                          }}
                        >
                          {over.bowlerName}
                        </Text>

                        <View
                          style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                          }}
                        >
                          {over.balls.map((ball: string, i: number) => (
                            <View
                              key={i}
                              style={{
                                width: 38,
                                height: 38,
                                borderRadius: 19,
                                backgroundColor: COLORS.primary,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginRight: 8,
                                marginBottom: 8,
                              }}
                            >
                              <Text
                                style={{
                                  fontWeight: '700',
                                  color: '#000',
                                }}
                              >
                                {ball}
                              </Text>
                            </View>
                          ))}
                        </View>

                        <View
                          style={{
                            marginTop: 12,
                          }}
                        >
                          <Text
                            style={{
                              color: COLORS.text,
                              marginBottom: 4,
                            }}
                          >
                            This Over: {over.runsThisOver}
                          </Text>

                          <Text
                            style={{
                              color: COLORS.text,
                            }}
                          >
                            Total: {over.totalRuns}/{over.totalWickets}
                          </Text>
                        </View>
                      </>
                    ) : (
                      <>
                        {/* 😎 BATTING TAB */}

                        <Text
                          style={{
                            color: COLORS.primary,
                            fontWeight: '700',
                            fontSize: 17,
                            marginBottom: 14,
                          }}
                        >
                          Over {over.overNumber}
                        </Text>

                        <Text
                          style={{
                            color: COLORS.text,
                            marginBottom: 8,
                          }}
                        >
                          {over.striker.name} • {over.striker.runs}(
                          {over.striker.balls})
                        </Text>

                        <Text
                          style={{
                            color: COLORS.text,
                          }}
                        >
                          {over.nonStriker.name} • {over.nonStriker.runs}(
                          {over.nonStriker.balls})
                        </Text>

                        <Text
                          style={{
                            color: COLORS.primary,
                            marginTop: 12,
                            fontWeight: '700',
                          }}
                        >
                          RR: {over.runRate}
                        </Text>
                      </>
                    )}
                  </View>
                ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default InningScreen;

// =====================================================
// 😎 STYLES
// =====================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingHorizontal: 16,

    paddingTop: (StatusBar.currentHeight || 0) + 2,

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
