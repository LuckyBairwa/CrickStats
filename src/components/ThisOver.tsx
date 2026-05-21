import React from 'react';

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import COLORS from '../constants/colors';

// want an icon of arrow from lucide-react-native for view all
// import {} from 'lucide-react-native';

const ThisOver = ({ balls, onPress }: any) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={styles.card}
      onPress={onPress}
    >
      <View style={styles.headerRow}>
        <Text style={styles.heading}>This Over</Text>

        <Text style={styles.viewText}>View All</Text>
        {/* want an icon of arrow */}
      </View>

      <View style={styles.row}>
        {balls?.length > 0 ? (
          balls.map((item: any, index: number) => (
            <View key={index} style={styles.ball}>
              <Text style={styles.ballText}>{item}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>No balls yet</Text>
        )}
      </View>
    </TouchableOpacity>
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

  headerRow: {
    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'center',

    marginBottom: 14,
  },

  heading: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: '700',
  },

  viewText: {
    color: COLORS.subText,

    fontSize: 13,

    fontWeight: '600',
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

  emptyText: {
    color: COLORS.subText,
  },
});
