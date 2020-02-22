import React from 'react';
import { StyleSheet, Text, View, Button, SectionList, TouchableHighlight } from 'react-native';
import surahs from './surahs.js';



function HomeScreen({ navigation: { navigate } }) {

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
              onPress={() => navigate('Surah', {"title": index, "name": name, "period": period })}
              style={styles.card}
              key={index}
              underlayColor="white">
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
    backgroundColor: '#fff',
    flex: 10,
    padding: 20,
    borderRadius: 4,
    borderBottomColor: '#CAC6C6',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    padding: 0,
  },
  sectionContainer: {
    backgroundColor: "#F2FDE0",
    padding: 10,
  },
  sectionTitle: {
    fontWeight: "200",
    color: "#42600C",
    fontSize: 11,
    textTransform: 'uppercase'
  },
});