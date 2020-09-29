import React, {useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, Button } from 'react-native';
import LocalStorage from 'react-native-storage-simply';
import Constants from 'expo-constants';


import surahsOld from './surahsOld.js';


function Favorites({navigation}) {

  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);


  const clearFavorites = function() {
    console.log('deleting…')


      LocalStorage.keys().then((keys) => {
        console.log('keys: '+keys)

        LocalStorage.delete(keys).then(() => {
          console.log('deleting')

          setFavorites([''])
          setIsLoading(false)
        }).catch(error => {
            console.error(error);
        });
      }).catch(error => {
          console.error(error);
      });    
  }
 

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      
      console.log('focused')

      LocalStorage.keys().then((keys) => {
        console.log('keys: '+keys)

        LocalStorage.get(keys).then(results => {
          console.log('results: '+results)

          setFavorites(results)
          setIsLoading(false)
        }).catch(error => {
            console.error(error);
        });
      }).catch(error => {
          console.error(error);
      });     

      
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);


  

    if (isLoading) {
      return <View><Text>Loading...</Text></View>;
    }
  console.log(favorites)
  return (
    <>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={favorites}
          renderItem={({ item }) => <FavoriteBlock surah={item.surah} block={item.block}/> }
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
      <Button onPress={() => {clearFavorites()}} title={"clear"}></Button>
    </>
  )

}

function FavoriteBlock(props) {
  let summaryData=surahsOld[props.surah].summary.breakdown[props.block]

  return (
    <>
      <Text style={styles.header}>Favorites</Text>

    <View style={styles.bodyContainer}>
      <Text>{surahsOld[props.surah].name}</Text>
      <Text style={styles.bodyText}>
        {summaryData.name}
      </Text>
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
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
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
  }
});

export default Favorites