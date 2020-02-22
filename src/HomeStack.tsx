import React from 'react';
import { StyleSheet, Text, View } from 'react-native';



import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './HomeScreen'
import Surah from './Surah'

const Stack = createNativeStackNavigator();

function HomeStack() {


  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Surah" component={Surah} />
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
  };
};

export default HomeStack