import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Image,
  Pressable,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import Button from "../components/Button";

const Login = ({ navigation }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(true);
  const [isChecked, setIsChecked] = useState(false);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
          {/* <Image
            style={{ width: 200, height: 50,  }}
            source={require("../assets/Logo-2.jpg")}
          /> */}
            <Text style={styles.title}>VROOM</Text>
          <Text style={styles.welcomeText}>Hi, Welcome Back! 👋</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email address"
              placeholderTextColor={COLORS.darkGray}
              keyboardType="email-address"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                // style={styles.input}
                placeholder="Enter your password"
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

          <View style={styles.checkboxContainer}>
            <Checkbox
              value={isChecked}
              onValueChange={setIsChecked}
              color={isChecked ? COLORS.primary : undefined}
            />
            <Text style={styles.rememberMeText}>{"  "}Remember Me</Text>
          </View>

          <Button
            title="Login"
            filled
            style={styles.loginButton}
            onPress={() => navigation.navigate("Home")}
          />
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
    </KeyboardAvoidingView>
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
    width: "100%", // Takes full width
    alignSelf: "center", // Center the inner container
  },
  title: {
    fontSize: 30,
    color: "#30AADD",
    fontWeight: 'bold',
    textAlign: "center",
    marginVertical: 20,
    
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#30AADD",
    marginBottom: 20,
  },
  inputContainer: {
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
    borderColor: COLORS.lightGray,
    borderWidth: 1,
    borderRadius: 8,
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
    color: "#30AADD",
  },
  loginButton: {
    marginTop: 18,
    marginBottom: 4,
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 22,
  },
  registerText: {
    fontSize: 16,
    color: "#30AADD",
  },
  boldText: {
    fontWeight: "bold",
  },
});

export default Login;
