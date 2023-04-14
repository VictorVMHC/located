import React, {  useState } from 'react'
import { View, Image, StyleSheet, Text, TextInput, TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Circles } from '../Components/Circles';
import { FontStyles, Styles } from '../Themes/Styles'
import { PickerButon } from '../Components/PickerButton';
import { useTranslation } from 'react-i18next';

export const CreateAccountEmailView = () => {
    const {t, i18n } = useTranslation();
    const [Nombre,setNombre] = useState() /* codigo de prueba para ingresar y obtener datos */
    const [Email,setEmail] = useState()
    const [Tel,setTel] = useState()
    const [Edad,setEdad] = useState()
    return (
        <SafeAreaView style={Styles.container}>
            <Circles
            position='top'
            quantity={2}
            />
            <View style={{...Styles.headerView, flexDirection: 'row'}}>
                <View style={{flex: 7}} >
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={Styles.textStyle}> {t('CreateAccount')} </Text>
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
                        <Text style={Stylesingletext.onlytext}>{t('Personalinfo')}</Text>
                        <TextInput style={Styles.input}
                            placeholder={`${t('Name')}`}
                        />
                        <TextInput style={Styles.input}
                        placeholder={`${t('Email')}`}
                            keyboardType='email-address'   
                        />
                        <TextInput style={Styles.input}
                        placeholder={`${t('UserName')}`}
                        />
                        <TextInput style={Styles.input}
                            placeholder={`${t('Phonenumber')}`}
                            keyboardType="phone-pad"   
                        />
                        <TextInput style={Styles.input}
                            placeholder={`${t('Age')}`}
                            keyboardType='number-pad'
                        />
                <TouchableOpacity style={Styles.boton}>
                    <Text style={Styles.txtbtn}>{t('Registrar')}</Text>
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
