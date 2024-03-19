import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, SectionList, TouchableOpacity, ImageBackground, Modal, Platform } from 'react-native';
import { RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import * as ImagePicker from 'expo-image-picker';
import { TextInput } from 'react-native-paper';
import axios from 'axios';


function EditProfile() {
    const [name, setName] = useState('name');
    const [lastName, setLastName] = useState('last name');
    const [email, setEmail] = useState('email');
    const [phoneNumber, setPhoneNumber] = useState(' Phone Number');
    const [smoker, setSmoker] = useState('No');
    const [talkative, setTalkative] = useState('No');
    const [music, setMusic] = useState('No');
    const [food, setFood] = useState('No');
    const [gender, setGender] = useState('Girls only');
    const [color, setColor] = useState('color');
    const [brand, setBrand] = useState('brand');
    const [model, setModel] = useState('model');
    const [isModalVisible, setModalVisible] = useState(false);
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const toggleDatePicker = () => {
        setDatePickerVisible(!isDatePickerVisible);
    };

    const handleDateConfirm = (date) => {
        // Handle date selection
        setDatePickerVisible(false);
    };

    const handleSave = () => {
        // Save changes logic here
        Alert.alert('Changes Saved');
    };

    const handleTakePhoto = async () => {
        let permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        if (permissionResult.granted === false) {
            Alert.alert('Permission to access camera roll is required!');
            return;
        }

        let pickerResult = await ImagePicker.launchCameraAsync();
        if (pickerResult.cancelled === true) {
            return;
        }

        setSelectedImage(pickerResult.uri);
        toggleModal();
    };

    const handleChooseFromLibrary = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            Alert.alert('Permission to access camera roll is required!');
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        if (pickerResult.cancelled === true) {
            return;
        }

        setSelectedImage(pickerResult.uri);
        toggleModal();
    };

    const sections = [
        {
            title: 'General',
            data: [
                { label: 'Name:', value: name, onChangeText: setName },
                { label: 'Last Name:', value: lastName, onChangeText: setLastName },
                { label: 'Email:', value: email, onChangeText: setEmail },
            ],
        },
        {
            title: 'Car Information',
            data: [
                { label: 'Phone Number:', value: phoneNumber, onChangeText: setPhoneNumber },
                { label: 'Color:', value: color, onChangeText: setColor },
                { label: 'Brand:', value: brand, onChangeText: setBrand },
                { label: 'Model:', value: model, onChangeText: setModel },
            ],
        },
        {
            title: 'Preferences',
            data: [
                { label: 'Do you tolerate smoking?', value: smoker, onValueChange: setSmoker, type: 'radio'},
                { label: 'Do you tolerate a Talkative environment?', value: talkative, onValueChange: setTalkative, type: 'radio' },
                { label: 'Do you like loud Music?', value: music, onValueChange: setMusic, type: 'radio' },
                { label: 'Do you tolerate Food in the car?', value: food, onValueChange: setFood, type: 'radio' },
                { label: 'With which gender are you most comfortable in your car?', value: gender, onValueChange: setGender, type: 'radio' },
            ],
        },
    ];

    const renderItem = ({ item }) => {
        if (item.label === 'With which gender are you most comfortable in your car?') {
            return (
                <View>
                    <Text style={styles.boldCenteredText}>{item.label}</Text>
                    <View style={styles.radioContainer}>
                        <Text>Boys </Text>
                        <RadioButton
                            value="Boys"
                            status={item.value === 'Boys only' ? 'checked' : 'unchecked'}
                            onPress={() => item.onValueChange('Boys only')}
                            color="#172446" 
                        />
                        <Text>Girls</Text>
                        <RadioButton
                            value="Girls"
                            status={item.value === 'Girls only' ? 'checked' : 'unchecked'}
                            onPress={() => item.onValueChange('Girls only')}
                            color="#172446" 
                        />
                        <Text>Boys/Girls</Text>
                        <RadioButton
                            value="Boys/Girls"
                            status={item.value === 'Boys/Girls' ? 'checked' : 'unchecked'}
                            onPress={() => item.onValueChange('Boys/Girls')}
                            color="#172446" 
                        />
                    </View>
                </View>
            );
        } else if (item.type === 'radio') {
            return (
                <View>
                    <Text style={styles.boldCenteredText}>{item.label}</Text>
                    <View style={styles.radioContainer}>
                        <RadioButton
                            value="Yes"
                            status={item.value === 'Yes' ? 'checked' : 'unchecked'}
                            onPress={() => item.onValueChange('Yes')}
                            color="#172446" // Change the color of checked radio buttons to green
                        />
                        <Text>Yes</Text>
                        <RadioButton
                            value="No"
                            status={item.value === 'No' ? 'checked' : 'unchecked'}
                            onPress={() => item.onValueChange('No')}
                            color="#DA554E" // Change the color of checked radio buttons to green
                        />
                        <Text>No</Text>
                    </View>
                </View>
            );
        } else {
            return (
                <View>
                    <TextInput
                        mode="outlined"
                        label={item.label} 
                        value={item.value}
                        onChangeText={item.onChangeText}
                        style={{ backgroundColor: '#DFF2F0', height: 55, margin: 10, fontSize: 16, lineHeight: 24 }}
                        theme={{ colors: { primary: '#DA554E', underlineColor:'transparent'}, roundness: 10 }}
                    />
                </View>
            );
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Edit your information</Text>
            <TouchableOpacity onPress={toggleModal}>
                <ImageBackground
                    source={selectedImage ? { uri: selectedImage } : { uri: 'https://bootdey.com/img/Content/avatar/avatar7.png' }}
                    style={styles.image}
                    imageStyle={{ borderRadius: 15 }}
                >
                    <View style={styles.imageOverlay}>
                        <Icon
                            name="camera"
                            size={35}
                            color="#fff"
                            style={styles.cameraIcon}
                        />
                    </View>
                </ImageBackground>
            </TouchableOpacity>
            <SectionList
                sections={sections}
                keyExtractor={(item, index) => item + index}
                renderItem={renderItem}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.sectionHeader}>{title}</Text>
                )}
                ListFooterComponent={
                    <View style={styles.saveStyle}>
                        <Button title="Save Changes" onPress={handleSave} color="#DA554E" />
                    </View>
                }
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={toggleModal}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Choose Your Profile Picture</Text>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={handleTakePhoto}
                        >
                            <Text style={styles.modalButtonText}>Take Photo</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={handleChooseFromLibrary}
                        >
                            <Text style={styles.modalButtonText}>Choose From Library</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={toggleModal}
                        >
                            <Text style={styles.modalButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleDateConfirm}
                onCancel={toggleDatePicker}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexGrow: 1,
        padding: 15,
        backgroundColor: 'white',
        justifyContent: 'center',
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 30,
        textAlign: 'center',
        color: '#172446',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
        backgroundColor: 'white',
        alignSelf: 'stretch',
    },
    radioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center', 
    },
    boldCenteredText: {
        textAlign: 'center',
        fontWeight: 'bold',
    },
    sectionHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        backgroundColor: '#152544',
        color: 'white',
        padding: 10,
    },
    image: {
        height: 100,
        width: 100,
        borderRadius: 20,
        alignSelf: 'center',
        margin: 10,
    },
    imageOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cameraIcon: {
        opacity: 0.7,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 10,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: '#152544',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        color: 'white',
    },
    modalButton: {
        backgroundColor: 'white',
        padding: 9,
        borderRadius: 5,
        marginBottom: 10,
        width: 200
    },
    modalButtonText: {
        fontSize: 16,
        color: '#152544',
        fontWeight: 'bold',
        textAlign: 'center',},
});
export default EditProfile;
