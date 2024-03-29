import * as React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Card, Text,Button } from "react-native-paper";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

function RideCard({id,title, location, time, requests, onDelete, navigation}) {
  const handleDelete = ()=>{
    onDelete(id)
  }
  const handleSeeDetails = () => {
    navigation.navigate('requestDetails', { id });
  };
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title
          title={title}
          titleStyle={styles.title}
          style={styles.cardTitle}
        />
        <Card.Content>
          <Text variant="titleLarge" style={{marginBottom:10}}>{location}</Text>

          <Text variant="bodyMedium">{time}</Text>
         
          <View style={styles.requestsRow}>
            <Text variant="bodyMedium" >Requests: </Text>
            <View style={styles.requestsContainer}>
              <Text style={styles.requestsText}>{requests}</Text>
            </View>
            </View>
          
        </Card.Content>
        <Card.Actions style={styles.actions}>
          <Button
            mode="outlined"
            onPress={handleSeeDetails}
            
            labelStyle={{color:"#162447"}}
          >
            Check Requests
          </Button>
        </Card.Actions>
        <TouchableOpacity style={styles.iconContainer} onPress={handleDelete}>
          <MaterialIcons name="delete-forever" color="red" size={24} />
        </TouchableOpacity>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    
  },
  card: {
    marginTop: 20,
    backgroundColor: "white",
    width: "95%",
    borderRadius: 8,
    elevation: 1,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    paddingBottom:10,
  },

  title: {
    fontWeight: "bold",
    color: "#162447",
    fontSize: 18,
  
  },
  iconContainer: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  requestsRow: {
    marginTop:10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  requestsContainer: {
    backgroundColor: 'red',
    borderRadius: 50,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  requestsText: {
    color: 'white',
    fontWeight: 'bold',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end', // This aligns the button to the right
    paddingRight: 8, // This adds some padding on the right
    paddingBottom: 5, // This adds some padding at the bottom
    width: "100%",
    
  },
 

  
 
});

export default RideCard;
