import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { OlvideContrasenaView } from '../Views/OlvideContrasenaView';
import { SplasScreenView } from '../Views/SplashScreenView';
import { TestScreen } from '../Views/TestScreen';
import { CreateAccountEmailView } from '../Views/CreateAccountEmailView';
import { LogginView } from '../Views/LogginView';
import { MainView } from '../Views/MainView';
import { MainCreateAccountView} from '../Views/MainCreateAccountView';

const Stack = createStackNavigator();


export const MainStackNavigator = () => {
	return (
		<Stack.Navigator
			initialRouteName='LogginView'
		>
			<Stack.Screen name='SplashScreen' component={SplasScreenView} options={{headerShown: false}}/>
			<Stack.Screen name='OlvideContrasenaView' component={OlvideContrasenaView} options={{headerShown: false}}/>
			<Stack.Screen name='TestScreen' component={TestScreen} options={{headerShown: false}}/>
			<Stack.Screen name='CreateAccountEmailView' options={{ headerShown: false}} component={CreateAccountEmailView}/>
			<Stack.Screen name='LogginView' options={{ headerShown: false}} component={LogginView}/>
			<Stack.Screen name='MainView' options={{ headerShown: false}} component={MainView}/>
			<Stack.Screen name='MainCreateAccountView' options={{ headerShown: false}} component={MainCreateAccountView}/>
		</Stack.Navigator>
	)
}
