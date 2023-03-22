import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer';

import React from 'react';
import { useWindowDimensions, Text, Image, View, TouchableOpacity, StyleSheet } from 'react-native';
import { ScreenStackHeaderSearchBarView } from 'react-native-screens';
import Icon from 'react-native-vector-icons/Ionicons';
import { TabBarNavigator } from './TabBarNavigatior';
import { Styles } from '../Themes/Styles';


const Drawer = createDrawerNavigator();


export function DrawerMenu() {
  const { width } = useWindowDimensions();
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          elevation: 0,
          shadowColor: 'transparent'
        },
        drawerPosition: 'left',
        drawerType: width >= 768 ? 'permanent' : 'front',
      }}
      drawerContent={(props) => <MenuInterno {...props} />}
    >
      <Drawer.Screen name="TabBarNavigator" component={TabBarNavigator} />
    </Drawer.Navigator>
  );
}


const MenuInterno = ( {navigation} : DrawerContentComponentProps) => {
  return(
    <DrawerContentScrollView>
      <View style={styles.avatarContainer}>
        <Image
          style={styles.avatar}
          source={require('../Assets/Images/located.png')}
        />
      </View>


      <View style={ styles.menuContainer } >
        <TouchableOpacity style={styles.menuBoton} onPress={ () => navigation.navigate('Tabs')} >
          <Text style={ styles.menuTexto } >Tabs <Icon name="chevron-forward-outline" size={20} color="#900" /></Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuBoton} onPress={ () => navigation.navigate('StackNavigator')} >
          <Text style={ styles.menuTexto } >Stack <Icon name="chevron-forward-outline" size={20} color="#900" /></Text>
        </TouchableOpacity>
       
        <TouchableOpacity style={styles.menuBoton} onPress={ () => navigation.navigate('SettingsScreens')}  >
          <Text style={ styles.menuTexto } >Ajustes <Icon name="chevron-forward-outline" size={20} color="#900" /></Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

const styles= StyleSheet.create({
    avatarContainer:{
        ...Styles.textos,
        width: 300,
    },
    avatar:{

    },
    menuContainer:{

    },
    menuBoton:{},
    menuTexto:{},
});