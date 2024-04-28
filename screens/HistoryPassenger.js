import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import DriverCalendar from '../components/driver/Calendar';

const windowWidth = Dimensions.get('window').width;

function HistoryPassenger() {
  const [startPoint, setStartPoint] = useState('City A');
  const [endPoint, setEndPoint] = useState('City B');
  const [startTime, setStartTime] = useState('10:00 AM');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filteredUserData, setFilteredUserData] = useState([]);
  const { user } = useAuth();

  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/history/${user.uid}`, {
        params: { selectedDate: selectedDate.toISOString() },
      });
      setFilteredUserData(response.data.rideHistory || []);
    } catch (error) {
      console.error('Error fetching ride history:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedDate]);

  const handleRatingPress = (userId) => {
    console.log('Navigate to rating screen for user:', userId);
  };

  const handleReportPress = (userId) => {
    console.log('Navigate to report screen for user:', userId);
  };

  return (
    <SafeAreaView style={styles.container}>
      <DriverCalendar onDateSelected={setSelectedDate} />

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.centeredView}>
          {filteredUserData.length === 0 ? (
            <Text style={styles.noHistoryText}>No history available</Text>
          ) : (
            filteredUserData.map((ride) => (
              <View key={ride.id} style={styles.cardView}>
                {/* Assuming ride.driver contains driver info */}
                <Image source={{ uri: ride.driver.photo }} style={styles.userPhoto} />
                <View style={styles.userInfo}>
                  <Text style={styles.userName}>{ride.driver.firstName} {ride.driver.lastName}</Text>
                  <Text style={styles.userAge}>{ride.driver.age} years old</Text>
                  <Text style={styles.userLocation}>From: {ride.from}</Text>
                  <Text style={styles.userLocation}>To: {ride.to}</Text>
                  <Text style={styles.userTime}>Time: {ride.occurenceDate}</Text>
                  <View style={styles.buttonsContainer}>
                    <TouchableOpacity onPress={() => handleRatingPress(ride.driver.id)} style={styles.button}>
                      <Text style={styles.buttonText}>Rate</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleReportPress(ride.driver.id)} style={[styles.button, styles.reportButton]}>
                      <Text style={styles.buttonText}>Report</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  centeredView: {
    alignItems: 'center',
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
  noHistoryText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#777',
  },
});

export default HistoryPassenger;
