import 'react-native-gesture-handler';

import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { CollapsibleButton } from '../Components/CollapsibleButton';
import { DrawerMenuButtons } from '../Components/DrawerMenuButton';
import { AuthContext } from '../Context/AuthContext';
import { Colors } from '../Themes/Styles';
import { EditProfileView } from '../Views/EditProfileView';
import { HelpView } from '../Views/HelpView';
import { PrivacyPolicyViewDrawer } from '../Views/PrivacyPolicyViewDrawer';
import { NotificationsView } from '../Views/NotificationsView';
import { TabBarNavigation } from './TabBarNavigation';

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
      <Drawer.Screen name='PrivacyPolicyViewDrawer' component={PrivacyPolicyViewDrawer}/>
      <Drawer.Screen name="NotificationsView" component={NotificationsView}/>
    </Drawer.Navigator>
  );
}

const InternalMenu = ( props: DrawerContentComponentProps ) => {
  const {t,i18n} = useTranslation();
  const {logOut} = useContext(AuthContext);
  const { navigation } = props;
  const contextAuthentication = useContext(AuthContext);
  const { user } = contextAuthentication;

  return(
    <View style={{flex: 1}}>
      <View style={styles.header}><Text style={styles.title}>Located</Text>
        <Image
          style={styles.avatar}
          source={ user?.image ?{ uri: user.image }: require('../Assets/Images/Img_User.png')}
        />
        <Text style={styles.title}>{user?.username}</Text>
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
              onPress = {() => navigation.navigate('EditProfileView')}
              iconName='notifications-outline'
            />
            <DrawerMenuButtons
              text = {t('DrawerHelp')}
              onPress = {() => navigation.navigate('HelpView')}
              iconName='help-circle-outline'
            />
            <DrawerMenuButtons
              text = {t('DrawerPrivacyPolicy')}
              onPress = {() => navigation.navigate('PrivacyPolicyViewDrawer')}
              iconName='information-circle-outline'
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