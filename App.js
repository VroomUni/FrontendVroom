import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import OnBoarding from './screens/OnBoarding';
import SplashScreen from './screens/SplashScreen';

export default function App() {
  return (
    <View style={styles.container}>
    {/* <OnBoarding/> */}
    <SplashScreen/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
