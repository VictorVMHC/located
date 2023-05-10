import React, {  useState } from 'react'
import { View, Image, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView} from 'react-native';
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
            <ScrollView>
            <Circles
                position='top'
                quantity={2}
            />
            <View style={Stylesingletext.contentOne}>
                            <View style={{}}>
                                <View style={Stylesingletext.containerTitle}>
                                    <Text style={{...Styles.textStyle, top:5}}>{t('Passwordtitle')}</Text>
                                </View>
                            </View>    
                            <View style={Stylesingletext.containerLeng} >
                                <View style={Stylesingletext.containerImgLeng}>
                                    {i18n.language === 'es-MX'
                                        ?   <Image source={require('../Assets/Images/Es.png')} style={{width: 25, height: 25, borderRadius: 15}} />
                                        :   <Image source={require('../Assets/Images/En.png')} style={{width: 25, height: 25, borderRadius: 15}} />
                                    }
                                </View>
                                <View style={{width: 125}}>
                                    <PickerButon/>
                                </View>   
                            </View>
                        </View>
                <Image
                    style={{...Styles.imageStyle, left: -100, top:'18%'}}
                    source={require('../Assets/Images/logo_located.png')}
                />
            <View style={Stylesingletext.bodyView}>
                <Text style={Stylesingletext.onlytext}>{t('ForgotPassword')}</Text>
                <TextInput style={Styles.input}
                    placeholder={`${t('EnterEmail')}`}   
                />
                <TouchableOpacity style={Styles.boton}>
                    <Text style={Styles.txtbtn}>{t('Recovery')}</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </SafeAreaView> 
    )
}

const Stylesingletext = StyleSheet.create({
    onlytext:{
        ...Styles.textos,
        width: 345,
    },
    bodyView:{
        justifyContent:'center',
        alignItems:'center',
        marginTop:'25%',
    },
    contentOne:{
        flexDirection: 'row', 
        justifyContent: 'space-between',
    },
    containerTitle:{
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    containerLeng:{
        flexDirection: 'row', 
        justifyContent: 'flex-end',
        width: 218,
    },
    containerImgLeng:{
        width: 30, 
        height: 53, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    containerLogo:{
        justifyContent: 'center', 
        alignItems: 'center', 
        top: '8%'
    },
});