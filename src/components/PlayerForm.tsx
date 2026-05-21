// src/components/PlayerForm.tsx 😎🔥

import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { UserPlus, CheckCircle2, Hourglass } from 'lucide-react-native';

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

import COLORS from '../constants/colors';

const theme = COLORS;

interface PlayerFormProps {
  onSubmit: (data: any) => void;
}

const PlayerForm = ({ onSubmit }: PlayerFormProps) => {
  const glow = useSharedValue(0.5);

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    glow.value = withRepeat(
      withTiming(1, {
        duration: 1800,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true,
    );

    return () => {
      cancelAnimation(glow);
    };
  }, []);

  const glowStyle = useAnimatedStyle(() => {
    return {
      opacity: glow.value,
      transform: [
        {
          scale: glow.value,
        },
      ],
    };
  });

  const [formData, setFormData] = useState({
    name: '',
    nickName: '',
    jerseyNumber: '',
    gender: 'Male',
    role: 'Player',
    batsmanType: 'Right-handed',
    bowlerType: 'Right-arm',
    bowlingStyle: 'Medium',
  });

  // 😎 Handle Input
  const handleChange = (key: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  // 😎 Validation
  const validateForm = () => {
    if (!formData.name.trim()) {
      Alert.alert('Validation Error 😭', 'Player name is required');
      return false;
    }

    if (!formData.jerseyNumber.trim()) {
      Alert.alert('Validation Error 😭', 'Jersey number is required');
      return false;
    }

    const jersey = Number(formData.jerseyNumber);

    if (isNaN(jersey)) {
      Alert.alert('Validation Error 😭', 'Invalid jersey number');
      return false;
    }

    if (jersey < 0) {
      Alert.alert('Validation Error 😭', 'Jersey number cannot be negative');
      return false;
    }

    return true;
  };

  // 😎 Submit Handler
  const handleSubmit = async () => {
    try {
      if (submitting) {
        return;
      }

      const valid = validateForm();

      if (!valid) {
        return;
      }

      setSubmitting(true);

      const payload = {
        ...formData,

        name: formData.name.trim(),

        nickName: formData.nickName.trim(),

        jerseyNumber: Number(formData.jerseyNumber),
      };

      await onSubmit?.(payload);
    } catch (error) {
      console.log('PLAYER FORM ERROR 😭', error);
    } finally {
      setSubmitting(false);
    }
  };

  // 😎 Options Renderer
  const renderOptions = (title: string, field: string, options: string[]) => {
    return (
      <Animated.View
        entering={FadeInRight.delay(300)}
        style={styles.optionWrapper}
      >
        <Text style={styles.label}>{title}</Text>

        <View style={styles.optionRow}>
          {options.map(option => {
            const active = formData[field as keyof typeof formData] === option;

            return (
              <TouchableOpacity
                key={option}
                activeOpacity={0.8}
                onPress={() => handleChange(field, option)}
                style={[
                  styles.optionBtn,
                  {
                    backgroundColor: active ? theme.primary : theme.card,

                    borderColor: active ? theme.primary : theme.border,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.optionText,
                    {
                      color: active ? '#000' : theme.text,
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
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        style={[
          styles.container,
          {
            backgroundColor: theme.background,
          },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* 😎 Neon Glow */}
        <Animated.View style={[styles.glowCircle, glowStyle]} />

        {/* 😎 Header */}
        <Animated.View
          entering={FadeInDown.duration(700)}
          style={styles.header}
        >
          <UserPlus size={30} color={theme.primary} />

          <Text style={styles.headerTitle}>Add New Player</Text>
        </Animated.View>

        {/* 😎 Name */}
        <Animated.View
          entering={FadeInDown.delay(100)}
          style={styles.inputWrapper}
        >
          <Text style={styles.label}>Player Name</Text>

          <TextInput
            placeholder="Enter Player Name"
            placeholderTextColor={theme.subText}
            value={formData.name}
            onChangeText={text => handleChange('name', text)}
            style={styles.input}
          />
        </Animated.View>

        {/* 😎 Nickname */}
        <Animated.View
          entering={FadeInDown.delay(200)}
          style={styles.inputWrapper}
        >
          <Text style={styles.label}>Nickname</Text>

          <TextInput
            placeholder="Enter Nickname"
            placeholderTextColor={theme.subText}
            value={formData.nickName}
            onChangeText={text => handleChange('nickName', text)}
            style={styles.input}
          />
        </Animated.View>

        {/* 😎 Jersey */}
        <Animated.View
          entering={FadeInDown.delay(300)}
          style={styles.inputWrapper}
        >
          <Text style={styles.label}>Jersey Number</Text>

          <TextInput
            placeholder="Enter Jersey No."
            placeholderTextColor={theme.subText}
            keyboardType="number-pad"
            maxLength={3}
            value={formData.jerseyNumber}
            onChangeText={text =>
              handleChange('jerseyNumber', text.replace(/[^0-9]/g, ''))
            }
            style={styles.input}
          />
        </Animated.View>

        {/* 😎 Gender */}
        {renderOptions('Gender', 'gender', ['Male', 'Female'])}

        {/* 😎 Role */}
        {renderOptions('Role', 'role', [
          'Batsman',
          'Bowler',
          'Wicket Keeper',
          'All Rounder',
        ])}

        {/* 😎 Batsman Type */}
        {renderOptions('Batsman Type', 'batsmanType', [
          'Right-handed',
          'Left-handed',
        ])}

        {/* 😎 Bowler Type */}
        {renderOptions('Bowler Type', 'bowlerType', ['Right-arm', 'Left-arm'])}

        {/* 😎 Bowling Style */}
        {renderOptions('Bowling Style', 'bowlingStyle', [
          'Fast',
          'Medium',
          'Spin',
        ])}

        {/* 😎 Submit */}
        <Animated.View entering={FadeInDown.delay(500)}>
          <TouchableOpacity
            activeOpacity={0.8}
            disabled={submitting}
            onPress={handleSubmit}
            style={[
              styles.submitBtn,
              {
                opacity: submitting ? 0.7 : 1,
              },
            ]}
          >
            {submitting ? (
              <Hourglass size={24} color="#000" />
            ) : (
              <CheckCircle2 size={24} color="#000" />
            )}

            <Text style={styles.submitText}>
              {submitting ? 'Saving Player...' : 'Save Player'}
            </Text>
          </TouchableOpacity>
        </Animated.View>

        <View style={{ height: 50 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default PlayerForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: (StatusBar.currentHeight || 0) + 3,
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

    shadowColor: theme.glow,

    shadowOffset: {
      width: 0,
      height: 0,
    },

    shadowOpacity: 0.4,

    shadowRadius: 10,

    elevation: 6,
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

    shadowColor: theme.glow,

    shadowOffset: {
      width: 0,
      height: 0,
    },

    shadowOpacity: 0.9,

    shadowRadius: 14,

    elevation: 12,
  },

  submitText: {
    color: '#000',

    fontSize: 18,

    fontWeight: 'bold',

    marginLeft: 10,
  },
});
