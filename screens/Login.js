import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Pressable,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ImageBackground,
} from "react-native";
import COLORS from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { signIn } from "../api/UserService";
import { Button,Checkbox } from 'react-native-paper';

const Login = ({ navigation }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      if (email !== "" && password !== "") {
        await signIn(email, password);
        navigation.navigate("Home");
      }
    } catch (err) {
      console.log(err);
      Alert.alert("wrong username or password");
    }
  };

  return (
    <View
      
      style={styles.container}
    >
      <ImageBackground
          source={require("../assets/background.png")}
          resizeMode="cover"
          style={styles.back}
          />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
          

          <Image
            style={styles.logo}
            source={require("../assets/logo.png")}
            resizeMode="contain"
          />
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
          <View style={styles.inputContainer}>
            {/* <Text style={styles.label}>Password</Text> */}
            <View style={styles.passwordContainer}>
              <TextInput
                // style={styles.input}
                value={password}
                onChangeText={(val) => {
                  setPassword(val);
                }}
                placeholder="Password"
                placeholderTextColor={COLORS.darkGray}
                secureTextEntry={isPasswordShown}
              />

              <TouchableOpacity
                onPress={() => setIsPasswordShown(!isPasswordShown)}
                style={{
                  position: "absolute",
                  right: 12,
                }}
              >
                {isPasswordShown == true ? (
                  <Ionicons name="eye-off" size={24} color={COLORS.black} />
                ) : (
                  <Ionicons name="eye" size={24} color={COLORS.black} />
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* <View style={styles.rememberView}> */}
            {/* <View style={styles.checkboxContainer}>
              <Checkbox.Android
                status={isChecked ? 'checked' : 'unchecked'}
                onPress={() => {
                  setIsChecked(!isChecked);
                }}
                color={COLORS.b100}
                
              />
              <Text style={styles.rememberMeText}>Remember Me</Text>
            </View> */}

            <View>
              <Pressable onPress={() => Alert.alert("Forget Password!")}>
                <Text style={styles.forgetText}>Forgot Password?</Text>
              </Pressable>
            </View>
          {/* </View> */}

          <Button
            title="Login"
            // filled
            style={styles.loginButton}
            onPress={handleLogin}
            mode = "contained-tonal"
            buttonColor={COLORS.b400}
            textColor="white"
            fontSize="18"
          >Login</Button>
          
          <View style={styles.registerContainer}>
            <Pressable onPress={() => navigation.navigate("Signup")}>
              <Text style={styles.registerText}>
                Don't have an account?{" "}
                <Text style={styles.boldText}>Register</Text>
              </Text>
            </Pressable>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4fb",
    justifyContent: "center",
    
  },
  innerContainer: {
    paddingHorizontal: 20,
    width: "85%",
    alignSelf: "center", 
    marginBottom: 30,
  },
  back:{
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  rememberView : {
    width : "100%",
    justifyContent: "space-between",
    alignItems : "center",
    flexDirection : "row",
    marginBottom : 8
  },
  logo: {
    width: 300, 
    height: 300, 
    resizeMode: "contain", 
    alignSelf: "center", 
    marginBottom: 50,
    paddingBottom: 50, 
  },
  forgetText : {
    fontSize : 15,
    color : COLORS.g300,
    alignSelf:"flex-end",
    marginBottom: 20, 
  },
  // title: {
  //   fontSize: 30,
  //   color: "#30AADD",
  //   fontWeight: "bold",
  //   textAlign: "center",
  //   marginVertical: 20,
  // },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center",
    paddingVertical: 40,
    color: COLORS.b400,
    fontFamily: "Helvetica",
  },
  inputContainer: {
    marginTop:10,
    marginBottom: 12,
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    color: "#30AADD",
    marginBottom: 8,
  },
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
  passwordContainer: {
    paddingLeft: 22,
    height: 48,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: COLORS.b100,
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 5, 
  },
  eyeIcon: {
    padding: 12,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
  },
  rememberMeText: {
    fontSize: 16,
    color: COLORS.g500,
  },
  loginButton: {
    marginTop: 18,
    marginBottom: 4,
    width: "50%",
    marginLeft: 75,
    
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 22,
  },
  registerText: {
    fontSize: 16,
    color: COLORS.black,
  },
  boldText: {
    fontWeight: "bold",
    color: COLORS.b100,
  },
});

export default Login;
