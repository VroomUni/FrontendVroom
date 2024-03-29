import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Dimensions, TouchableOpacity, Image, Modal } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import DetailsNav from '../navigation/DetailsNav';



const windowWidth = Dimensions.get('window').width;
const windowlength = Dimensions.get('window').length;

function HistoryDriver() {
  const [startPoint, setStartPoint] = useState('City A');
  const [endPoint, setEndPoint] = useState('City B');
  const [startTime, setStartTime] = useState('10:00 AM');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPassengers, setSelectedPassengers] = useState([]);

  const userData = [
    {
      id: 1,
      rideNumber: 'Ride 1',
      passengers: [
        {
          photo: 'https://bootdey.com/img/Content/avatar/avatar5.png',
          name: 'John',
          lastName: 'Doe',
          age: 30,
        },
        {
          photo: 'https://bootdey.com/img/Content/avatar/avatar4.png',
          name: 'Jane',
          lastName: 'Doe',
          age: 25,
        },
        {
          photo: 'https://bootdey.com/img/Content/avatar/avatar6.png',
          name: 'Jeneffer',
          lastName: 'Doe',
          age: 19,
        },
        {
          photo: 'https://bootdey.com/img/Content/avatar/avatar7.png',
          name: 'Jeneffer',
          lastName: 'Doe',
          age: 19,
        },
      ],
    },
    {
      id: 2,
      rideNumber: 'Ride 2',
      passengers: [
        {
          photo: 'https://bootdey.com/img/Content/avatar/avatar1.png',
          name: 'Jack',
          lastName: 'Smith',
          age: 35,
        },
        {
          photo: 'https://bootdey.com/img/Content/avatar/avatar2.png',
          name: 'Jessica',
          lastName: 'Johnson',
          age: 28,
        },
      ],
    },
    {
      id: 3,
      rideNumber: 'Ride 3',
      passengers: [
        {
          photo: 'https://bootdey.com/img/Content/avatar/avatar3.png',
          name: 'Michael',
          lastName: 'Williams',
          age: 42,
        },
        {
          photo: 'https://bootdey.com/img/Content/avatar/avatar7.png',
          name: 'Emily',
          lastName: 'Brown',
          age: 24,
        },
      ],
    },
    {
      id: 4,
      rideNumber: 'Ride 4',
      passengers: [
        {
          photo: 'https://bootdey.com/img/Content/avatar/avatar5.png',
          name: 'John',
          lastName: 'Doe',
          age: 30,
        },
        {
          photo: 'https://bootdey.com/img/Content/avatar/avatar4.png',
          name: 'Jane',
          lastName: 'Doe',
          age: 25,
        },
        {
          photo: 'https://bootdey.com/img/Content/avatar/avatar6.png',
          name: 'Jeneffer',
          lastName: 'Doe',
          age: 19,
        },
        {
          photo: 'https://bootdey.com/img/Content/avatar/avatar7.png',
          name: 'Jeneffer',
          lastName: 'Doe',
          age: 19,
        },
      ],
    },
  ];

  const navigation = useNavigation();
  const handleCardPress = (user) => {
    setSelectedPassengers(user.passengers);
    navigation.navigate('SeeDetails', { selectedPassengers: user.passengers });
  };

 

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Ride's History</Text>
      <ScrollView>
        {userData.map((user) => (
          <View key={user.id} style={styles.cardView}>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user.rideNumber}</Text>
              <Text style={styles.userLocation}>From: {startPoint}</Text>
              <Text style={styles.userLocation}>To: {endPoint}</Text>
              <Text style={styles.userTime}>Time: {startTime}</Text>
              <View style={styles.passengersContainer}>
                {user.passengers.map((passenger, index) => (
                  <Image key={index} source={{ uri: passenger.photo }} style={styles.passengerPhoto} />
                ))}
                <TouchableOpacity onPress={() => handleCardPress(user)} style={styles.details}>
                  <Text style={styles.buttonText}>See Details</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  headerText: {
    fontSize: 20,
    color: '#05375a',
    marginBottom: 10,
  },
  cardView: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    margin: 6,
    padding: 16,
    width: windowWidth / 1.2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 2,
    borderColor: 'white',
  },
  userInfo: {
    flex: 1,
    marginLeft: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userLocation: {
    fontSize: 14,
    color: '#333',
  },
  userTime: {
    fontSize: 14,
    color: '#05375a',
  },
  passengersContainer: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'flex-end',
  },
  passengerPhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    width: windowWidth / 1.2,
  },
  modalText: {
    fontSize: 20,
    color: 'black',
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 20,
    color: 'red',
  },
  passengerAccordion: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  passengerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  passengerHeaderText: {
    fontSize: 16,
  },
  passengerDetails: {
    padding: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 10,
  },
  
  details: {
    position: 'absolute',
    top: '-190%', 
    right: 10, 
    backgroundColor: '#DA554E',
    padding: 4,
    borderRadius: 5,
  },
});

export default HistoryDriver;