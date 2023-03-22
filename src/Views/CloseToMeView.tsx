import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button , Text , View } from 'react-native';

export const CloseToMeView = () => {
    const {t, i18n} = useTranslation();
    const changeLenguage =(value: string) =>{
        i18n.changeLanguage(value);
        console.log(value);
    }
    return (
        <View>
            <Text> cerca de mi view </Text>
            <View>
                <Text> {t('Hello World')} </Text>
                <Button
                title={t('Hello World')}
                onPress={() => changeLenguage('en')}
                />
            </View> 
        </View>
    )
}