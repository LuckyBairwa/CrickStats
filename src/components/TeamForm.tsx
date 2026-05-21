// src/components/TeamForm.tsx 😎🔥

import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  StatusBar,
} from 'react-native';

import { Users, ShieldCheck } from 'lucide-react-native';

import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

import { getPlayers } from '../api/playerApi';

import COLORS from '../constants/colors';

const theme = COLORS;

const TeamForm = ({ onSubmit }: any) => {
  // 😎 States
  const [teamName, setTeamName] = useState('');

  const [captain, setCaptain] = useState<any>(null);

  const [players, setPlayers] = useState<any[]>([]);

  const [selectedPlayers, setSelectedPlayers] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  // 😎 Fetch Players
  const fetchPlayers = async () => {
    try {
      const res = await getPlayers().catch(() => null);

      setPlayers(Array.isArray(res?.players) ? res.players : []);
    } catch (error) {
      console.log('Players Error 😭', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  // 😎 Toggle Players
  const togglePlayer = (player: any) => {
    const exists = selectedPlayers.find(p => p._id === player._id);

    if (exists) {
      setSelectedPlayers(prev => prev.filter(p => p._id !== player._id));
    } else {
      setSelectedPlayers(prev => [...prev, player]);
    }
  };

  // 😎 Submit
  const handleSubmit = () => {
    if (!teamName.trim()) {
      Alert.alert('Error 😭', 'Enter Team Name');

      return;
    }

    if (!captain) {
      Alert.alert('Error 😭', 'Select Captain');

      return;
    }

    if (selectedPlayers.length === 0) {
      Alert.alert('Error 😭', 'Select Players');

      return;
    }

    onSubmit?.({
      name: teamName,

      captain: captain._id,

      players: selectedPlayers.map(p => p._id),
    });
  };

  // 😎 Loading
  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

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
      {/* 😎 Header */}
      <Animated.View entering={FadeInUp.duration(700)} style={styles.header}>
        <Users size={30} color={theme.primary} />

        <Text style={styles.headerTitle}>Create Team</Text>
      </Animated.View>

      {/* 😎 Team Name */}
      <Animated.View
        entering={FadeInDown.delay(100)}
        style={styles.inputWrapper}
      >
        <Text style={styles.label}>Team Name</Text>

        <TextInput
          placeholder="Enter Team Name"
          placeholderTextColor={theme.subText}
          value={teamName}
          onChangeText={setTeamName}
          style={styles.input}
        />
      </Animated.View>

      {/* 😎 Captain */}
      <Animated.View entering={FadeInDown.delay(200)}>
        <Text style={styles.label}>Select Captain</Text>

        <View style={styles.playersWrapper}>
          {players.map(player => {
            const active = captain?._id === player._id;

            return (
              <TouchableOpacity
                key={player._id}
                activeOpacity={0.8}
                onPress={() => setCaptain(player)}
                style={[
                  styles.playerBtn,
                  {
                    backgroundColor: active ? theme.primary : theme.card,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.playerText,
                    {
                      color: active ? '#000' : '#fff',
                    },
                  ]}
                >
                  {player.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </Animated.View>

      {/* 😎 Players */}
      <Animated.View entering={FadeInDown.delay(300)}>
        <Text style={styles.label}>Select Players</Text>

        <View style={styles.playersWrapper}>
          {players
            .filter(player => player._id !== captain?._id)
            .map(player => {
              const active = selectedPlayers.find(p => p._id === player._id);

              return (
                <TouchableOpacity
                  key={player._id}
                  activeOpacity={0.8}
                  onPress={() => togglePlayer(player)}
                  style={[
                    styles.playerBtn,
                    {
                      backgroundColor: active ? theme.primary : theme.card,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.playerText,
                      {
                        color: active ? '#000' : '#fff',
                      },
                    ]}
                  >
                    {player.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
        </View>
      </Animated.View>

      {/* 😎 Submit */}
      <Animated.View entering={FadeInDown.delay(400)}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleSubmit}
          style={styles.submitBtn}
        >
          <ShieldCheck size={24} color="#000" />

          <Text style={styles.submitText}>Save Team</Text>
        </TouchableOpacity>
      </Animated.View>

      <View style={{ height: 50 }} />
    </ScrollView>
  );
};

export default TeamForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: (StatusBar.currentHeight || 0) + 3,
  },

  loader: {
    flex: 1,

    justifyContent: 'center',

    alignItems: 'center',

    backgroundColor: theme.background,
  },

  header: {
    flexDirection: 'row',

    alignItems: 'center',

    marginTop: 20,

    marginBottom: 24,
  },

  headerTitle: {
    color: '#fff',

    fontSize: 28,

    fontWeight: 'bold',

    marginLeft: 12,
  },

  inputWrapper: {
    marginBottom: 22,
  },

  label: {
    color: '#fff',

    fontSize: 17,

    marginBottom: 12,

    fontWeight: '700',
  },

  input: {
    backgroundColor: theme.card,

    borderWidth: 1,

    borderColor: theme.border,

    borderRadius: 18,

    paddingHorizontal: 18,

    paddingVertical: 15,

    color: '#fff',

    fontSize: 16,

    shadowColor: theme.glow,

    shadowOffset: {
      width: 0,
      height: 0,
    },

    shadowOpacity: 0.6,

    shadowRadius: 10,

    elevation: 8,
  },

  playersWrapper: {
    flexDirection: 'row',

    flexWrap: 'wrap',

    marginBottom: 20,
  },

  playerBtn: {
    borderRadius: 16,

    paddingVertical: 12,

    paddingHorizontal: 18,

    marginRight: 10,

    marginBottom: 12,

    borderWidth: 1,

    borderColor: theme.border,

    shadowColor: theme.glow,

    shadowOffset: {
      width: 0,
      height: 0,
    },

    shadowOpacity: 0.5,

    shadowRadius: 10,

    elevation: 8,
  },

  playerText: {
    fontWeight: '700',

    fontSize: 15,
  },

  submitBtn: {
    backgroundColor: theme.primary,

    borderRadius: 20,

    paddingVertical: 18,

    justifyContent: 'center',

    alignItems: 'center',

    flexDirection: 'row',

    marginTop: 12,

    shadowColor: theme.glow,

    shadowOffset: {
      width: 0,
      height: 0,
    },

    shadowOpacity: 0.8,

    shadowRadius: 15,

    elevation: 12,
  },

  submitText: {
    color: '#000',

    fontSize: 18,

    fontWeight: 'bold',

    marginLeft: 10,
  },
});
