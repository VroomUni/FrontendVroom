import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { RadioButton } from "react-native-paper";
import { Button,IconButton } from "react-native-paper";

const Preferences = ({ navigation }) => {
  const [smokerchecked, setSmokerChecked] = React.useState("");
  const [foodchecked, setFoodChecked] = React.useState("");
  const [musicchecked, setMusicChecked] = React.useState("");
  const [talkativechecked, setTalkativeChecked] = React.useState("");

  const [isBoysSelected, setBoysSelected] = useState(false);
  const [isGirlsSelected, setGirlsSelected] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white , paddingLeft:10, paddingRight:10 }}>

      <View style={{ marginVertical: 22, alignItems:"center", flexDirection: "row" }}>
        
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            marginVertical: 20,
            color: COLORS.blue,
            marginRight: 30,
            
          }}
        >
          Let's Get To Know you
        </Text>

        <Button
        title="Skip"
        mode="contained-tonal"
        buttonColor="#00f0dc"
        textColor="white"
        icon="chevron-right" 
        
        onPress={() => navigation.navigate("SearchRides")}
        contentStyle={{ flexDirection: "row-reverse" }}
      >
        Skip
      </Button>

      {/* <IconButton
        icon="skip-next" 
        color="white"
        size={24} 
        style={{ backgroundColor: "#00f0dc" }} 
        onPress={() => console.log("SKIP")} 
        >
        Skip
        </IconButton> */}
      </View>

      <View style={{ marginBottom: 12,  }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 400,
            marginVertical: 8,
            color: "black",
          }}
        >
          Smoker ?
        </Text>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingLeft: 20,
            }}
          >
            <RadioButton
              value="Yes"
              status={smokerchecked === "Yes" ? "checked" : "unchecked"}
              onPress={() => setSmokerChecked("Yes")}
            />
            <Text style={{ marginRight: 8, color: "black" }}>Yes</Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <RadioButton
              value="No"
              status={smokerchecked === "No" ? "checked" : "unchecked"}
              onPress={() => setSmokerChecked("No")}
            />
            <Text style={{ marginRight: 8, color: "black" }}>No</Text>
          </View>
        </View>
      </View>

      <View style={{ marginBottom: 12,  }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 400,
            marginVertical: 8,
            color: "black",
          }}
        >
          Food Friendly ?
        </Text>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingLeft: 20,
            }}
          >
            <RadioButton
              value="Yes"
              status={foodchecked === "Yes" ? "checked" : "unchecked"}
              onPress={() => setFoodChecked("Yes")}
            />
            <Text style={{ marginRight: 8, color: "black" }}>Yes</Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <RadioButton
              value="No"
              status={foodchecked === "No" ? "checked" : "unchecked"}
              onPress={() => setFoodChecked("No")}
            />
            <Text style={{ marginRight: 8, color: "black" }}>No</Text>
          </View>
        </View>
      </View>

      <View style={{ marginBottom: 12,  }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 400,
            marginVertical: 8,
            color: "black",
          }}
        >
          Loud Music ?
        </Text>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingLeft: 20,
            }}
          >
            <RadioButton
              value="Yes"
              status={musicchecked === "Yes" ? "checked" : "unchecked"}
              onPress={() => setMusicChecked("Yes")}
            />
            <Text style={{ marginRight: 8, color: "black" }}>Yes</Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <RadioButton
              value="No"
              status={musicchecked === "No" ? "checked" : "unchecked"}
              onPress={() => setMusicChecked("No")}
            />
            <Text style={{ marginRight: 8, color: "black" }}>No</Text>
          </View>
        </View>
      </View>

      <View style={{ marginBottom: 12,  }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 400,
            marginVertical: 8,
            color: "black",
          }}
        >
          Talkative ?
        </Text>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingLeft: 20,
            }}
          >
            <RadioButton
              value="Yes"
              status={talkativechecked === "Yes" ? "checked" : "unchecked"}
              onPress={() => setTalkativeChecked("Yes")}
            />
            <Text style={{ marginRight: 8, color: "black" }}>Yes</Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <RadioButton
              value="No"
              status={talkativechecked === "No" ? "checked" : "unchecked"}
              onPress={() => setTalkativeChecked("No")}
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
          
        }}
      >
        <Text
          style={{
            color: "black",
            fontSize: 20,
            fontWeight: 400,
            paddingRight: 30,
          }}
        >
          Boys Only
        </Text>
        <Checkbox
          style={{ marginRight: 8 }}
          value={isBoysSelected}
          onValueChange={setBoysSelected}
          color={isBoysSelected ? COLORS.primary : undefined}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          marginVertical: 6,
          alignItems: "center",
          marginRight: 100,
          
        }}
      >
        <Text
          style={{
            color: "black",
            fontSize: 20,
            fontWeight: 400,
            paddingRight: 33,
          }}
        >
          Girls Only
        </Text>
        <Checkbox
          style={{ marginRight: 8 }}
          value={isGirlsSelected}
          onValueChange={setGirlsSelected}
          color={isGirlsSelected ? COLORS.primary : undefined}
        />
      </View>

      <View style={{ marginBottom: 12,  }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 400,
            marginVertical: 8,
            color: "black",
          }}
        >
          Do you have a car ?
        </Text>

        <View style={{ flexDirection: "row", justifyContent: "space-between",marginLeft: 30,marginRight:30, }}>
          
            <Button
              title="Skip"
              mode="contained-tonal"
              buttonColor="#188bff"
              textColor="white"
              onPress={() => navigation.navigate("Car")}
              
            >
              Yes
            </Button>

            <Button
              title="Skip"
              mode="contained-tonal"
              buttonColor="#188bff"
              textColor="white"
              onPress={() => navigation.navigate("SearchRides")}
            >
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
        }}
      ></View>
    </SafeAreaView>
  );
};

export default Preferences;
