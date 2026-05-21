// src/components/TopPerformers.tsx 😎🔥

import React from 'react';

import { View, Text, StyleSheet } from 'react-native';

import {
  ChartNoAxesCombined,
  OctagonPause,
  Medal,
  Award,
  ArrowUpWideNarrow,
  Bolt,
} from 'lucide-react-native';

const TopPerformers = ({ item, theme }: any) => {
  if (!item) {
    return null;
  }

  // 😎 ICONS ORDER
  const icons = [
    ChartNoAxesCombined,
    OctagonPause,
    Medal,
    Award,
    ArrowUpWideNarrow,
    Bolt,
  ];

  // 😎 CARD INDEX
  const index = item?.index || 0;

  const IconComponent = icons[index % icons.length];

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme?.card || '#111C2E',

          borderColor: theme?.border || '#164E63',

          shadowColor: theme?.glow || '#22D3EE',
        },
      ]}
    >
      {/* 😎 ICON */}
      <IconComponent
        size={30}
        color={theme?.primary || '#22D3EE'}
        strokeWidth={2.4}
      />

      {/* 😎 TITLE */}
      <Text
        style={[
          styles.title,
          {
            color: theme?.subText || '#94A3B8',
          },
        ]}
        numberOfLines={1}
      >
        {item?.title || 'N/A'}
      </Text>

      {/* 😎 PLAYER */}
      <Text
        style={[
          styles.player,
          {
            color: theme?.text || '#FFFFFF',
          },
        ]}
        numberOfLines={1}
      >
        {item?.player || 'Unknown'}
      </Text>

      {/* 😎 VALUE */}
      <Text
        style={[
          styles.value,
          {
            color: theme?.primary || '#22D3EE',
          },
        ]}
      >
        {item?.value ?? 0}
      </Text>
    </View>
  );
};

export default React.memo(TopPerformers);

const styles = StyleSheet.create({
  card: {
    width: '100%',

    borderRadius: 20,

    padding: 16,

    justifyContent: 'center',

    alignItems: 'center',

    borderWidth: 1,

    minHeight: 150,

    shadowOffset: {
      width: 0,
      height: 0,
    },

    shadowOpacity: 0.6,

    shadowRadius: 12,

    elevation: 8,
  },

  title: {
    fontSize: 14,

    textAlign: 'center',

    marginTop: 8,
  },

  player: {
    fontSize: 18,

    fontWeight: 'bold',

    marginTop: 8,

    textAlign: 'center',
  },

  value: {
    fontSize: 16,

    fontWeight: '700',

    marginTop: 4,

    textAlign: 'center',
  },
});
