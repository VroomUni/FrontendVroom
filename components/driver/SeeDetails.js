import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const SeeDetails = ({ route }) => {
  const { selectedPassengers } = route.params;
  const navigation = useNavigation();

  const handleRateButton = (passenger) => {
    console.log('Rate passenger:', passenger);
  };

  const handleReportButton = (passenger) => {
    console.log('Report passenger:', passenger);
  };

  const closeModal = () => {
    navigation.goBack(); // Navigate back to the previous screen
  };

  if (!selectedPassengers) {
    return <Text>No passengers selected</Text>;
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <ScrollView>
        <Text style={{ fontSize: 20, color: 'black', marginBottom: 10 }}>Passengers</Text>
        {selectedPassengers.map((passenger, index) => (
          <View key={index} style={{ marginBottom: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 5 }}>
            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, backgroundColor: '#f0f0f0' }}>
              <Text style={{ fontSize: 16 }}>{passenger.name} {passenger.lastName}</Text>
              <Image source={{ uri: passenger.photo }} style={{ width: 50, height: 50, borderRadius: 25 }} />
            </TouchableOpacity>
            <View style={{ padding: 10 }}>
              <Text>Age: {passenger.age}</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                <Button onPress={() => handleRateButton(passenger)}>Rate</Button>
                <Button onPress={() => handleReportButton(passenger)}>Report</Button>
              </View>
            </View>
          </View>
        ))}
        <TouchableOpacity onPress={closeModal}>
          <Text style={{ marginTop: 20, color: 'red' }}>Close</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default SeeDetails;
