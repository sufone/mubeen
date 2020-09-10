import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import AboutScreen from './AboutScreen'
import SummaryScreen from './SummaryScreen'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Consumer from '../App'

const Tab = createMaterialTopTabNavigator();

function Surah() {

  return (
    <Tab.Navigator>
      <Tab.Screen name="About" component={AboutScreen} />
      <Tab.Screen name="Summary" component={SummaryScreen} />
    </Tab.Navigator>
  );
}

export default Surah