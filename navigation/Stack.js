import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import MainScreen from '../screens/MainScreen';
import DrinkScreen from '../screens/DrinkScreen';
import SignUpScreen from '../screens/SignUpScreen';
import SignInScreen from '../screens/SignInScreen';


const StackNav = createNativeStackNavigator();

const Stack = () => {
  return (
      <StackNav.Navigator>
        <StackNav.Screen component={MainScreen} name="Main" options={{headerShown: false}} />
        <StackNav.Screen component={HomeScreen} name="Home" options={{headerShown: false}} />
        <StackNav.Screen component={DrinkScreen} name="Drinks" options={{headerShown: false}} />
        <StackNav.Screen component={SignUpScreen} name="SignUp" options={{headerShown: false}} />
        <StackNav.Screen component={SignInScreen} name="SignIn" options={{headerShown: false}} />
      </StackNav.Navigator>     
  );
}

export default Stack;