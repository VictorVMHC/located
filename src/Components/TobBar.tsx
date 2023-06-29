import React, { useRef } from 'react'
import { StyleSheet, Text, useWindowDimensions } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { Colors } from '../Themes/Styles';
import { useTranslation } from 'react-i18next';

interface Props {
    actionStart?: () => void,
    actionAddress?: () => void,
    actionCatalogue?: () => void,
}

export const TobBar = ({actionStart, actionAddress,actionCatalogue}:Props) => {
    const { width } = useWindowDimensions();
    const { t} = useTranslation();

    return (
        <ScrollView horizontal={true}> 
            <TouchableOpacity style={TobBarStyle.buttonNavigation}>
            <Text style={{...TobBarStyle.textnavigation, width: width/3}} onPress={actionStart}>{t('TobBarStart')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={TobBarStyle.buttonNavigation} >
                <Text style={{...TobBarStyle.textnavigation, width: width/3}} onPress={actionAddress}>{t('TobBarAddress')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={TobBarStyle.buttonNavigation} >
                <Text style={{...TobBarStyle.textnavigation, width: width/3}} onPress={actionCatalogue}>{t('TobBarCatalogue')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={TobBarStyle.buttonNavigation} >
                <Text style={{...TobBarStyle.textnavigation, width: width/3}}>...</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

const TobBarStyle = StyleSheet.create({
    buttonNavigation:{
        height: '100%',
        borderBottomColor: Colors.Yellow,
        borderBottomWidth: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textnavigation:{
        textAlign: 'center',
        justifyContent: 'center',
        fontFamily: 'Outfit-SemiBold', 
        fontSize: 20,
        color: '#000000'
    }
});
