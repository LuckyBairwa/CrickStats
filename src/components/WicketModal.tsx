// import React, { useState } from 'react';

// import {
//   Modal,
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
// } from 'react-native';

// import COLORS from '../constants/colors';

// const wicketTypes = ['Bowled', 'Caught', 'LBW', 'Run Out', 'Stumped'];

// const WicketModal = ({ visible, onClose, onConfirm }: any) => {
//   const [wicketType, setWicketType] = useState('');

//   const [outPlayer, setOutPlayer] = useState('STRIKER');

//   const [runsCompleted, setRunsCompleted] = useState(0);

//   const [newBatterEnd, setNewBatterEnd] = useState('STRIKER');

//   const handleSubmit = () => {
//     const payload = {
//       wicketType,

//       outPlayer,

//       runsCompleted,

//       newBatterEnd,
//     };

//     onConfirm(payload);

//     setWicketType('');

//     setRunsCompleted(0);

//     setOutPlayer('STRIKER');

//     setNewBatterEnd('STRIKER');
//   };

//   return (
//     <Modal visible={visible} transparent animationType="slide">
//       <View style={styles.overlay}>
//         <ScrollView contentContainerStyle={styles.scrollContainer}>
//           <View style={styles.container}>
//             {/* 😎 TITLE */}
//             <Text style={styles.title}>Wicket Details 😎</Text>

//             {/* 😎 WICKET TYPE */}
//             <Text style={styles.label}>Wicket Type</Text>

//             <View style={styles.row}>
//               {wicketTypes.map(item => (
//                 <TouchableOpacity
//                   key={item}
//                   onPress={() => setWicketType(item)}
//                   style={[
//                     styles.btn,

//                     wicketType === item && {
//                       backgroundColor: COLORS.primary,
//                     },
//                   ]}
//                 >
//                   <Text
//                     style={[
//                       styles.btnText,

//                       wicketType === item && {
//                         color: '#000',
//                       },
//                     ]}
//                   >
//                     {item}
//                   </Text>
//                 </TouchableOpacity>
//               ))}
//             </View>

//             {/* 😎 OUT PLAYER */}
//             <Text style={styles.label}>Out Player</Text>

//             <View style={styles.row}>
//               {['STRIKER', 'NON_STRIKER'].map(item => (
//                 <TouchableOpacity
//                   key={item}
//                   onPress={() => setOutPlayer(item)}
//                   style={[
//                     styles.btn,

//                     outPlayer === item && {
//                       backgroundColor: COLORS.primary,
//                     },
//                   ]}
//                 >
//                   <Text
//                     style={[
//                       styles.btnText,

//                       outPlayer === item && {
//                         color: '#000',
//                       },
//                     ]}
//                   >
//                     {item}
//                   </Text>
//                 </TouchableOpacity>
//               ))}
//             </View>

//             {/* 😎 RUNS COMPLETED */}
//             <Text style={styles.label}>Runs Completed</Text>

//             <View style={styles.row}>
//               {[0, 1, 2, 3].map(item => (
//                 <TouchableOpacity
//                   key={item}
//                   onPress={() => setRunsCompleted(item)}
//                   style={[
//                     styles.btn,

//                     runsCompleted === item && {
//                       backgroundColor: COLORS.primary,
//                     },
//                   ]}
//                 >
//                   <Text
//                     style={[
//                       styles.btnText,

//                       runsCompleted === item && {
//                         color: '#000',
//                       },
//                     ]}
//                   >
//                     {item}
//                   </Text>
//                 </TouchableOpacity>
//               ))}
//             </View>

//             {/* 😎 NEW BATTER END */}
//             <Text style={styles.label}>New Batter End</Text>

//             <View style={styles.row}>
//               {['STRIKER', 'NON_STRIKER'].map(item => (
//                 <TouchableOpacity
//                   key={item}
//                   onPress={() => setNewBatterEnd(item)}
//                   style={[
//                     styles.btn,

//                     newBatterEnd === item && {
//                       backgroundColor: COLORS.primary,
//                     },
//                   ]}
//                 >
//                   <Text
//                     style={[
//                       styles.btnText,

//                       newBatterEnd === item && {
//                         color: '#000',
//                       },
//                     ]}
//                   >
//                     {item}
//                   </Text>
//                 </TouchableOpacity>
//               ))}
//             </View>

//             {/* 😎 ACTIONS */}
//             <View style={styles.actionRow}>
//               <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
//                 <Text style={styles.actionText}>Cancel</Text>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 style={styles.confirmBtn}
//                 onPress={handleSubmit}
//               >
//                 <Text
//                   style={[
//                     styles.actionText,
//                     {
//                       color: '#000',
//                     },
//                   ]}
//                 >
//                   Confirm
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </ScrollView>
//       </View>
//     </Modal>
//   );
// };

// export default WicketModal;

