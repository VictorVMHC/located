import 'react-native-gesture-handler';
import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer';

import React from 'react';
import { useWindowDimensions, Text, Image, View, TouchableOpacity, StyleSheet } from 'react-native';
import { ScreenStackHeaderSearchBarView } from 'react-native-screens';
import Icon from 'react-native-vector-icons/Ionicons';
import { TabBarNavigator } from './TabBarNavigatior';
import { Styles } from '../Themes/Styles';
import DrawerMenuButtons from '../Components/DrawerMenuButtons';
import { black } from 'react-native-paper/lib/typescript/src/styles/themes/v2/colors';


const Drawer = createDrawerNavigator();


export function DrawerMenu() {
  const { width } = useWindowDimensions();
  return (
    <Drawer.Navigator
      
      drawerContent={(props) => <MenuInterno {...props} />}
    >
      <Drawer.Screen name="TabBarNavigator" component={TabBarNavigator} />
    </Drawer.Navigator>
  );
}


const MenuInterno = ( {navigation} : DrawerContentComponentProps) => {
  return(
    <DrawerContentScrollView
      style={styles.container}
    >
    <View style={styles.header}><Text style={styles.title}>Located</Text>
        <Image
          style={styles.avatar}
          source={require('../Assets/Images/Lisa.png')}
        /><Text style={styles.title}>Luis Daniel</Text>
      </View>
      <View style={styles.body}>
        <DrawerMenuButtons
            text = "Inicio"
            onPress = {() => navigation.navigate('TabBarNavigator')}
            iconName='home-outline'
        />
        <DrawerMenuButtons
            text = "Editar Perfil"
            onPress = {() => navigation.navigate('TabBarNavigator')}
            iconName='person-outline'
        />
        <DrawerMenuButtons
            text = "Notificación"
            onPress = {() => navigation.navigate('TabBarNavigator')}
            iconName='notifications-outline'
        />
        <DrawerMenuButtons
            text = "Ayuda"
            onPress = {() => navigation.navigate('TabBarNavigator')}
            iconName='help-circle-outline'
        />
        <DrawerMenuButtons
            text = "Lenguaje"
            onPress = {() => navigation.navigate('TabBarNavigator')}
            iconName='language-outline'
        /></View>
      <View style={styles.footer}>
       <Text></Text>
       <Text></Text>
       <Text></Text>
        </View>
        
        <DrawerMenuButtons
            text = "Cerrar Sesión"
            onPress = {() => navigation.navigate('TabBarNavigator')}
            iconName='log-out-outline'
        />
        <Text style={styles.version}>Daniboy Version   -1.5</Text>
    </DrawerContentScrollView>
  );
}

const styles= StyleSheet.create({
  container:{
    flex:10,
    backgroundColor: 'rgba(0,0,0,0.9)',
      padding: 5,
  },
    avatar:{
        borderRadius:45,
        height: 85,
        width: 85,
        marginVertical:10,
    },
  title:{
    color: 'white',
    fontSize:20,
    
  },
  header:{
    alignItems:'center',
    justifyContent:'center',
    flex:2,
  },
  body:{
    flex:6,
  },
  footer:{
    flex:2,
  },
  version:{
    color: 'white',
    fontSize:15,
    left: 70,
    bottom: -4,
  },
});