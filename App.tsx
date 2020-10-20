import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';


import HomeStack from './src/HomeStack'
import { enableScreens } from 'react-native-screens';
enableScreens();


import Favorites from './src/Favorites'
import Settings from './src/Settings'

import { AntDesign } from '@expo/vector-icons';

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
      case 'Summaries':
        return true;
}
}

export default function App() {
  const [surah, setSurah] = React.useState(0);
  const value = { surah, setSurah };

  return (
    <SafeAreaProvider>
    <NavigationContainer>
      <SurahContext.Provider value={value}>

        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
  
              if (route.name === 'Summaries') {
                iconName = 'book'
                size = focused ? 24 : 23
                color = focused ? "#E67635" : "#3B3B3B"
              } else if (route.name === 'Favorites') {
                iconName = focused ? 'star' : 'staro';
                color = focused ? "#a688ba" : "#3B3B3B"
              }
              return <AntDesign name={iconName} size={size} color={color} />
            },
          })}
          tabBarOptions={{
            activeTintColor: "#3B3B3B",
            inactiveTintColor: "#3B3B3B",
          }}>
          <Tab.Screen 
            name="Summaries" 
            component={HomeStack} 
            options={( {route} ) => ({ tabBarVisible: hideTabBar(route), })}
            />
          <Tab.Screen name="Favorites" component={Favorites} />
          {/* <Tab.Screen name="Settings" component={Settings} /> */}
          
        </Tab.Navigator>
      </SurahContext.Provider >
    </NavigationContainer>
    </SafeAreaProvider>

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
