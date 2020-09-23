import Menu, { MenuItem, MenuDivider, Position } from "react-native-enhanced-popup-menu";
import React, { useRef, createRef } from 'react';
import {View, TouchableHighlight, Text, StyleSheet, Share} from 'react-native'
import storage from 'react-native-modest-storage'


function properCase(input) {
  return input.toLowerCase()
  .split(' ')
  .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
  .join(' ')
}

const MenuComp = (props) => {

  let onShare = async (message) => {
    menuRef.hide();
    try {
      const result = await Share.share({
        message: `Summary of Surah ${message.surahName}: Ayah ${message.breakdown.rangeStart} – ${message.breakdown.rangeEnd} \n\n ${properCase(message.breakdown.name)} \n\n ${message.breakdown.details.join("\n\n")} \n\n Quran Summaries`
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  let onFavorite = async (message) => {
    menuRef.hide();
    let {title, index} = message

    console.log(index, title)
    let favoriteNew = {
      surahNum: title,
      entryIndex: index
    }
    console.log(JSON.stringify(favoriteNew))
    
    let favoritesVar = await storage.get("favorites") || []
    favoritesVar.push(JSON.stringify(favoriteNew))
    console.log(favoritesVar)
    await storage.set("favorites", favoritesVar)

    

    // try {
    //   var favoriteSurahs;

    //   if (!localStorage['favoriteSurahs']) favoriteSurahs = [];
    //   else favoriteSurahs = JSON.parse(localStorage['favoriteSurahs']);
    //   if (!(favoriteSurahs instanceof Array)) favoriteSurahs = [];
    //   let favObj = {};
    //   let {title, index} = message
    //   favObj[JSON.stringify(title)] = JSON.stringify(index);
    //   favoriteSurahs.push(favObj);

    //   await AsyncStorage.setItem('favoriteSurahs', JSON.stringify(favoriteSurahs));
    //   console.log(AsyncStorage.getItem('favoriteSurahs'))
    // } catch (error) {
    //   // Error saving data… toast message?
    // }
  };

  let textRef = React.createRef();
  let menuRef = null;

  const setMenuRef = ref => menuRef = ref;
  const hideMenu = () => menuRef.hide();
  const showMenu = () => menuRef.show(textRef.current);

  const onPress = () => showMenu();

  function blockTitle(breakdownRef) {
    if (breakdownRef.rangeEnd) {
      return "Ayah " + props.breakdown.rangeStart + " – " + props.breakdown.rangeEnd
    } else {
      return "Ayah " + props.breakdown.rangeStart
    }
  }


  const getData = async () => {
    await storage.clear().then(console.log)
  }
  

  return (
    <>
    <TouchableHighlight 
      style={styles.mainButton}
      onPress={onPress}
      activeOpacity={0.9}
      underlayColor="#E9F9DF"
      >
      <View style={styles.bodyTitle}>
        <View style={styles.mainButton}>
          <><Text style={styles.bodyTitleText} >
            {properCase(props.breakdown.name) + '\n' 
            }
          </Text></>
          <><Text style={styles.subtitle}>
            {blockTitle(props.breakdown)}
          </Text>
          </>
        </View>
        
        <><Text style={styles.bodyTitleButton} ref={textRef}>. . .   </Text></>
      </View>
    </TouchableHighlight>
    <Menu
        ref={setMenuRef}
      >
        <MenuItem onPress={() => {onShare(props)}}>Share</MenuItem>
        <MenuItem onPress={() => {onFavorite(props)}}>Favorite</MenuItem>
        <MenuItem onPress={() => {getData()}}>Tag</MenuItem>
        {/* <MenuDivider />
        <MenuItem onPress={hideMenu} disabled>Item 3</MenuItem> */}
      </Menu>
    </>
  )

}


const styles = StyleSheet.create({
  mainButton: {
    

  },
  menu: {
    top: 0,
    right: 0
  },
  
  bodyTitle: {
    overflow: "hidden",

    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
    zIndex: 0,
  },
  bodyTitleText: {
    color: '#2B4005',
    fontSize: 22,    marginBottom: -15,
    fontWeight: 'bold',
    textAlign: 'left',
    maxWidth: "85%"
  },
  bodyTitleButton: {
    textAlign: 'right',
    fontWeight: 'bold',
    color: '#2B4005',
  },
  subtitle: {
    fontWeight: "300",
    fontSize: 16,
    paddingBottom: 20,
    fontStyle: "italic",
    color: "#91B47C"
  }
})


export default MenuComp