import { StackNavigationOptions, createStackNavigator } from '@react-navigation/stack';
import React, { useContext } from 'react';

import { AuthContext } from '../Context/AuthContext';
import { CreateAccountEmailView } from '../Views/CreateAccountEmailView';
import { ForgotPasswordView } from '../Views/ForgotPasswordView';
import { LoginView } from '../Views/LoginView';
import { MainCreateAccountView } from '../Views/MainCreateAccountView';

import { MainView } from '../Views/MainView';
import { SplashScreenView } from '../Views/SplashScreenView';
import { DrawerMenu } from './DrawerMenu';
import { EditUserView } from '../Views/EditUserView';
import { StoreView } from '../Views/StoreView';
import { CommentsView } from '../Views/CommentsView';
import { Image, StyleSheet } from 'react-native';
import { Colors } from '../Themes/Styles';

const Stack = createStackNavigator();



export const MainStackNavigator = () => {
	const { status } = useContext(AuthContext)
	const screenOptions: StackNavigationOptions = {
		headerTitleAlign: 'center',
		headerTitle:() => ( <Image source={require('../Assets/Images/logo_located.png')} style={styles.imageStyle}/> ) ,
		headerStyle: {
			elevation: 0,
			shadowColor: 'transparent',
			backgroundColor: Colors.YellowOpacity
		}
	};
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
					<>
						<Stack.Screen name='DrawerMenu' options={{ headerShown: false}} component={DrawerMenu} />
						<Stack.Screen name="StoreView" options={screenOptions} component={StoreView}/>
						<Stack.Screen name="CommentsView" options={screenOptions} component={CommentsView}/>
						<Stack.Screen name="EditUserView" options={screenOptions} component={EditUserView}/>
					</>
					
				)			
			}
		</Stack.Navigator>
	)
}

const styles= StyleSheet.create({
	imageStyle:{
		height: 50, 
		width: 200, 
		resizeMode: 'contain'
	},
})