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
    model: 'model',
    image:'https://bootdey.com/img/Content/avatar/avatar3.png',
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
        <Text style={styles.headerText}>Welcome</Text>
      </View>

      {/* Middle */}
      <View >
        <TouchableOpacity style={styles.editIconContainer} onPress={handleEdit}>
          <AntDesign name="edit" size={35} color="#DA554E" />
        </TouchableOpacity>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar7.png' }} />
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
        <View style={[styles.card, { backgroundColor: 'white' }]}>
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
    backgroundColor: '#DFF2F0',
    borderRadius: 0,
    margin: 0,
  },
  header: {
    backgroundColor: '#DFF2F0',
    paddingTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 0,
    opacity: 2, 
    shadowColor: '#9AD0D3', 
    borderBottomWidth: 1,
    borderBottomColor: '#9AD0D3',
  },
  headerText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    textShadowColor: '#9AD0D3',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
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
    marginTop: 10,
    backgroundColor: '#152544',
    borderRadius: 30,
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
