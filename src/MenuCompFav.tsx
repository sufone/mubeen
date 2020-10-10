import Menu, { MenuItem, MenuDivider, Position } from "react-native-enhanced-popup-menu";
import React, { useRef, createRef } from 'react';
import {View, TouchableHighlight, Text, StyleSheet, Share} from 'react-native'

import LocalStorage from 'react-native-storage-simply';



function properCase(input) {
  return input.toLowerCase()
  .split(' ')
  .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
  .join(' ')
}

const MenuComp = (props) => {

  let onDelete = async (message) => {
    menuRef.hide();
    //set loading true
    
    let {title, index} = message
    let id = title +"."+index
    console.log('deleting: '+index, title, id)

    LocalStorage.delete(id).then(() => {
      console.log('deleted')
      message.update()
      //set loading false
    }).catch(error => {
      console.error(error);
      //show error
    });
  }

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
    let id = title +"."+index
    console.log(index, title, id)

    let favoriteNew = {
      surah: title,
      block: index,
      id: id,
      time: new Date()
    }
    console.log(favoriteNew)

    LocalStorage.save(id, favoriteNew).then(() => {
      console.log('saved')
    }).catch(error => {
      console.error(error);
    });
  };

  let textRef = React.createRef();
  let menuRef = null;

  const setMenuRef = ref => menuRef = ref;
  const hideMenu = () => menuRef.hide();
  const showMenu = () => menuRef.show(textRef.current);

  const onPress = () => showMenu();

  function blockTitle(breakdownRef) {
    if (breakdownRef.rangeEnd) {
      return "Surah " + props.surahName + "\nAyah " + props.breakdown.rangeStart + " – " + props.breakdown.rangeEnd
    } else {
      return "Surah " + props.surahName + "\mAyah " + props.breakdown.rangeStart
    }
  }

  

  return (
    <>
    <TouchableHighlight 
      style={styles.mainButton}
      onPress={onPress}
      activeOpacity={0.9}
      underlayColor="#f8edff"
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
        <MenuItem onPress={() => {onDelete(props)}}>Remove</MenuItem>
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
    color: "#a688ba"
  }
})


export default MenuComp