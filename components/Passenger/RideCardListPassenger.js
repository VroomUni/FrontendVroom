// RideCardPassengerList.js
import * as React from "react";
import { View, Text } from "react-native";
import RideCardPassenger from "./RideCardPassenger";

function RideCardPassengerList({ rides, navigation }) {
  // More realistic mock data
  // const rides = [
  //   {
  //     id: 1,
  //     driverName: "John Doe",
  //     carModel: "Toyota Camry",
  //     carColor: "Red",
  //     phoneNumber: "(123) 456-7890",
  //     status: "Accepted",
  //   },
  //   {
  //     id: 2,
  //     driverName: "Jane Smith",
  //     carModel: "Honda Accord",
  //     carColor: "Blue",
  //     phoneNumber: "(987) 654-3210",
  //     status: "Declined",
  //   },
  //   {
  //     id: 3,
  //     driverName: "Bob Johnson",
  //     carModel: "Ford Fusion",
  //     carColor: "Black",
  //     phoneNumber: "(555) 123-4567",
  //     status: "Pending",
  //   },
  //   // Add more rides as needed
  // ];

  return (
    <View>
      {rides.length === 0 ? (
        <Text>Nothing to show </Text>
      ) : (
        rides.map(item => (
          <RideCardPassenger
            key={item.id}
            id={item.id}
            driverName={item.Ride.driver.firstName}
            // carModel={item.carModel}
            // carColor={item.carColor}
            phoneNumber={item.Ride.driver.phoneNumber}
            status={item.passenger[0].ride_request.status}
          />
        ))
      )}
    </View>
  );
}

export default RideCardPassengerList;
