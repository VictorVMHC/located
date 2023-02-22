import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { OlvideContrasena } from '../Views/OlvideContrasena';
import { SplasScreenView } from '../Views/SplasScreenView';

const Stack = createNativeStackNavigator();

export const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name='SplashScreen' component={SplasScreenView} options={{headerShown: false}} />
        <Stack.Screen name='OlvideContrasena' options={{ headerShown: false }} component={OlvideContrasena}/>
    </Stack.Navigator>
  )
}
