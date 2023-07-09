import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Circles } from '../Components/Circles';
import { FontStyles, Styles } from '../Themes/Styles'
import { PickerButton } from '../Components/PickerButton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useTranslation } from 'react-i18next';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

interface Props extends NativeStackScreenProps<any, any>{}

export const MainCreateAccountView = ({navigation}: Props) => {
    const { t, i18n } = useTranslation();
    return (
    <SafeAreaView style={Styles.container}>
        <Circles
        position='top'
        quantity={2}
        />
        <View style={{...Styles.headerView, flexDirection: 'row'}}>
                <View style={{flex: 6}} >
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{...Styles.textStyle, width:300, fontSize:30, top:10, left: 15}}>{t('CreateAccount')}</Text>
                    </View>
                </View>
                <View style={{flex: 2, flexDirection: 'row', alignItems: 'center', left:12, top:3 }}>
                    <View style={{flex: 1.6, left:15}}>
                        {i18n.language === 'es-MX'
                            ?   <Image source={require('../Assets/Images/Es.png')} style={{width: 25, height: 25, borderRadius: 15}} />
                            :   <Image source={require('../Assets/Images/En.png')} style={{width: 25, height: 25, borderRadius: 15}} />
                        }
                    </View>
                    <View style={{ flex: 5}}>
                        <PickerButton/>
                    </View>   
                </View>
            </View>
        <Image
            style={{...Styles.imageStyle, left: -120, top: -5}}
            source={require('../Assets/Images/logo_located.png')}
        />
        <View style={Styles.bodyView}>
            <View style={StylesLogging.viewText}>
                <TouchableOpacity >
                    <AntDesign name="google"style={StylesLogging.IconGoogle}/>
                    <Text style= {StylesLogging.textInformation}>{t('SingUpGoogle')}</Text>
                </TouchableOpacity>  
                <TouchableOpacity>
                    <AntDesign name="facebook-square"style={StylesLogging.IconFace}/>
                    <Text style= {StylesLogging.textInformation}>{t('SingUpFacebook')}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("CreateAccountEmailView")}>
                    <AntDesign name="mail"style={StylesLogging.IconMail}/>
                    <Text style= {StylesLogging.textInformation}>{t('SingUpEmail')}</Text>
                </TouchableOpacity>
            </View>
        </View>
    </SafeAreaView>
    )
}

const StylesLogging = StyleSheet.create({
    viewText: {
        width: 300,
    },
    textInformation:{
        alignSelf: 'flex-end',
        top: -38,
        ...FontStyles.Information,
        color:'black',
        width: 226,
        height: 23
    },
    viewLine:{
        flex: 1.8,
        borderColor: 'gray',
        borderWidth: 1,
        height:1,
    },
    viewTextInLine:{
        flex: 2.4,
        top: -6,
        alignItems: 'center',
    },
    textLogging:{
        ...FontStyles.Information,
    },
    IconFace:{
        color: 'blue',
        fontSize: 35,
        top: -14,
    },
    IconMail:{
        color:'black',
        fontSize: 35,
        top: -14,
        width: 45,
        height:30,
    },
    IconGoogle:{
        color:'red',
        fontSize: 35,
        top: -14,
    },
});

