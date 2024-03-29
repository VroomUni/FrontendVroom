import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { AntDesign } from "@expo/vector-icons";
import { TouchableHighlight } from 'react-native-gesture-handler';



function PassengerRequestCard({ id, FName, LName, rating, }) {
  const renderStars = rating => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <AntDesign
          key={i}
          name="star"
          size={24}
          style={i <= rating ? styles.filledStar : styles.emptyStar}
        />
      );
    }
    return stars;
  };

  // const handleAccept = () => {
  //   console.log('accepted');
  // };

  // const handleReject = () => {
  //   onDelete(id);
  // };

  const showDetails = () => {
    Alert.alert('Passenger Details', `Details of ${FName} ${LName}`);
  };

  return (
    <View style={styles.outerCard}>
    <TouchableOpacity onPress={showDetails} style={styles.card}  underlayColor={'#aaa'}>
      
      
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{`${FName} ${LName}`}</Text>
        <View style={styles.stars}>{renderStars(rating)}</View>
      </View>
      {/* <View style={styles.rightContainer}>
        <TouchableOpacity style={[styles.button, styles.acceptButton]} onPress={handleAccept}>
          <Text style={styles.buttonText}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.rejectButton]} onPress={handleReject}>
          <Text style={styles.buttonText}>Reject</Text>
          
        </TouchableOpacity>

      </View> */}
      
      
    </TouchableOpacity>
    </View>
    
  );
}

const styles = StyleSheet.create({
  outerCard:{
    
    backgroundColor: '#FFF',
    borderRadius: 5,
    height: 65,
    margin: 5,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 12},
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 5,
    
    
  },
  card:{
    backgroundColor: '#FFF',
    borderRadius: 5,
    height: 60,
    padding: 10,
    marginBottom: 15,
  },
  userInfo: {
  
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  stars: {
    flexDirection: 'row',
    marginTop: 4, 
  },
  filledStar: {
    color: '#FFD700',
  },
  emptyStar: {
    color: '#CCCCCC',
  },
  rightContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    
  },
  button: {
    marginLeft:5,
    minWidth: 80,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
  },
  rejectButton: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default PassengerRequestCard;
