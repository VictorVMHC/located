import React, {  useState } from 'react'
import { View, Image, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import { Circles } from '../Components/Circles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontStyles} from '../Themes/Styles'
import { useTranslation } from 'react-i18next';


export const ChangePasswordView = () => {
    const { t ,i18n } = useTranslation();
        
    return (
        <SafeAreaView style={StylePasswordView.container}>
            <ScrollView>
                <View>
                    <Text style={StylePasswordView.textTitle}>{t('security')}</Text>
                </View>
                <View style={StylePasswordView.viewcontainer}>
                        <Text style={StylePasswordView.text}>{t('Password')}</Text>
                        <TextInput style={StylePasswordView.textInput}></TextInput>
                        <Text style={StylePasswordView.text}>{t('NewPasswordText')}</Text>
                        <TextInput style={StylePasswordView.textInput}></TextInput>
                        <Text style={StylePasswordView.text}>{t('NewPasswordConfirmText')}</Text>
                        <TextInput style={StylePasswordView.textInput}></TextInput>
                    <TouchableOpacity style={StylePasswordView.botonSend}>
                            <Text style={StylePasswordView.txtBtn}>{t('UptadeBoton')}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView> 
    )
}

const StylePasswordView = StyleSheet.create({
    container:{
        flex: 1,
        paddingHorizontal: 8,
    },
    viewcontainer:{
        flex: 1,
        width: 330,
        padding:7,
    },
    textTitle:{
        fontSize:32,
        color:'black',
        fontWeight:'bold',
        padding:4,
        textAlign:'center',
    },
    text:{
        paddingVertical:14,
        fontSize:20,
        color:'black',
        fontFamily:'Outfit.Regular',
        textAlign:'left',
        top:14,
        paddingLeft:8,
    },
    textInput:{
        height: 42,
        width: 330,
        backgroundColor: 'white',
        borderColor: '#ccc',
        borderRadius: 8,
        borderWidth: 2,
        paddingLeft: 5
    },
    botonSend:{
        backgroundColor:'black',
        height:40,
        borderRadius: 8,  
        width: 330,
        marginVertical: 30,
    },
    txtBtn:{
        textAlign: 'center',
        letterSpacing:0,
        ...FontStyles.SubTitles,
        top: 1,
        color:'white',
        fontWeight:'bold',       
    }
});