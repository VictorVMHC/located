import 'react-native-gesture-handler';

import React from 'react';
import {
    Image , StyleSheet , Text , useWindowDimensions , View
} from 'react-native';

import {
    createDrawerNavigator , DrawerContentComponentProps , DrawerContentScrollView, DrawerItem, DrawerItemList
} from '@react-navigation/drawer';

import { DrawerMenuButtons } from '../Components/DrawerMenuButton';
import { TabBarNavigation } from './TabBarNavigation';
import { EditProfileView } from '../Views/EditProfileView';
import { HelpView } from '../Views/HelpView';
import { NotificationsView } from '../Views/NotificationsView';
import Collapsible from 'react-native-collapsible';
import { CollapsibleButon } from '../Components/CollapsibleButton';
import { useTranslation } from 'react-i18next';

const Drawer = createDrawerNavigator();


export function DrawerMenu() {
  const {width} = useWindowDimensions();
  return (
    <Drawer.Navigator
    screenOptions={{
      headerTitle:'Located App',
      headerStyle: {
        elevation: 0,
        shadowColor: 'transparent'
      },
      drawerPosition: 'left',
      drawerStyle:{
        backgroundColor: 'rgba(0,0,0,0.85)',
        backfaceVisibility: 'hidden',
        width: width/1.7
      }
    }}
      drawerContent={(props) => < MenuInterno {...props} />}
    >
      <Drawer.Screen name="TabBarNavigator" component={TabBarNavigation}/>
      <Drawer.Screen name="EditProfileView" component={EditProfileView}/>
      <Drawer.Screen name="HelpView" component={HelpView}/>
      <Drawer.Screen name="NotificationsView" component={NotificationsView}/>
    </Drawer.Navigator>
  );
}


const MenuInterno = ( props: DrawerContentComponentProps ) => {
  const {i18n} = useTranslation();
  const { navigation } = props;
  return(
    <View style={{flex: 1}}>
      <View style={styles.header}><Text style={styles.title}>Located</Text>
        <Image
          style={styles.avatar}
          source={require('../Assets/Images/Lisa.png')}
        />
        <Text style={styles.title}>Luis Daniel</Text>
      </View>
      <View style={styles.body} >
        <DrawerContentScrollView
          style={styles.container}
        >        
          <View style={styles.body}>
            <DrawerMenuButtons
              text = "Inicio"
              onPress = {() => navigation.navigate('TabBarNavigator')}
              iconName='home-outline'
            />
            <DrawerMenuButtons
              text = "Editar Perfil"
              onPress = {() => navigation.navigate('EditProfileView')}
              iconName='person-outline'
            />
            <DrawerMenuButtons
              text = "Notificación"
              onPress = {() => navigation.navigate('NotificationsView')}
              iconName='notifications-outline'
            />
            <DrawerMenuButtons
              text = "Ayuda"
              onPress = {() => navigation.navigate('HelpView')}
              iconName='help-circle-outline'
            />
            <CollapsibleButon
              title='Lenguaje'
              iconName='language-outline'
              iconColor='white'
              items={
                [ 
                  {title:'Español', action: () => i18n.changeLanguage('es')},
                  {title:'Inglés', action: () => i18n.changeLanguage('en')}
                ]
              }
            />
          </View>
        </DrawerContentScrollView>
      </View>
      <View style={styles.footer}>
          <DrawerMenuButtons
            text = "Cerrar Sesión"
            onPress = {() => navigation.navigate('TabBarNavigator')}
            iconName='log-out-outline'
          />
          <Text style={styles.version}>CUCEI UdeG Version -1.5</Text>
      </View>
    </View>
  );
}

const styles= StyleSheet.create({
  container:{
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
    flex:3,
  },
  body:{
    flex:6,
  },
  footer:{
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  version:{
    color: 'white',
    fontSize:15,
    textAlign: 'center', 
    bottom: 3,
  },
});