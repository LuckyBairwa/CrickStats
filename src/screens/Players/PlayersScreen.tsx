import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  ScrollView,
  StatusBar,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const PlayersScreen = () => {
  const [selectedPlayer, setSelectedPlayer] = useState<any>(null);

  // Dummy Players Data 😎
  const players = [
    {
      id: '1',
      name: 'Virat Kohli',
      gender: 'Male',
      jerseyNumber: 18,
      role: 'Batsman',
      team: 'Warriors',

      batting: {
        runs: 1540,
        strikeRate: 148.6,
        fours: 120,
        sixes: 89,
        halfCentury: 18,
        century: 9,
      },

      bowling: {
        wickets: 12,
        economy: 6.5,
      },

      fielding: {
        catches: 24,
      },

      matches: {
        played: 42,
        won: 28,
      },
    },

    {
      id: '2',
      name: 'Rohit Sharma',
      gender: 'Male',
      jerseyNumber: 45,
      role: 'Opener',
      team: 'Titans',

      batting: {
        runs: 1320,
        strikeRate: 145.2,
        fours: 98,
        sixes: 110,
        halfCentury: 14,
        century: 7,
      },

      bowling: {
        wickets: 6,
        economy: 7.4,
      },

      fielding: {
        catches: 18,
      },

      matches: {
        played: 39,
        won: 22,
      },
    },

    {
      id: '3',
      name: 'Bumrah',
      gender: 'Male',
      jerseyNumber: 93,
      role: 'Bowler',
      team: 'Kings',

      batting: {
        runs: 320,
        strikeRate: 102.4,
        fours: 18,
        sixes: 7,
        halfCentury: 0,
        century: 0,
      },

      bowling: {
        wickets: 65,
        economy: 4.2,
      },

      fielding: {
        catches: 11,
      },

      matches: {
        played: 41,
        won: 25,
      },
    },
  ];

  // Player Card
  const renderPlayer = ({item}: any) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.playerCard}
        onPress={() => setSelectedPlayer(item)}>
        
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {item.name.charAt(0)}
          </Text>
        </View>

        <View style={{flex: 1}}>
          <Text style={styles.playerName}>
            {item.name}
          </Text>

          <Text style={styles.playerInfo}>
            #{item.jerseyNumber} • {item.role}
          </Text>

          <Text style={styles.teamText}>
            {item.team}
          </Text>
        </View>

        <Ionicons
          name="chevron-forward"
          size={22}
          color="#94A3B8"
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      
      {/* Header */}
      <Text style={styles.header}>
        🏏 Players
      </Text>

      {/* Players List */}
      <FlatList
        data={players}
        renderItem={renderPlayer}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />

      {/* Player Details Modal */}
      <Modal
        visible={selectedPlayer !== null}
        animationType="slide"
        transparent>

        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            
            <ScrollView
              showsVerticalScrollIndicator={false}>

              {/* Close Button */}
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setSelectedPlayer(null)}>

                <Ionicons
                  name="close"
                  size={28}
                  color="#fff"
                />
              </TouchableOpacity>

              {/* Profile */}
              <View style={styles.profileSection}>
                <View style={styles.bigAvatar}>
                  <Text style={styles.bigAvatarText}>
                    {selectedPlayer?.name.charAt(0)}
                  </Text>
                </View>

                <Text style={styles.modalPlayerName}>
                  {selectedPlayer?.name}
                </Text>

                <Text style={styles.modalSubText}>
                  #{selectedPlayer?.jerseyNumber} •{' '}
                  {selectedPlayer?.role}
                </Text>

                <Text style={styles.modalSubText}>
                  {selectedPlayer?.gender}
                </Text>
              </View>

              {/* Basic Info */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  📌 Basic Info
                </Text>

                <Text style={styles.infoText}>
                  Team : {selectedPlayer?.team}
                </Text>

                <Text style={styles.infoText}>
                  Matches Played :{' '}
                  {selectedPlayer?.matches.played}
                </Text>

                <Text style={styles.infoText}>
                  Matches Won :{' '}
                  {selectedPlayer?.matches.won}
                </Text>
              </View>

              {/* Batting Stats */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  🏏 Batting Stats
                </Text>

                <View style={styles.statsGrid}>
                  <StatCard
                    title="Runs"
                    value={selectedPlayer?.batting.runs}
                  />

                  <StatCard
                    title="Strike Rate"
                    value={selectedPlayer?.batting.strikeRate}
                  />

                  <StatCard
                    title="4s"
                    value={selectedPlayer?.batting.fours}
                  />

                  <StatCard
                    title="6s"
                    value={selectedPlayer?.batting.sixes}
                  />

                  <StatCard
                    title="50s"
                    value={selectedPlayer?.batting.halfCentury}
                  />

                  <StatCard
                    title="100s"
                    value={selectedPlayer?.batting.century}
                  />
                </View>
              </View>

              {/* Bowling Stats */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  🎯 Bowling Stats
                </Text>

                <View style={styles.statsGrid}>
                  <StatCard
                    title="Wickets"
                    value={selectedPlayer?.bowling.wickets}
                  />

                  <StatCard
                    title="Economy"
                    value={selectedPlayer?.bowling.economy}
                  />
                </View>
              </View>

              {/* Fielding Stats */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  🧤 Fielding Stats
                </Text>

                <View style={styles.statsGrid}>
                  <StatCard
                    title="Catches"
                    value={selectedPlayer?.fielding.catches}
                  />
                </View>
              </View>

              <View style={{height: 40}} />
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Reusable Stat Card 😎
const StatCard = ({title, value}: any) => {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statValue}>
        {value}
      </Text>

      <Text style={styles.statTitle}>
        {title}
      </Text>
    </View>
  );
};

export default PlayersScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    flex: 1,
    backgroundColor: '#07111F',
    paddingHorizontal: 16,
    paddingTop: 20,
  },

  header: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  playerCard: {
    backgroundColor: '#111C2E',
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1E293B',
  },

  avatar: {
    width: 55,
    height: 55,
    borderRadius: 100,
    backgroundColor: '#22C55E',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },

  avatarText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },

  playerName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  playerInfo: {
    color: '#94A3B8',
    marginTop: 4,
  },

  teamText: {
    color: '#22C55E',
    marginTop: 4,
    fontWeight: '600',
  },

  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },

  modalContent: {
    height: '92%',
    backgroundColor: '#07111F',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 18,
    paddingTop: 20,
  },

  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },

  profileSection: {
    alignItems: 'center',
    marginBottom: 25,
  },

  bigAvatar: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: '#22C55E',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },

  bigAvatarText: {
    color: '#fff',
    fontSize: 42,
    fontWeight: 'bold',
  },

  modalPlayerName: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },

  modalSubText: {
    color: '#94A3B8',
    marginTop: 6,
    fontSize: 16,
  },

  section: {
    marginBottom: 24,
  },

  sectionTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },

  infoText: {
    color: '#CBD5E1',
    fontSize: 16,
    marginBottom: 8,
  },

  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  statCard: {
    width: '48%',
    backgroundColor: '#111C2E',
    borderRadius: 18,
    paddingVertical: 20,
    alignItems: 'center',
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#1E293B',
  },

  statValue: {
    color: '#22C55E',
    fontSize: 24,
    fontWeight: 'bold',
  },

  statTitle: {
    color: '#CBD5E1',
    marginTop: 8,
    fontSize: 15,
  },
});