// const styles = StyleSheet.create({
//   overlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.7)',
//     justifyContent: 'flex-end',
//   },

//   scrollContainer: {
//     flexGrow: 1,
//     justifyContent: 'flex-end',
//   },

//   container: {
//     backgroundColor: COLORS.card,
//     borderTopLeftRadius: 28,
//     borderTopRightRadius: 28,
//     padding: 20,
//   },

//   title: {
//     color: COLORS.text,
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },

//   label: {
//     color: COLORS.text,
//     fontSize: 16,
//     fontWeight: '700',
//     marginBottom: 12,
//     marginTop: 16,
//   },

//   row: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//   },

//   btn: {
//     backgroundColor: COLORS.background,
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     borderRadius: 14,
//     marginRight: 10,
//     marginBottom: 10,
//   },

//   btnText: {
//     color: COLORS.text,
//     fontWeight: '700',
//   },

//   actionRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 30,
//   },

//   cancelBtn: {
//     width: '47%',
//     backgroundColor: '#EF4444',
//     paddingVertical: 16,
//     borderRadius: 18,
//     alignItems: 'center',
//   },

//   confirmBtn: {
//     width: '47%',
//     backgroundColor: COLORS.primary,
//     paddingVertical: 16,
//     borderRadius: 18,
//     alignItems: 'center',
//   },

//   actionText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
// });


// src/components/WicketModal.tsx 😎🔥

import React, { useEffect, useState } from 'react';

import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';

import COLORS from '../constants/colors';

const wicketTypes = ['Bowled', 'Caught', 'LBW', 'Run Out', 'Stumped'];

