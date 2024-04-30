import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
// import Button from "../components/Button";
import { RadioButton, Button } from "react-native-paper";
import ImageUpload from "../components/ImageUpload";
import { createUser, saveImage } from "../api/UserService";
import Carousel, { Pagination } from "react-native-snap-carousel";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useRideContext } from "../context/UserRideContext";

const Signup = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [isPasswordShown, setIsPasswordShown] = useState(true);
  const [termsChecked, setTermsChecked] = useState(false);
  const [gender, setGender] = useState("");
  const [message, setMessage] = useState("");

  const [profileImage, setProfileImage] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [rePasswordError, setRePasswordError] = useState("");

  const validateEmail = (email) => {
    var re = /^[a-zA-Z0-9._-]+@(medtech\.tn|msb\.tn|smu.tn)$/;
    return re.test(email);
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    const isValid = validateEmail(text);
    setErrorMessage(isValid ? "" : " Invalid Email address.");
  };

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
        : " Password should include at least one capital letter and one number"
    );
  };

  const handleRePasswordChange = (text) => {
    setRePassword(text);
    setRePasswordError(text === password ? "" : " Passwords do not match!");
  };

  const validatePhone = (phone) => {
    let re = /^[\d]{8}$/;
    return re.test(phone);
  };

  const handlePhoneChange = (text) => {
    setPhone(text);
    const isValid = validatePhone(text);
    setPhoneError(isValid ? "" : " Invalid phone number");
  };

  const handleSubmit = async () => {
    setErrorMessage("");
    setPhoneError("");
    setPasswordError("");
    setRePasswordError("");
    if (
      email === "" ||
      phoneNumber === "" ||
      firstName === "" ||
      lastName === "" ||
      age === "" ||
      rePassword === "" ||
      password === "" ||
      gender === ""
    ) {
      setMessage("Please fill in all fields!");
    } else if (!validateEmail(email)) {
      setMessage("Only valid email addresses are accepted");
    } else if (!validatePhone(phoneNumber)) {
      setMessage("Invalid phone number");
    } else if (password.length <= 7) {
      setMessage("Password should have more than 7 characters");
    } else if (!validatePassword(password)) {
      setMessage(
        "Password should include at least one capital letter and one number"
      );
    } else if (password !== rePassword) {
      setMessage("Passwords do not match!");
    } else if (!termsChecked) {
      setMessage("Please agree to the terms and conditions");
    } else {
      try {
        const imagePath = await saveImage(profileImage);
        await createUser({
          email,
          firstName,
          lastName,
          password,
          gender,
          phoneNumber,
          profilePicPath: imagePath,
        });

        navigation.navigate("Preferences");
      } catch (err) {
        let msg = "";
        if (err.code === "auth/email-already-in-use") {
          msg = "The email address is already in use.";
        } else {
          msg = "We encountered an error during registration";
        }
        console.error(err);
        Alert.alert(msg);
      }
    }
  };
  // const {
  //   setDateValue,

  // } = useRideContext();

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDateSelected, setDateSelected] = useState(false);


  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    setDateSelected(date);
    hideDatePicker();
    
  };

  const handleDateTimeChange = (selectedDateOrTime) => {
    setFromTimePickerVisible(false);
    
    if (isDatePickerVisible) {
      setDatePickerVisibility(false);
      setCustomSelectedDate(selectedDateOrTime);

      return;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ImageBackground
        source={require("../assets/background-4.png")}
        resizeMode="cover"
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
        }}
      />
      <ScrollView keyboardDismissMode="on-drag">
        <View style={{ flex: 1, marginHorizontal: 22 }}>
          <View style={{ marginVertical: 22 }}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                marginVertical: 12,
                color: COLORS.white,
              }}
            >
              Create Account
            </Text>
          </View>

          <View style={{ marginBottom: 12 , marginTop:12 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 400,
                marginVertical: 8,
                color: COLORS.blue,
                fontWeight: "bold",
              }}
            >
              Email address
              {errorMessage && (
                <Text style={{ color: "red" }}>{errorMessage}</Text>
              )}
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
            </View>
          </View>

          <View style={{ marginBottom: 12 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 400,
                marginVertical: 8,
                color: COLORS.blue,
                fontWeight: "bold",
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
                value={firstName}
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
                color: COLORS.blue,
                fontWeight: "bold",
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
                value={lastName}
                onChangeText={setLastname}
              />
            </View>
          </View>

          {/* <View style={{ marginBottom: 12 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 400,
                marginVertical: 8,
                color: COLORS.blue,
                fontWeight: "bold",
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
          </View> */}

          <View style={{ marginBottom: 12 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 400,
                marginVertical: 8,
                color: COLORS.blue,
                fontWeight: "bold",
              }}
            >
              Password {""}
              {passwordError && (
                <Text style={{ color: "red" }}>{passwordError}</Text>
              )}
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
                // onChangeText={setPassword}
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
            <Text
              style={{
                fontSize: 16,
                fontWeight: 400,
                marginVertical: 8,
                color: COLORS.blue,
                fontWeight: "bold",
              }}
            >
              Confirm Password {""}
              {rePasswordError && (
                <Text style={{ color: "red" }}>{rePasswordError}</Text>
              )}
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
                // onChangeText={setRePassword}
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

          <View style={{ marginBottom: 12 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 400,
                marginVertical: 8,
                color: COLORS.blue,
                fontWeight: "bold",
              }}
            >
              Phone Number {""}
              {phoneError && <Text style={{ color: "red" }}>{phoneError}</Text>}
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
                value={phoneNumber}
                onChangeText={handlePhoneChange}
              />
            </View>
          </View>

          <View style={{ flexDirection: "row", 
                        justifyContent: "space-between" ,
                        marginBottom: 18,
                        marginTop: 18
                        }}>

          <View style={{ marginBottom: 18 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 400,
                marginVertical: 8,
                color: COLORS.blue,
                fontWeight: "bold",
              }}
            >
              Gender
            </Text>

            <View style={{ flexDirection: "row" }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <RadioButton
                  value="Male"
                  status={gender === "Male" ? "checked" : "unchecked"}
                  onPress={() => setGender("Male")}
                />
                <Text style={{ marginRight: 8, color: COLORS.black }}>Male</Text>
              </View>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <RadioButton
                  value="Female"
                  status={gender === "Female" ? "checked" : "unchecked"}
                  onPress={() => setGender("Female")}
                />
                <Text style={{ marginRight: 8, color: COLORS.black }}>
                  Female
                </Text>
              </View>
            </View>
          {/* </View> */}
          
          <View
            style={{
              width: "100%",
              height: 48,

              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingLeft: 22,
              
              marginTop: 18,
            }}
          >
            <Button
              title="Show Date Picker"
              onPress={showDatePicker}
              mode="outlined"
              textColor="grey"
              
            >
              Birthday
            </Button>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
              // onValueChange={handleDateTimeChange}
            />
          </View>
          </View>

          <View   style={{
              marginEnd: 20
            }}> 
            <ImageUpload
              profileImage={profileImage}
              setProfileImage={setProfileImage}
            />
          </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              marginVertical: 6,
            }}
          >
            <Checkbox
              style={{ marginRight: 8 }}
              value={termsChecked}
              onValueChange={setTermsChecked}
              color={termsChecked ? COLORS.b100 : undefined}
            />

            <Text style={{ color: COLORS.black }}>
              I aggree to the terms and conditions
            </Text>
          </View>
          {message !== "" && (
            <Text style={{ color: "red", marginBottom: 12 }}>{message}</Text>
          )}
          <Button
            title="Sign Up"
            // filled
            onPress={handleSubmit}
            style={{
              marginTop: 18,
              marginBottom: 4,
              width: "50%",
              marginLeft: 75,
            }}
            mode="contained-tonal"
            buttonColor={COLORS.b400}
            textColor="white"
            fontSize="18"
          >
            Sign Up
          </Button>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginVertical: 22,
            }}
          >
            <Text style={{ fontSize: 16, color: COLORS.black }}>
              Already have an account
            </Text>
            <Pressable onPress={() => navigation.navigate("Login")}>
              <Text
                style={{
                  fontSize: 16,
                  color: COLORS.b100,
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
