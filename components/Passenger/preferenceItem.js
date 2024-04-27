import React from "react";
import { View, StyleSheet } from "react-native";
import { Chip, Icon } from "react-native-paper";
import { enumeratePreferences } from "../../utils/UserHelpers";

const PreferenceItem = ({ attribute, value: isYesOrNo, matched }) => {
  const iconName = isYesOrNo ? "check" : "close";
  const iconColor = isYesOrNo ? "green" : "red";

  return (
    <View style={styles.preferenceItem}>
      <Chip
        icon={() => <Icon source={iconName} size={16} color={iconColor} />}
        style={[styles.chip, matched && styles.matchedChip]}>
        {enumeratePreferences(attribute, isYesOrNo)}
      </Chip>
    </View>
  );
};
const styles = StyleSheet.create({
  preferenceItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 5,
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
