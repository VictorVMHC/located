import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text , View } from 'react-native';


export const TestScreen = () => {
  const {t} = useTranslation();
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Text>{t('Hello World')}</Text>
    </View>
  )
}
