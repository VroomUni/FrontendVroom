import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import LottieView from 'lottie-react-native';

function LoadingScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('SplashScreen');
    }, 8000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Vroom</Text>
      <View style={styles.animationContainer}>
       <LottieView style={styles.animation} source={require('../assets/CarAnimation.json')} autoPlay loop />
      </View>
    </SafeAreaView>
  );
}

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
  animationContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  animation: {
    width: '80%',
    height: '80%',
  },
});

export default LoadingScreen;
