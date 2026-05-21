// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   Modal,
//   ScrollView,
//   StatusBar,
// } from 'react-native';

// import Ionicons from 'react-native-vector-icons/Ionicons';

// const MatchesScreen = () => {
//   const [selectedMatch, setSelectedMatch] = useState<any>(null);

//   // Dummy Matches 😎
//   const matches = [
//     {
//       id: '1',
//       teamA: 'Warriors',
//       teamB: 'Titans',
//       date: '15 May 2026',
//       overs: 10,
//       tossWinner: 'Warriors',
//       tossDecision: 'Bat',
//       result: 'Warriors won by 12 runs',
//       winner: 'Warriors',

//       innings: {
//         warriors: {
//           score: '145/6',
//           batting: [
//             {
//               player: 'Virat',
//               runs: 52,
//               balls: 28,
//               fours: 6,
//               sixes: 3,
//             },
//             {
//               player: 'Rohit',
//               runs: 42,
//               balls: 24,
//               fours: 4,
//               sixes: 2,
//             },
//           ],

//           bowling: [
//             {
//               player: 'Bumrah',
//               overs: '2',
//               wickets: 2,
//               economy: 6.5,
//             },
//           ],
//         },

//         titans: {
//           score: '133/8',

//           batting: [
//             {
//               player: 'Gill',
//               runs: 45,
//               balls: 30,
//               fours: 5,
//               sixes: 1,
//             },
//           ],

//           bowling: [
//             {
//               player: 'Shami',
//               overs: '2',
//               wickets: 1,
//               economy: 7.2,
//             },
//           ],
//         },
//       },

//       overByOver: [
//         {
//           over: 1,
//           bowler: 'Bumrah',
//           runs: '1 0 4 1 W 2',
//         },

//         {
//           over: 2,
//           bowler: 'Siraj',
//           runs: '6 1 1 0 4 1',
//         },
//       ],

//       wickets: [
//         'Virat c Rohit b Bumrah',
//         'Gill lbw Shami',
//       ],
//     },

//     {
//       id: '2',
//       teamA: 'Kings',
//       teamB: 'Royals',
//       date: '13 May 2026',
//       overs: 6,
//       tossWinner: 'Royals',
//       tossDecision: 'Bowl',
//       result: 'Royals won by 4 wickets',
//       winner: 'Royals',

//       innings: {
//         kings: {
//           score: '88/5',

//           batting: [
//             {
//               player: 'SKY',
//               runs: 40,
//               balls: 18,
//               fours: 4,
//               sixes: 3,
//             },
//           ],

//           bowling: [
//             {
//               player: 'Kuldeep',
//               overs: '2',
//               wickets: 2,
//               economy: 5.0,
//             },
//           ],
//         },

//         royals: {
//           score: '90/6',

//           batting: [
//             {
//               player: 'Samson',
//               runs: 36,
//               balls: 20,
//               fours: 3,
//               sixes: 2,
//             },
//           ],

//           bowling: [
//             {
//               player: 'Boult',
//               overs: '2',
//               wickets: 1,
//               economy: 6.1,
//             },
//           ],
//         },
//       },

//       overByOver: [
//         {
//           over: 1,
//           bowler: 'Boult',
//           runs: '1 1 4 0 W 2',
//         },
//       ],

//       wickets: [
//         'SKY b Boult',
//       ],
//     },
//   ];

//   // Match Card
//   const renderMatch = ({item}: any) => {
//     return (
//       <TouchableOpacity
//         activeOpacity={0.8}
//         style={styles.matchCard}
//         onPress={() => setSelectedMatch(item)}>
        
//         <View style={styles.topRow}>
//           <Text style={styles.teams}>
//             {item.teamA} vs {item.teamB}
//           </Text>

//           <Ionicons
//             name="cricket"
//             size={26}
//             color="#22C55E"
//           />
//         </View>

//         <Text style={styles.info}>
//           📅 {item.date}
//         </Text>

//         <Text style={styles.info}>
//           🏏 Overs : {item.overs}
//         </Text>

//         <Text style={styles.result}>
//           🏆 {item.result}
//         </Text>

//         <Text style={styles.winner}>
//           Winner : {item.winner}
//         </Text>
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <View style={styles.container}>
      
//       {/* Header */}
//       <Text style={styles.header}>
//         🏏 Matches
//       </Text>

