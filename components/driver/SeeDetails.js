import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const SeeDetails = ({ route }) => {
    const { selectedPassengers } = route.params;
    const navigation = useNavigation();

    const handleRateButton = (passenger) => {
        console.log('Rate passenger:', passenger);
    };

    const handleReportButton = (passenger) => {
        console.log('Report passenger:', passenger);
    };

    if (!selectedPassengers) {
        return <Text>No passengers selected</Text>;
    }

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <ScrollView>
                {selectedPassengers.map((passenger, index) => (
                    <View key={index} style={{ marginBottom: 20, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: '#f0f0f0'}}>
                            <Image source={{ uri: passenger.photo }} style={{ width: 50, height: 50, borderRadius: 25 }} />
                            <View style={{ marginLeft: 10 }}>
                                <Text style={{ fontSize: 16, marginVertical: 5 }}>{passenger.name} {passenger.lastName}</Text>
                                <Text>Age: {passenger.age}</Text>
                            </View>
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button onPress={() => handleRateButton(passenger)} style={styles.button}>Rate</Button>
                            <Button onPress={() => handleReportButton(passenger)} style={styles.button}>Report</Button>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 0,
        padding: 0,
    },
    button: {
       
    },
});

export default SeeDetails;
