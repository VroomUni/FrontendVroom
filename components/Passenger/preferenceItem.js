import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Chip, Icon } from "react-native-paper";

const PreferenceItem = ({ attribute, value: isYesOrNo, matched }) => {
  const iconName = isYesOrNo ? "check" : "close";
  const iconColor = isYesOrNo ? "green" : "red";
  const renderPreferenceAttribute = () => {
    if (attribute === "boysOnly") {
      return "Boys Only";
    } else if (attribute === "girlsOnly") {
      return "Girls Only";
    } else if (attribute === "foodFriendly") {
      return isYesOrNo ? "Food Friendly" : "No Food";
    } else if (attribute === "smoking") {
      return isYesOrNo ? "Smoking" : "No Smoking";
    } else if (attribute === "talkative") {
      return isYesOrNo ? "Talkative" : "Not Talkative";
    } else if (attribute === "loudMusic") {
      return isYesOrNo ? "Loud Music" : "No Loud Music";
    } else {
      return "Unknown Attribute";
    }
  };

  return (
    <View style={styles.preferenceItem}>
      <Chip
        icon={() => <Icon source={iconName} size={18} color={iconColor} />}
        style={[styles.chip, matched && styles.matchedChip]}>
        {renderPreferenceAttribute()}
      </Chip>
    </View>
  );
};
const styles = StyleSheet.create({
  preferenceItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  chip: {
    margin: 4,
    backgroundColor: "#D3D3D3",
    borderRadius: 15,
  },
  matchedChip: {
    backgroundColor: "#3cb371",
  },
  chipText: {
    color: "#333",
  },
});

export default PreferenceItem;
