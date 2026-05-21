import React from 'react';

import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import COLORS from '../constants/colors';

const ThisOver = ({ balls }: any) => {
  return (
    <View style={styles.card}>
      <Text style={styles.heading}>This Over</Text>

      <View style={styles.row}>
        {balls?.map((item: any, index: number) => (
          <View key={index} style={styles.ball}>
            <Text style={styles.ballText}>
              {item}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default ThisOver;

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

  heading: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 14,
  },

  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  ball: {
    width: 42,
    height: 42,
    borderRadius: 22,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 10,
  },

  ballText: {
    color: '#000',
    fontWeight: 'bold',
  },
});