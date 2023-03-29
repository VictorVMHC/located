import 'react-native-gesture-handler';
import './src/Utils/i18n';


import React from 'react';
import { I18nextProvider , useTranslation } from 'react-i18next';
import { Button , Text , View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { MainStackNavigator } from './src/Navigation/MainStackNavigator';
import { TabBarNavigator } from './src/Navigation/TabBarNavigatior';
import { DrawerMenu} from './src/Navigation/DrawerMenu';
import { LogginView } from './src/Views/LogginView';
import { CalistarjetaScreenView } from './src/Views/CalistarjetaScreenView';

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
