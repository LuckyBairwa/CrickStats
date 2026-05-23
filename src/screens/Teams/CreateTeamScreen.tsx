// src/screens/team/CreateTeamScreen.tsx 😎🔥

import React, { useState } from 'react';

import {
  View,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import TeamForm from '../../components/TeamForm';

import { createTeam } from '../../api/teamApi';

import COLORS from '../../constants/colors';

const CreateTeamScreen = () => {
  const navigation = useNavigation<any>();

  const theme = COLORS;

  const [loading, setLoading] = useState(false);

  // 😎 Save Team
  const handleSubmit = async (data: any) => {
    try {
      setLoading(true);

      const payload = {
        name: data.name,
        captain: data.captain,
        players: data.players,
      };

      const response = await createTeam(payload);

      console.log('TEAM CREATED 😎', response);

      Alert.alert('Success 😎', 'Team Created Successfully');

      navigation.goBack();
    } catch (error: any) {
      console.log(
        'TEAM ERROR',
        error?.response?.data || error.message,
      );

      Alert.alert('Error ❌', 'Failed to create team');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
        },
      ]}
    >
      {/* Loader 😎 */}
      {loading && (
        <ActivityIndicator
          size="large"
          color={theme.primary}
          style={{ marginBottom: 10 }}
        />
      )}

      {/* 😎 Team Form */}
      <TeamForm onSubmit={handleSubmit} />
    </View>
  );
};

export default CreateTeamScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
      paddingHorizontal: 16,
  },
});