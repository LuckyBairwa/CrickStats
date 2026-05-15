import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import HomeScreen from '../screens/Home/HomeScreen';
import PlayersScreen from '../screens/Players/PlayersScreen';
import DashboardScreen from '../screens/Dashboard/DashboardScreeen';
import MatchesScreen from '../screens/Matches/MatchScreen';
import SettingsScreen from '../screens/Setting/SettingScreen';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,

        tabBarStyle: {
          backgroundColor: '#111C2E',
          borderTopWidth: 0,
          height: 70,
          paddingBottom: 20,

        },

        tabBarActiveTintColor: '#22C55E',

        tabBarInactiveTintColor: '#94A3B8',

        tabBarLabelStyle: {
          fontSize: 15,
          fontWeight: '800',
        },

        tabBarIcon: ({color, size}) => {
          let iconName = '';

          if (route.name === 'Home') {
            iconName = 'home';
          }

          else if (route.name === 'Players') {
            iconName = 'people';
          }

          else if (route.name === 'Dashboard') {
            iconName = 'stats-chart';
          }

          else if (route.name === 'Matches') {
            iconName = 'trophy';
          }

          else if (route.name === 'Settings') {
            iconName = 'settings';
          }

          return (
            <Ionicons
              name={iconName}
              size={size}
              color={color}
            />
          );
        },
      })}>
      
      <Tab.Screen
        name="Home"
        component={HomeScreen}
      />

      <Tab.Screen
        name="Players"
        component={PlayersScreen}
      />

      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
      />

      <Tab.Screen
        name="Matches"
        component={MatchesScreen}
      />

      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;