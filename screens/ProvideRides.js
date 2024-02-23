import React from 'react'
import { View,Text,StyleSheet} from 'react-native'

function ProvideRides() {
  return (
    <View style={styles.container}>
        <Text>
            Provide Rides Screen
        </Text>
    </View>
  )
  
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  

export default ProvideRides
