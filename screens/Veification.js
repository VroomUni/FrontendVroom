import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Button } from "react-native-paper";
import { useState } from "react";
import COLORS from "../constants/colors";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Verification = ({ navigation }) => {
  const [email, setEmail] = useState("");

  return (
    <View style={styles.Container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>

          <Text style={styles.title}>
            Verification
          </Text>

          <Image
            style={styles.logo}
            source={require("../assets/Verification-1.png")}
            resizeMode="contain"
          />
          
          <Text style={styles.Text}>
          We've just sent you an email to verify your account. 
          Please click the link in the email to complete the verification process. 
          Afterward, refresh the screen to continue.
          </Text>
          <View style={{ flexDirection: "row" }}>
          <Button
            title="Refresh"
            // filled
            style={styles.Button}
            // onPress={handleContinue}
            mode="contained-tonal"
            buttonColor={COLORS.b400}
            textColor="white"
            fontSize="18"
          >
            Refresh
          </Button>

          <Button
            title="Refresh"
            // filled
            style={styles.Button}
            // onPress={handleContinue}
            mode="contained-tonal"
            buttonColor={COLORS.b400}
            textColor="white"
            fontSize="18"
          >
            Resend
          </Button>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 48,
    borderColor: "#30AADD",
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 22,
    fontSize: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center",
    paddingVertical: 40,
    color: COLORS.black,
    fontFamily: "Helvetica",
  },
  innerContainer: {
    paddingHorizontal: 20,
    width: "85%",
    alignSelf: "center", 
    marginBottom: 30,
  },
  Text : {
    fontSize : 14,
    color : COLORS.g300,
    alignSelf:"center",
    marginBottom: 10, 
  },
  Container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
  },
  inputContainer: {
    marginTop: 10,
    marginBottom: 12,
  },
  Button: {
    marginTop: 18,
    marginBottom: 4,
    width: "35%",
    marginLeft: 30,
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 50,
    paddingBottom: 50,
  },
});
export default Verification;
