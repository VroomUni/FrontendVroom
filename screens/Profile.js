import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

function Profile() {
  const [selectedSection, setSelectedSection] = useState(null);
  const [buttonColors, setButtonColors] = useState({
    general: '#152544',
    preferences: '#152544',
    car: '#152544',
  });
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
    model: 'model',
    image: 'https://bootdey.com/img/Content/avatar/avatar3.png',
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
    setButtonColors({
      ...buttonColors,
      general: '#DA554E', // Change button color to red
      preferences:'#152544',
      car:'#152544'
    });
  };

  const handlePreferencesPress = () => {
    setSelectedSection('preferences');
    setButtonColors({
      ...buttonColors,
      preferences: '#DA554E', // Change button color to red
      general:'#152544',
      car:'#152544'
    });
  };

  const handleCarInformationPress = () => {
    setSelectedSection('car');
    setButtonColors({
      ...buttonColors,
      car: '#DA554E', // Change button color to red
      preferences:'#152544',
      general:'#152544'
    });
  };

  const navigation = useNavigation();

  const handleEdit = () => {
    navigation.navigate('EditProfile');
  };

  return (
    <View style={styles.container}>
      {/* Top */}
      <View style={styles.header}>
        <Text style={styles.headerText}>profile settings</Text>
      </View>

      {/* Middle */}
      <View>
        <TouchableOpacity style={styles.editIconContainer} onPress={handleEdit}>
          <AntDesign name="edit" size={35} color="#DA554E" />
        </TouchableOpacity>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar7.png' }} />
          <Text style={styles.userName}>{userData.name} {userData.lastName}</Text>
        </View>
        <View style={styles.middleSection}>
          <TouchableOpacity onPress={handleGeneralInformationPress} style={styles.new}>
            <Text style={[styles.middleSectionText, { backgroundColor: buttonColors.general }]}>General Information</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePreferencesPress} style={styles.new}>
            <Text style={[styles.middleSectionText, { backgroundColor: buttonColors.preferences }]}>Preferences</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCarInformationPress} style={styles.new}>
            <Text style={[styles.middleSectionText, { backgroundColor: buttonColors.car }]}>Car Information</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom */}
      <View style={styles.bottomContainer}>
        <View style={[styles.card, { backgroundColor: 'white', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }]}>
          <AntDesign name="user" size={24} color="#DA554E" />
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
    paddingTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 0,
    opacity: 2,
    shadowColor: '#9AD0D3',
    borderBottomWidth: 0.5,
    borderBottomColor: '#152544',
  },
  headerText: {
    color: '#152544',
    fontSize: 30,
    fontWeight: 'bold',
    textShadowColor: '#152544',
    //textShadowOffset: { width: 3, height: 2 },
    textShadowRadius: 2,
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
    marginTop: 4,
  },
  image: {
    width: 150,
    height: 140,
    borderRadius: 75,
    marginBottom: 7,
  },
  userName: {
    fontSize: 20,
    color: '#152544',
    fontWeight: 'bold',

  },
  middleSection: {
    flexDirection: 'row',
    justifyContent: 'flex-middle',
    width: '80%',
    alignContent: 'center',
    
  },
  new: {
    margin: 12,

  },
  middleSectionText: {
    fontSize: 8,
    padding: 15,
    marginTop:5,
    backgroundColor: '#152544',
    borderRadius: 40,
    color: 'white',
  },
  bottomContainer: {
    marginTop: 0,
    paddingHorizontal: 10,
  },
  card: {
    alignItems: 'center',
    paddingVertical: 20,
    marginHorizontal: 0,
    borderRadius: 30,

  },
  cardText: {
    color: '#152544',
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