//       {/* Matches List */}
//       <FlatList
//         data={matches}
//         renderItem={renderMatch}
//         keyExtractor={item => item.id}
//         showsVerticalScrollIndicator={false}
//       />

//       {/* Match Detail Modal */}
//       <Modal
//         visible={selectedMatch !== null}
//         animationType="slide"
//         transparent>

//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
            
//             <ScrollView
//               showsVerticalScrollIndicator={false}>

//               {/* Close */}
//               <TouchableOpacity
//                 style={styles.closeButton}
//                 onPress={() => setSelectedMatch(null)}>

//                 <Ionicons
//                   name="close"
//                   size={28}
//                   color="#fff"
//                 />
//               </TouchableOpacity>

//               {/* Match Header */}
//               <Text style={styles.modalTeams}>
//                 {selectedMatch?.teamA} vs{' '}
//                 {selectedMatch?.teamB}
//               </Text>

//               <Text style={styles.modalResult}>
//                 {selectedMatch?.result}
//               </Text>

//               {/* Match Info */}
//               <View style={styles.section}>
//                 <Text style={styles.sectionTitle}>
//                   📌 Match Info
//                 </Text>

//                 <Text style={styles.infoText}>
//                   Date : {selectedMatch?.date}
//                 </Text>

//                 <Text style={styles.infoText}>
//                   Overs : {selectedMatch?.overs}
//                 </Text>

//                 <Text style={styles.infoText}>
//                   Toss Winner : {selectedMatch?.tossWinner}
//                 </Text>

//                 <Text style={styles.infoText}>
//                   Decision : {selectedMatch?.tossDecision}
//                 </Text>
//               </View>

//               {/* Scorecard */}
//               <View style={styles.section}>
//                 <Text style={styles.sectionTitle}>
//                   📊 Scorecard
//                 </Text>

//                 {/* Team A */}
//                 <View style={styles.scoreCard}>
//                   <Text style={styles.scoreTeam}>
//                     {selectedMatch?.teamA}
//                   </Text>

//                   <Text style={styles.score}>
//                     {
//                       selectedMatch?.innings
//                         ?.warriors?.score ||
//                       selectedMatch?.innings
//                         ?.kings?.score
//                     }
//                   </Text>
//                 </View>

//                 {/* Team B */}
//                 <View style={styles.scoreCard}>
//                   <Text style={styles.scoreTeam}>
//                     {selectedMatch?.teamB}
//                   </Text>

//                   <Text style={styles.score}>
//                     {
//                       selectedMatch?.innings
//                         ?.titans?.score ||
//                       selectedMatch?.innings
//                         ?.royals?.score
//                     }
//                   </Text>
//                 </View>
//               </View>

//               {/* Batting Summary */}
//               <View style={styles.section}>
//                 <Text style={styles.sectionTitle}>
//                   🏏 Batting Summary
//                 </Text>

//                 {(
//                   selectedMatch?.innings?.warriors
//                     ?.batting ||
//                   selectedMatch?.innings?.kings
//                     ?.batting
//                 )?.map((item: any, index: number) => (
//                   <View
//                     key={index}
//                     style={styles.summaryCard}>
                    
//                     <Text style={styles.playerName}>
//                       {item.player}
//                     </Text>

//                     <Text style={styles.summaryText}>
//                       Runs : {item.runs}
//                     </Text>

//                     <Text style={styles.summaryText}>
//                       Balls : {item.balls}
//                     </Text>

//                     <Text style={styles.summaryText}>
//                       4s : {item.fours}
//                     </Text>

//                     <Text style={styles.summaryText}>
//                       6s : {item.sixes}
//                     </Text>
//                   </View>
//                 ))}
//               </View>

//               {/* Bowling Summary */}
//               <View style={styles.section}>
//                 <Text style={styles.sectionTitle}>
//                   🎯 Bowling Summary
//                 </Text>

//                 {(
//                   selectedMatch?.innings?.warriors
//                     ?.bowling ||
//                   selectedMatch?.innings?.kings
//                     ?.bowling
//                 )?.map((item: any, index: number) => (
//                   <View
//                     key={index}
//                     style={styles.summaryCard}>
                    
//                     <Text style={styles.playerName}>
//                       {item.player}
//                     </Text>

