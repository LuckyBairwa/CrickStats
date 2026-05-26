import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BottomTabs from './Bottomtabs';

import AddPlayerScreen from '../screens/Players/AddPlayerScreen';

import CreateTeamScreen from '../screens/Teams/CreateTeamScreen';
import CreateMatchScreen from '../screens/Matches/CreateMatchScreen';
import HomeScreen from '../screens/Home/HomeScreen';
import PlayerDetailsScreen from '../screens/Players/PlayerDetailsScreen';
import AboutAppScreen from '../screens/AboutApp/AboutAppScreen';
import RulesScreen from '../screens/Rules/RulesScreen';
import InningScreen from '../screens/Matches/InningScreen';
import PreInningSetupScreen from '../screens/Matches/PreInningSetupScreen';
import AboutDeveloper from '../screens/Setting/AboutDeveloper';
import EditPlayerScreen from '../screens/Players/EditPlayerScreen';
import InningScreen2 from '../screens/Matches/InningScreen2';
import WinnerScreen from '../screens/Winner/WinnerScreen';
import MatchDetailsScreen from '../screens/Matches/MatchDetailsScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="MainTabs"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      {/* 😎 Bottom Tabs */}
      <Stack.Screen name="MainTabs" component={BottomTabs} />

      {/* 😎 Extra Screens */}
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="AddPlayer" component={AddPlayerScreen} />
      <Stack.Screen name="CreateTeam" component={CreateTeamScreen} />
      <Stack.Screen name="CreateMatch" component={CreateMatchScreen} />
      <Stack.Screen name="PlayerDetails" component={PlayerDetailsScreen} />
      <Stack.Screen name="AboutApp" component={AboutAppScreen} />
      <Stack.Screen name="Rules" component={RulesScreen} />
      <Stack.Screen name="InningScreen" component={InningScreen} />
      <Stack.Screen name="InningScreen2" component={InningScreen2} />
      <Stack.Screen name="PreInningSetup" component={PreInningSetupScreen} />
      <Stack.Screen name="AboutDeveloper" component={AboutDeveloper} />
      <Stack.Screen name="EditPlayer" component={EditPlayerScreen} />
      <Stack.Screen name="WinnerScreen" component={WinnerScreen} />
      <Stack.Screen name="MatchDetails" component={MatchDetailsScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
