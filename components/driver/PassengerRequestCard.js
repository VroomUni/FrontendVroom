import React,{useEffect,useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Animated,Modal } from 'react-native';
import { AntDesign } from "@expo/vector-icons";
import { TouchableHighlight } from 'react-native-gesture-handler';



function PassengerRequestCard({ id, FName, LName, rating, rowHeightAnimatedValue, removeRow, leftActionState, rightActionState}) {
  const [modalVisible, setModalVisible] = useState(false);
  
  console.log('in passenger',rowHeightAnimatedValue)
  useEffect(() => {
    if (rightActionState) {
      Animated.timing(rowHeightAnimatedValue, {
        toValue: 0,
        duration: 50,
        useNativeDriver: false,
      }).start(() => removeRow());
    }
  }, [rightActionState, rowHeightAnimatedValue, removeRow]);
  
  
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
    <Animated.View style={[styles.outerCard, {height:rowHeightAnimatedValue}]}>
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
       <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {/* <Image source={require('./path-to-your-image.png')} style={styles.profilePic} /> */}
          <Text style={styles.modalName}>{`${FName} ${LName}`}</Text>
          {/* ... display other information ... */}
          <Text style={styles.detailsText}>22 YO</Text>
          <Text style={styles.detailsText}>NON SMOKER</Text>
          <Text style={styles.detailsText}>LOUD MUSIC</Text>
          <Text style={styles.detailsText}>FOOD FRIENDLY</Text>
          <View style={styles.stars}>{renderStars()}</View>
          {/* ... include buttons ... */}
        </View>
      </View>
    </Modal>
      
    </TouchableOpacity>
    </Animated.View>
    
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
   
    width: '80%', // Set a width for the modal
    alignItems: 'center', // Center items horizontally
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profilePic: {
    width: 100, // Set the width of the image
    height: 100, // Set the height of the image
    borderRadius: 50, // Round the corners
    marginBottom: 10, // Add some margin below the image
  },
  modalName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10, // Add some margin below the name
  },
  detailsText: {
    fontSize: 16,
    marginBottom: 5, // Add some space between details
  },
  stars: {
    flexDirection: 'row',
    marginTop: 4,
  },
});

export default PassengerRequestCard;
