import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';

const Reportfunction = () => {
  const [textValue, setTextValue] = useState('');
  const placeholderText = 'TYPE HERE';

  const handleSubmit = () => {
    // Logique pour soumettre le texte entré
    console.log('Text submitted:', textValue);
  };

  const handleCancel = () => {
    // Logique pour annuler l'opération et vider le champ de texte
    console.log('Operation canceled');
    setTextValue('');
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <Text style={styles.header}>TELL US WHAT HAPPENED</Text>
        <Image
          source={{ uri: 'https://img.freepik.com/premium-vector/illustration-vector-graphic-cartoon-character-company-activity-report_516790-1820.jpg' }}
          style={styles.image}
        />
        <TextInput
          value={textValue}
          onChangeText={setTextValue}
          placeholder={placeholderText}
          placeholderTextColor="blue" // Set placeholder text color
          style={styles.textField}
          multiline={true}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>SUBMIT</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleCancel}>
            <Text style={styles.buttonText}>CANCEL</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Align items at the top
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50, // Add padding to move the text higher
  },
  header: {
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 20,
    color: 'blue', // Change color to match the button color
    textAlign: 'center',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },
  textField: {
    width: '100%',
    height: 600, // Increase the height of the text field
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    marginBottom: 20,
    textAlignVertical: 'center', // Center text vertically
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 15, // Increase button padding
    paddingHorizontal: 30, // Increase button padding
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20, // Increase button text size
    textAlign: 'center',
  },
});

export default Reportfunction;
