import React from 'react';

import { StyleSheet, Text, View, ScrollView } from 'react-native';
import surahsOld from './surahsOld.js';

import { SurahContext } from '../App'



function AboutScreen({route}) {
  const title = React.useContext(SurahContext).surah

  return (

      <ScrollView style={styles.container}>

        <View style={styles.bodyContainer}>
          <Text style={styles.bodyTitle}>Context</Text>
          <Text style={styles.bodyText}>{surahsOld[title].summary.context}</Text>
        </View>

        <View style={styles.bodyContainer}>
          <Text style={styles.bodyTitle}>Theme</Text>
          <Text style={styles.bodyText}>{surahsOld[title].summary.theme}</Text>
        </View>

        <View style={styles.bodyContainer}>
          <Text style={styles.bodyTitle}>Table of Contents</Text>

            {surahsOld[title].summary.breakdown.map((breakdown, index) => {
              return (
                <Text style={styles.bodyText}>{index+1 +'. ' + breakdown.name.toLowerCase()
                  .split(' ')
                  .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                  .join(' ')}</Text>
              )
            })}
        </View>
      </ScrollView>
  )
}


export default AboutScreen

const styles = StyleSheet.create({
  bodyContainer: {
    margin: 20,
    borderRadius: 8,
    shadowColor: "#111",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    backgroundColor: '#F2FDE0',
    paddingLeft: 22,
    paddingRight: 22,
    paddingBottom: 10,
    shadowOpacity: 0.12,
    shadowRadius: 3,
    elevation: 5,
    overflow: "hidden",
  },
  bodyTitle: {
    overflow: "hidden",
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingBottom: 30,
    color: '#2B4005',
    fontSize: 22,    marginBottom: -15,
    fontWeight: 'bold',
    textAlign: 'left',
    maxWidth: "85%"
  },
  bodyText: {
    fontSize: 17,
    paddingBottom: 20,
    textAlign: 'left',
    zIndex: 1,
    lineHeight: 22
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 0,
  },
})
