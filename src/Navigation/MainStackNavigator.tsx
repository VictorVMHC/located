import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext } from 'react';

import { AuthContext } from '../Context/AuthContext';
import { CreateAccountEmailView } from '../Views/CreateAccountEmailView';
import { ForgotPasswordView } from '../Views/ForgotPasswordView';
import { LoginView } from '../Views/LoginView';
import { MainCreateAccountView } from '../Views/MainCreateAccountView';
import { MainView } from '../Views/MainView';
import { SplashScreenView } from '../Views/SplashScreenView';
import { DrawerMenu } from './DrawerMenu';

const Stack = createStackNavigator();


export const MainStackNavigator = () => {
	const { status } = useContext(AuthContext)

	return (
		<Stack.Navigator
			initialRouteName='SplashScreen'
		>

			<Stack.Screen name='SplashScreen' component={SplashScreenView} options={{headerShown: false}}/>
			{
				(status !== 'authenticated') 
				? (
					<>
						<Stack.Screen name='ForgotPasswordView' component={ForgotPasswordView} options={{headerShown: false}}/>
						<Stack.Screen name='CreateAccountEmailView' options={{ headerShown: false}} component={CreateAccountEmailView}/>
						<Stack.Screen name='LoginView' options={{ headerShown: false}} component={LoginView}/>
						<Stack.Screen name='MainView' options={{ headerShown: false}} component={MainView}/>
						<Stack.Screen name='MainCreateAccountView' options={{ headerShown: false}} component={MainCreateAccountView}/>
					</>
				)
				: (
					<Stack.Screen name='DrawerMenu' options={{ headerShown: false}} component={DrawerMenu} />
				)			
			}
		</Stack.Navigator>
	)
}