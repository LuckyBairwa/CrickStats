// src/screens/Players/EditPlayerScreen.tsx 😎🔥

import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
} from 'react-native';

import { useRoute, useNavigation } from '@react-navigation/native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import Animated, {
  FadeInDown,
  FadeInRight,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  cancelAnimation,
} from 'react-native-reanimated';

import COLORS from '../../constants/colors';

import { updatePlayer } from '../../api/playerApi';

const theme = COLORS;

const EditPlayerScreen = () => {
  const route = useRoute<any>();

  const navigation = useNavigation<any>();

  const player = route.params.player;

  const [loading, setLoading] = useState(false);

  const glow = useSharedValue(0.5);

  useEffect(() => {
    glow.value = withRepeat(
      withTiming(1, {
        duration: 1800,
        easing: Easing.linear,
      }),
      -1,
      true,
    );

    return () => {
      cancelAnimation;
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

  const [formData, setFormData] = useState({
    name: player?.name || '',

    nickName: player?.nickName || '',

    jerseyNumber: String(
      player?.jerseyNumber || '',
    ),

    gender: player?.gender || 'Male',

    role: player?.role || 'Player',

    batsmanType:
      player?.batsmanType ||
      'Right-handed',

    bowlerType:
      player?.bowlerType ||
      'Right-arm',

    bowlingStyle:
      player?.bowlingStyle ||
      'Medium',
  });

  const handleChange = (
    key: string,
    value: string,
  ) => {
    setFormData(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);

      const payload = {
        ...formData,

        jerseyNumber: Number(
          formData.jerseyNumber,
        ),
      };

      console.log(
        'UPDATE PAYLOAD 😎',
        payload,
      );

      await updatePlayer(
        player._id,
        payload,
      );

      Alert.alert(
        'Success 😎',
        'Player Updated Successfully',
      );

      navigation.goBack();
    } catch (error: any) {
      console.log(
        'UPDATE ERROR 😭',
        error?.response?.data ||
          error?.message,
      );

      Alert.alert(
        'Error ❌',
        'Failed To Update Player',
      );
    } finally {
      setLoading(false);
    }
  };

  const renderOptions = (
    title: string,
    field: string,
    options: string[],
  ) => {
    return (
      <Animated.View
        entering={FadeInRight.delay(300)}
        style={styles.optionWrapper}
      >
        <Text style={styles.label}>
          {title}
        </Text>

        <View style={styles.optionRow}>
          {options.map(option => {
            const active =
              formData[
                field as keyof typeof formData
              ] === option;

            return (
              <TouchableOpacity
                key={option}
                activeOpacity={0.8}
                onPress={() =>
                  handleChange(field, option)
                }
                style={[
                  styles.optionBtn,
                  {
                    backgroundColor: active
                      ? theme.primary
                      : theme.card,

                    borderColor: active
                      ? theme.primary
                      : theme.border,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.optionText,
                    {
                      color: active
                        ? '#000'
                        : theme.text,
                    },
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView
      style={styles.safeArea}
    >
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      {loading && (
        <View style={styles.loaderOverlay}>
          <ActivityIndicator
            size="large"
            color={theme.primary}
          />
        </View>
      )}

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={
          Platform.OS === 'ios'
            ? 'padding'
            : undefined
        }
      >
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
        >
          {/* Glow */}
          <Animated.View
            style={[
              styles.glowCircle,
              glowStyle,
            ]}
          />

          {/* Header */}
          <Animated.View
            entering={FadeInDown.duration(
              700,
            )}
            style={styles.header}
          >
            <Ionicons
              name="create-outline"
              size={30}
              color={theme.primary}
            />

            <Text
              style={styles.headerTitle}
            >
              Edit Player
            </Text>
          </Animated.View>

          {/* Name */}
          <Animated.View
            entering={FadeInDown.delay(
              100,
            )}
            style={styles.inputWrapper}
          >
            <Text style={styles.label}>
              Player Name
            </Text>

            <TextInput
              value={formData.name}
              onChangeText={text =>
                handleChange(
                  'name',
                  text,
                )
              }
              placeholder="Enter Player Name"
              placeholderTextColor={
                theme.subText
              }
              style={styles.input}
            />
          </Animated.View>

          {/* Nickname */}
          <Animated.View
            entering={FadeInDown.delay(
              200,
            )}
            style={styles.inputWrapper}
          >
            <Text style={styles.label}>
              Nickname
            </Text>

            <TextInput
              value={formData.nickName}
              onChangeText={text =>
                handleChange(
                  'nickName',
                  text,
                )
              }
              placeholder="Enter Nickname"
              placeholderTextColor={
                theme.subText
              }
              style={styles.input}
            />
          </Animated.View>

          {/* Jersey */}
          <Animated.View
            entering={FadeInDown.delay(
              300,
            )}
            style={styles.inputWrapper}
          >
            <Text style={styles.label}>
              Jersey Number
            </Text>

            <TextInput
              keyboardType="number-pad"
              maxLength={3}
              value={
                formData.jerseyNumber
              }
              onChangeText={text =>
                handleChange(
                  'jerseyNumber',
                  text.replace(
                    /[^0-9]/g,
                    '',
                  ),
                )
              }
              placeholder="Enter Jersey No."
              placeholderTextColor={
                theme.subText
              }
              style={styles.input}
            />
          </Animated.View>

          {/* Options */}
          {renderOptions(
            'Gender',
            'gender',
            ['Male', 'Female'],
          )}

          {renderOptions(
            'Role',
            'role',
            [
              'Batsman',
              'Bowler',
              'Wicket Keeper',
              'All Rounder',
            ],
          )}

          {renderOptions(
            'Batsman Type',
            'batsmanType',
            [
              'Right-handed',
              'Left-handed',
            ],
          )}

          {renderOptions(
            'Bowler Type',
            'bowlerType',
            [
              'Right-arm',
              'Left-arm',
            ],
          )}

          {renderOptions(
            'Bowling Style',
            'bowlingStyle',
            ['Fast', 'Medium', 'Spin'],
          )}

          {/* Submit */}
          <Animated.View
            entering={FadeInDown.delay(
              500,
            )}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleUpdate}
              style={styles.submitBtn}
            >
              <Ionicons
                name="save-outline"
                size={24}
                color="#000"
              />

              <Text
                style={styles.submitText}
              >
                Update Player
              </Text>
            </TouchableOpacity>
          </Animated.View>

          <View
            style={{ height: 60 }}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EditPlayerScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.background,
  },

  container: {
    flex: 1,
    backgroundColor: theme.background,
    paddingHorizontal: 16,
  },

  glowCircle: {
    position: 'absolute',

    width: 260,
    height: 260,

    borderRadius: 200,

    backgroundColor: '#22D3EE20',

    top: -40,
    right: -60,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',

    marginTop: 20,
    marginBottom: 26,
  },

  headerTitle: {
    color: '#fff',

    fontSize: 28,

    fontWeight: 'bold',

    marginLeft: 10,
  },

  inputWrapper: {
    marginBottom: 20,
  },

  label: {
    color: '#fff',

    fontSize: 16,

    fontWeight: '700',

    marginBottom: 10,
  },

  input: {
    backgroundColor: theme.card,

    borderWidth: 1,

    borderColor: theme.border,

    borderRadius: 18,

    paddingHorizontal: 18,

    paddingVertical: 15,

    color: '#fff',

    fontSize: 16,
  },

  optionWrapper: {
    marginBottom: 20,
  },

  optionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  optionBtn: {
    borderWidth: 1,

    borderRadius: 16,

    paddingVertical: 12,

    paddingHorizontal: 16,

    marginRight: 10,

    marginBottom: 10,
  },

  optionText: {
    fontWeight: '700',
  },

  submitBtn: {
    backgroundColor: theme.primary,

    borderRadius: 20,

    paddingVertical: 18,

    justifyContent: 'center',

    alignItems: 'center',

    flexDirection: 'row',

    marginTop: 20,
  },

  submitText: {
    color: '#000',

    fontSize: 18,

    fontWeight: 'bold',

    marginLeft: 10,
  },

  loaderOverlay: {
    position: 'absolute',

    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

    zIndex: 999,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor:
      'rgba(0,0,0,0.35)',
  },
});