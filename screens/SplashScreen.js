import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const SplashScreen = ({navigation}) => {
  const handleGetStarted = () => {
    navigation.navigate('OnBoarding'); // Navigate to the OnboardingScreen
  };
  return (
    <View style={styles.container}>

      <Text style={styles.header}>vroom</Text>
      <Text style={styles.subheader}>Your ride, Your choice</Text>
      <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
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
    backgroundColor: '#E3E6F3',
  },
  header: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#00669B',
    marginBottom: 20,
  },
  subheader: {
    fontSize: 24,
    color: '#2881BA',
    marginBottom: 40,
  },
  button: {
    marginTop: 50,
    paddingHorizontal: 30,
    paddingVertical: 20,
    backgroundColor: '#00F0DC',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default SplashScreen;
