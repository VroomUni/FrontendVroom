import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button, } from "react-native-paper";

const Car = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <Text>Car</Text>
      <Button
              title="Skip"
              mode="contained-tonal"
              buttonColor="#188bff"
              textColor="white"
              onPress={() => navigation.navigate("OnBoarding")}
              
            >
              Next
            </Button>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },})

  export default Car