const WicketModal = ({
  visible,
  onClose,
  onConfirm,
  inning,
  bowlingPlayers = [],
}: any) => {
  // =====================================================
  // 😎 STATES
  // =====================================================

  const [wicketType, setWicketType] = useState('');

  const [outPlayer, setOutPlayer] = useState<'striker' | 'nonStriker'>(
    'striker',
  );

  const [runsCompleted, setRunsCompleted] = useState(0);

  const [newBatterEnd, setNewBatterEnd] = useState<
    'striker' | 'nonStriker'
  >('striker');

  const [selectedFielder, setSelectedFielder] = useState<any>(null);

  // =====================================================
  // 😎 RESET FORM
  // =====================================================

  useEffect(() => {
    if (visible) {
      setWicketType('');

      setOutPlayer('striker');

      setRunsCompleted(0);

      setNewBatterEnd('striker');

      setSelectedFielder(null);
    }
  }, [visible]);

  // =====================================================
  // 😎 SUBMIT
  // =====================================================

  const handleSubmit = () => {
    // 😎 Validation
    if (!wicketType) {
      Alert.alert('Select Wicket Type 😎');

      return;
    }

    if (wicketType === 'Caught' && !selectedFielder) {
      Alert.alert('Select Fielder 😎');

      return;
    }

    const payload = {
      wicketType,

      outPlayer,

      runsCompleted,

      newBatterEnd,

      fielder: selectedFielder || null,

      // 😎 IMPORTANT
      outPlayerId:
        outPlayer === 'striker'
          ? inning?.striker?._id
          : inning?.nonStriker?._id,
    };

    onConfirm(payload);
  };

  // =====================================================
  // 😎 UI
  // =====================================================

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            {/* ===================================================== */}
            {/* 😎 TITLE */}
            {/* ===================================================== */}

            <Text style={styles.title}>Wicket Details 😎</Text>

            {/* ===================================================== */}
            {/* 😎 WICKET TYPE */}
            {/* ===================================================== */}

            <Text style={styles.label}>Wicket Type</Text>

            <View style={styles.row}>
              {wicketTypes.map(item => (
                <TouchableOpacity
                  key={item}
                  activeOpacity={0.8}
                  onPress={() => setWicketType(item)}
                  style={[
                    styles.btn,

                    wicketType === item && styles.activeBtn,
                  ]}
                >
                  <Text
                    style={[
                      styles.btnText,

                      wicketType === item && styles.activeBtnText,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* ===================================================== */}
            {/* 😎 OUT PLAYER */}
            {/* ===================================================== */}

            <Text style={styles.label}>Who Got Out?</Text>

            <View style={styles.row}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setOutPlayer('striker')}
                style={[
                  styles.btn,

                  outPlayer === 'striker' && styles.activeBtn,
                ]}
              >
                <Text
                  style={[
                    styles.btnText,

                    outPlayer === 'striker' && styles.activeBtnText,
                  ]}
                >
                  {inning?.striker?.name || 'Striker'} ⭐
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setOutPlayer('nonStriker')}
                style={[
                  styles.btn,

                  outPlayer === 'nonStriker' && styles.activeBtn,
                ]}
              >
                <Text
                  style={[
                    styles.btnText,

                    outPlayer === 'nonStriker' && styles.activeBtnText,
                  ]}
                >
                  {inning?.nonStriker?.name || 'Non-Striker'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* ===================================================== */}
            {/* 😎 RUNS COMPLETED */}
            {/* ===================================================== */}

            <Text style={styles.label}>Runs Completed</Text>

            <View style={styles.row}>
              {[0, 1, 2, 3].map(item => (
                <TouchableOpacity
                  key={item}
                  activeOpacity={0.8}
                  onPress={() => setRunsCompleted(item)}
                  style={[
                    styles.btn,

                    runsCompleted === item && styles.activeBtn,
                  ]}
                >
                  <Text
                    style={[
                      styles.btnText,

                      runsCompleted === item && styles.activeBtnText,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* ===================================================== */}
            {/* 😎 NEW BATTER POSITION */}
            {/* ===================================================== */}

            <Text style={styles.label}>New Batter Position</Text>

            <View style={styles.row}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setNewBatterEnd('striker')}
                style={[
                  styles.btn,

                  newBatterEnd === 'striker' && styles.activeBtn,
                ]}
              >
                <Text
                  style={[
                    styles.btnText,

                    newBatterEnd === 'striker' && styles.activeBtnText,
                  ]}
                >
                  Play as Striker
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setNewBatterEnd('nonStriker')}
                style={[
                  styles.btn,

                  newBatterEnd === 'nonStriker' && styles.activeBtn,
                ]}
              >
                <Text
                  style={[
                    styles.btnText,

                    newBatterEnd === 'nonStriker' && styles.activeBtnText,
                  ]}
                >
                  Play as Non-Striker
                </Text>
              </TouchableOpacity>
            </View>

            {/* ===================================================== */}
            {/* 😎 FIELDER SELECTION */}
            {/* ===================================================== */}

            {wicketType === 'Caught' && (
              <>
                <Text style={styles.label}>Select Fielder 😎</Text>

                <View style={styles.row}>
                  {bowlingPlayers?.map((player: any) => (
                    <TouchableOpacity
                      key={player?._id}
                      activeOpacity={0.8}
                      onPress={() => setSelectedFielder(player)}
                      style={[
                        styles.btn,

                        selectedFielder?._id === player?._id &&
                          styles.activeBtn,
                      ]}
                    >
                      <Text
                        style={[
                          styles.btnText,

                          selectedFielder?._id === player?._id &&
                            styles.activeBtnText,
                        ]}
                      >
                        {player?.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </>
            )}

            {/* ===================================================== */}
            {/* 😎 ACTION BUTTONS */}
            {/* ===================================================== */}

            <View style={styles.actionRow}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.cancelBtn}
                onPress={onClose}
              >
                <Text style={styles.actionText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.confirmBtn}
                onPress={handleSubmit}
              >
                <Text style={[styles.actionText, { color: '#000' }]}>
                  Confirm
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default WicketModal;

// =====================================================
// 😎 STYLES
// =====================================================

const styles = StyleSheet.create({
  overlay: {
    flex: 1,

    backgroundColor: 'rgba(0,0,0,0.7)',

    justifyContent: 'flex-end',
  },

  scrollContainer: {
    flexGrow: 1,

    justifyContent: 'flex-end',
  },

  container: {
    backgroundColor: COLORS.card,

    borderTopLeftRadius: 28,

    borderTopRightRadius: 28,

    padding: 20,

    paddingBottom: 30,
  },

  title: {
    color: COLORS.text,

    fontSize: 24,

    fontWeight: 'bold',

    marginBottom: 20,
  },

  label: {
    color: COLORS.text,

    fontSize: 16,

    fontWeight: '700',

    marginBottom: 12,

    marginTop: 16,
  },

  row: {
    flexDirection: 'row',

    flexWrap: 'wrap',
  },

  btn: {
    backgroundColor: COLORS.background,

    borderWidth: 1,

    borderColor: COLORS.border,

    paddingVertical: 12,

    paddingHorizontal: 16,

    borderRadius: 14,

    marginRight: 10,

    marginBottom: 10,
  },

  activeBtn: {
    backgroundColor: COLORS.primary,

    borderColor: COLORS.primary,
  },

  btnText: {
    color: COLORS.text,

    fontWeight: '700',
  },

  activeBtnText: {
    color: '#000',
  },

  actionRow: {
    flexDirection: 'row',

    justifyContent: 'space-between',

    marginTop: 30,
  },

  cancelBtn: {
    width: '47%',

    backgroundColor: '#EF4444',

    paddingVertical: 16,

    borderRadius: 18,

    alignItems: 'center',
  },

  confirmBtn: {
    width: '47%',

    backgroundColor: COLORS.primary,

    paddingVertical: 16,

    borderRadius: 18,

    alignItems: 'center',
  },

  actionText: {
    color: '#fff',

    fontWeight: 'bold',

    fontSize: 16,
  },
});