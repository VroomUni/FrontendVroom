import React ,{ useState }from "react";
import { Image, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { AntDesign } from '@expo/vector-icons'; 
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Chip } from 'react-native-paper'
import Map from './Map'
import { Modal, Portal,  PaperProvider } from 'react-native-paper';

export default function DriverCard({driver}) {
 const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {}


  const renderStars = (rating) => {
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

  return (
    <PaperProvider>
    <View style={styles.card}>
      <View style={styles.header}>
        <Image
          style={styles.image}
          source={{
            uri: 'https://bootdey.com/img/Content/avatar/avatar1.png',
          }}
        />
        <View style={styles.headerText}>
          <Text style={styles.name}>{driver.name}</Text>
          <View style={styles.stars}>{renderStars(driver.rating)}</View>
        </View>
      </View>
      <View style={styles.preferences}>
        {driver.preferences.map((preference, index) => (
          
           <Chip style={styles.chip}> {preference}</Chip>
          
        ))}
      </View>
      <View style={styles.footer}>
        <Text style={styles.time}>{driver.time}</Text>
        <TouchableOpacity style={styles.locationContainer} onPress={showModal}>
        <Text style={styles.location}>{driver.location}</Text>
        <FontAwesome name="map-marker" size={24} color="red" />
        </TouchableOpacity>
      </View>
      
    </View>
    <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
        <View
          style={{
            alignItems: "center",
            backgroundColor: "white",
            height: "50%",
            justifyContent: "space-between",
            borderRadius: 15,
            padding: 20,
          }}
        >
            <Map/>
            </View>
        </Modal>
      </Portal>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop:'30%',
    width: "95%",
    height: "70%",
    alignSelf: 'center', 
    borderRadius: 10,
    backgroundColor: "#E3E6F3",
  
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText: {
    flex: 1,
    marginLeft: 10,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 40,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#333',
  },
  stars: {
    flexDirection: 'row',
    marginTop: 4,
  },
  filledStar: {
    color: 'orange',
  },
  emptyStar: {
    color: 'grey',
  },
  preferences: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 10,
  },

chip: {
    margin: 4,
    backgroundColor: "#9AD0D3", 
    borderRadius:15,
    elevation: 2
  },
  preferenceText: {
    color: '#333',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    borderTopColor: '#000000',
    borderTopWidth: 1,
    paddingTop: 8,
  },
  time: {
    fontWeight: 'bold',
    color: '#333',
    fontSize: 16,
  },
  locationContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    
  },
  location: {
    fontWeight: 'bold',
    color: '#333',
    fontSize: 16,
    marginRight:5,
    
  },
});
