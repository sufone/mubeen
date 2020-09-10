import React from 'react';
import {View, TouchableHighlight, Text, StyleSheet, Share} from 'react-native'


function properCase(input) {
  return input.toLowerCase()
  .split(' ')
  .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
  .join(' ')
}

const MenuComp = (props) => {

  
  return (
    <>
    <View>
      <View style={styles.bodyTitle}>
      <><Text style={styles.bodyTextButton}></Text></>
        <><Text style={styles.bodyTitleText} >
          {properCase(props.name)
          }
      </Text></>
      </View>
    </View>
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