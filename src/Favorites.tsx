import React, {useState} from 'react';
import { StyleSheet, Text, View, AsyncStorage, Button } from 'react-native';

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  let fetchFavorites = async () => {
    try {
      const value = await AsyncStorage.getItem('favoriteSurahs');
      if (value !== null) {
        console.log(value);
        return value
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  let clearFavorites = async () => {
    try {
      const value = await AsyncStorage.getItem('favoriteSurahs');
      if (value !== null) {
        console.log(value);
        await AsyncStorage.setItem('favoriteSurahs', "");
        
        const valueNew = await AsyncStorage.getItem('favoriteSurahs');
        console.log(valueNew);
        return valueNew
      }
    } catch (error) {
      // Error retrieving data
    }
    }


  return (
    <>
      <Text>{JSON.stringify(favorites)}</Text>
      <Button onPress={() => {setFavorites(fetchFavorites())}} title={"test"}></Button>
      <Button onPress={() => {setFavorites(clearFavorites())}} title={"clear"}></Button>
    </>
  )

}

export default Favorites