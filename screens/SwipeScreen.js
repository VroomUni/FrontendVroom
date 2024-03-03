import React from 'react'
import DriverCard from '../components/DriverCard'
import { StyleSheet, View } from 'react-native'

function SwipeScreen() {
  return (
    <View style={styles.pageContainer}><DriverCard/></View>
    
  )
}

export default SwipeScreen
const styles = StyleSheet.create({
    pageContainer:{
        justifyContent:'center',
        alignItems:'center',
        flex:1,
        width: '100%',
    }
})