
import { StatusBar, StyleSheet, View, Text } from 'react-native';

import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import HomeScreen from './src/screens/Home/HomeScreen';
import PlayersScreen from './src/screens/Players/PlayersScreen';
import MatchesScreen from './src/screens/Matches/MatchScreen';
import DashboardScreen from './src/screens/Dashboard/DashboardScreeen';
import SettingsScreen from './src/screens/Setting/SettingScreen';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabs from './src/navigation/Bottomtabs';


function App() {
 

  return ( 
    <NavigationContainer>
      <BottomTabs />
    </NavigationContainer>
   );
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    backgroundColor: 'red',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt:{
    color:'white',
    fontSize:20,
  }
});

export default App;
  