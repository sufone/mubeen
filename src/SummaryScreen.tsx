import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import surahsOld from './surahsOld.js';
import MenuComp from './MenuComp'

import { SurahContext } from '../App'



function SummaryScreen({navigation: {dangerouslyGetParent} }) {
  const title = React.useContext(SurahContext).surah

  return (
    <ScrollView style={styles.container}>
          {surahsOld[title].summary.breakdown.map((breakdown, index) => {
            return (
              <View style={styles.bodyContainer}>
                  {breakdown.details.map((details, index) => {
                    console.log(details[1])
                    if (details[1] !== undefined) {
                      return (
                        <Text style={styles.yasirText}>
                          {details[0] + "\n\n"}
                        </Text>
                      )
                    }
                    else {
                      return (
                        <Text style={styles.bodyText}>
                          {details[0] + "\n\n"}
                        </Text>
                      )
                    }
                  })}
                                  
                <MenuComp name={breakdown.name} content={breakdown.details} surahName={surahsOld[title].name} title={title} index={index}/>
              </View>
            )
        })}
      </ScrollView>
  )
}


export default SummaryScreen



const styles = StyleSheet.create({
  menu: {
    top: 0,
    right: 0
  },
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
    textAlign: 'left',
    zIndex: 1,
    lineHeight: 22
  },
  yasirText: {
    fontSize: 16,
    backgroundColor: '#EEE',
    padding: 20,
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