import React, {  useState } from 'react'
import { View, Image, StyleSheet, Text, TextInput, TouchableOpacity} from 'react-native';
import { Circles } from '../Components/Circles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontStyles, Styles } from '../Themes/Styles'
import { PickerButon } from '../Components/PickerButton';
import { useTranslation } from 'react-i18next';

export const OlvideContrasenaView = () => {
    const { t ,i18n } = useTranslation();
        const[datos, setDatos] = useState({
            correo:'',
        })
    return (
        <SafeAreaView style={Styles.container}>
            <Circles
                position='top'
                quantity={2}
            />
            <View style={{...Styles.headerView, flexDirection: 'row'}}>
                <View style={{flex: 7}} >
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={Styles.textStyle}>{t('Passwordtitle')} </Text>
                    </View>
                </View>
                <View style={{flex: 5, flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{flex: 2}}>
                        {i18n.language === 'es'
                            ?   <Image source={require('../Assets/Images/Es.png')} style={{width: 25, height: 25, borderRadius: 15}} />
                            :   <Image source={require('../Assets/Images/En.png')} style={{width: 25, height: 25, borderRadius: 15}} />
                        }
                    </View>
                    <View style={{ flex: 5}}>
                        <PickerButon/>
                    </View>   
                </View>
            </View>
            <Image
                style={{...Styles.imageStyle, left: -100, top: 10}}
                source={require('../Assets/Images/logo_located.png')}
            />
            <View style={Styles.bodyView}>
                <Text style={Stylesingletext.onlytext}>{t('ForgotPassword')}</Text>
                <TextInput style={Styles.input}
                    placeholder={`${t('EnterEmail')}`}   
                />
                <TouchableOpacity style={Styles.boton}>
                    <Text style={Styles.txtbtn}>{t('Recovery')}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView> 
    )
}

const Stylesingletext = StyleSheet.create({
    onlytext:{
        ...Styles.textos,
        width: 300,
    }
});