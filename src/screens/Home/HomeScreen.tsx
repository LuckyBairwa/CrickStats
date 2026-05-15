import React from 'react';
// import { StatusBar, StyleSheet, View, Text } from 'react-native';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const HomeScreen = () => {
  // Greeting Logic 😎
  const hour = new Date().getHours();

  let greeting = '';

  if (hour < 12) {
    greeting = 'Good Morning';
  } else if (hour < 17) {
    greeting = 'Good Afternoon';
  } else if (hour < 21) {
    greeting = 'Good Evening';
  } else {
    greeting = 'Good Night';
  }

  // Dummy Top Players Data
  const topStats = [
    {
      title: 'Most Runs',
      player: 'Virat',
      value: '1540',
      icon: 'cricket',
    },
    {
      title: 'Most Sixes',
      player: 'Rohit',
      value: '89',
      icon: 'baseball',
    },
    {
      title: 'Most 4s',
      player: 'Gill',
      value: '120',
      icon: 'lightning-bolt',
    },
    {
      title: 'Most Wickets',
      player: 'Bumrah',
      value: '65',
      icon: 'target',
    },
    {
      title: 'Best Economy',
      player: 'Shami',
      value: '4.2',
      icon: 'speedometer',
    },
    {
      title: 'Most Dot Balls',
      player: 'Siraj',
      value: '320',
      icon: 'radio-button-off',
    },
    {
      title: 'Most 50s',
      player: 'Kohli',
      value: '18',
      icon: 'trophy',
    },
    {
      title: 'Most 100s',
      player: 'Sky',
      value: '9',
      icon: 'medal',
    },
  ];

  const quickActions = [
    {
      title: 'Add Player',
      icon: 'person-add',
      color: '#2563EB',
    },
    {
      title: 'Create Team',
      icon: 'people',
      color: '#16A34A',
    },
    {
      title: 'Create Match',
      icon: 'trophy',
      color: '#EA580C',
    },
    {
      title: 'Toss',
      icon: 'sync',
      color: '#9333EA',
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}>
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greetingText}>
          {greeting}, Players 👋
        </Text>

        <Text style={styles.subText}>
          Welcome Back to Gully Cricket 😎
        </Text>
      </View>

      {/* Dashboard Card */}
      <View style={styles.dashboardCard}>
        <View style={styles.dashboardTop}>
          <MaterialCommunityIcons
            name="cricket"
            size={28}
            color="#22C55E"
          />

          <Text style={styles.dashboardTitle}>
            Cricket Dashboard
          </Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>25</Text>
            <Text style={styles.statLabel}>Players</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statValue}>6</Text>
            <Text style={styles.statLabel}>Teams</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statValue}>18</Text>
            <Text style={styles.statLabel}>Matches</Text>
          </View>
        </View>
      </View>

      {/* Top Performers */}
      <Text style={styles.sectionTitle}>
        🏆 Top Performers
      </Text>

      <View style={styles.gridContainer}>
        {topStats.map((item, index) => (
          <View key={index} style={styles.card}>
            <MaterialCommunityIcons
              name={item.icon}
              size={24}
              color="#22C55E"
            />

            <Text style={styles.cardTitle}>
              {item.title}
            </Text>

            <Text style={styles.playerName}>
              {item.player}
            </Text>

            <Text style={styles.playerValue}>
              {item.value}
            </Text>
          </View>
        ))}
      </View>

      {/* Quick Actions */}
      <Text style={styles.sectionTitle}>
        ⚡ Quick Actions
      </Text>

      <View style={styles.gridContainer}>
        {quickActions.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            style={[
              styles.actionButton,
              {backgroundColor: item.color},
            ]}>
            <Ionicons
              name={item.icon}
              size={28}
              color="#fff"
            />

            <Text style={styles.actionText}>
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Recent Matches */}
      <Text style={styles.sectionTitle}>
        🏏 Recent Matches
      </Text>

      <View style={styles.matchCard}>
        <Text style={styles.matchTeams}>
          Warriors vs Titans
        </Text>

        <Text style={styles.matchResult}>
          Warriors won by 12 runs
        </Text>
      </View>

      <View style={styles.matchCard}>
        <Text style={styles.matchTeams}>
          Kings vs Royals
        </Text>

        <Text style={styles.matchResult}>
          Royals won by 4 wickets
        </Text>
      </View>

      <View style={{height: 30}} />
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    flex: 1,
    backgroundColor: '#07111F',
    paddingHorizontal: 16,
  },

  header: {
    marginTop: 20,
    marginBottom: 20,
  },

  greetingText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },

  subText: {
    fontSize: 15,
    color: '#94A3B8',
    marginTop: 6,
  },

  dashboardCard: {
    backgroundColor: '#111C2E',
    borderRadius: 20,
    padding: 18,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#1E293B',
  },

  dashboardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },

  dashboardTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  statBox: {
    alignItems: 'center',
  },

  statValue: {
    color: '#22C55E',
    fontSize: 24,
    fontWeight: 'bold',
  },

  statLabel: {
    color: '#CBD5E1',
    marginTop: 4,
  },

  sectionTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 14,
    marginTop: 10,
  },

  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  card: {
    width: '48%',
    backgroundColor: '#111C2E',
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#1E293B',
  },

  cardTitle: {
    color: '#94A3B8',
    fontSize: 14,
    marginTop: 10,
  },

  playerName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },

  playerValue: {
    color: '#22C55E',
    fontSize: 16,
    marginTop: 4,
    fontWeight: '600',
  },

  actionButton: {
    width: '48%',
    borderRadius: 18,
    paddingVertical: 24,
    alignItems: 'center',
    marginBottom: 14,
  },

  actionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },

  matchCard: {
    backgroundColor: '#111C2E',
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#1E293B',
  },

  matchTeams: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  matchResult: {
    color: '#22C55E',
    marginTop: 8,
    fontSize: 15,
  },
});