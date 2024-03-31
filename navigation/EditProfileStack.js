// EditNav.js
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../screens/Profile';
import EditProfile from '../components/EditProfile';

const ProfileStack = createStackNavigator();

function EditProfileStack() {
  return (
    <ProfileStack.Navigator>
        <ProfileStack.Screen name='Profile' component={Profile} />
        <ProfileStack.Screen name='EditProfile' component={EditProfile} />
    </ProfileStack.Navigator>

  );
}

export default EditProfileStack;


