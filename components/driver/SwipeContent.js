import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

function SwipeContent({ onClose, onDelete }) {
  return (
    <View style={styles.backContainer}>
      <Text>Accept</Text>
      <TouchableOpacity style={[styles.Btn, styles.BtnClose]} onPress={onClose}>
        <Text style={styles.Btntext}>close</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.Btn, styles.BtnReject]} onPress={onDelete}>
        <Text style={styles.Btntext}>Reject</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  backContainer: {
    alignItems: "center",
    backgroundColor: "#DDD",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15,
    margin: 5,
    marginBottom: 15,
    borderRadius: 5,
  },
  Btn: {
    alignItems: "flex-end",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75,
    paddingRight: 17,
  },
  BtnClose: {
    backgroundColor: "#1f65ff",
    right: 75,
    borderTopLeftRadius: 2,
    borderBottomLeftRadius: 2,
  },
  BtnReject: {
    backgroundColor: "#F44336",
    right: 0,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  Btntext: {
    color: "#FFF",
  },
});
export default SwipeContent;
