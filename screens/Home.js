import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

function Home({navigation}) {
    const handlePassengerClick = () => {
        // Handle the passenger click
      };
    
      const handleDriverClick = () => {
        navigation.navigate('TabNav', { user: 'driver' });
      };
  return (
    <View style={styles.container}>
    <View style={styles.passengerContainer}>
      <Text style={styles.passengerText}>PASSENGER</Text>
      {/* <Image
        source={require('./path-to-your-passenger-car-image.png')}
        style={styles.carImage}
      /> */}
      <TouchableOpacity style={styles.button} onPress={handlePassengerClick}>
        <Text style={styles.buttonText}>CLICK HERE</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.driverContainer}>
      <Text style={styles.driverText}>DRIVER</Text>
      {/* <Image
        source={require('./path-to-your-driver-image.png')}
        style={styles.driverImage}
      /> */}
      <TouchableOpacity style={styles.button} onPress={handleDriverClick}>
        <Text style={styles.buttonText}>CLICK HERE</Text>
      </TouchableOpacity>
    </View>
  </View>
  );
  

}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    passengerContainer: {
      backgroundColor: '#E3E6F3',
      flex:1,   
      width:'100%'   ,
      padding: 20,
      alignItems: 'center',
    },
    driverContainer: {
      backgroundColor: '#30AADD',
      flex:1,   
      width: '100%',
      padding: 20,
      alignItems: 'center',
    },
    passengerText: {
    marginTop:80,
      color: '#30AADD',
      fontSize: 24,
      fontWeight: 'bold',
    },
    driverText: {
    marginTop:80,
      color: '#FFFFFF',
      fontSize: 24,
      fontWeight: 'bold',
    },
    button: {
      marginTop: 80,
      backgroundColor: '#E3E6F3',
      padding: 20,
      borderRadius: 10,
      borderColor:'#30AADD',
      borderWidth: 2,
      
    },
    buttonText: {
      color: '#000080',
    },
    carImage: {
      height: 100,
      resizeMode: 'contain',
    },
    driverImage: {
      height: 100,
      resizeMode: 'contain',
    },
  });
  
  

export default Home
