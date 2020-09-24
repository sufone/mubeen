import React, {useState} from 'react';
import { StyleSheet, Text, View, AsyncStorage, Button } from 'react-native';
import LocalStorage from 'react-native-storage-simply';

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
  return (
    <>
      <Text>{JSON.stringify(favorites)}</Text>
      <Button onPress={() => {clearFavorites()}} title={"clear"}></Button>
    </>
  )

}

export default Favorites