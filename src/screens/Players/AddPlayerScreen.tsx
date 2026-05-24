// src/screens/Players/AddPlayerScreen.tsx 😎🔥

import React, { useState } from 'react';

import {
  View,
  StyleSheet,
  Alert,
  ActivityIndicator,
  StatusBar,
  SafeAreaView,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import PlayerForm from '../../components/PlayerForm';

import { createPlayer } from '../../api/playerApi';

import COLORS from '../../constants/colors';

import { UserPlus, CheckCircle, Hourglass } from 'lucide-react-native';

const AddPlayerScreen = () => {
  const navigation = useNavigation<any>();

  const theme = COLORS;

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: any) => {
    try {
      setLoading(true);

      const payload = {
        ...data,

        jerseyNumber: Number(data?.jerseyNumber) || 0,

        nickName: data?.nickName || '',
      };

      const response = await createPlayer(payload);

      console.log('PLAYER CREATED 😎', response);

      Alert.alert('Success 😎', 'Player Added Successfully');

      navigation.goBack();
    } catch (error: any) {
      console.log(
        'PLAYER ERROR 😭',
        error?.response?.data || error?.message || error,
      );

      Alert.alert('Error ❌', 'Failed to add player');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        {
          backgroundColor: theme.background,
        },
      ]}
    >
      <StatusBar backgroundColor={theme.background} barStyle="light-content" />

      <View
        style={[
          styles.container,
          {
            backgroundColor: theme.background,
          },
        ]}
      >
        {loading && (
          <View style={styles.loaderOverlay}>
            <ActivityIndicator size="large" color={theme.primary} />
          </View>
        )}
        

        <PlayerForm onSubmit={handleSubmit} />
      </View>
    </SafeAreaView>
  );
};

export default AddPlayerScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  container: {
    flex: 1,
    paddingHorizontal: 14,
    paddingTop: (StatusBar.currentHeight || 0) + 10,
  },

  loaderOverlay: {
    position: 'absolute',

    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

    zIndex: 999,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: 'rgba(0,0,0,0.35)',
  },
});
