import './src/Utils/i18n';
import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';

import { MainStackNavigator } from './src/Navigation/MainStackNavigator';


export const App = () => {

  const { i18n } = useTranslation();
  
  return (
    <I18nextProvider i18n={i18n}>
      <NavigationContainer>
        <MainStackNavigator/>
      </NavigationContainer>
    </I18nextProvider>
  )
}
