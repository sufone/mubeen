import React, {useState} from 'react';

import { StyleSheet, Text, View, SafeAreaView, FlatList, Button } from 'react-native';
import surahsOld from './surahsOld.js';
import MenuComp from './MenuCompFav'



function SummaryBlock(props) {
    let summaryData = surahsOld[props.surah].summary.breakdown[props.block]
  
    return (
  
      <View style={styles.bodyContainer}>
        <MenuComp breakdown={summaryData} content={summaryData.details} surahName={surahsOld[props.surah].name} title={props.surah} index={props.block}/>

        <Text style={styles.bodyText}>
        {summaryData.details.map((details, index) => {
                    console.log(details[1])
                    if (details[1] !== undefined) {
                      return (
                        <Text style={styles.yasirText}>
                          {details[0] + ' (YQ. ' + details[1] + ')'}
                        </Text>
                      )
                    }
                    else {
                      return (
                        <Text style={styles.bodyText}>
                          {details[0]}
                        </Text>
                      )
                    }
                  })}  
        </Text>
        
      </View>
    )
  }

export default SummaryBlock



  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
    },
    item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
    yasirText: {
      fontSize: 17,
      fontWeight: 'bold',
      paddingBottom: 20,
      textAlign: 'left',
      zIndex: 1,
      lineHeight: 22
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
    header: {
      fontSize: 28,
      fontWeight: "bold",
      textAlign: 'left',
    },
    subtitle: {
        fontWeight: "300",
        fontSize: 16,
        paddingTop: 20,
        fontStyle: "italic",
        color: "#91B47C"
      }
  });