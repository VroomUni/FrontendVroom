import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem} from '@react-navigation/drawer';

import { View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import GeneralInfo from '../components/GeneralInfo';
import PreferencesSettings from '../components/PreferencesSettings';
import CarSettings from '../components/CarSettings';
import PasswordUpdate from '../components/PasswordUpdate';

const  CustomDrawer = (props)=>{
  return(
    <View style={{flex:1}}>
      <DrawerContentScrollView>
        <DrawerItemList {...props}/>
      </DrawerContentScrollView>
      <DrawerItem
      label="Logout"
      icon={({size, color})=>(
        <MaterialIcons name="logout" size={size} color={color}/>
      )}
      onPress={() => {
        // This will reset the whole navigation state and replace it with the SignIn screen
        props.navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
      }}
      />
    </View>
  )
} 

const Drawer = createDrawerNavigator();

function ProfileDrawer() {
    return (
      <Drawer.Navigator
      screenOptions={{
        statusBarColor:'#162447',
        headerStyle:{
          backgroundColor:'#fff',
          shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,

        },
        headerTintColor:'#162447',
        headerTitleAlign:'center',
        
       
      }}
      drawerContent={(props)=><CustomDrawer {...props}/>}
      >
        <Drawer.Screen name="General Information" component={GeneralInfo} />
        <Drawer.Screen name="Change Password" component={PasswordUpdate} />
        <Drawer.Screen name="Preferences" component={PreferencesSettings} />
        <Drawer.Screen name="Car Information" component={CarSettings} />
      </Drawer.Navigator>
    );
}


export default ProfileDrawer;