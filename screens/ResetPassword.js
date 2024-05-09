import {
    View,
    Text,
    Image,
    StyleSheet,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
    TouchableOpacity,
    
  } from "react-native";
  import { Button } from "react-native-paper";
  import { useState } from "react";
  import COLORS from "../constants/colors";
  import { MaterialCommunityIcons,Ionicons } from '@expo/vector-icons';

  
  const ResetPassword = ({ navigation }) => {

    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [isPasswordShown, setIsPasswordShown] = useState(true);
    const [passwordError, setPasswordError] = useState("");
    const [rePasswordError, setRePasswordError] = useState("");

    const validatePassword = (password) => {
    let re = /^(?=.*[A-Z])(?=.*[0-9])/;
    return re.test(password);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    const isValid = validatePassword(text);
    setPasswordError(
      isValid
        ? ""
        : "Password should include at least one capital letter and one number"
    );
  };

  const handleRePasswordChange = (text) => {
    setRePassword(text);
    setRePasswordError(text === password ? "" : "Passwords do not match!");
  };


    return (
      <View style={styles.Container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.innerContainer}>
  
            <Text style={styles.title}>
            Reset Password
            </Text>
  
            <Image
              style={styles.logo}
              source={require("../assets/PasswordUpdate.png")}
              resizeMode="contain"
            />
            
            <Text style={styles.Text}>
              Password should include at least one uppercase character and one number
            </Text>

            <View style={{ marginBottom: 12 }}>

              {passwordError && (
                <Text style={{ color: "red" }}>{passwordError}</Text>
              )}
           

            <View
              style={{
                width: "100%",
                height: 48,
                borderColor: COLORS.b300,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 22,
                backgroundColor: "white",
              }}
            >
              <TextInput
                placeholder="Enter your password"
                placeholderTextColor={COLORS.g700}
                secureTextEntry={isPasswordShown}
                style={{
                  width: "100%",
                }}
                value={password}
                onChangeText={handlePasswordChange}
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

          <View style={{ marginBottom: 12 }}>
            
              {rePasswordError && (
                <Text style={{ color: "red" }}>{rePasswordError}</Text>
              )}

            <View
              style={{
                width: "100%",
                height: 48,
                borderColor: COLORS.b300,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 22,
                backgroundColor: "white",
              }}
            >
              <TextInput
                placeholder="Confirm password"
                placeholderTextColor={COLORS.g700}
                secureTextEntry={isPasswordShown}
                style={{
                  width: "100%",
                }}
                value={rePassword}
                onChangeText={handleRePasswordChange}
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
            
            <Button
              title="Reset"
              style={styles.Button}
              // onPress={handleContinue}
              mode="contained-tonal"
              buttonColor={COLORS.b400}
              textColor="white"
              fontSize="20"
            >
              Reset
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
      paddingVertical: 20,
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
      fontSize : 16,
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
      width: "50%",
      marginLeft: 75,
    },
    logo: {
      width: 300,
      height: 300,
      resizeMode: "contain",
      alignSelf: "center",
      marginBottom: 20,
      paddingBottom: 30,
    },
  });
  export default ResetPassword;
  