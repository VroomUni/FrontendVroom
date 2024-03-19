import { View,Text,StyleSheet} from 'react-native'

import React from 'react'

function HistoryDriver() {
  return (
    <View style={styles.container}>
    <Text>
   Driver History
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
  

export default HistoryDriver
