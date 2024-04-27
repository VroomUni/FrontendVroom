import React, { useState, useEffect } from "react";
import { StyleSheet, View ,Image,Text} from "react-native";
import { Button } from "react-native-paper";
import SelectDropdown from "react-native-select-dropdown";
import companyWithModel from "../constants/companyWithModel.json";
import ColorPalette from 'react-native-color-palette';

const Car = ({ navigation }) => {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [models, setModels] = useState([]);
  const [selectedColor, setSelectedColor] = useState('#C0392B');

  const onColorChange = color => {
    setColor(color);
  };

  const companies = companyWithModel.map((item) => item.company);

  // Function to filter models based on selected company
  const filterModels = (company) => {
    const selectedCompanyData = companyWithModel.find(
      (item) => item.company === company
    );
    if (selectedCompanyData) {
      setModels(selectedCompanyData.model);
    } else {
      setModels([]);
    }
  };

  // Reset selected model when changing the selected company
  useEffect(() => {
    setSelectedModel(null);
    if (selectedCompany) {
      filterModels(selectedCompany);
    }
  }, [selectedCompany]);

  
  return (
    <View style={styles.container}>
      <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            marginVertical: 20,
            color: "black",
            marginRight: "5%",
          }}
        >
          Car Details
        </Text>
      <Image
        style={styles.logo}
        source={require('../assets/carScreen1.png')}
      />
      
      <SelectDropdown
        data={companies}
        onSelect={(selectedItem) => {
          setSelectedCompany(selectedItem);
        }}
        defaultButtonText="Select The Brand"
        search
        buttonStyle={styles.dropdown2BtnStyle}
        buttonTextStyle={styles.dropdown2BtnTxtStyle}
        dropdownStyle={styles.dropdown2DropdownStyle}
        rowStyle={styles.dropdown2RowStyle}
        rowTextStyle={styles.dropdown2RowTxtStyle}
        selectedRowStyle={styles.dropdown2SelectedRowStyle}
        searchInputStyle={styles.dropdown2searchInputStyleStyle}
        searchPlaceHolder={'Search here'}
        searchPlaceHolderColor={'#F8F8F8'}
        searchInputTxtColor={"white"}
      />

      <SelectDropdown
        data={models}
        onSelect={(selectedItem) => {
          setSelectedModel(selectedItem);
        }}
        defaultButtonText="Select Model"
        disabled={!selectedCompany}
        search
        buttonStyle={styles.dropdown2BtnStyle}
        buttonTextStyle={styles.dropdown2BtnTxtStyle}
        dropdownStyle={styles.dropdown2DropdownStyle}
        rowStyle={styles.dropdown2RowStyle}
        rowTextStyle={styles.dropdown2RowTxtStyle}
        selectedRowStyle={styles.dropdown2SelectedRowStyle}
        searchInputStyle={styles.dropdown2searchInputStyleStyle}
        searchPlaceHolder={'Search here'}
        searchPlaceHolderColor={'#F8F8F8'}
        searchInputTxtColor={"white"}
      />

  <ColorPalette
        onChange={(color) => setSelectedColor(color)}
        value={selectedColor}
        colors={['#C0C0C0', '#FFFFFF', '#000000', 'red', '#FFD700','blue']}
        title={"Select The Color"}
        // icon={
        //   <Icon name={'check-circle-o'} size={25} color={'black'} />
        // }
      />
        
      <Button
              title="Skip"
              mode="contained-tonal"
              buttonColor="#188bff"
              textColor="white"
              onPress={() => navigation.navigate("OnBoarding")}
              
            >
              Next
            </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:"white",
    
  },
  // rowContainer: {
  //   flexDirection: "row",
  //   alignItems: "center",
  // },
  logo: {
    width: 350,
    height: 350,
    marginRight: 10,
  },

  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      // width: 0, 
      height: 6
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    // width,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F6F6F6',
  },
  headerTitle: {color: '#000', fontWeight: 'bold', fontSize: 16},
  saveAreaViewContainer: {flex: 1, backgroundColor: '#FFF'},
  viewContainer: {
    flex: 1, 
    // width, 
    backgroundColor: '#FFF'},
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: '10%',
    paddingBottom: '20%',
  },


  dropdown2BtnStyle: {
    width: '80%',
    height: 50,
    backgroundColor: '#444',
    borderRadius: 8,
    marginBottom: 20
  },
  dropdown2BtnTxtStyle: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  dropdown2DropdownStyle: {
    backgroundColor: '#444',
    borderRadius: 12,
  },
  dropdown2RowStyle: {backgroundColor: '#444', borderBottomColor: '#C5C5C5'},
  dropdown2RowTxtStyle: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  dropdown2SelectedRowStyle: {backgroundColor: 'rgba(255,255,255,0.2)'},

  dropdown2searchInputStyleStyle: {
    backgroundColor: '#444',
    borderBottomWidth: 1,
    borderBottomColor: '#FFF',
    textColor: 'white'
  },

  dropdown3BtnStyle: {
    // width: '80%',
    height: 50,
    backgroundColor: '#FFF',
    paddingHorizontal: 0,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#444',
  },
  dropdown3BtnChildStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  dropdown3BtnImage: {
    // width: 45,
    height: 45,
    resizeMode: 'cover'
  },
  dropdown3BtnTxt: {
    color: '#444',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
    marginHorizontal: 12,
  },
  dropdown3DropdownStyle: {backgroundColor: 'slategray'},
  dropdown3RowStyle: {
    backgroundColor: 'slategray',
    borderBottomColor: '#444',
    height: 50,
  },
  dropdown3RowChildStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  dropdownRowImage: {
    // width: 45, 
    height: 45, 
    resizeMode: 'cover'},
  dropdown3RowTxt: {
    color: '#F1F1F1',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
    marginHorizontal: 12,
  },
  dropdown3searchInputStyleStyle: {
    backgroundColor: 'slategray',
    borderBottomWidth: 1,
    borderBottomColor: '#FFF',
  },
});
export default Car;
