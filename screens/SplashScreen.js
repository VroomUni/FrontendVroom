import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const SplashScreen = () => {
  return (
    <View style={styles.container}>

      <Text style={styles.header}>vroom</Text>
      <Text style={styles.subheader}>Your ride, Your choice</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Let's Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3e5ed',
  },
  header: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#2A6997',
    marginBottom: 20,
  },
  subheader: {
    fontSize: 24,
    color: '#000000',
    marginBottom: 40,
  },
  button: {
    marginTop: 50,
    paddingHorizontal: 30,
    paddingVertical: 20,
    backgroundColor: '#38FFC7',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default SplashScreen;
