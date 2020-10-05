import React, {useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, Button } from 'react-native';
import LocalStorage from 'react-native-storage-simply';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SummaryBlock from './SummaryBlock'


import surahsOld from './surahsOld.js';

const Stack = createNativeStackNavigator();

function FavoritesStack() {
  return (
    <Stack.Navigator screenOptions={{
      headerTintColor: "#E67635",
      headerTitleStyle: {
        color: "#222222"
      }
    }}>
      <Stack.Screen name="Home" component={Favorites} 
        options={{
          title: "Favorites",
          
        }} />
    </Stack.Navigator>
  );
}


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
    return <SafeAreaView style={styles.emptyContainer}><Text>Loading...</Text></SafeAreaView>;
  }
  if (Object.keys(favorites).length == 0) {
    return <SafeAreaView style={styles.emptyContainer}><Text>Why not add some?</Text></SafeAreaView>;
  }
  console.log(favorites)
  return (
    <>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={favorites}
          renderItem={({ item }) => <SummaryBlock surah={item.surah} 
            block={item.block} update={updateFavoritesState}  /> }
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
      <Button onPress={() => {clearFavorites()}} title={"clear"}></Button>
    </>
  )

}



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

export default FavoritesStack