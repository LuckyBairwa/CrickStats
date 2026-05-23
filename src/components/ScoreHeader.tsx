// import React from 'react';

// import { View, Text, StyleSheet } from 'react-native';

// import COLORS from '../constants/colors';

// const ScoreHeader = ({ inning, totalOvers, isSecondInnings = false }: any) => {
//   return (
//     <View style={styles.card}>
//       <Text style={styles.team}>{inning?.battingTeam?.name || 'Team'}</Text>

//       <Text style={styles.score}>
//         {inning?.totalRuns || 0}/{inning?.wickets || 0}
//       </Text>

//       <Text style={styles.overs}>
//         Overs: {inning?.oversPlayed || 0}/{totalOvers || 0}
//       </Text>

//       <View style={styles.row}>
//         <Text style={styles.info}>CRR: {inning?.currentRunRate || 0}</Text>

//         <Text style={styles.info}>
//           Projected Score: {inning?.projectedScore || 0}
//         </Text>
//       </View>

//       {inning?.target > 0 && (
//         <View style={styles.row}>
//           <Text style={styles.info}>Target: {inning?.target}</Text>

//           <Text style={styles.info}>RRR: {inning?.requiredRunRate || 0}</Text>
//         </View>
//       )}
//     </View>
//   );
// };

// export default ScoreHeader;

// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: COLORS.card,
//     margin: 16,
//     borderRadius: 24,
//     padding: 20,
//     borderWidth: 1,
//     borderColor: COLORS.border,
//   },

//   team: {
//     color: COLORS.primary,
//     fontSize: 18,
//     fontWeight: '700',
//   },

//   score: {
//     color: COLORS.text,
//     fontSize: 48,
//     fontWeight: 'bold',
//     marginTop: 8,
//   },

//   overs: {
//     color: COLORS.subText,
//     marginTop: 6,
//     fontSize: 16,
//   },

//   oversContainer: {
//     flexDirection: 'row',

//     justifyContent: 'space-between',

//     alignItems: 'center',

//     marginTop: 8,
//   },

//   totalOvers: {
//     color: COLORS.primary,

//     fontSize: 15,

//     fontWeight: '700',
//   },

//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 16,
//   },

//   info: {
//     color: COLORS.primary,
//     fontWeight: '700',
//   },
// });

// import React from 'react';

// import { View, Text, StyleSheet } from 'react-native';

// import COLORS from '../constants/colors';

// const ScoreHeader = ({ inning, totalOvers, isSecondInnings = false }: any) => {
//   return (
//     <View style={styles.card}>
//       {/* 😎 TEAM */}
//       <Text style={styles.team}>{inning?.battingTeam?.name || 'Team'}</Text>

//       {/* 😎 SCORE */}
//       <Text style={styles.score}>
//         {inning?.totalRuns || 0}/{inning?.wickets || 0}
//       </Text>

//       {/* 😎 OVERS */}
//       <Text style={styles.overs}>
//         Overs: {inning?.oversPlayed || '0.0'} / {totalOvers}
//       </Text>

//       {/* 😎 STATS */}
//       <View style={styles.statsContainer}>
//         <View style={styles.statBox}>
//           <Text style={styles.statLabel}>CRR</Text>

//           <Text style={styles.statValue}>{inning?.currentRunRate || 0}</Text>
//         </View>

//         <View style={styles.statBox}>
//           <Text style={styles.statLabel}>Projected</Text>

//           <Text style={styles.statValue}>{inning?.projectedScore || 0}</Text>
//         </View>
//       </View>

//       {/* 😎 SECOND INNING DATA */}
//       {isSecondInnings && (
//         <>
//           <View style={styles.statsContainer}>
//             <View style={styles.statBox}>
//               <Text style={styles.statLabel}>RRR</Text>

//               <Text style={styles.statValue}>
//                 {inning?.requiredRunRate || '0.00'}
//               </Text>
//             </View> 
//             <View style={styles.statBox}>
//               <Text style={styles.statLabel}>Target</Text>

//               <Text style={styles.statValue}>{inning?.target || 0}</Text>
//             </View>
//           </View>

//           {/* 😎 NEED INFO */}
//           <View style={styles.needBox}>
//             <Text style={styles.needText}>
//               Need {inning?.runsNeeded || 0} runs in {inning?.ballsLeft || 0}{' '}
//               balls
//             </Text>
//           </View>
//         </>
//       )}
//     </View>
//   );
// };

// export default ScoreHeader;

// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: COLORS.card,

//     margin: 16,

//     borderRadius: 28,

//     padding: 22,

//     borderWidth: 1,

//     borderColor: COLORS.border,

//     overflow: 'hidden',
//   },

//   team: {
//     color: COLORS.primary,

//     fontSize: 18,

