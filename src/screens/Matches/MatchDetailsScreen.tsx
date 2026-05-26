import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
  ActivityIndicator,
} from 'react-native';

import { useRoute, useNavigation } from '@react-navigation/native';

import COLORS from '../../constants/colors';

import { deleteMatch } from '../../api/matchApi';

const MatchDetailsScreen: React.FC = () => {
  const route = useRoute<any>();

  const navigation = useNavigation<any>();

  const [deleting, setDeleting] = useState(false);

  const { match } = route.params;

  const theme = COLORS;

  const [selectedTeam, setSelectedTeam] = useState<'A' | 'B'>('A');

  const [selectedStats, setSelectedStats] = useState('Batting');

  const innings1 = match?.innings1;
  const innings2 = match?.innings2;

  const battingStats: any[] =
    selectedTeam === 'A' ? innings1?.batters || [] : innings2?.batters || [];

  const bowlingStats: any[] =
    selectedTeam === 'A' ? innings2?.bowlers || [] : innings1?.bowlers || [];

  const playerNameMap: Record<string, string> = {};

  const allPlayers = [
    ...(match?.teamA?.players || []),
    ...(match?.teamB?.players || []),
  ];

  allPlayers.forEach((p: any) => {
    if (typeof p === 'object' && p?._id) {
      playerNameMap[p._id] = p.name || p._id;
    }
  });

  const captainA = match?.teamA?.captain;
  const captainB = match?.teamB?.captain;
  if (typeof captainA === 'object' && captainA?._id) {
    playerNameMap[captainA._id] = captainA.name || captainA._id;
  }
  if (typeof captainB === 'object' && captainB?._id) {
    playerNameMap[captainB._id] = captainB.name || captainB._id;
  }

  const getPlayerName = (playerId: string): string => {
    return playerNameMap[playerId] || `Player (${playerId?.slice(-4)})`;
  };

  const handleDeleteMatch = async () => {
    Alert.alert(
      'Delete Match 😭',
      'Kya aap sach me ye match delete karna chahte ho?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              setDeleting(true);

              await deleteMatch(match?._id);

              Alert.alert('Success 😎', 'Match Deleted Successfully');

              navigation.goBack();
            } catch (error) {
              console.log(error);

              Alert.alert('Error 😭', 'Match delete nahi hua');
            } finally {
              setDeleting(false);
            }
          },
        },
      ],
    );
  };

  return (
    <ScrollView
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
        },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      {/* 😎 Match Summary */}
      <View
        style={[
          styles.summaryCard,
          {
            backgroundColor: theme.card,
            borderColor: theme.border,
          },
        ]}
      >
        <Text
          style={[
            styles.teams,
            {
              color: theme.text,
            },
          ]}
        >
          {match?.teamA?.name || 'Team A'} vs {match?.teamB?.name || 'Team B'}
        </Text>

        <Text
          style={[
            styles.info,
            {
              color: theme.subText,
            },
          ]}
        >
          🏏 Total Overs: {match?.overs || 0}
        </Text>

        <Text
          style={[
            styles.info,
            {
              color: theme.subText,
            },
          ]}
        >
          🪙 Toss Winner: {match?.tossWinner || 'N/A'}
        </Text>

        <Text
          style={[
            styles.info,
            {
              color: theme.subText,
            },
          ]}
        >
          🎯 Decision: {match?.tossDecision || 'N/A'}
        </Text>
      </View>

      {/* 😎 Score Section */}
      <View style={styles.scoreContainer}>
        <View
          style={[
            styles.scoreBox,
            {
              backgroundColor: theme.card,
            },
          ]}
        >
          <Text
            style={[
              styles.teamName,
              {
                color: theme.text,
              },
            ]}
          >
            {match?.innings1?.battingTeam?.name || 'Team A'}
          </Text>

          <Text
            style={[
              styles.score,
              {
                color: theme.primary,
              },
            ]}
          >
            {match?.innings1?.totalRuns || 0}/{match?.innings1?.wickets || 0}
          </Text>

          <Text
            style={[
              styles.oversPlayed,
              {
                color: theme.subText,
              },
            ]}
          >
            ({match?.innings1?.oversPlayed || 0} Overs)
          </Text>
        </View>

        <View
          style={[
            styles.scoreBox,
            {
              backgroundColor: theme.card,
            },
          ]}
        >
          <Text
            style={[
              styles.teamName,
              {
                color: theme.text,
              },
            ]}
          >
            {match?.innings2?.battingTeam?.name || 'Team B'}
          </Text>

          <Text
            style={[
              styles.score,
              {
                color: theme.primary,
              },
            ]}
          >
            {match?.innings2?.totalRuns || 0}/{match?.innings2?.wickets || 0}
          </Text>

          <Text
            style={[
              styles.oversPlayed,
              {
                color: theme.subText,
              },
            ]}
          >
            ({match?.innings2?.oversPlayed || 0} Overs)
          </Text>
        </View>
      </View>

      {/* 😎 Delete Match Button */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handleDeleteMatch}
        disabled={deleting}
        style={styles.deleteButton}
      >
        {deleting ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.deleteButtonText}>🗑️ Delete Match</Text>
        )}
      </TouchableOpacity>

      {/* 😎 Winner */}
      <View
        style={[
          styles.winnerCard,
          {
            backgroundColor: '#052E16',
          },
        ]}
      >
        <Text style={styles.winnerText}>
          🏆 Winner: {match?.winner?.name || 'N/A'}
        </Text>

        <Text style={styles.resultText}>
          {match?.result || 'Result Pending'}
        </Text>
      </View>

      {/* 😎 Team Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTeam === 'A' && styles.activeTab]}
          onPress={() => setSelectedTeam('A')}
        >
          <Text style={styles.tabText}>
            {innings1?.battingTeam?.name || 'Team 1'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, selectedTeam === 'B' && styles.activeTab]}
          onPress={() => setSelectedTeam('B')}
        >
          <Text style={styles.tabText}>
            {innings2?.battingTeam?.name || 'Team 2'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* 😎 Batting/Bowling Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedStats === 'Batting' && styles.activeTab]}
          onPress={() => setSelectedStats('Batting')}
        >
          <Text style={styles.tabText}>Batting</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, selectedStats === 'Bowling' && styles.activeTab]}
          onPress={() => setSelectedStats('Bowling')}
        >
          <Text style={styles.tabText}>Bowling</Text>
        </TouchableOpacity>
      </View>

      {/* 😎 TABLE */}
      <View
        style={[
          styles.table,
          {
            backgroundColor: theme.card,
          },
        ]}
      >
        {selectedStats === 'Batting' ? (
          <>
            {/* Header */}
            <View style={styles.tableHeader}>
              <Text
                style={[
                  styles.headerText,
                  { flex: 2, textAlign: 'left', paddingLeft: 12 },
                ]}
              >
                Batter
              </Text>

              <Text style={styles.headerText}>R</Text>

              <Text style={styles.headerText}>B</Text>

              <Text style={styles.headerText}>4s</Text>

              <Text style={styles.headerText}>6s</Text>

              <Text style={styles.headerText}>SR</Text>
            </View>

            {(battingStats as any[]).map((player: any, index: number) => (
              <View key={player?._id || index} style={styles.tableRow}>
                <View style={{ flex: 2, paddingLeft: 4 }}>
                  <Text
                    style={[
                      styles.playerName,
                      {
                        color: theme.text,
                      },
                    ]}
                  >
                    {
                      typeof player?.player === 'object'
                        ? player?.player?.name
                        : getPlayerName(player?.player) // fallback agar kabhi string aa jaaye
                    }
                  </Text>

                  <Text
                    style={[
                      styles.status,
                      {
                        color: theme.subText,
                      },
                    ]}
                  >
                    {/* {player?.isOut ? 'out' : 'not out'} */}
                    {player?.status === 'Not Out'
                      ? 'not out'
                      : player?.status?.toLowerCase() || 'not out'}
                  </Text>
                </View>

                <Text style={styles.cell}>{player?.runs || 0}</Text>

                <Text style={styles.cell}>{player?.balls || 0}</Text>

                <Text style={styles.cell}>{player?.fours || 0}</Text>

                <Text style={styles.cell}>{player?.sixes || 0}</Text>

                <Text style={styles.cell}>
                  {player?.strikeRate
                    ? Number(player.strikeRate).toFixed(1)
                    : '0.0'}
                </Text>
              </View>
            ))}
            {battingStats.length === 0 && (
              <Text style={styles.emptyText}>No batting data 😎</Text>
            )}
          </>
        ) : (
          <>
            {/* Bowling Header */}
            <View style={styles.tableHeader}>
              <Text
                style={[
                  styles.headerText,
                  { flex: 2, textAlign: 'left', paddingLeft: 12 },
                ]}
              >
                Bowler
              </Text>

              <Text style={styles.headerText}>O</Text>

              <Text style={styles.headerText}>R</Text>

              <Text style={styles.headerText}>W</Text>

              <Text style={styles.headerText}>Eco</Text>
            </View>

            {(bowlingStats as any[]).map((player: any, index: number) => (
              <View key={player?._id || index} style={styles.tableRow}>
                <Text
                  style={[
                    styles.cell,
                    { flex: 2, textAlign: 'left', paddingLeft: 4 },
                  ]}
                >
                  {
                    typeof player?.player === 'object'
                      ? player?.player?.name
                      : getPlayerName(player?.player) // fallback agar kabhi string aa jaaye
                  }
                </Text>

                <Text style={styles.cell}>{player?.overs || 0}</Text>

                <Text style={styles.cell}>{player?.runsGiven || 0}</Text>

                <Text style={styles.cell}>{player?.wickets || 0}</Text>

                <Text style={styles.cell}>
                  {player?.economy ? Number(player.economy).toFixed(1) : '0.0'}
                </Text>
              </View>
            ))}
            {bowlingStats.length === 0 && (
              <Text style={styles.emptyText}>No bowling data 😎</Text>
            )}
          </>
        )}
      </View>

      <View style={{ height: 60 }} />
    </ScrollView>
  );
};

