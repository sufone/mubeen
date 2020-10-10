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
              <View key={index} style={styles.bodyContainer}>
                <MenuComp breakdown={breakdown} content={breakdown.details} surahName={surahsOld[title].name} title={title} index={index}/>

                {breakdown.details.map((detail, index) => {
                  console.log(detail[1])
                  if (detail[1] !== undefined) {
                    return (
                      <Text key={index} style={styles.yasirText}>
                        {detail[0] + ' (YQ. ' + detail[1] + ')'}
                      </Text>
                    )
                  }
                  else {
                    return (
                      <Text key={index} style={styles.bodyText}>
                        {detail[0]+'\n'}
                      </Text>
                    )
                  }
                })}        
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
    backgroundColor: '#F2FDE0',
    paddingLeft: 22,
    paddingRight: 22,
    paddingBottom: 10,
    shadowOpacity: 0.12,
    shadowRadius: 3,
    elevation: 5,
    overflow: "hidden",
  },
  bodyText: {
    fontSize: 17,
    paddingBottom: 20,
    textAlign: 'left',
    zIndex: 1,
    lineHeight: 22
  },
  yasirText: {
    fontSize: 17,
    fontWeight: 'bold',
    paddingBottom: 20,
    textAlign: 'left',
    zIndex: 1,
    lineHeight: 22
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 0,
  },
})