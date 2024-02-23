import React , { useEffect } from 'react'
import LottieView from 'lottie-react-native';

function LoadingScreen({navigation}) {
    useEffect(() => {
       
        const timer = setTimeout(() => {
          navigation.navigate('SplashScreen'); 
        }, 8000);
    
       
        return () => clearTimeout(timer);
      }, [navigation]);
  return (
    <LottieView  style={{flex: 1}} source={require('../assets/CarAnimation.json')} autoPlay loop />
  )
}

export default LoadingScreen
