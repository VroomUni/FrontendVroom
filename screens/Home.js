import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useAuth } from "../context/AuthContext";

function Home({ navigation }) {
  const { setIsPassenger } = useAuth();
  const handlePassengerClick = () => {
    setIsPassenger(true);
    navigation.navigate("TabNav");
  };

  const handleDriverClick = () => {
    setIsPassenger(false);
    navigation.navigate("TabNav");
  };
  return (
    <View style={styles.container}>
      <View style={styles.passengerContainer}>
        <Text style={styles.passengerText}>PASSENGER</Text>
        <TouchableOpacity style={styles.button} onPress={handlePassengerClick}>
          <Text style={styles.buttonText}>CLICK HERE</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.driverContainer}>
        <Text style={styles.driverText}>DRIVER</Text>
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
      backgroundColor: '#E2EAF4',
      flex:1,   
      width:'100%'   ,
      padding: 20,
      alignItems: 'center',
    },
    driverContainer: {
      backgroundColor: '#162447',
      flex:1,   
      width: '100%',
      padding: 20,
      alignItems: 'center',
    },
    passengerText: {
    marginTop:80,
      color: '#162447',
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
      borderColor:'#162447',
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
