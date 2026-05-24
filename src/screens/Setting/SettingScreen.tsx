// src/screens/Setting/SettingScreen.tsx 😎🔥

import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Modal,
} from 'react-native';

import {
  CloudUpload,
  BookOpen,
  Info,
  UserCircle2,
  ChevronRight,
  CloudOff,
} from 'lucide-react-native';

// import Ionicons from 'react-native-vector-icons/Ionicons';

import Animated, {
  FadeInDown,
  FadeInRight,
  FadeInUp,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { useNavigation } from '@react-navigation/native';

import COLORS from '../../constants/colors';

const SettingsScreen = () => {
  const navigation = useNavigation<any>();

  const theme = COLORS;

  const [showBackupModal, setShowBackupModal] = useState(false);

  const glow = useSharedValue(0.6);

  useEffect(() => {
    glow.value = withRepeat(
      withTiming(1, {
        duration: 2200,
      }),
      -1,
      true,
    );
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

  const settings = [
    {
      icon: CloudUpload,
      title: 'Backup Match Data',
      action: () => setShowBackupModal(true),
    },

    {
      icon: BookOpen,
      title: 'Gully Cricket Rules',
      action: () => navigation.navigate('Rules'),
    },

    {
      icon: Info,
      title: 'About App',
      action: () => navigation.navigate('AboutApp'),
    },

    // 😎 NEW
    {
      icon: UserCircle2,
      title: 'About Developer',
      action: () => navigation.navigate('AboutDeveloper'),
    },
  ];

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

      <Animated.View style={[styles.glow1, glowStyle]} />

      <Animated.View style={[styles.glow2, glowStyle]} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeInDown.duration(700)}>
          <Text
            style={[
              styles.header,
              {
                color: theme.text,
              },
            ]}
          >
           Settings
          </Text>

          <Text
            style={[
              styles.subHeader,
              {
                color: theme.subText,
              },
            ]}
          >
            Gully Cricket Control Panel 
          </Text>
        </Animated.View>

        {settings.map((item, index) => (
          <Animated.View key={index} entering={FadeInRight.delay(index * 120)}>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={item.action}
              style={[
                styles.card,
                {
                  backgroundColor: theme.card,
                  borderColor: theme.border,
                },
              ]}
            >
              <item.icon size={24} color={theme.primary} />

              <Text
                style={[
                  styles.cardText,
                  {
                    color: theme.text,
                  },
                ]}
              >
                {item.title}
              </Text>

              <ChevronRight size={20} color={theme.primary} />
            </TouchableOpacity>
          </Animated.View>
        ))}

        <View style={{ height: 100 }} />
      </ScrollView>

      <Modal visible={showBackupModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <Animated.View
            entering={FadeInUp.duration(500)}
            style={[
              styles.modalCard,
              {
                backgroundColor: theme.card,
                borderColor: theme.border,
              },
            ]}
          >
            <CloudOff size={70} color={theme.primary} />

            <Text
              style={[
                styles.modalTitle,
                {
                  color: theme.text,
                },
              ]}
            >
              Backup Unavailable 
            </Text>

            <Text
              style={[
                styles.modalDesc,
                {
                  color: theme.subText,
                },
              ]}
            >
              You can't backup your match data right now.
            </Text>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setShowBackupModal(false)}
              style={[
                styles.closeBtn,
                {
                  backgroundColor: theme.primary,
                },
              ]}
            >
              <Text style={styles.closeText}>OK</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: (StatusBar.currentHeight || 0) + 10,
  },

  glow1: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 200,
    backgroundColor: '#00F5FF22',
    top: -80,
    right: -80,
  },

  glow2: {
    position: 'absolute',
    width: 240,
    height: 240,
    borderRadius: 200,
    backgroundColor: '#00F5FF22',
    bottom: 60,
    left: -70,
  },

  header: {
    fontSize: 34,
    fontWeight: 'bold',
  },

  subHeader: {
    fontSize: 15,
    marginTop: 6,
    marginBottom: 30,
  },

  card: {
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#00F5FF',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
  },

  cardText: {
    flex: 1,
    marginLeft: 14,
    fontSize: 16,
    fontWeight: '700',
  },

  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },

  modalCard: {
    width: '85%',
    borderRadius: 26,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
  },

  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
  },

  modalDesc: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 24,
  },

  closeBtn: {
    marginTop: 24,
    paddingVertical: 14,
    paddingHorizontal: 45,
    borderRadius: 18,
  },

  closeText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
