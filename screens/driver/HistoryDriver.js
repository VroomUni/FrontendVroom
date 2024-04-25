// HistoryDriver.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions, TouchableOpacity, Image } from 'react-native';
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview';
import DriverCalendar from '../../components/driver/Calendar';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import apiConfig from '../../api/apiConfig';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function HistoryDriver() {
  const [startPoint, setStartPoint] = useState('City A');
  const [endPoint, setEndPoint] = useState('City B');
  const [startTime, setStartTime] = useState('10:00 AM');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [userData, setUserData] = useState([]);
  const navigation = useNavigation();

  const {user} =useAuth();
  const driverFirebaseId = user.uid;

  useEffect(() => {
    // Fetch ride history data from backend
    const fetchRideHistory = async () => {
      try {
        const url = apiConfig.baseURL;
        const response = await fetch(`${url}/history-driver/${driverFirebaseId}`); // Assuming driverFirebaseId is available
        const data = await response.json();
        console.log('Ride history:', data.rideHistory);
        setUserData(data.rideHistory);
      } catch (error) {
        console.error('Error fetching ride history:', error);
      }
    };

    fetchRideHistory();
  }, [selectedDate]); // Trigger fetch on selectedDate change

  const handleCardPress = (user) => {
    navigation.navigate('Passengers', { selectedPassengers: user.passengers });
  };

  const onDateSelected = (date) => {
    setSelectedDate(new Date(date));
  };

  const dataProvider = new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(userData);

  const layoutProvider = new LayoutProvider(
    (index) => index,
    (type, dim, index) => {
      dim.width = windowWidth / 1.2;
      dim.height = 180; // Adjust height as needed
    }
  );

  const rowRenderer = (type, data) => (
    <View style={styles.cardView}>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{data.rideNumber}</Text>
        <Text style={styles.userLocation}>From: {startPoint}</Text>
        <Text style={styles.userLocation}>To: {endPoint}</Text>
        <Text style={styles.userTime}>Time: {startTime}</Text>
        <View style={styles.passengersContainer}>
          {data.passengers.map((passenger, index) => (
            <Image key={index} source={{ uri: passenger.photo }} style={styles.passengerPhoto} />
          ))}
        </View>
      </View>
      <TouchableOpacity style={styles.details} onPress={() => handleCardPress(data)}>
        <Text style={styles.buttonText}>Rate passengers</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.calendarContainer}>
        <DriverCalendar onDateSelected={onDateSelected} />
      </View>
      <View style={styles.cardsContainer}>
        {userData.length > 0 ? (
          <RecyclerListView
            style={styles.recyclerList}
            dataProvider={dataProvider}
            layoutProvider={layoutProvider}
            rowRenderer={rowRenderer}
          />
        ) : (
          <Text style={styles.noHistoryText}>No history available</Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  calendarContainer: {
    height: '25%',
  },
  cardsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recyclerList: {
    width: '100%',
  },
  cardView: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    margin: '10%',
    padding: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '95%',
    borderRadius: 10,
    shadowColor: '#000',
    //shadowOffset: { width: 5, height: 5 },
    //shadowOpacity: 0.8,
    //shadowRadius: 9,
    elevation: 5,
  },
  userInfo: {
    flex: 1,
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
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  passengerPhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginVertical: 5,
  },
  details: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#DA554E',
    padding: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
  },
  noHistoryText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#777',
  },
});

export default HistoryDriver;
