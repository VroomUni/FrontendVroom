import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import Button from "../components/Button";
import { RadioButton,IconButton } from "react-native-paper";

// import ImagePicker from 'react-native-image-picker';

const Signup = ({ navigation }) => {

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [isPasswordShown, setIsPasswordShown] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [checked, setChecked] = React.useState("");
  const [message, setMessage] = useState("");

  const [errorMessage, setErrorMessage] = useState('');

  const validateEmail = email => {
    var re = /^[a-zA-Z0-9._-]+@(medtech\.tn|msb\.tn|smu.tn)$/
    return re.test(email);
    };

    const handleEmailChange = (text) => {
      setEmail(text);
      const isValid = validateEmail(text);
      setErrorMessage(isValid ? '' : 'Invalid email address. Please check for typos.'); // Update error message based on validity
    };

  const validatePassword = password => {
        let re = /^(?=.*[A-Z])(?=.*[0-9])/;
        return re.test(password);
    };

    const validatePhone = phone => {
        let re = /^[\d]{8}$/;
        return re.test(phone);
      };
    
      const handleSubmit = () => {
        if (
          email === "" ||
          phone === "" ||
          firstname === "" ||
          lastname === "" ||
          age === "" ||
          rePassword === "" ||
          password === "" ||
          checked === ""
        ) {
          setMessage("Fill in all fields");
        } else if (!validateEmail(email)) {
          setMessage("Only valid email addresses are accepted");
        } else if (!validatePhone(phone)) {
          setMessage("Invalid phone number");
        } else if (password.length <= 10) {
          setMessage("Password should have more than 10 characters");
        } else if (!validatePassword(password)) {
          setMessage("Password should include at least one capital letter and one number");
        } else if (password !== rePassword) {
          setMessage("Passwords do not match!");
        } else if (!isChecked) {
          setMessage("Please agree to the terms and conditions");
        } else {
          setMessage("");
          setPassword("");
          setPhone("");
          setFirstname("");
          setLastname("");
          setEmail("");
          setAge("");
          setRePassword("");
          setChecked("");
          setIsChecked(false);
          navigation.navigate("Login");
        }
      };
  


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#6CB4EE" }}>
      <ScrollView keyboardDismissMode="on-drag">
        <View style={{ flex: 1, marginHorizontal: 22 }}>
        
          <View style={{ marginVertical: 22 }}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                marginVertical: 12,
                color: COLORS.black,
              }}
            >
              Create Account
            </Text>

            <Text
              style={{
                fontSize: 16,
                color: COLORS.black,
              }}
            >
              VROOM
            </Text>
          </View>

          <View style={{ marginBottom: 12 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 400,
                marginVertical: 8,
                color: "white",
              }}
            >
              Email address
            </Text>

            <View
              style={{
                width: "100%",
                height: 48,
                borderColor: COLORS.black,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 22,
                backgroundColor: "white",
              }}
            >
              <TextInput
                placeholder="Enter your email address"
                placeholderTextColor={COLORS.black}
                keyboardType="email-address"
                style={{
                  width: "100%",
                }}
                value={email}
                // onChangeText={setEmail}
                onChangeText={handleEmailChange}
              />
              {errorMessage && <Text style={errorMessage}>{errorMessage}</Text>}
            </View>
          </View>

          <View style={{ marginBottom: 12 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 400,
                marginVertical: 8,
                color: "white",
              }}
            >
              First Name
            </Text>

            <View
              style={{
                width: "100%",
                height: 48,
                borderColor: COLORS.black,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 22,
                backgroundColor: "white",
              }}
            >
              <TextInput
                placeholder="Enter your first name"
                placeholderTextColor={COLORS.black}
                keyboardType="name-phone-pad"
                style={{
                  width: "100%",
                }}
                value={firstname}
                onChangeText={setFirstname}
              />
            </View>
          </View>

          <View style={{ marginBottom: 12 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 400,
                marginVertical: 8,
                color: "white",
              }}
            >
              Last Name
            </Text>

            <View
              style={{
                width: "100%",
                height: 48,
                borderColor: COLORS.black,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 22,
                backgroundColor: "white",
              }}
            >
              <TextInput
                placeholder="Enter your last name"
                placeholderTextColor={COLORS.black}
                keyboardType="name-phone-pad"
                style={{
                  width: "100%",
                }}
                value={lastname}
                onChangeText={setLastname}
              />
            </View>
          </View>

          <View style={{ marginBottom: 12 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 400,
                marginVertical: 8,
                color: "white",
              }}
            >
              Age
            </Text>

            <View
              style={{
                width: "100%",
                height: 48,
                borderColor: COLORS.black,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 22,
                backgroundColor: "white",
              }}
            >
              <TextInput
                placeholder="Enter your Age"
                placeholderTextColor={COLORS.black}
                keyboardType="phone-pad"
                style={{
                  width: "100%",
                }}
                value={age}
                onChangeText={setAge}
              />
            </View>
          </View>

          <View style={{ marginBottom: 12 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 400,
                marginVertical: 8,
                color: "white",
              }}
            >
              Password
            </Text>

            <View
              style={{
                width: "100%",
                height: 48,
                borderColor: COLORS.black,
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
                placeholderTextColor={COLORS.black}
                secureTextEntry={isPasswordShown}
                style={{
                  width: "100%",
                }}
                value={password}
                onChangeText={setPassword}
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
            <Text
              style={{
                fontSize: 16,
                fontWeight: 400,
                marginVertical: 8,
                color: "white",
              }}
            >
              Confirm Password
            </Text>

            <View
              style={{
                width: "100%",
                height: 48,
                borderColor: COLORS.black,
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
                placeholderTextColor={COLORS.black}
                secureTextEntry={isPasswordShown}
                style={{
                  width: "100%",
                }}
                value={rePassword}
                onChangeText={setRePassword}
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
            <Text
              style={{
                fontSize: 16,
                fontWeight: 400,
                marginVertical: 8,
                color: "white",
              }}
            >
              Phone Number
            </Text>

            <View
              style={{
                width: "100%",
                height: 48,
                borderColor: COLORS.black,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between",
                paddingLeft: 22,
                backgroundColor: "white",
              }}
            >
              <TextInput
                placeholder="+216"
                placeholderTextColor={COLORS.black}
                keyboardType="numeric"
                style={{
                  width: "12%",
                  borderRightWidth: 1,
                  borderLeftColor: COLORS.grey,
                  height: "100%",
                }}
                
              />

              <TextInput
                placeholder="Enter your phone number"
                placeholderTextColor={COLORS.black}
                keyboardType="numeric"
                style={{
                  width: "80%",
                }}
                value={phone}
                onChangeText={setPhone}
              />
            </View>
          </View>

          <View style={{ marginBottom: 12 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 400,
                marginVertical: 8,
                color: "white",
              }}
            >
              Gender
            </Text>

            <View style={{ flexDirection: "row", }}>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
              
                <RadioButton
                  value="Male"
                  status={checked === "Male" ? "checked" : "unchecked"} 
                  onPress={() => setChecked("Male")} 
                />
                <Text style={{ marginRight: 8, color: "white" }}>Male</Text>
              </View>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <RadioButton
                  value="Female"
                  status={checked === "Female" ? "checked" : "unchecked"}
                  onPress={() => setChecked("Female")}
                />
                <Text style={{ marginRight: 8, color: "white" }}>Female</Text>
              </View>
            </View>
          </View>

          {/* https://www.youtube.com/watch?v=uX5E_QFJubU */}



          <View
            style={{
              flexDirection: "row",
              marginVertical: 6,
            }}
          >
            <Checkbox
              style={{ marginRight: 8 }}
              value={isChecked}
              onValueChange={setIsChecked}
              color={isChecked ? COLORS.primary : undefined}
            />

            <Text style={{ color: "white" }}>
              I aggree to the terms and conditions
            </Text>
          </View>
          {message !== "" && <Text style={{ color: "red", marginBottom: 12 }}>{message}</Text>}
          <Button
            title="Sign Up"
            filled
            onPress={handleSubmit}
            style={{
              marginTop: 18,
              marginBottom: 4,
            }}
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginVertical: 22,
            }}
          >
            <Text style={{ fontSize: 16, color: COLORS.white }}>
              Already have an account
            </Text>
            <Pressable onPress={() => navigation.navigate("Login")}>
              <Text
                style={{
                  fontSize: 16,
                  color: COLORS.primary,
                  fontWeight: "bold",
                  marginLeft: 6,
                }}
              >
                Login
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signup;
