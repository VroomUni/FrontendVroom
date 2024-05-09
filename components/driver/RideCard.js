import * as React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Card, Text, Button, Badge } from "react-native-paper";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import RideInfo from "../RideInfo";

function RideCard({
  id,
  from,
  to,
  time,
  requests,
  onDelete,
  navigation,
  routePolyline,
}) {
  const handleDelete = () => {
    onDelete(id);
  };
  const handleSeeDetails = () => {
    navigation.navigate("Request details", { requests, routePolyline });
  };
  console.log(requests);

  const getRequestsCount = (status) =>
    requests.filter(req => req.ride_request.status === status).length;
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <RideInfo  from={from} to={to} startTime={time} />
          <View style={[styles.requestsRow,{marginTop:10}]}>
            <Text variant='bodyMedium' style={{ fontWeight: "bold" }}>
              Requests:{" "}
            </Text>
            <Badge size={20} style={{ backgroundColor: "red" }}>
              <Text
                style={{
                  fontWeight: "bold",
                  color: "white",
                  alignSelf: "center",
                }}>
                {getRequestsCount(0)}
              </Text>
            </Badge>
          </View>
          <View style={styles.requestsRow}>
            <Text variant='bodyMedium' style={{ fontWeight: "bold" }}>
              Confirmed:{" "}
            </Text>
            <Badge size={20} style={{ backgroundColor: "green" }}>
              <Text
                style={{
                  fontWeight: "bold",
                  color: "white",
                  alignSelf: "center",
                }}>
                {getRequestsCount(1)}
              </Text>
            </Badge>
          </View>
        </Card.Content>
        <Card.Actions style={styles.actions}>
          <Button
            mode='outlined'
            onPress={handleSeeDetails}
            labelStyle={{ color: "#162447", fontWeight: "bold" }}>
            Check Requests
          </Button>
        </Card.Actions>
        <TouchableOpacity style={styles.iconContainer} onPress={handleDelete}>
          <MaterialIcons name='delete-forever' color='red' size={24} />
        </TouchableOpacity>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  card: {
    marginTop: 20,
    backgroundColor: "white",
    width: "95%",
    borderRadius: 8,
    elevation: 1,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    paddingVertical: 10,
  },
  iconContainer: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  requestsRow: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end", // This aligns the button to the right
    paddingRight: 8, // This adds some padding on the right
    paddingBottom: 5, // This adds some padding at the bottom
    width: "100%",
  },
});

export default RideCard;
