// RideCardPassengerList.js
import * as React from "react";
import { View } from "react-native";
import RideCardPassenger from "./RideCardPassenger";

function RideCardPassengerList({ navigation }) {
  // More realistic mock data
  const rides = [
    { id: 1, driverName: "John Doe", carModel: "Toyota Camry", carColor: "Red", phoneNumber: "(123) 456-7890", status: "Accepted" },
    { id: 2, driverName: "Jane Smith", carModel: "Honda Accord", carColor: "Blue", phoneNumber: "(987) 654-3210", status: "Declined" },
    { id: 3, driverName: "Bob Johnson", carModel: "Ford Fusion", carColor: "Black", phoneNumber: "(555) 123-4567", status: "Pending" },
    // Add more rides as needed
  ];

  return (
    <View>
      {rides.map(ride => (
        <RideCardPassenger
          key={ride.id}
          id={ride.id}
          driverName={ride.driverName}
          carModel={ride.carModel}
          carColor={ride.carColor}
          phoneNumber={ride.phoneNumber}
          status={ride.status} 
        />
      ))}
    </View>
  );
}

export default RideCardPassengerList;