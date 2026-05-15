import React, {useMemo, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const DashboardScreen = () => {
  // Active Category 😎
  const [activeCategory, setActiveCategory] =
    useState('Most Runs');

  // Dummy Players Data
  const players = [
    {
      id: '1',
      name: 'Virat',
      runs: 1540,
      sixes: 89,
      fours: 120,
      wickets: 12,
      economy: 6.5,
      catches: 24,
      dotBalls: 210,
      centuries: 9,
      halfCenturies: 18,
      matches: 16,
    },

    {
      id: '2',
      name: 'Rohit',
      runs: 1320,
      sixes: 110,
      fours: 98,
      wickets: 6,
      economy: 7.4,
      catches: 18,
      dotBalls: 180,
      centuries: 7,
      halfCenturies: 14,
      matches: 16,
    },

    {
      id: '3',
      name: 'Bumrah',
      runs: 320,
      sixes: 7,
      fours: 18,
      wickets: 65,
      economy: 4.2,
      catches: 11,
      dotBalls: 420,
      centuries: 0,
      halfCenturies: 0,
      matches: 16,
    },

    {
      id: '4',
      name: 'Gill',
      runs: 980,
      sixes: 48,
      fours: 88,
      wickets: 4,
      economy: 8.2,
      catches: 15,
      dotBalls: 150,
      centuries: 3,
      halfCenturies: 11,
      matches: 16,
    },
  ];

  // Categories
  const categories = [
    'Most Runs',
    'Most 6s',
    'Most 4s',
    'Most Wickets',
    'Best Economy',
    'Most Catches',
    'Most Dot Balls',
    'Most 100s',
    'Most 50s',
  ];

  // Sorting Logic 😎
  const sortedPlayers = useMemo(() => {
    let sorted = [...players];

    switch (activeCategory) {
      case 'Most Runs':
        return sorted.sort((a, b) => b.runs - a.runs);

      case 'Most 6s':
        return sorted.sort((a, b) => b.sixes - a.sixes);

      case 'Most 4s':
        return sorted.sort((a, b) => b.fours - a.fours);

      case 'Most Wickets':
        return sorted.sort((a, b) => b.wickets - a.wickets);

      case 'Best Economy':
        return sorted.sort((a, b) => a.economy - b.economy);

      case 'Most Catches':
        return sorted.sort((a, b) => b.catches - a.catches);

      case 'Most Dot Balls':
        return sorted.sort((a, b) => b.dotBalls - a.dotBalls);

      case 'Most 100s':
        return sorted.sort(
          (a, b) => b.centuries - a.centuries,
        );

      case 'Most 50s':
        return sorted.sort(
          (a, b) =>
            b.halfCenturies - a.halfCenturies,
        );

      default:
        return sorted;
    }
  }, [activeCategory]);

  // Get Value
  const getValue = (player: any) => {
    switch (activeCategory) {
      case 'Most Runs':
        return `${player.runs} Runs`;

      case 'Most 6s':
        return `${player.sixes} Sixes`;

      case 'Most 4s':
        return `${player.fours} Fours`;

      case 'Most Wickets':
        return `${player.wickets} Wickets`;

      case 'Best Economy':
        return `${player.economy} Economy`;

      case 'Most Catches':
        return `${player.catches} Catches`;

      case 'Most Dot Balls':
        return `${player.dotBalls} Dot Balls`;

      case 'Most 100s':
        return `${player.centuries} Centuries`;

      case 'Most 50s':
        return `${player.halfCenturies} Half Centuries`;

      default:
        return '';
    }
  };

  // Ranking Medal 😎
  const getRankColor = (index: number) => {
    if (index === 0) return '#FFD700';
    if (index === 1) return '#C0C0C0';
    if (index === 2) return '#CD7F32';

    return '#22C55E';
  };

  return (
    <View style={styles.container}>
      
      {/* Header */}
      <Text style={styles.header}>
        📊 Dashboard
      </Text>

      {/* Horizontal Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryContainer}>
        
        {categories.map((item, index) => {
          const isActive =
            activeCategory === item;

          return (
            <TouchableOpacity
              key={index}
              activeOpacity={0.8}
              style={styles.categoryButton}
              onPress={() =>
                setActiveCategory(item)
              }>
              
              <Text
                style={[
                  styles.categoryText,
                  isActive && styles.activeText,
                ]}>
                {item}
              </Text>

              {isActive && (
                <View style={styles.activeLine} />
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Player Rankings */}
      <FlatList
        data={sortedPlayers}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 30,
        }}
        renderItem={({item, index}) => (
          <View style={styles.playerCard}>
            
            {/* Rank */}
            <View
              style={[
                styles.rankCircle,
                {
                  backgroundColor:
                    getRankColor(index),
                },
              ]}>
              <Text style={styles.rankText}>
                {index + 1}
              </Text>
            </View>

            {/* Player Info */}
            <View style={{flex: 1}}>
              <Text style={styles.playerName}>
                {item.name}
              </Text>

              <Text style={styles.match}>
                Matches: {item.matches} 
              </Text>

              <Text style={styles.playerValue}>
                {getValue(item)}
              </Text>
            </View>

            {/* Trophy Icon */}
            <MaterialCommunityIcons
              name="trophy"
              size={28}
              color="#22C55E"
            />
          </View>
        )}
      />
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    flex: 1,
    backgroundColor: '#07111F',
    paddingTop: 20,
  },

  header: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    marginBottom: 20,
  },

  categoryContainer: {
    paddingHorizontal: 10,
    marginBottom: 20,
  },

  categoryButton: {
    marginHorizontal: 10,
    alignItems: 'center',
  },

  categoryText: {
    color: '#94A3B8',
    fontSize: 16,
    fontWeight: '600',
  },

  activeText: {
    color: '#22C55E',
  },

  activeLine: {
    marginTop: 6,
    width: '100%',
    height: 3,
    borderRadius: 10,
    backgroundColor: '#22C55E',
  },

  playerCard: {
    backgroundColor: '#111C2E',
    marginHorizontal: 16,
    marginBottom: 14,
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1E293B',
  },

  rankCircle: {
    width: 46,
    height: 46,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },

  rankText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 18,
  },

  playerName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  match: {
    color: '#94A3B8',
    marginTop: 4,
  },

  playerValue: {
    color: '#22C55E',
    marginTop: 8,
    fontSize: 15,
    fontWeight: '600',
  },
});