import Menu, { MenuItem, MenuDivider, Position } from "react-native-enhanced-popup-menu";
import React, { useRef, createRef } from 'react';
import {View, TouchableNativeFeedback, Text, StyleSheet, Share} from 'react-native'


function properCase(input) {
  return input.toLowerCase()
  .split(' ')
  .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
  .join(' ')
}

const MenuComp = (props) => {

  onShare = async (message) => {
    menuRef.hide();
    try {
      const result = await Share.share({
        message: `Surah ${message.surahName}: ${properCase(message.name)} \n\n ${message.content} \n\n Quran Summaries`
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

  onFavorite = async (id) => {

  };

  let textRef = React.createRef();
  let menuRef = null;

  const setMenuRef = ref => menuRef = ref;
  const hideMenu = () => menuRef.hide();
  const showMenu = () => menuRef.show(textRef.current, stickTo = Position.BOTTOM_LEFT);

  const onPress = () => showMenu();

  return (
    <>
    <TouchableNativeFeedback
      onPress={onPress}
      background={TouchableNativeFeedback.SelectableBackground()}>
      <View style={styles.bodyTitle}>
      <><Text style={styles.bodyTextButton} ref={textRef}>⋮</Text></>
        <><Text style={styles.bodyTitleText} >
          {properCase(props.name)
          }
      </Text></>
      </View>
    </TouchableNativeFeedback>
    <Menu
        ref={setMenuRef}
      >
        <MenuItem onPress={() => {onShare(props)}}>Share</MenuItem>
        <MenuItem onPress={hideMenu}>Favorite</MenuItem>
        <MenuItem onPress={hideMenu}>Tag</MenuItem>
        {/* <MenuDivider />
        <MenuItem onPress={hideMenu} disabled>Item 3</MenuItem> */}
      </Menu>
    </>
  )

}


const styles = StyleSheet.create({
  menu: {
    top: 0,
    right: 0
  },
  bodyContainer: {
    margin: 20,
    borderRadius: 8,
    shadowColor: "#111",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.12,
    shadowRadius: 3,
    elevation: 2,
  },
  bodyTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    paddingRight: 15,
    paddingLeft: 15,
    backgroundColor: '#F7F7F7',
    borderRadius: 8,
    paddingTop: 17,
    marginTop: -10,
    zIndex: 0,
  },
  bodyTitleText: {
    color: '#2B4005',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  bodyTitleButton: {
    textAlign: 'left',
    fontWeight: 'bold',
  },
  bodyText: {
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 8,
    textAlign: 'left',
    zIndex: 1,
    lineHeight: 22
  },
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    padding: 0,
  },
})


export default MenuComp