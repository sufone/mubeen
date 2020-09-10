import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeStack from './src/HomeStack'
import { enableScreens } from 'react-native-screens';
enableScreens();


import Favorites from './src/Favorites'
import Settings from './src/Settings'


const Tab = createBottomTabNavigator();

export const SurahContext = React.createContext({ surah: 0, updateSurah: () => {} });


function hideTabBar(route) {
  const routeName = route.state
    ? // Get the currently active route name in the tab navigator
      route.state.routes[route.state.index].name
    : // If state doesn't exist, we need to default to `screen` param if available, or the initial screen
      // In our case, it's "Feed" as that's the first screen inside the navigator
      route.params?.screen || 'Feed';
    
    switch (routeName) {
      case 'Surah':
        return false;
      case 'Home':
        return true;
}
}

export default function App() {
  const [surah, setSurah] = React.useState(0);
  const value = { surah, setSurah };

  return (

    <NavigationContainer>
      <SurahContext.Provider value={value}>

        <Tab.Navigator>
          <Tab.Screen 
            name="Home" 
            component={HomeStack} options={( {route} ) => ({ tabBarVisible: hideTabBar(route) })}
            />
          <Tab.Screen name="Favorites" component={Favorites} />
          <Tab.Screen name="Settings" component={Settings} />
          
        </Tab.Navigator>
      </SurahContext.Provider >
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
