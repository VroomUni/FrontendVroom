import { View, Text, Alert, StyleSheet, Dimensions } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../constants/colors";
import Checkbox from "expo-checkbox";
import { RadioButton } from "react-native-paper";
import { Button } from "react-native-paper";
import { setPreferences } from "../api/UserService";
import { useAuth } from "../context/AuthContext";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Preferences = ({ navigation }) => {
  const [smokerchecked, setSmokerChecked] = useState(null);
  const [foodchecked, setFoodChecked] = useState(null);
  const [musicchecked, setMusicChecked] = useState(null);
  const [talkativechecked, setTalkativeChecked] = useState(null);
  const [boysOnly, setBoysOnly] = useState(null);
  const [girlsOnly, setGirlsOnly] = useState(null);
  const { user } = useAuth();
  const submitPreferences = async isYesClick => {
    try {
      const res = await setPreferences({
        smoking: smokerchecked,
        foodFriendly: foodchecked,
        loudMusic: musicchecked,
        talkative: talkativechecked,
        UserFirebaseId: user.uid,
        girlsOnly: girlsOnly,
        boysOnly: boysOnly,
      });
      isYesClick
        ? navigation.navigate("Car")
        : navigation.navigate("SplashScreen");
    } catch (err) {
      console.error(err);
      Alert.alert("there was a problem setting up preferences");
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        paddingLeft: 10,
        paddingRight: 10,
      }}>
      <View
        style={{
          marginVertical: 22,
          alignItems: "center",
          flexDirection: "row",
        }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            marginVertical: 20,
            color: COLORS.blue,
            marginRight: 30,
          }}>
          Let's Get To Know you
        </Text>

        <Button
          title='Skip'
          mode='contained-tonal'
          buttonColor='#00f0dc'
          textColor='white'
          icon='chevron-right'
          onPress={() => submitPreferences(false)}
          contentStyle={{ flexDirection: "row-reverse" }}>
          Skip
        </Button>
      </View>

      <View style={{ marginBottom: 12 }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 400,
            marginVertical: 8,
            color: "black",
          }}>
          Smoker ?
        </Text>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingLeft: 20,
            }}>
            <RadioButton.Android
              value={true}
              status={smokerchecked === true ? "checked" : "unchecked"}
              onPress={() => setSmokerChecked(true)}
            />
            <Text style={{ marginRight: 8, color: "black" }}>Yes</Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <RadioButton.Android
              value={false}
              status={smokerchecked === false ? "checked" : "unchecked"}
              onPress={() => setSmokerChecked(false)}
            />
            <Text style={{ marginRight: 8, color: "black" }}>No</Text>
          </View>
        </View>
      </View>

      <View style={{ marginBottom: 12 }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 400,
            marginVertical: 8,
            color: "black",
          }}>
          Food Friendly ?
        </Text>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingLeft: 20,
            }}>
            <RadioButton.Android
              value={true}
              status={foodchecked === true ? "checked" : "unchecked"}
              onPress={() => setFoodChecked(true)}
            />
            <Text style={{ marginRight: 8, color: "black" }}>Yes</Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <RadioButton.Android
              value={false}
              status={foodchecked === false ? "checked" : "unchecked"}
              onPress={() => setFoodChecked(false)}
            />
            <Text style={{ marginRight: 8, color: "black" }}>No</Text>
          </View>
        </View>
      </View>

      <View style={{ marginBottom: 12 }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 400,
            marginVertical: 8,
            color: "black",
          }}>
          Loud Music ?
        </Text>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingLeft: 20,
            }}>
            <RadioButton.Android
              value={true}
              status={musicchecked === true ? "checked" : "unchecked"}
              onPress={() => setMusicChecked(true)}
            />
            <Text style={{ marginRight: 8, color: "black" }}>Yes</Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <RadioButton.Android
              value={false}
              status={musicchecked === false ? "checked" : "unchecked"}
              onPress={() => setMusicChecked(false)}
            />
            <Text style={{ marginRight: 8, color: "black" }}>No</Text>
          </View>
        </View>
      </View>

      <View style={{ marginBottom: 12 }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 400,
            marginVertical: 8,
            color: "black",
          }}>
          Talkative ?
        </Text>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingLeft: 20,
            }}>
            <RadioButton.Android
              value={true}
              status={talkativechecked === true ? "checked" : "unchecked"}
              onPress={() => setTalkativeChecked(true)}
            />
            <Text style={{ marginRight: 8, color: "black" }}>Yes</Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <RadioButton.Android
              value={false}
              status={talkativechecked === false ? "checked" : "unchecked"}
              onPress={() => setTalkativeChecked(false)}
            />
            <Text style={{ marginRight: 8, color: "black" }}>No</Text>
          </View>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          marginVertical: 6,
          alignItems: "center",
        }}>
        <Text
          style={{
            color: "black",
            fontSize: 20,
            fontWeight: 400,
            paddingRight: 30,
          }}>
          Boys Only
        </Text>
        <Checkbox
          style={{ marginRight: 8 }}
          value={boysOnly ? true : false}
          onValueChange={setBoysOnly}
          color={boysOnly ? COLORS.primary : undefined}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          marginVertical: 6,
          alignItems: "center",
          marginRight: 100,
        }}>
        <Text
          style={{
            color: "black",
            fontSize: 20,
            fontWeight: 400,
            paddingRight: 33,
          }}>
          Girls Only
        </Text>
        <Checkbox
          style={{ marginRight: 8 }}
          value={girlsOnly ? true : false}
          onValueChange={setGirlsOnly}
          color={girlsOnly ? COLORS.primary : undefined}
        />
      </View>

      <View style={{ marginBottom: 12 }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 400,
            marginVertical: 8,
            color: "black",
          }}>
          Do you have a car ?
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginLeft: 30,
            marginRight: 30,
          }}>
          <Button
            title='Skip'
            mode='contained-tonal'
            buttonColor='#188bff'
            textColor='white'
            onPress={() => {
              submitPreferences((isYes = true));
            }}>
            Yes
          </Button>

          <Button
            title='Skip'
            mode='contained-tonal'
            buttonColor='#188bff'
            textColor='white'
            onPress={() => {
              submitPreferences((isYes = false));
            }}>
            No
          </Button>
        </View>
      </View>

      {/* <Button
        title="Skip"
        mode="contained-tonal"
        icon="chevron-right"
        buttonColor="#00f0dc"
        textColor="white"
        onPress={() => console.log("SKIP")}
      >
        Skip
      </Button> */}

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginVertical: 22,
        }}></View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingLeft: windowWidth * 0.05,
    paddingRight: windowWidth * 0.1,
  },
  headingContainer: {
    marginVertical: windowHeight * 0.02,
    alignItems: "center",
    flexDirection: "row",
  },
  headingText: {
    fontSize: windowWidth * 0.06,
    fontWeight: "bold",
    marginVertical: windowHeight * 0.03,
    color: COLORS.blue,
    marginRight: windowWidth * 0.05,
  },
  // Other styles for your components
});

export default Preferences;
