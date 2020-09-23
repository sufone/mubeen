import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import AboutScreen from './AboutScreen'
import SummaryScreen from './SummaryScreen'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Consumer from '../App'

const Tab = createMaterialTopTabNavigator();

function Surah() {

  return (
    <Tab.Navigator tabBarPosition={'top'}
    style={{
      backgroundColor: "#fff",
    }}
    lazy={false}
    tabBarOptions={{
      activeTintColor: "#E67635",
      inactiveTintColor: "#3B3B3B",
      indicatorStyle: {
        backgroundColor: "#FFD3BA",
        height: 50,
        borderRadius: 8
      },        
      tabStyle: {
      },
      style: {

        backgroundColor: "#fff",
      }
      }}
      >
      <Tab.Screen name="About" component={AboutScreen} />
      <Tab.Screen name="Summary" component={SummaryScreen} />
    </Tab.Navigator>
  );
}

export default Surah