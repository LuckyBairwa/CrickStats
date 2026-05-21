import React from 'react';

import { View, Text, StyleSheet } from 'react-native';

import COLORS from '../constants/colors';

const PartnershipCard = ({ partnership }: any) => {
  return (
    <View style={styles.card}>
      <Text style={styles.text}>
        Partnership: {partnership?.runs || 0}
        ({partnership?.balls || 0})
      </Text>
    </View>
  );
};

export default PartnershipCard;

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 20,
    padding: 18,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  text: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: 18,
    textAlign: 'center',
  },
});