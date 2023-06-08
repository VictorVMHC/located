import React from 'react'
import { useTranslation } from 'react-i18next';
import MapView from 'react-native-maps';

export const MapsView = () => {
    const {t, i18n} = useTranslation();
    const changeLenguage =(value: string) =>{
        i18n.changeLanguage(value);
        console.log(value);
    }
    return (
        <MapView style={{height: '100%'}}/>
    )
}
