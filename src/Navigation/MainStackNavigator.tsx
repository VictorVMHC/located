import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { CreateAccountEmailView } from '../Views/CreateAccountEmailView';
import { LoginView } from '../Views/LoginView';
import { MainCreateAccountView } from '../Views/MainCreateAccountView';
import { MainView } from '../Views/MainView';
import { ForgotPasswordView } from '../Views/ForgotPasswordView';
import { SplasScreenView } from '../Views/SplashScreenView';
import { TestScreen } from '../Views/TestScreen';
import { DrawerMenu } from './DrawerMenu';
import { StoreView } from '../Views/StoreView';

const Stack = createStackNavigator();


export const MainStackNavigator = () => {
	return (
		<Stack.Navigator
			initialRouteName='SplashScreen'
		>
			<Stack.Screen name='SplashScreen' component={SplasScreenView} options={{headerShown: false}}/>
			<Stack.Screen name='ForgotPasswordView' component={ForgotPasswordView} options={{headerShown: false}}/>
			<Stack.Screen name='TestScreen' component={TestScreen} options={{headerShown: false}}/>
			<Stack.Screen name='CreateAccountEmailView' options={{ headerShown: false}} component={CreateAccountEmailView}/>
			<Stack.Screen name='LoginView' options={{ headerShown: false}} component={LoginView}/>
			<Stack.Screen name='MainView' options={{ headerShown: false}} component={MainView}/>
			<Stack.Screen name='MainCreateAccountView' options={{ headerShown: false}} component={MainCreateAccountView}/>
			<Stack.Screen name='DrawerMenu' options={{ headerShown: false}} component={DrawerMenu} />
			<Stack.Screen name='StoreView' options={{ headerShown: false}} component={StoreView} />
		</Stack.Navigator>
	)
}