import React, {  useState } from 'react'
import { View, Image, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import { Circles } from '../Components/Circles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PickerButton } from '../Components/PickerButton';
import { Colors, Styles } from '../Themes/Styles'
import { useTranslation } from 'react-i18next';

export const ForgotPasswordView = () => {
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
                <View style={StyleSingleText.contentOne}>
                    <View style={{flex:1}}>
                        <View style={StyleSingleText.containerTitle}>
                            <Text style={{...Styles.textStyle, top:5, fontSize:34}}>{t('Passwordtitle')}</Text>
                        </View>
                    </View>    
                    <View style={StyleSingleText.containerLong} >
                        <View style={StyleSingleText.containerImgLong}>
                            {i18n.language === 'es-MX'
                                ?   <Image source={require('../Assets/Images/Es.png')} style={{width: 25, height: 25, borderRadius: 15}} />
                                :   <Image source={require('../Assets/Images/En.png')} style={{width: 25, height: 25, borderRadius: 15}} />
                            }
                        </View>
                        <View style={{width: 40, top:3, left:6}}>
                            <PickerButton/>
                        </View>   
                    </View>
                </View>
                <Image
                    style={{...Styles.imageStyle, left: -124, top:60}}
                    source={require('../Assets/Images/logo_located.png')}
                />
                <View style={StyleSingleText.bodyView}>
                    <Text style={StyleSingleText.onlyText}>{t('ForgotPassword')}</Text>
                    <TextInput style={{...Styles.input, width:340, fontSize:20, top:1}}
                        placeholderTextColor={Colors.blueText}
                        placeholder={`${t('EnterEmail')}`}   
                    />
                    <TouchableOpacity style={{...Styles.boton,top:4, borderRadius:15}}>
                        <Text style={{...Styles.txtBtn,top:1}}>{t('Recovery')}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView> 
    )
}

const StyleSingleText = StyleSheet.create({
    onlyText:{
        ...Styles.textos,
        width: 335,
        color:'#4E7098',
        fontSize:23,
    },
    bodyView:{
        justifyContent:'center',
        alignItems:'center',
        marginTop:90,
    },
    contentOne:{
        flexDirection: 'row', 
        justifyContent: 'space-between',
    },
    containerTitle:{
        width:300,
        left:10,
    },
    containerLong:{
        flexDirection: 'row', 
        justifyContent: 'flex-end',
        width: 218,
    },
    containerImgLong:{
        top:2, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    containerLogo:{
        justifyContent: 'center', 
        alignItems: 'center', 
    },
});