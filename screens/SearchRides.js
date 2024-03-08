import React from 'react'
import { View,Text,StyleSheet} from 'react-native'

function SearchRides() {
    return (
        <View style={styles.container}>
            <Text>
               Search rides screen
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

export default SearchRides
