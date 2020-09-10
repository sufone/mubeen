import React from 'react';

import {Button} from 'react-native'

import { createStackNavigator } from '@react-navigation/stack';


import HomeScreen from './HomeScreen'
import Surah from './Surah'

const Stack = createStackNavigator();


function HomeStack() {


  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={( {navigation} ) => ({   headerLeft:( <Button onPress={() => navigation.openDrawer()} /> )})}/>
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