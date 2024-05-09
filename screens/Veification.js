import { View, Text, Image, StyleSheet , TextInput} from "react-native";
import { Button } from 'react-native-paper';
import { useState } from "react";
import COLORS from "../constants/colors";

const verification = ({ navigation }) => {
  const [email, setEmail] = useState("");



  return (
    <View style={styles.Container} >
      <Text>verification</Text>

      <Image
        style={styles.logo}
        source={require("../assets/ForgotPass-1.png")}
        resizeMode="contain"
      />
      <Text>
        Enter your email for the verification process, we will send you a
        confirmation code.
      </Text>

      {/* <Text style={styles.title}>LOGIN</Text> */}
      <View style={styles.inputContainer}>
        {/* <Text style={styles.label}>Email Address</Text> */}
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
            title="Login"
            // filled
            style={styles.Button}
            // onPress={handleContinue}
            mode = "contained-tonal"
            buttonColor={COLORS.b400}
            textColor="white"
            fontSize="18"
          >
            Continue
          </Button>
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
  Container:{
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
export default verification;
