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
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const ForgotPassword = ({ navigation }) => {

  const [email, setEmail] = useState("");
  const auth = getAuth();

  const sendEmail = () =>{
    sendPasswordResetEmail(auth,email)
    .then(() => {
      alert("Password reset email sent")
    })
    .then(() => {
      navigation.navigate("Login")
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode,errorMessage);
    });
  }

  return (
    <View style={styles.Container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>

          <Text style={styles.title}>
          Verification 
          </Text>

          <Image
            style={styles.logo}
            source={require("../assets/ForgotPass-1.png")}
            resizeMode="contain"
          />
          
          <Text style={styles.Text}>
          <MaterialCommunityIcons name="information-outline" size={18} color="black" />
            {" "}Enter your email for the verification process, we will send you a
            confirmation code.
          </Text>

          <View style={styles.inputContainer}>

            <TextInput
              value={email}
              onChangeText={(val) => {
                setEmail(val);
              }}
              style={styles.input}
              placeholder="Email"
              placeholderTextColor={COLORS.darkGray}
              keyboardType="email-address"
            />
          </View>
          
          <Button
            title="Continue"
            // filled
            style={styles.Button}
            onPress={sendEmail}
            mode="contained-tonal"
            buttonColor={COLORS.b400}
            textColor="white"
            fontSize="18"
          >
            Continue
          </Button>
          
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
  },
  innerContainer: {
    paddingHorizontal: 20,
    width: "85%",
    alignSelf: "center", 
    marginBottom: 30,
  },
  Text : {
    fontSize : 16,
    color : COLORS.g300,
    // alignSelf:"flex-end",
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
    width: "50%",
    marginLeft: 75,
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
export default ForgotPassword;
