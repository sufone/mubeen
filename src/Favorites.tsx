import React, {useState} from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import LocalStorage from 'react-native-storage-simply';

import SummaryBlock from './SummaryBlock'

function Favorites({navigation}) {

  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  function setLoading(bool){
    setIsLoading(bool)
  }
  function updateFavoritesState() {
    console.log('deleting: updating state')

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
  }

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused 
      console.log('focused')

      LocalStorage.keys().then((keys) => {
        console.log('keys: '+keys)

        LocalStorage.get(keys).then(results => {
          console.log('results: '+results)

          setFavorites(results)
          console.log('favorites: '+JSON.stringify(favorites))
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
    return <View style={styles.emptyContainer}><Text>Loading...</Text></View>;
  }
  if (Object.keys(favorites).length == 0) {
    return <View style={styles.emptyContainer}><Text>Why not add some?</Text></View>;
  }
  console.log(favorites)
  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={favorites}
          renderItem={({ item }) => <SummaryBlock surah={item.surah} 
            block={item.block} update={updateFavoritesState}  /> }
          keyExtractor={item => item.id}
        />
      </View>
    </>
  )

}

export default Favorites

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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