//                     <Text style={styles.summaryText}>
//                       Overs : {item.overs}
//                     </Text>

//                     <Text style={styles.summaryText}>
//                       Wickets : {item.wickets}
//                     </Text>

//                     <Text style={styles.summaryText}>
//                       Economy : {item.economy}
//                     </Text>
//                   </View>
//                 ))}
//               </View>

//               {/* Over By Over */}
//               <View style={styles.section}>
//                 <Text style={styles.sectionTitle}>
//                   ⏱️ Over By Over
//                 </Text>

//                 {selectedMatch?.overByOver?.map(
//                   (item: any, index: number) => (
//                     <View
//                       key={index}
//                       style={styles.overCard}>
                      
//                       <Text style={styles.overTitle}>
//                         Over {item.over}
//                       </Text>

//                       <Text style={styles.summaryText}>
//                         Bowler : {item.bowler}
//                       </Text>

//                       <Text style={styles.overRuns}>
//                         {item.runs}
//                       </Text>
//                     </View>
//                   ),
//                 )}
//               </View>

//               {/* Wicket Timeline */}
//               <View style={styles.section}>
//                 <Text style={styles.sectionTitle}>
//                   🚨 Wicket Timeline
//                 </Text>

//                 {selectedMatch?.wickets?.map(
//                   (item: any, index: number) => (
//                     <View
//                       key={index}
//                       style={styles.wicketCard}>
                      
//                       <Text style={styles.wicketText}>
//                         {item}
//                       </Text>
//                     </View>
//                   ),
//                 )}
//               </View>

//               <View style={{height: 40}} />
//             </ScrollView>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// export default MatchesScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: StatusBar.currentHeight,
//     backgroundColor: '#07111F',
//     paddingHorizontal: 16,
//     paddingTop: 20,
//   },

//   header: {
//     color: '#fff',
//     fontSize: 30,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },

//   matchCard: {
//     backgroundColor: '#111C2E',
//     borderRadius: 20,
//     padding: 18,
//     marginBottom: 16,
//     borderWidth: 1,
//     borderColor: '#1E293B',
//   },

//   topRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },

//   teams: {
//     color: '#fff',
//     fontSize: 20,
//     fontWeight: 'bold',
//   },

//   info: {
//     color: '#CBD5E1',
//     marginTop: 8,
//     fontSize: 15,
//   },

//   result: {
//     color: '#22C55E',
//     marginTop: 10,
//     fontSize: 16,
//     fontWeight: 'bold',
//   },

//   winner: {
//     color: '#38BDF8',
//     marginTop: 6,
//     fontWeight: '600',
//   },

//   modalContainer: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.6)',
//     justifyContent: 'flex-end',
//   },

//   modalContent: {
//     height: '94%',
//     backgroundColor: '#07111F',
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//     paddingHorizontal: 18,
//     paddingTop: 20,
//   },

//   closeButton: {
//     alignSelf: 'flex-end',
//   },

//   modalTeams: {
//     color: '#fff',
//     fontSize: 28,
//     fontWeight: 'bold',
//     marginTop: 10,
//   },

//   modalResult: {
//     color: '#22C55E',
//     marginTop: 10,
//     fontSize: 18,
//     fontWeight: '600',
//   },

//   section: {
//     marginTop: 28,
//   },

//   sectionTitle: {
//     color: '#fff',
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginBottom: 16,
//   },

//   infoText: {
//     color: '#CBD5E1',
//     fontSize: 16,
//     marginBottom: 8,
//   },

//   scoreCard: {
//     backgroundColor: '#111C2E',
//     borderRadius: 18,
//     padding: 18,
//     marginBottom: 14,
//     borderWidth: 1,
//     borderColor: '#1E293B',
//   },

//   scoreTeam: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },

//   score: {
//     color: '#22C55E',
//     fontSize: 28,
//     fontWeight: 'bold',
//     marginTop: 10,
//   },

//   summaryCard: {
//     backgroundColor: '#111C2E',
//     borderRadius: 18,
//     padding: 16,
//     marginBottom: 14,
//     borderWidth: 1,
//     borderColor: '#1E293B',
//   },

//   playerName: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },

//   summaryText: {
//     color: '#CBD5E1',
//     marginBottom: 6,
//   },

