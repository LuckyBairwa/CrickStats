// src/screens/Match/CreateMatchScreen.tsx 😎🔥

import React from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar } from 'react-native';

import MatchForm from '../../components/MatchForm';
import COLORS from '../../constants/colors';

const theme = COLORS;

const CreateMatchScreen = () => {
  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.background }]}
    >
      <StatusBar backgroundColor={theme.background} barStyle="light-content" />

      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <MatchForm />
      </View>
    </SafeAreaView>
  );
};

export default CreateMatchScreen;

const styles = StyleSheet.create({
  safeArea: { flex: 1 },

  container: {
    flex: 1,
    paddingHorizontal: 14,
    paddingTop: (StatusBar.currentHeight || 0) + 3,
  },
});
