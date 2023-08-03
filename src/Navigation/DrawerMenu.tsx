import 'react-native-gesture-handler';

import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { CollapsibleButton } from '../Components/CollapsibleButton';
import { DrawerMenuButtons } from '../Components/DrawerMenuButton';
import { EditProfileView } from '../Views/EditProfileView';
import { HelpView } from '../Views/HelpView';
import { NotificationsView } from '../Views/NotificationsView';
import { TabBarNavigation } from './TabBarNavigation';
import { Colors } from '../Themes/Styles';
import { StoreView } from '../Views/StoreView';
import { CommentsView } from '../Views/CommentsView';
import { AuthContext } from '../Context/AuthContext';


const Drawer = createDrawerNavigator();

export function DrawerMenu() {
  const {width} = useWindowDimensions();
  return (
    <Drawer.Navigator

    screenOptions={{
      headerTitleAlign: 'center',
      headerTitle:() => ( <Image source={require('../Assets/Images/logo_located.png')} style={styles.imageStyle}/> ) ,
      headerStyle: {
        elevation: 0,
        shadowColor: 'transparent',
        backgroundColor: Colors.YellowOpacity
      },
      drawerPosition: 'left',
      drawerStyle:{
        backgroundColor: 'rgba(0,0,0,0.85)',
        backfaceVisibility: 'hidden',
        width: width/1.7
      }
    }}
      drawerContent={(props) => < InternalMenu {...props} />}
    >
      <Drawer.Screen name="TabBarNavigator" component={TabBarNavigation}/>
      <Drawer.Screen name="EditProfileView" component={EditProfileView}/>
      <Drawer.Screen name="HelpView" component={HelpView}/>
      <Drawer.Screen name="NotificationsView" component={NotificationsView}/>
      <Drawer.Screen name="StoreView" component={StoreView}/>
      <Drawer.Screen name="CommentsView" component={CommentsView}/>
    </Drawer.Navigator>
  );
}

const InternalMenu = ( props: DrawerContentComponentProps ) => {
  const {t,i18n} = useTranslation();
  const {logOut} = useContext(AuthContext);
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
              text = {t('DrawerHome')}
              onPress = {() => navigation.navigate('TabBarNavigator')}
              iconName='home-outline'
            />
            <DrawerMenuButtons
              text = {t('DrawerProfile')}
              onPress = {() => navigation.navigate('EditProfileView')}
              iconName='person-outline'
            />
            <DrawerMenuButtons
              text = {t('DrawerNotification')}
              onPress = {() => navigation.navigate('NotificationsView')}
              iconName='notifications-outline'
            />
            <DrawerMenuButtons
              text = {t('DrawerHelp')}
              onPress = {() => navigation.navigate('HelpView')}
              iconName='help-circle-outline'
            />
            <CollapsibleButton
              title={t('DrawerLanguage')}
              iconName='language-outline'
              iconColor='white'
              items={
                [ 
                  {title:t('SpanishMx'), action: () => i18n.changeLanguage('es-MX')},
                  {title:t('EnglishEu'), action: () => i18n.changeLanguage('en-US')}
                ]
              }
            />
          </View>
        </DrawerContentScrollView>
      </View>
      <View style={styles.footer}>
          <DrawerMenuButtons
            iconColor = {'red'}
            text = {t('DrawerLogOut')}
            style={ {color: 'red'} }
            onPress = {() => logOut()}
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
  imageStyle:{
    height: 50, 
    width: 200, 
    resizeMode: 'contain'
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