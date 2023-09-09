import './src/Utils/i18n';
import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';

import { MainStackNavigator } from './src/Navigation/MainStackNavigator';
import { PermissionsProvider } from './src/Context/PermissionsContext';
import { AuthProvider } from './src/Context/AuthContext';
import { LocalProvider } from './src/Context/NewLocalContext';

const AppState = ({ children }: any) =>{
  return (
    <AuthProvider>
      <PermissionsProvider>
        <LocalProvider>
          { children }
        </LocalProvider>
      </PermissionsProvider>
    </AuthProvider>
  )
}
export const App = () => {
  const { i18n } = useTranslation();
  return (
    <I18nextProvider i18n={i18n}>
      <NavigationContainer>
        <AppState>
          <MainStackNavigator/>
        </AppState>
      </NavigationContainer>
    </I18nextProvider>
  )
}