//     fontWeight: '700',
//   },

//   score: {
//     color: COLORS.text,

//     fontSize: 52,

//     fontWeight: 'bold',

//     marginTop: 10,
//   },

//   overs: {
//     color: COLORS.subText,

//     marginTop: 8,

//     fontSize: 16,
//   },

//   statsContainer: {
//     flexDirection: 'row',

//     justifyContent: 'space-between',

//     marginTop: 18,
//   },

//   statBox: {
//     flex: 1,

//     backgroundColor: '#0F172A',

//     marginHorizontal: 4,

//     padding: 14,

//     borderRadius: 18,

//     borderWidth: 1,

//     borderColor: '#164E63',

//     alignItems: 'center',
//   },

//   statLabel: {
//     color: COLORS.subText,

//     fontSize: 13,

//     marginBottom: 6,
//   },

//   statValue: {
//     color: COLORS.primary,

//     fontSize: 20,

//     fontWeight: '700',
//   },

//   needBox: {
//     marginTop: 18,

//     backgroundColor: '#082F49',

//     paddingVertical: 14,

//     borderRadius: 18,

//     alignItems: 'center',

//     borderWidth: 1,

//     borderColor: COLORS.primary,
//   },

//   needText: {
//     color: '#fff',

//     fontSize: 17,

//     fontWeight: '700',
//   },
// });


import React from 'react';

import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import COLORS from '../constants/colors';

const ScoreHeader = ({
  inning,
  totalOvers,
  isSecondInnings = false,
}: any) => {

  return (
    <View style={styles.card}>

      {/* 😎 TOP ROW */}
      <View style={styles.topRow}>

        <View style={{ flex: 1 }}>
          <Text
            numberOfLines={1}
            style={styles.team}
          >
            {inning?.battingTeam?.name || 'Team'}
          </Text>

          <Text style={styles.overs}>
            {inning?.oversPlayed || '0.0'} / {totalOvers} Ov
          </Text>
        </View>

        <Text style={styles.score}>
          {inning?.totalRuns || 0}/{inning?.wickets || 0}
        </Text>

      </View>

      {/* 😎 STATS */}
      <View style={styles.statsRow}>

        <View style={styles.statBox}>
          <Text style={styles.label}>CRR</Text>

          <Text style={styles.value}>
            {inning?.currentRunRate || 0}
          </Text>
        </View>

        <View style={styles.statBox}>
          <Text style={styles.label}>PROJ</Text>

          <Text style={styles.value}>
            {inning?.projectedScore || 0}
          </Text>
        </View>

        {isSecondInnings && (
          <>
            <View style={styles.statBox}>
              <Text style={styles.label}>RRR</Text>

              <Text style={styles.value}>
                {inning?.requiredRunRate || 0}
              </Text>
            </View>

            <View style={styles.statBox}>
              <Text style={styles.label}>TGT</Text>

              <Text style={styles.value}>
                {inning?.target || 0}
              </Text>
            </View>
          </>
        )}

      </View>

      {/* 😎 NEED INFO */}
      {isSecondInnings && (
        <View style={styles.needBox}>

          <Text
            numberOfLines={1}
            style={styles.needText}
          >
            Need {inning?.runsNeeded || 0} in{' '}
            {inning?.ballsLeft || 0} balls
          </Text>

        </View>
      )}

    </View>
  );
};

export default ScoreHeader;

const styles = StyleSheet.create({

  card: {
    backgroundColor: COLORS.card,

    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 8,

    borderRadius: 22,

    padding: 16,

    borderWidth: 1,
    borderColor: COLORS.border,
  },

  topRow: {
    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'center',
  },

  team: {
    color: COLORS.primary,

    fontSize: 17,

    fontWeight: '700',
  },

  overs: {
    color: COLORS.subText,

    marginTop: 4,

    fontSize: 13,
  },

  score: {
    color: COLORS.text,

    fontSize: 34,

    fontWeight: 'bold',
  },

  statsRow: {
    flexDirection: 'row',

    marginTop: 14,

    justifyContent: 'space-between',
  },

  statBox: {
    flex: 1,

    backgroundColor: '#0F172A',

    marginHorizontal: 3,

    paddingVertical: 10,

    borderRadius: 14,

    alignItems: 'center',
  },

  label: {
    color: COLORS.subText,

    fontSize: 11,
  },

  value: {
    color: COLORS.primary,

    fontSize: 16,

    fontWeight: '700',

    marginTop: 3,
  },

  needBox: {
    marginTop: 12,

    backgroundColor: '#082F49',

    borderRadius: 14,

    paddingVertical: 10,

    alignItems: 'center',
  },

  needText: {
    color: '#fff',

    fontWeight: '700',

    fontSize: 14,
  },
});