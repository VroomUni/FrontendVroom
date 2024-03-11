import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text, Avatar, IconButton } from 'react-native-paper';

const LeftContent = () => <Avatar.Icon size={30} icon="car" style={styles.icon} color="red" />;
const RightContent = () => <Text style={styles.requests}>REQUESTS: 3</Text>;
const CancelAction = () => <IconButton icon="close-circle" style={styles.cancelAction} color="red" size={20} onPress={() => console.log('Cancel pressed')} />;

function RideCard() {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title
          title="Ride from SMU to AOUINA"
          subtitle="Today, 5:00PM"
          left={LeftContent}
          right={RightContent}
          titleStyle={styles.title}
          subtitleStyle={styles.subtitle}
          style={styles.cardTitle}
        />
        <Card.Actions style={styles.cardActions}>
          <CancelAction />
        </Card.Actions>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 30,
  },
  card: {
    backgroundColor: 'white',
    width: '95%',
    borderRadius: 8,
    elevation: 1, 
    shadowColor: 'black', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
 
  title: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 18,
  },
  subtitle: {
    color: 'black',
  },
  requests: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 14,
  },
  icon: {
    backgroundColor: 'transparent',
  },
  cardActions: {
    justifyContent: 'flex-end', // align the cancel button to the right
    
  },
 
});

export default RideCard;
