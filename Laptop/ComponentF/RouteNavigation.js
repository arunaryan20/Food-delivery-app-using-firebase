import { View, Text } from 'react-native'
import React from 'react'
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WelcomeScreen from './WelcomeScreen';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import HomeScreen from './HomeScreen';

const Stack = createNativeStackNavigator();
export default function RouteNavigation() {
    

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
          component={SignupScreen}
      />
      <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown:false}}
      />
      </Stack.Navigator>
    </NavigationContainer>
  )
}