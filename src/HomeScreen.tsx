import React, { useContext } from 'react';
import { StyleSheet, Text, View, Button, SectionList, TouchableHighlight } from 'react-native';
import surahs from './surahs.js';

import {SurahContext} from '../App'


function HomeScreen({ navigation: { navigate } }) {
  const { surah, setSurah } = useContext(SurahContext)

  return (
    <View style={styles.container}>
        <SectionList
          stickySectionHeadersEnabled={true}
          sections={surahs}
          renderSectionHeader={({ section: { title } }) => (
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>{title}</Text>
            </View>
          )}
          renderItem={({ item: {name, period, verses, number }, index}) => (
            <TouchableHighlight 
              // onPress={() => navigation.navigate(`Surah`, {"title": index, "name": name, "period": period })}
              onPress={() => {
               setSurah(index)
                navigate('Surah', {"title": index, "name": name, "period": period })}
              }
              style={styles.card}
              key={index}
              activeOpacity={0.9}
              underlayColor="white"
              >
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View style={{justifyContent: "center", paddingRight: 20}}>
                    <Text style={{fontWeight: '400', fontSize: 20}}>
                      {number}
                    </Text>
                  </View>
                  <View>
                    <Text style={{fontWeight: '600', fontSize: 18}}>
                      Surah {name}
                    </Text>
                  <View>
                    <Text style={{fontWeight: '300', fontSize: 14}}>
                      {period} • {verses} Verses
                    </Text>
                  </View>
                </View>
                  
                </View>
                
            </TouchableHighlight>
          )}
        />
      </View>
      
  )
}


export default HomeScreen



const styles = StyleSheet.create({

  card: {
    width: '100%',
    backgroundColor: '#F2FDE0',
    flex: 10,
    paddingLeft: 20,
    padding: 20,
    marginTop: 3,
    margin: 10,
    borderRadius: 8,
    elevation: 5,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 0,
  },
  sectionContainer: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    paddingTop: 15,
    paddingBottom: 5,
  },
  sectionTitle: {
    fontWeight: "bold",
    color: "#222222",
    fontSize: 11,
    textTransform: 'uppercase'
  },
});