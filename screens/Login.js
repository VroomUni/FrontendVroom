// import { View, Text, Image , Pressable, TextInput, TouchableOpacity } from 'react-native'
// import React, { useState } from 'react'
// import { SafeAreaView } from "react-native-safe-area-context";
// import COLORS from '../constants/colors';
// import { Ionicons } from "@expo/vector-icons";
// import Checkbox from "expo-checkbox"
// import Button from '../components/Button';

// const Login = ({ navigation }) => {
//     const [isPasswordShown, setIsPasswordShown] = useState(false);
//     const [isChecked, setIsChecked] = useState(false);

//     return (
//         <SafeAreaView style={{ flex: 1, backgroundColor: "#f4f4fb" }}>
//             <View style={{  marginHorizontal: 100 }} >

//                 <View style={{ marginVertical: 22 }}>
//                 <Text style={{
//                         fontSize: 30,
//                         color: "#5e69ee",
//                     }}>VROOM</Text>

//                     <Text style={{
//                         fontSize: 24,
//                         fontWeight: 'bold',
//                         marginVertical: 20,
//                         color: "#5e69ee",
//                         marginHorizontal:-20,
//                         paddingLeft:10,
//                     }}>
//                         Hi Welcome Back ! 👋
//                     </Text>

//                 </View>

//                 <View style={{ marginBottom: 12, marginHorizontal:-20 }}>
//                     <Text style={{
//                         fontSize: 20,
//                         fontWeight: 600,
//                         marginVertical: 8,
//                         color: "#5e69ee",
//                     }}>Email address</Text>

//                     <View style={{
//                         width: "100%",
//                         height: 48,
//                         borderColor: COLORS.black,
//                         borderWidth: 1,
//                         borderRadius: 8,
//                         alignItems: "center",
//                         justifyContent: "center",
//                         paddingLeft: 22
//                     }}>
//                         <TextInput
//                             placeholder='Enter your email address'
//                             placeholderTextColor={COLORS.black}
//                             keyboardType='email-address'
//                             style={{
//                                 width: "100%"
//                             }}
//                         />
//                     </View>
//                 </View>

//                 <View style={{ marginBottom: 12, marginHorizontal:-20}}>
//                     <Text style={{
//                         fontSize: 20,
//                         fontWeight: 600,
//                         marginVertical: 8,
//                         color: "#5e69ee",
//                     }}>Password</Text>

//                     <View style={{
//                         width: "100%",
//                         height: 48,
//                         borderColor: COLORS.black,
//                         borderWidth: 1,
//                         borderRadius: 8,
//                         alignItems: "center",
//                         justifyContent: "center",
//                         paddingLeft: 22
//                     }}>
//                         <TextInput
//                             placeholder='Enter your password'
//                             placeholderTextColor={COLORS.black}
//                             secureTextEntry={isPasswordShown}
//                             style={{
//                                 width: "100%"
//                             }}
//                         />

//                         <TouchableOpacity
//                             onPress={() => setIsPasswordShown(!isPasswordShown)}
//                             style={{
//                                 position: "absolute",
//                                 right: 12
//                             }}
//                         >
//                             {
//                                 isPasswordShown == true ? (
//                                     <Ionicons name="eye-off" size={24} color={COLORS.black} />
//                                 ) : (
//                                     <Ionicons name="eye" size={24} color={COLORS.black} />
//                                 )
//                             }

//                         </TouchableOpacity>
//                     </View>
//                 </View>

//                 <View style={{
//                     flexDirection: 'row',
//                     marginVertical: 6, marginHorizontal:-20
//                 }}>
//                     <Checkbox
//                         style={{ marginRight: 8 }}
//                         value={isChecked}
//                         onValueChange={setIsChecked}
//                         color={isChecked ? COLORS.primary : undefined}
//                     />

//                     <Text style={{color : "#5e69ee"}}>Remember Me</Text>
//                 </View>

//                 <Button
//                     title="Login"
//                     filled
//                     style={{
//                         marginTop: 18,
//                         marginBottom: 4,
//                         marginHorizontal:-20
//                     }}
//                     onPress={() => navigation.navigate("Home")}
//                 />

//                 <View style={{
//                     flexDirection: "row",
//                     justifyContent: "center",
//                     marginVertical: 22
//                 }}>
//                     <Text style={{ fontSize: 16, color: "#5e69ee" }}>Don't have an account ? </Text>
//                     <Pressable
//                         onPress={() => navigation.navigate("Signup")}
//                     >
//                         <Text style={{
//                             fontSize: 16,
//                             color: COLORS.primary,
//                             fontWeight: "bold",
//                             marginLeft: 6
//                         }}>Register</Text>
//                     </Pressable>
//                 </View>
//             </View>
//         </SafeAreaView>
//     )
// }

// export default Login
import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Pressable,
  TouchableOpacity,
} from "react-native";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Implement your login logic here
    console.log("Login pressed", email, password);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Vroom</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Pressable onPress={() => navigation.navigate("Signup")}>
        <Text style={{ fontSize: 16, color: "#5e69ee" }}>
          Don't have an account ? 
        </Text>
        <Text style={{ fontSize: 16, color: "#5e69ee", marginLeft:50 }}>
        Click Here 
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    logo: {
      fontSize: 24,
      marginBottom: 20,
      color: '#30AADD',
    },
    input: {
      width: '80%',
      height: 40,
      marginBottom: 10,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: '#30AADD',
      borderRadius: 5,
    },
    button: {
      width: '40%',
      height: 40,
      backgroundColor: '#30AADD',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      borderWidth: 2,
      borderColor: '#30AADD', // Adjust color as needed
      marginTop: 10,
      marginBottom:10
    },
    buttonText: {
      color: '#FFF', // Adjust text color as needed
      fontSize: 16,
    },
  });
  

export default Login;
