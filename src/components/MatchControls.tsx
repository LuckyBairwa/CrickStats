// import React from 'react';

// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// import COLORS from '../constants/colors';

// const MatchControls = ({ onUndo, onRedo }: any) => {
//   return (
//     <View style={styles.row}>
//       <TouchableOpacity style={styles.btn} onPress={onUndo}>
//         <Text style={styles.text}>Undo</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.btn} onPress={onRedo}>
//         <Text style={styles.text}>Redo</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.btn}>
//         <Text style={styles.text}>Rest</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.btn}>
//         <Text style={styles.text}>End</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default MatchControls;

// const styles = StyleSheet.create({
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     margin: 16,
//   },

//   btn: {
//     width: '23%',
//     height: 52,
//     borderRadius: 16,
//     backgroundColor: COLORS.card,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: COLORS.border,
//   },

//   text: {
//     color: COLORS.text,
//     fontWeight: '700',
//   },
// });


// src/components/MatchControls.tsx 😎🔥

import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import COLORS from '../constants/colors';

const MatchControls = ({
  onUndo,
  onRedo,
  onRest,
  onEnd,
}: any) => {
  return (
    <View style={styles.row}>
      {/* 😎 UNDO */}
      <TouchableOpacity
        style={styles.btn}
        onPress={onUndo}
      >
        <Text style={styles.text}>Undo</Text>
      </TouchableOpacity>

      {/* 😎 REDO */}
      <TouchableOpacity
        style={styles.btn}
        onPress={onRedo}
      >
        <Text style={styles.text}>Redo</Text>
      </TouchableOpacity>

      {/* 😎 REST */}
      <TouchableOpacity
        style={[styles.btn, styles.specialBtn]}
        onPress={onRest}
      >
        <Text
          style={[styles.text, styles.specialText]}
        >
          Rest
        </Text>
      </TouchableOpacity>

      {/* 😎 END */}
      <TouchableOpacity
        style={[styles.btn, styles.specialBtn]}
        onPress={onEnd}
      >
        <Text
          style={[styles.text, styles.specialText]}
        >
          End
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default MatchControls;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',

    justifyContent: 'space-between',

    margin: 16,
  },

  // 😎 NORMAL BTN
  btn: {
    width: '23%',

    height: 54,

    borderRadius: 16,

    backgroundColor: COLORS.card,

    justifyContent: 'center',

    alignItems: 'center',

    borderWidth: 1,

    borderColor: COLORS.border,
  },

  // 😎 SPECIAL CYAN BTN
  specialBtn: {
    borderColor: COLORS.primary,

    backgroundColor: '#0F172A',

    shadowColor: COLORS.primary,

    shadowOffset: {
      width: 0,
      height: 0,
    },

    shadowOpacity: 0.45,

    shadowRadius: 8,

    elevation: 6,
  },

  text: {
    color: COLORS.text,

    fontWeight: '700',

    fontSize: 14,
  },

  specialText: {
    color: COLORS.primary,
  },
});