import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { OlvideContrasenaView } from '../Views/OlvideContrasenaView';
import { SplasScreenView } from '../Views/SplashScreenView';
import { TestScreen } from '../Views/TestScreen';
import { CreateAccountEmail } from '../Views/CreateAccountEmail';
import { LogginView } from '../Views/LogginView';
import { MainCreateAccount} from '../Views/MainCreateAccount';

const Stack = createStackNavigator();


export const MainStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName='OlvideContrasenaView'
    >
      <Stack.Screen name='SplashScreen' component={SplasScreenView} options={{headerShown: false}}/>
      <Stack.Screen name='OlvideContrasenaView' component={OlvideContrasenaView} options={{headerShown: false}}/>
      <Stack.Screen name='TestScreen' component={TestScreen} options={{headerShown: false}}/>
      <Stack.Screen name='CreateAccountEmail' options={{ headerShown: false}} component={CreateAccountEmail}/>
      <Stack.Screen name='LogginView' options={{ headerShown: false}} component={LogginView}/>
      <Stack.Screen name='MainCreateAccount' options={{headerShown: false}} component={MainCreateAccount}/>
    </Stack.Navigator>
  )
}
