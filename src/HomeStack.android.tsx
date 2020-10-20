import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './HomeScreen'
import Surah from './Surah'

const Stack = createStackNavigator();


function HomeStack() {

  return (
    <Stack.Navigator screenOptions={{
      headerTintColor: "#E67635",
      headerTitleStyle: {
        color: "#222222"
      },
    }} 
    >
      <Stack.Screen name="Home" component={HomeScreen} options={{title: "Quran Summaries", headerShown: false}} />
      <Stack.Screen name="Surah" component={Surah} options={({ route }) => ({ title: `Surah ${route.params.name}`,  })}  />
    </Stack.Navigator>
  );
}

HomeStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
    safeAreaInsets: { top: 0 }
  };
};

export default HomeStack