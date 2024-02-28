import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';

const Reportfunction = () => {
  const [reportContent, setReportContent] = useState('');

  const handleSubmit = () => {
    // Implement your logic to submit the report
    console.log('Report Submitted:', reportContent);
    // Add further logic as needed
  };

  const handleCancel = () => {
    // Implement your logic to cancel the report
    console.log('Report Cancelled');
    // Clear the text input
    setReportContent('');
    // Add further logic as needed
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <Text style={styles.heading}>TELL US WHAT HAPPENED</Text>
        <ScrollView style={styles.scrollView}>
        <View style={{ flex: 1, width: 340 }}>
          <TextInput
            style={styles.textInput}
            multiline
            placeholder="Write your report here..."
            value={reportContent}
            onChangeText={(text) => setReportContent(text)}
          />
          </View>
        </ScrollView>

        <View style={styles.buttonContainer}>
  <View style={styles.buttonBox}>
    <Button style={styles.button} title="Submit" onPress={handleSubmit} color="white" />
  </View>
  <View style={styles.buttonBox}>
    <Button style={styles.button} title="Cancel" onPress={handleCancel} color="white" />
  </View>
</View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#3498db', // Blue color
    alignItems: 'center',
    justifyContent: 'center',
     paddingTop:130,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'white', // Text color
  },
  scrollView: {


  },
  textInput: {
    borderWidth: 3,
    borderColor: '#ccc',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    height: 500, // Fixed height (adjust as needed)
    width: '100%', // Full width
    backgroundColor: 'white',
    textAlignVertical: 'top', // Start the text from the top
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center', // Center the buttons horizontally
    marginTop: 16, // Add marginTop to separate the buttons from the text input
    width: '100%',
    paddingVertical:80,
  },
  button: {
    flex: 1,
    color: 'white', // Set text color to white
    fontSize: 18,
    
     // Set font size to 18 (adjust as needed)
  },
  buttonBox: {
    flex: 1,
    backgroundColor: '#0abab5', // Tiffany Blue background for button box
    padding: 8, // Adjust the padding to control the size
    borderRadius: 80,
    marginHorizontal: 10,
    
  },
});

export default Reportfunction;



// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

// const Reportfunction = () => {
//   const [reportContent, setReportContent] = useState('');

//   const handleSubmit = () => {
//     // Implement your logic to submit the report
//     console.log('Report Submitted:', reportContent);
//     // Add further logic as needed
//   };

//   const handleCancel = () => {
//     // Implement your logic to cancel the report
//     console.log('Report Cancelled');
//     // Clear the text input
//     setReportContent('');
//     // Add further logic as needed
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Report Dashboard</Text>
//       <TextInput
//         style={styles.textInput}
//         multiline
//         placeholder="Write your report here..."
//         value={reportContent}
//         onChangeText={(text) => setReportContent(text)}
//       />
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity style={[styles.buttonBox, styles.submitButton]} onPress={handleSubmit}>
//           <Text style={[styles.buttonText, styles.whiteText]}>Submit</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={[styles.buttonBox, styles.cancelButton]} onPress={handleCancel}>
//           <Text style={[styles.buttonText, styles.whiteText]}>Cancel</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#3498db', // Blue color
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 16,
//     color: 'white', // Text color
//   },
//   textInput: {
//     borderWidth: 3,
//     borderColor: '#ccc',
//     borderRadius: 16,
//     padding: 16,
//     marginBottom: 16,
//     minHeight: '60%', // Adjust the percentage as needed
//     width: '30%',
//     backgroundColor: 'white',
//     display: 'flex',
//   justifyContent: 'center', // White background for text input
//    // White background for text input
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     width: '100%',
//   },
//   buttonBox: {
//     flex: 1,
//     padding: 12, // Adjust the padding to control the size
//     borderRadius: 8,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   buttonText: {
//     fontSize: 18, // Set font size to 18 (adjust as needed)
//   },
//   whiteText: {
//     color: 'white', // Set text color to white
//   },
//   submitButton: {
//     backgroundColor: '#0abab5', // Tiffany Blue background for Submit button
//   },
//   cancelButton: {
//     backgroundColor: 'red', // Red background for Cancel button
//   },
// });

// export default Reportfunction;