export default MatchDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: (StatusBar.currentHeight || 0) + 10,
  },

  summaryCard: {
    margin: 16,
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
  },

  teams: {
    fontSize: 28,
    fontWeight: 'bold',
  },

  info: {
    marginTop: 12,
    fontSize: 15,
  },

  scoreContainer: {
    flexDirection: 'row',
    marginHorizontal: 10,
  },

  scoreBox: {
    flex: 1,
    margin: 6,
    padding: 18,
    borderRadius: 20,
  },

  teamName: {
    fontSize: 17,
    fontWeight: 'bold',
  },

  score: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 12,
  },

  oversPlayed: {
    marginTop: 6,
  },

  deleteButton: {
    backgroundColor: '#DC2626',
    marginHorizontal: 16,
    marginTop: 10,
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: 'center',
  },

  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  winnerCard: {
    margin: 16,
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
  },

  winnerText: {
    color: '#22C55E',
    fontSize: 22,
    fontWeight: 'bold',
  },

  resultText: {
    color: '#fff',
    marginTop: 10,
    fontSize: 15,
  },

  tabsContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 10,
  },

  tab: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 16,
    backgroundColor: '#111827',
    marginHorizontal: 4,
    alignItems: 'center',
  },

  activeTab: {
    backgroundColor: '#22D3EE',
  },

  tabText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  emptyText: { color: COLORS.subText, padding: 20, textAlign: 'center' },

  table: {
    margin: 16,
    borderRadius: 20,
    overflow: 'hidden',
  },

  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#111827',
    paddingVertical: 16,
  },

  tableRow: {
    flexDirection: 'row',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
    paddingHorizontal: 8,
  },

  headerText: {
    flex: 1,
    color: '#22D3EE',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 13,
  },

  cell: {
    flex: 1,
    color: '#fff',
    textAlign: 'center',
    fontSize: 13,
  },

  playerName: {
    fontWeight: 'bold',
    fontSize: 14,
  },

  status: {
    marginTop: 4,
    fontSize: 11,
  },
});
