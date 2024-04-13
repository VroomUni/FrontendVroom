import { StyleSheet, Text, View } from "react-native";
import React from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const RideInfo = ({ from, to, startTime }) => {
  return (
    <View style={styles.departureInfo}>
      <View style={styles.departureInfo}>
        <View style={styles.infoRow}>
          <FontAwesome
            name='circle'
            size={16}
            color='#00669B'
            style={styles.icon}
          />
          <Text style={styles.addressText}>{from}</Text>
        </View>
        <Text style={styles.dots}>
          <FontAwesome name='ellipsis-v' size={16} color='#333' />
        </Text>
        <View style={styles.infoRow}>
          <FontAwesome
            name='map-marker'
            size={16}
            color='#00669B'
            style={[styles.icon, { marginLeft: 1 }]}
          />
          <Text style={styles.addressText}>{to}</Text>
        </View>
      </View>
      <View style={styles.infoRow}>
        <FontAwesome
          name='clock-o'
          size={20}
          color='#333'
          style={styles.icon}
        />
        <Text style={styles.time}>
          {startTime.split(":").slice(0, 2).join(":")}
        </Text>
      </View>
    </View>
  );
};

export default RideInfo;

const styles = StyleSheet.create({
  departureInfo: {
    width: "100%",
    marginBottom:10
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    // marginBottom: 6,
  },
  icon: {
    marginRight: 8,
    color: "#162447",
  },

  time: {
    color: "#333",
    fontSize: 16,
  },

  dots: {
    fontSize: 16,
    color: "#162447",
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
  addressText: {
    fontSize: 16,
    color: "#333",
  },
});
