import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { OlvideContrasena } from '../Views/OlvideContrasena';
import { SplasScreenView } from '../Views/SplasScreenView';
import { TestScreen } from '../Views/TestScreen';

const Stack = createStackNavigator();


export const MainStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName='TestScreen'
    >
      <Stack.Screen name='SplashScreen' component={SplasScreenView} options={{headerShown: false}}/>
      <Stack.Screen name='OlvideContrasena' component={OlvideContrasena} options={{headerShown: false}}/>
      <Stack.Screen name='TestScreen' component={TestScreen} options={{headerShown: false}}/>
    </Stack.Navigator>
  )
}
