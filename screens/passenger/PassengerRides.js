import React from 'react'
import { View,Text,StyleSheet} from 'react-native'
function PassengerRides() {
    return (
        <View style={styles.container}>
            <Text>
               Passenger ride screen
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

export default PassengerRides
