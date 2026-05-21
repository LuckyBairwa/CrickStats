import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

import COLORS from '../constants/colors';

const buttons = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  'WKT',
  'WD',
  'NB',
  'LB',
  'B',
];

const ScoreButtons = ({ onPress }: any) => {
  return (
    <View style={styles.container}>
      {buttons.map(item => (
        <TouchableOpacity
          key={item}
          activeOpacity={0.8}
          style={styles.btn}
          onPress={() => onPress(item)}
        >
          <Text style={styles.text}>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ScoreButtons;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 16,
  },

  btn: {
    width: '23%',
    height: 60,
    borderRadius: 18,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },

  text: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});