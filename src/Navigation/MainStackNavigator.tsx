import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { CalistarjetaScreenView } from '../Views/CalistarjetaScreenView';
import { CreateAccountEmailView } from '../Views/CreateAccountEmailView';
import { LogginView } from '../Views/LogginView';
import { MainCreateAccountView } from '../Views/MainCreateAccountView';
import { MainView } from '../Views/MainView';
import { OlvideContrasenaView } from '../Views/OlvideContrasenaView';
import { SplasScreenView } from '../Views/SplashScreenView';
import { TestScreen } from '../Views/TestScreen';
import { DrawerMenu } from './DrawerMenu';

const Stack = createStackNavigator();


export const MainStackNavigator = () => {
	return (
		<Stack.Navigator
			initialRouteName='SplashScreen'
		>
			<Stack.Screen name='SplashScreen' component={SplasScreenView} options={{headerShown: false}}/>
			<Stack.Screen name='OlvideContrasenaView' component={LogginView} options={{headerShown: false}}/>
			<Stack.Screen name='TestScreen' component={TestScreen} options={{headerShown: false}}/>
			<Stack.Screen name='CreateAccountEmailView' options={{ headerShown: false}} component={CreateAccountEmailView}/>
			<Stack.Screen name='LogginView' options={{ headerShown: false}} component={LogginView}/>
			<Stack.Screen name='MainView' options={{ headerShown: false}} component={MainView}/>
			<Stack.Screen name='CalistarjetaScreenView' options={{ headerShown: false}} component={CalistarjetaScreenView}/>
			<Stack.Screen name='MainCreateAccountView' options={{ headerShown: false}} component={MainCreateAccountView}/>
			<Stack.Screen name='DrawerMenu' component={DrawerMenu} options={{ headerShown: false}} />
		</Stack.Navigator>
	)
}