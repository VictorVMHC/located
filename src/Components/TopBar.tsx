import React, { useRef } from 'react'
import { StyleSheet, Text, useWindowDimensions } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { Colors } from '../Themes/Styles';
import { useTranslation } from 'react-i18next';

interface Props {
    actionStart?: () => void,
    actionAddress?: () => void,
    actionCatalogue?: () => void,
    routeComments?: () => void,
}

export const TopBar = ({actionStart, actionAddress,actionCatalogue,routeComments}:Props) => {
    const { width } = useWindowDimensions();
    const { t } = useTranslation();

    return (
        <ScrollView horizontal={true}> 
            <TouchableOpacity style={TopBarStyle.buttonNavigation}>
            <Text style={{...TopBarStyle.textNavigation, width: width/3}} onPress={actionStart}>{t('TobBarStart')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={TopBarStyle.buttonNavigation} >
                <Text style={{...TopBarStyle.textNavigation, width: width/3}} onPress={actionAddress}>{t('TobBarAddress')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={TopBarStyle.buttonNavigation} >
                <Text style={{...TopBarStyle.textNavigation, width: width/3}} onPress={actionCatalogue}>{t('TobBarCatalogue')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={TopBarStyle.buttonNavigation} >
                <Text style={{...TopBarStyle.textNavigation, width: width/3}} onPress={routeComments}>...</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

const TopBarStyle = StyleSheet.create({
    buttonNavigation:{
        height: '100%',
        borderBottomColor: Colors.Yellow,
        borderBottomWidth: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textNavigation:{
        textAlign: 'center',
        justifyContent: 'center',
        fontFamily: 'Outfit-SemiBold', 
        fontSize: 20,
        color: '#000000'
    }
});
