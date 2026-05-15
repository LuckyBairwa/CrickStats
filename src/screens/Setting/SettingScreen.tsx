import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

const SettingsScreen = () => {
  // Active Theme 😎
  const [selectedTheme, setSelectedTheme] =
    useState('Neon Green');

  // Active Mode
  const [selectedMode, setSelectedMode] =
    useState('Dark');

  // Theme Colors
  const themes = [
    {
      name: 'Neon Green',
      color: '#22C55E',
    },

    {
      name: 'Neon Purple',
      color: '#A855F7',
    },

    {
      name: 'Neon Blue',
      color: '#3B82F6',
    },

    {
      name: 'Neon Orange',
      color: '#F97316',
    },

    {
      name: 'Neon Red',
      color: '#EF4444',
    },
  ];

  // App Modes
  const modes = [
    'Dark',
    'Light',
    'System',
  ];

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}>
      
      {/* Header */}
      <Text style={styles.header}>
        ⚙️ Settings
      </Text>

      {/* Theme Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          🎨 Theme Colors
        </Text>

        {themes.map((item, index) => {
          const isSelected =
            selectedTheme === item.name;

          return (
            <TouchableOpacity
              key={index}
              activeOpacity={0.8}
              style={styles.settingCard}
              onPress={() =>
                setSelectedTheme(item.name)
              }>
              
              <View
                style={[
                  styles.colorCircle,
                  {
                    backgroundColor: item.color,
                  },
                ]}
              />

              <Text style={styles.settingText}>
                {item.name}
              </Text>

              {isSelected && (
                <Ionicons
                  name="checkmark-circle"
                  size={26}
                  color={item.color}
                />
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* App Mode Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          🌗 App Mode
        </Text>

        {modes.map((item, index) => {
          const isSelected =
            selectedMode === item;

          return (
            <TouchableOpacity
              key={index}
              activeOpacity={0.8}
              style={styles.settingCard}
              onPress={() =>
                setSelectedMode(item)
              }>
              
              <Text style={styles.settingText}>
                {item} Mode
              </Text>

              {isSelected && (
                <Ionicons
                  name="checkmark-circle"
                  size={26}
                  color="#22C55E"
                />
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Extra Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          🛠️ More Settings
        </Text>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.moreCard}>
          
          <Text style={styles.moreText}>
            📂 Backup Match Data
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.moreCard}>
          
          <Text style={styles.moreText}>
            🔄 Reset App Stats
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.moreCard}>
          
          <Text style={styles.moreText}>
            ℹ️ About App
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{height: 40}} />
    </ScrollView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    backgroundColor: '#07111F',
    paddingHorizontal: 16,
    paddingTop: 20,
  },

  header: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 24,
  },

  section: {
    marginBottom: 30,
  },

  sectionTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 18,
  },

  settingCard: {
    backgroundColor: '#111C2E',
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1E293B',
  },

  colorCircle: {
    width: 28,
    height: 28,
    borderRadius: 100,
    marginRight: 16,
  },

  settingText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
    flex: 1,
  },

  moreCard: {
    backgroundColor: '#111C2E',
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#1E293B',
  },

  moreText: {
    color: '#CBD5E1',
    fontSize: 16,
    fontWeight: '500',
  },
});