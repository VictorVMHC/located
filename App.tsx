import React from 'react';
import { Button, Text, View } from 'react-native';
import './src/Utils/i18m';
import { useTranslation } from 'react-i18next';
import { SplasScreenView } from './src/Views/SplasScreenView';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MainStackNavigator } from './src/Navigation/MainStackNavigator';
import { NavigationContainer } from '@react-navigation/native';

export const App = () => {
  const {t, i18n} = useTranslation();
  const changeLenguage =(value: string) =>{
    i18n.changeLanguage(value);
    console.log(value);
  }
  return (
    <NavigationContainer>
     { 
     /*
     <View>
      <Text> {t('Hello World')} </Text>
      <Button
      title={t('Hello World')}
      onPress={() => changeLenguage('es')}
      ></Button>
    </View> 
    */
    }
      <MainStackNavigator/>
    </NavigationContainer>
  )
}