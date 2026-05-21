import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  House,
  UsersRound,
  BarChart3,
  Trophy,
  Settings,
} from 'lucide-react-native';

import COLORS from '../constants/colors';

// Screens
import HomeScreen from '../screens/Home/HomeScreen';
import PlayersScreen from '../screens/Players/PlayersScreen';
import DashboardScreen from '../screens/Dashboard/DashboardScreeen';
import MatchesScreen from '../screens/Matches/MatchScreen';
import SettingsScreen from '../screens/Setting/SettingScreen';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  const theme = COLORS;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarHideOnKeyboard: true,

        tabBarStyle: {
          backgroundColor: theme.card,
          borderTopWidth: 1,
          borderTopColor: theme.border,

          height: 72,

          paddingBottom: 10,
          paddingTop: 8,

          position: 'absolute',

          left: 12,
          right: 12,
          bottom: 12,

          borderRadius: 22,

          elevation: 10,

          shadowOffset: {
            width: 0,
            height: 0,
          },

          shadowOpacity: 0.35,

          shadowRadius: 10,
        },

        tabBarActiveTintColor: theme.primary,

        tabBarInactiveTintColor: theme.subText,

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '700',
          marginBottom: 4,
        },

        tabBarIconStyle: {
          marginTop: 4,
        },

        sceneStyle: {
          backgroundColor: theme.background,
        },

        tabBarIcon: ({ color, focused }) => {
          const iconSize = focused ? 26 : 22;

          if (route.name === 'Home') {
            return (
              <House
                size={iconSize}
                color={color}
                strokeWidth={focused ? 2.8 : 2.2}
              />
            );
          }

          if (route.name === 'Players') {
            return (
              <UsersRound
                size={iconSize}
                color={color}
                strokeWidth={focused ? 2.8 : 2.2}
              />
            );
          }

          if (route.name === 'Dashboard') {
            return (
              <BarChart3
                size={iconSize}
                color={color}
                strokeWidth={focused ? 2.8 : 2.2}
              />
            );
          }

          if (route.name === 'Matches') {
            return (
              <Trophy
                size={iconSize}
                color={color}
                strokeWidth={focused ? 2.8 : 2.2}
              />
            );
          }

          if (route.name === 'Settings') {
            return (
              <Settings
                size={iconSize}
                color={color}
                strokeWidth={focused ? 2.8 : 2.2}
              />
            );
          }

          return null;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />

      <Tab.Screen name="Players" component={PlayersScreen} />

      <Tab.Screen name="Dashboard" component={DashboardScreen} />

      <Tab.Screen name="Matches" component={MatchesScreen} />

      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
