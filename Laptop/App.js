import { View, Text } from 'react-native'
import React from 'react'
import WelcomeScreen from './ComponentF/WelcomeScreen'
import LoginScreen from './ComponentF/LoginScreen'
import RouteNavigation from './ComponentF/RouteNavigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignupScreen from './ComponentF/SignupScreen';
import HomeScreen from './ComponentF/HomeScreen';
import UserProfile from './ComponentF/UserProfile';
import ProductPage from './ComponentF/ProductPage';
import CartItem from './ComponentF/CartItem';
import Order from './ComponentF/Order';
import TrackOrder from './ComponentF/TrackOrder';

import {NavigationContainer} from '@react-navigation/native';
const App=()=> {
  const Stack=createNativeStackNavigator();
  return (
      
       <NavigationContainer>
              <Stack.Navigator>
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{headerShown:false}}
        />
       
      <Stack.Screen
         name="Signin"
          component={LoginScreen}       
      />
       
      <Stack.Screen
          name="Signup"
          options={{headerShown:false}}
          component={SignupScreen}
      />
     
     
      <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown:false}}
      />
      <Stack.Screen
          name="Profile"
          component={UserProfile}
          options={{headerTitleAlign:"center"}}
      />
       <Stack.Screen
          name="ProductPage"
          component={ProductPage}
          options={{headerTitleAlign:"center"}}
      />
        <Stack.Screen 
          name="Cart"
          component={CartItem}
          options={{headerShown:false}}
        
        />
          <Stack.Screen 
          name="Order"
          component={Order}
          options={{headerShown:false}}
        
        />
         <Stack.Screen 
          name="TrackOrder"
          component={TrackOrder}
          options={{headerShown:false}}
        
        />

      </Stack.Navigator>
       </NavigationContainer>

  //  <RouteNavigation />  
   )
}
export default App;