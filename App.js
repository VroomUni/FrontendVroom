import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Reportfunction from './components/Reportfunction';

export default function App() {
  return (
   
   
   <View style={styles.container}>
      <Text>Vroom App!</Text>
      <StatusBar style="auto" />
      <Reportfunction/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
