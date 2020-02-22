import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import surahsOld from './surahsOld.js';


function AboutScreen({navigation: {dangerouslyGetParent} }) {
  const title = dangerouslyGetParent()?.title ?? 1



  return (

      <ScrollView style={styles.container}>

        <View style={styles.bodyContainer}>
          <Text style={styles.bodyText}>{surahsOld[title].summary.context}</Text>
          <Text style={styles.bodyTitle}>Context</Text>
        </View>

        <View style={styles.bodyContainer}>
          <Text style={styles.bodyText}>{surahsOld[title].summary.theme}</Text>
          <Text style={styles.bodyTitle}>Theme</Text>
        </View>

        <View style={styles.bodyContainer}>
            {surahsOld[title].summary.breakdown.map(breakdown => {
              return (
                <Text style={styles.bodyText}>{breakdown.name.toLowerCase()
                  .split(' ')
                  .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                  .join(' ')}</Text>
              )
            })}
          <Text style={styles.bodyTitle}>Table of Contents</Text>
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
    shadowOpacity: 0.12,
    shadowRadius: 3,
    elevation: 2,
  },
  bodyTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    paddingRight: 15,
    paddingLeft: 15,
    backgroundColor: '#F7F7F7',
    borderRadius: 8,
    paddingTop: 17,
    marginTop: -10,
    zIndex: 0,
  },
  bodyTitleText: {
    color: '#2B4005',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  bodyTitleButton: {
    textAlign: 'left',
    fontWeight: 'bold',
  },
  bodyText: {
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 8,
    textAlign: 'left',
    zIndex: 1,
    lineHeight: 22
  },
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    padding: 0,
  },
})
