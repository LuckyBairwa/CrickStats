// src/screens/Players/PlayerDetailsScreen.tsx 😎🔥

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

import { useRoute, useNavigation } from '@react-navigation/native';
import {
  User,
  Trophy,
  Flame,
  Target,
  CircleDot,
  Activity,
  Shield,
  Swords,
  Pencil,
  TrendingUp,
  Medal,
  BarChart3,
  Shirt,
  BadgeInfo,
  Mars,
  Venus,
  Dumbbell,
} from 'lucide-react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

import COLORS from '../../constants/colors';

const theme = COLORS;

const PlayerDetailsScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  // const Icon = item.icon;

  const player = route?.params?.player;

  if (!player) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Player Not Found </Text>
      </View>
    );
  }

  const stats = [
    {
      label: 'Total Runs',
      value: player?.runs || 0,
      icon: Trophy,
    },

    {
      label: '4s',
      value: player?.fours || 0,
      icon: Target,
    },

    {
      label: '6s',
      value: player?.sixes || 0,
      icon: Flame,
    },

    {
      label: '30s',
      value: player?.thirties || 0,
      icon: Activity,
    },

    {
      label: '40s',
      value: player?.forties || 0,
      icon: CircleDot,
    },

    {
      label: 'Strike Rate',
      value: player?.strikeRate || 0,
      icon: TrendingUp,
    },

    {
      label: 'Wickets',
      value: player?.wickets || 0,
      icon: Shield,
    },

    {
      label: 'Dot Balls',
      value: player?.dotBalls || 0,
      icon: CircleDot,
    },

    {
      label: 'Economy',
      value: player?.economy || 0,
      icon: BarChart3,
    },

    {
      label: 'Catches',
      value: player?.catches || 0,
      icon: BadgeInfo,
    },

    {
      label: 'Matches',
      value: player?.matchesPlayed || 0,
      icon: Swords,
    },

    {
      label: 'Wins',
      value: player?.matchesWon || 0,
      icon: Medal,
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar translucent barStyle="light-content" />

      <View style={styles.glow} />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <Animated.View entering={FadeInUp.duration(600)} style={styles.header}>
          <View>
            <Text style={styles.name}>{player.name}</Text>
            <Text style={styles.nick}>@{player.nickName || 'No Nick'}</Text>
          </View>

          <View style={styles.jerseyBox}>
            <Text style={styles.jersey}>
              Jersey: {player.jerseyNumber || 0}
            </Text>
          </View>
        </Animated.View>

        {/* INFO CARD */}
        <View style={styles.card}>
          <View style={styles.infoRow}>
            {player.gender === 'Male' ? (
              <Mars size={18} color={theme.primary} />
            ) : (
              <Venus size={18} color={theme.primary} />
            )}

            <Text style={styles.infoLabel}>Gender</Text>

            <View style={styles.infoBadge}>
              <Text style={styles.infoValue}>{player.gender}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Shield size={18} color={theme.primary} />

            <Text style={styles.infoLabel}>Role</Text>

            <View style={styles.infoBadge}>
              <Text style={styles.infoValue}>{player.role}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Target size={18} color={theme.primary} />

            <Text style={styles.infoLabel}>Batting</Text>

            <View style={styles.infoBadge}>
              <Text style={styles.infoValue}>{player.batsmanType}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Activity size={18} color={theme.primary} />

            <Text style={styles.infoLabel}>Bowling</Text>

            <View style={styles.infoBadge}>
              <Text style={styles.infoValue}>{player.bowlerType}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Flame size={18} color={theme.primary} />

            <Text style={styles.infoLabel}>Style</Text>

            <View style={styles.infoBadge}>
              <Text style={styles.infoValue}>{player.bowlingStyle}</Text>
            </View>
          </View>
        </View>

        {/* EDIT BUTTON */}
        <TouchableOpacity
          style={styles.editBtn}
          onPress={() =>
            navigation.navigate('EditPlayer', {
              player,
            })
          }
        >
          <Pencil size={20} color="#000" />
          <Text style={styles.editText}>Edit Player</Text>
        </TouchableOpacity>

        {/* STATS */}
        <Text style={styles.sectionTitle}>Statistics</Text>

        <View style={styles.grid}>
          {stats.map((item, index) => (
            <Animated.View
              key={index}
              entering={FadeInDown.delay(index * 50)}
              style={styles.statCard}
            >
              {item.icon && <item.icon size={20} color={theme.primary} />}

              <Text style={styles.statLabel}>{item.label}</Text>

              <Text style={styles.statValue}>{item.value}</Text>
            </Animated.View>
          ))}
        </View>

        <View style={{ height: 80 }} />
      </ScrollView>
    </View>
  );
};

export default PlayerDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: (StatusBar.currentHeight || 0) + 10,
  },

  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },

  errorText: { color: '#fff', fontSize: 18 },

  glow: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 200,
    backgroundColor: theme.primary + '22',
    top: -60,
    right: -60,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  name: {
    color: theme.primary,
    fontSize: 28,
    fontWeight: 'bold',
  },

  nick: {
    color: theme.subText,
    marginTop: 4,
    fontSize: 20,
  },

  jerseyBox: {
    backgroundColor: theme.primary,
    width: 80,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  jersey: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 5,
  },

  card: {
    backgroundColor: theme.card,
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },

  info: {
    color: theme.text,
    marginBottom: 6,
  },

  editBtn: {
    backgroundColor: theme.primary,
    flexDirection: 'row',
    padding: 14,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },

  editText: {
    marginLeft: 8,
    color: '#000',
    fontWeight: 'bold',
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },

  infoLabel: {
    color: theme.subText,
    marginLeft: 10,
    fontSize: 14,
    width: 70,
  },

  infoBadge: {
    backgroundColor: theme.background,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: theme.border,
  },

  infoValue: {
    color: theme.primary,
    fontWeight: 'bold',
  },

  sectionTitle: {
    color: theme.text,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  statCard: {
    width: '48%',
    backgroundColor: theme.card,
    padding: 14,
    borderRadius: 14,
    marginBottom: 12,
  },

  statLabel: {
    color: theme.subText,
    fontSize: 12,
  },

  statValue: {
    color: theme.primary,
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 6,
  },
});