//   overCard: {
//     backgroundColor: '#111C2E',
//     borderRadius: 18,
//     padding: 16,
//     marginBottom: 14,
//     borderWidth: 1,
//     borderColor: '#1E293B',
//   },

//   overTitle: {
//     color: '#22C55E',
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },

//   overRuns: {
//     color: '#fff',
//     marginTop: 8,
//     fontSize: 16,
//     fontWeight: '600',
//   },

//   wicketCard: {
//     backgroundColor: '#111C2E',
//     borderRadius: 16,
//     padding: 14,
//     marginBottom: 12,
//     borderLeftWidth: 4,
//     borderLeftColor: '#EF4444',
//   },

//   wicketText: {
//     color: '#fff',
//     fontSize: 15,
//   },
// });

// src/screens/Matches/MatchScreen.tsx 😎🔥

import React, { useCallback, useEffect, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  RefreshControl,
  Platform,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import Animated, {
  FadeInDown,
  FadeInUp,
  FadeInRight,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';

import COLORS from '../../constants/colors';

// 😎 Import Your Match API
import { getMatches } from '../../api/matchApi';

const theme = COLORS;

const MatchesScreen = () => {
  const [matches, setMatches] = useState<any[]>([]);

  const [selectedMatch, setSelectedMatch] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  const [refreshing, setRefreshing] = useState(false);

  // 😎 Glow Animation
  const glow = useSharedValue(0.7);

  useEffect(() => {
    glow.value = withRepeat(
      withTiming(1, {
        duration: 2500,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true,
    );

    return () => {
      glow.value = 0;
    };
  }, []);

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glow.value,
    transform: [
      {
        scale: glow.value,
      },
    ],
  }));

  // 😎 Fetch Matches
  const fetchMatches = useCallback(async () => {
    try {
      setLoading(true);

      const response = await getMatches();

      const data = Array.isArray(response?.matches)
        ? response.matches
        : [];

      setMatches(data);
    } catch (error) {
      console.log('Matches Fetch Error 😭', error);

      setMatches([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchMatches();
  }, [fetchMatches]);

  const onRefresh = async () => {
    setRefreshing(true);

    await fetchMatches();
  };

  // 😎 Loading Screen
  if (loading) {
    return (
      <View
        style={[
          styles.loaderContainer,
          {
            backgroundColor: theme.background,
          },
        ]}
      >
        <ActivityIndicator size="large" color={theme.primary} />

        <Text
          style={[
            styles.loaderText,
            {
              color: theme.text,
            },
          ]}
        >
          Loading Matches...
        </Text>
      </View>
    );
  }

  // 😎 Match Card
  const renderMatch = ({ item, index }: any) => {
    return (
      <Animated.View
        entering={FadeInDown.delay(index * 120).springify()}
      >
        <TouchableOpacity
          activeOpacity={0.85}
          style={[
            styles.matchCard,
            {
              backgroundColor: theme.card,
              borderColor: theme.border,
              shadowColor: theme.glow,
            },
          ]}
          onPress={() => setSelectedMatch(item)}
        >
          <View style={styles.topRow}>
            <Text
              style={[
                styles.teams,
                {
                  color: theme.text,
                },
              ]}
            >
              {item?.teamA?.name || item?.teamA || 'Team A'} vs{' '}
              {item?.teamB?.name || item?.teamB || 'Team B'}
            </Text>

            <Ionicons
              name="trophy"
              size={24}
              color={theme.primary}
            />
          </View>

          <Text
            style={[
              styles.info,
              {
                color: theme.subText,
              },
            ]}
          >
            📅 {item?.date || 'No Date'}
          </Text>

          <Text
            style={[
              styles.info,
              {
                color: theme.subText,
              },
            ]}
          >
            🏏 Overs : {item?.overs || 0}
          </Text>

          <Text
            style={[
              styles.result,
              {
                color: '#22C55E',
              },
            ]}
          >
            🏆 {item?.result || 'Match Result Pending'}
          </Text>

          <Text
            style={[
              styles.winner,
              {
                color: '#38BDF8',
              },
            ]}
          >
            Winner : {item?.winner || 'N/A'}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    );
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
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      {/* 😎 Animated Background */}
      <Animated.View
        style={[
          styles.glowCircleOne,
          glowStyle,
        ]}
      />

      <Animated.View
        style={[
          styles.glowCircleTwo,
          glowStyle,
        ]}
      />

      {/* 😎 Header */}
      <Animated.View entering={FadeInUp.duration(700)}>
        <Text
          style={[
            styles.header,
            {
              color: theme.text,
            },
          ]}
        >
          🏏 Match History
        </Text>

        <Text
          style={[
            styles.subHeader,
            {
              color: theme.subText,
            },
          ]}
        >
          View all saved cricket battles 😎
        </Text>
      </Animated.View>

      {/* 😎 Empty State */}
      {matches.length === 0 ? (
        <Animated.View
          entering={FadeInRight.duration(700)}
          style={styles.emptyContainer}
        >
          <Ionicons
            name="calendar-outline"
            size={90}
            color={theme.primary}
          />

          <Text
            style={[
              styles.emptyTitle,
              {
                color: theme.text,
              },
            ]}
          >
            No Matches Available Yet 😭
          </Text>

          <Text
            style={[
              styles.emptySubTitle,
              {
                color: theme.subText,
              },
            ]}
          >
            Play your first gully cricket match and
            it will appear here automatically 😎
          </Text>
        </Animated.View>
      ) : (
        <FlatList
          data={matches}
          renderItem={renderMatch}
          keyExtractor={(item, index) =>
            item?._id?.toString() || index.toString()
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 120,
          }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={theme.primary}
            />
          }
        />
      )}

      {/* 😎 Match Details Modal */}
      <Modal
        visible={selectedMatch !== null}
        animationType="slide"
        transparent
      >
        <View style={styles.modalContainer}>
          <View
            style={[
              styles.modalContent,
              {
                backgroundColor: theme.background,
              },
            ]}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
            >
              {/* Close Button */}
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setSelectedMatch(null)}
              >
                <Ionicons
                  name="close"
                  size={28}
                  color={theme.text}
                />
              </TouchableOpacity>

              {/* Teams */}
              <Text
                style={[
                  styles.modalTeams,
                  {
                    color: theme.text,
                  },
                ]}
              >
                {selectedMatch?.teamA?.name ||
                  selectedMatch?.teamA}{' '}
                vs{' '}
                {selectedMatch?.teamB?.name ||
                  selectedMatch?.teamB}
              </Text>

              {/* Result */}
              <Text
                style={[
                  styles.modalResult,
                  {
                    color: '#22C55E',
                  },
                ]}
              >
                {selectedMatch?.result ||
                  'Result Pending'}
              </Text>

              {/* Match Info */}
              <View
                style={[
                  styles.section,
                  {
                    backgroundColor: theme.card,
                    borderColor: theme.border,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.sectionTitle,
                    {
                      color: theme.text,
                    },
                  ]}
                >
                  📌 Match Information
                </Text>

                <Text
                  style={[
                    styles.infoText,
                    {
                      color: theme.subText,
                    },
                  ]}
                >
                  📅 Date :{' '}
                  {selectedMatch?.date || 'N/A'}
                </Text>

                <Text
                  style={[
                    styles.infoText,
                    {
                      color: theme.subText,
                    },
                  ]}
                >
                  🏏 Overs :{' '}
                  {selectedMatch?.overs || 0}
                </Text>

                <Text
                  style={[
                    styles.infoText,
                    {
                      color: theme.subText,
                    },
                  ]}
                >
                  🪙 Toss Winner :{' '}
                  {selectedMatch?.tossWinner || 'N/A'}
                </Text>

                <Text
                  style={[
                    styles.infoText,
                    {
                      color: theme.subText,
                    },
                  ]}
                >
                  🎯 Decision :{' '}
                  {selectedMatch?.tossDecision || 'N/A'}
                </Text>

                <Text
                  style={[
                    styles.infoText,
                    {
                      color: theme.subText,
                    },
                  ]}
                >
                  🏆 Winner :{' '}
                  {selectedMatch?.winner || 'N/A'}
                </Text>
              </View>

              {/* Score Section */}
              <View
                style={[
                  styles.section,
                  {
                    backgroundColor: theme.card,
                    borderColor: theme.border,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.sectionTitle,
                    {
                      color: theme.text,
                    },
                  ]}
                >
                  📊 Match Score
                </Text>

                <View style={styles.scoreBox}>
                  <Text
                    style={[
                      styles.scoreTeam,
                      {
                        color: theme.text,
                      },
                    ]}
                  >
                    {selectedMatch?.teamA?.name ||
                      selectedMatch?.teamA}
                  </Text>

                  <Text
                    style={[
                      styles.score,
                      {
                        color: theme.primary,
                      },
                    ]}
                  >
                    {selectedMatch?.teamAScore ||
                      '0/0'}
                  </Text>
                </View>

                <View style={styles.scoreBox}>
                  <Text
                    style={[
                      styles.scoreTeam,
                      {
                        color: theme.text,
                      },
                    ]}
                  >
                    {selectedMatch?.teamB?.name ||
                      selectedMatch?.teamB}
                  </Text>

                  <Text
                    style={[
                      styles.score,
                      {
                        color: theme.primary,
                      },
                    ]}
                  >
                    {selectedMatch?.teamBScore ||
                      '0/0'}
                  </Text>
                </View>
              </View>

              <View style={{ height: 60 }} />
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MatchesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingHorizontal: 16,

    paddingTop:
      Platform.OS === 'android'
        ? (StatusBar.currentHeight || 0) + 12
        : 50,
  },

  loaderContainer: {
    flex: 1,

    justifyContent: 'center',

    alignItems: 'center',
  },

  loaderText: {
    marginTop: 14,

    fontSize: 15,

    fontWeight: '600',
  },

  glowCircleOne: {
    position: 'absolute',

    width: 320,

    height: 320,

    borderRadius: 200,

    backgroundColor: '#22D3EE20',

    top: -120,

    right: -100,
  },

  glowCircleTwo: {
    position: 'absolute',

    width: 260,

    height: 260,

    borderRadius: 200,

    backgroundColor: '#06B6D420',

    bottom: 100,

    left: -100,
  },

  header: {
    fontSize: 32,

    fontWeight: 'bold',
  },

  subHeader: {
    fontSize: 15,

    marginTop: 6,

    marginBottom: 24,
  },

  matchCard: {
    borderRadius: 24,

    padding: 18,

    marginBottom: 16,

    borderWidth: 1,

    shadowOffset: {
      width: 0,
      height: 0,
    },

    shadowOpacity: 0.6,

    shadowRadius: 12,

    elevation: 10,
  },

  topRow: {
    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'center',
  },

  teams: {
    fontSize: 20,

    fontWeight: 'bold',

    flex: 1,

    paddingRight: 10,
  },

  info: {
    marginTop: 8,

    fontSize: 15,
  },

  result: {
    marginTop: 12,

    fontSize: 16,

    fontWeight: 'bold',
  },

  winner: {
    marginTop: 6,

    fontSize: 15,

    fontWeight: '600',
  },

  emptyContainer: {
    flex: 1,

    justifyContent: 'center',

    alignItems: 'center',

    paddingHorizontal: 20,
  },

  emptyTitle: {
    fontSize: 24,

    fontWeight: 'bold',

    marginTop: 20,

    textAlign: 'center',
  },

  emptySubTitle: {
    marginTop: 12,

    fontSize: 15,

    textAlign: 'center',

    lineHeight: 24,
  },

  modalContainer: {
    flex: 1,

    backgroundColor: 'rgba(0,0,0,0.6)',

    justifyContent: 'flex-end',
  },

  modalContent: {
    height: '92%',

    borderTopLeftRadius: 30,

    borderTopRightRadius: 30,

    paddingHorizontal: 18,

    paddingTop: 20,
  },

  closeButton: {
    alignSelf: 'flex-end',
  },

  modalTeams: {
    fontSize: 28,

    fontWeight: 'bold',

    marginTop: 10,
  },

  modalResult: {
    fontSize: 18,

    marginTop: 10,

    fontWeight: '600',
  },

  section: {
    marginTop: 24,

    borderRadius: 22,

    padding: 18,

    borderWidth: 1,
  },

  sectionTitle: {
    fontSize: 22,

    fontWeight: 'bold',

    marginBottom: 16,
  },

  infoText: {
    fontSize: 15,

    marginBottom: 10,
  },

  scoreBox: {
    backgroundColor: '#0B1220',

    borderRadius: 18,

    padding: 18,

    marginBottom: 14,
  },

  scoreTeam: {
    fontSize: 18,

    fontWeight: 'bold',
  },

  score: {
    fontSize: 30,

    fontWeight: 'bold',

    marginTop: 10,
  },
});