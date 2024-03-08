import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';


function Profile() {
  const [selectedSection, setSelectedSection] = useState(null);
  const [userData, setUserData] = useState({
    name: 'Name',
    lastName: 'Name',
    email: 'Email',
    phoneNumber: 'Phone Number',
    smoker: 'No',
    talkative: 'Talkative',
    music: 'No',
    food: 'No',
    gender: 'Girls only',
    color: 'color',
    brand: 'brand',
    model: 'model'
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://api.example.com/data');
      const data = response.data;
      // Update state with fetched data
      setUserData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGeneralInformationPress = () => {
    setSelectedSection('general');
  };

  const handlePreferencesPress = () => {
    setSelectedSection('preferences');
  };

  const handleCarInformationPress = () => {
    setSelectedSection('car');
  };

  const navigation = useNavigation();

  const handleEdit = () => {
    navigation.navigate('EditProfile');
  };


  return (
    <View style={styles.container}>
      {/* Top */}
      <View style={styles.header}>
        <Text style={styles.headerText}>vroom</Text>
      </View>

      {/* Middle */}
      <View >
        <TouchableOpacity style={styles.editIconContainer} onPress={handleEdit}>
          <AntDesign name="edit" size={35} color="black" />
        </TouchableOpacity>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={require('../assets/driver.jpg')} />
          <Text style={styles.userName}>{userData.name} {userData.lastName}</Text>
        </View>
        <View style={styles.middleSection}>
          <TouchableOpacity onPress={handleGeneralInformationPress} style={styles.new}>
            <Text style={styles.middleSectionText}>General Information</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePreferencesPress} style={styles.new}>
            <Text style={styles.middleSectionText}>Preferences</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCarInformationPress} style={styles.new}>
            <Text style={styles.middleSectionText}>Car Information</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom */}
      <View style={styles.bottomContainer}>
        {/* Card */}
        <View style={[styles.card, { backgroundColor: '#EDBEA4' }]}>
          <AntDesign name="user" size={24} color="#fff" />
          {selectedSection === 'general' && (
            <>
              <View>
                <Text style={styles.cardText}>{userData.name}</Text>
                <Text style={styles.cardText}>{userData.lastName}</Text>
                <Text style={styles.cardText}>{userData.email}</Text>
                <Text style={styles.cardText}>{userData.phoneNumber}</Text>
              </View>
            </>
          )}
          {selectedSection === 'preferences' && (
            <>
              <Text style={styles.cardText}>Smoker: {userData.smoker}</Text>
              <Text style={styles.cardText}>Talkative: {userData.talkative}</Text>
              <Text style={styles.cardText}>Loud Music: {userData.music}</Text>
              <Text style={styles.cardText}>Food friendly: {userData.food}</Text>
              <Text style={styles.cardText}>Gender allowed: {userData.gender}</Text>
            </>
          )}
          {selectedSection === 'car' && (
            <>
              <Text style={styles.cardText}>Car color: {userData.color}</Text>
              <Text style={styles.cardText}>Car brand: {userData.brand}</Text>
              <Text style={styles.cardText}>Car model: {userData.model}</Text>
            </>
          )}
        </View>
        {/* Welcome */}
        <View style={styles.bottomSection}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 0,
    margin: 0,
  },
  header: {
    backgroundColor: 'white',
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    opacity: 0.8, 
    shadowColor: '#9AD0D3', 
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation:5,
  },
  headerText: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
  },
  middleContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  editIconContainer: {
    position: 'absolute',
    top: 0,
    right: 20,
    zIndex: 1,
    padding: 10,
    
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  userName: {
    fontSize: 25,
    color: '#9AD0D3',
    fontWeight: 'bold',
    
  },
  //not used
  middleSection: {
    flexDirection: 'row',
    justifyContent: 'flex-middle',
    width: '80%',
    alignContent: 'center',
  },
  new: {
    margin: 7,
    //padding: 10,
    //borderRadius: 60,
  },
  middleSectionText: {
    fontSize: 8,
    padding: 15,
    marginTop: 50,
    backgroundColor: '#9AD0D3',
    borderRadius: 30,
  },
  bottomContainer: {
    marginTop: 50,
    paddingHorizontal: 10,
  },
  card: {
    alignItems: 'center',
    paddingVertical: 20,
    marginHorizontal: 0,
    borderRadius: 30,
  },
  cardText: {
    color: '#fff',
    margin: 10,
    fontSize: 14,
  },
  bottomSection: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
});

export default Profile;
