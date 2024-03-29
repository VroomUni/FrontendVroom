import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Dimensions, TouchableOpacity, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 

const windowWidth = Dimensions.get('window').width;

function HistoryPassenger() {
  const [startPoint, setStartPoint] = useState('City A');
  const [endPoint, setEndPoint] = useState('City B');
  const [startTime, setStartTime] = useState('10:00 AM');

  const userData = [
    {
      id: 1,
      photo: 'https://bootdey.com/img/Content/avatar/avatar7.png',
      name: 'John',
      lastName: 'Doe',
      age: 30,
      rating: 4.5,
    },
    {
      id: 2,
      photo: 'https://bootdey.com/img/Content/avatar/avatar5.png',
      name: 'Jane',
      lastName: 'Doe',
      age: 25,
      rating: 5,
    },
    {
      id: 3,
      photo: 'https://bootdey.com/img/Content/avatar/avatar4.png',
      name: 'Jeneffer',
      lastName: 'Doe',
      age: 19,
      rating: 4,
    },
    {
      id: 4,
      photo: 'https://bootdey.com/img/Content/avatar/avatar6.png',
      name: 'Joey',
      lastName: 'Doe',
      age: 25,
      rating: 5,
    },
    {
      id: 5,
      photo: 'https://bootdey.com/img/Content/avatar/avatar2.png',
      name: 'Jerry',
      lastName: 'Doe',
      age: 21,
      rating: 3,
    },
    {
      id: 6,
      photo: 'https://bootdey.com/img/Content/avatar/avatar1.png',
      name: 'Jemy',
      lastName: 'Doe',
      age: 20,
      rating: 1,
    },
  ];

  

  const handleRatingPress = (userId) => {
    // Navigate to rating screen with userId
    console.log('Navigate to rating screen for user:', userId);
  };

  const handleReportPress = (userId) => {
    // Navigate to report screen with userId
    console.log('Navigate to report screen for user:', userId);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Ride's History</Text>
      <ScrollView>
        {userData.map((user) => (
          <View key={user.id} style={styles.cardView} >
            <Image source={{ uri: user.photo }} style={styles.userPhoto} />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user.name} {user.lastName}</Text>
              <Text style={styles.userAge}>{user.age} years old</Text>
              <Text style={styles.userLocation}>From: {startPoint}</Text>
              <Text style={styles.userLocation}>To: {endPoint}</Text>
              <Text style={styles.userTime}>Time: {startTime}</Text>
              <View style={styles.buttonsContainer}>
                <TouchableOpacity onPress={() => handleRatingPress(user.id)} style={styles.button}>
                  <Text style={styles.buttonText}>Rate</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleReportPress(user.id)} style={[styles.button, styles.reportButton]}>
                  <Text style={styles.buttonText}>Report</Text>
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
  userPhoto: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  userInfo: {
    flex: 1,
    marginLeft: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userAge: {
    fontSize: 16,
    color: '#777',
  },
  userLocation: {
    fontSize: 14,
    color: '#333',
  },
  userTime: {
    fontSize: 14,
    color: '#05375a',
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#DA554E',
    marginRight: 10,
  },
  reportButton: {
    backgroundColor: '#DA554E',
  },
  buttonText: {
    color: 'white',
  },
});

export default HistoryPassenger;