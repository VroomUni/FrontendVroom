import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import DriverRideLocationInput from "./screens/DriverRideLocationInput";
import DriverRideSetup from "./screens/DriverRideSetup";

export default function App() {
  return (
    <PaperProvider>
      <SafeAreaProvider>
    <View style={styles.container}>
      <DriverRideLocationInput /> 
   </View>
    </SafeAreaProvider>
    </PaperProvider>
  );
}
//fix map curent location 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:60,
    backgroundColor: "#F4F4FB",

   
  },
});
