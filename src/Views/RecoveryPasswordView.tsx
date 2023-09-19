import React, {  useRef, useState } from 'react'
import { View, Image, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import { Circles } from '../Components/Circles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PickerButton } from '../Components/PickerButton';
import { Colors, Styles, FontStyles } from '../Themes/Styles'
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { Formik, FormikValues } from 'formik';
import { ViewStackParams } from '../Navigation/MainStackNavigator';
import { StackScreenProps } from '@react-navigation/stack';

interface Props extends StackScreenProps<ViewStackParams, 'RecoveryPasswordView'>{};
import { IconWithText } from '../Components/IconWithText';
import { CustomAlert } from '../Components/CustomAlert';
import { useNavigation } from '@react-navigation/native';

export const RecoveryPasswordView = ({ route }: Props) => {
    const { t ,i18n } = useTranslation();
    
    const {email} = route.params;
    const navigation = useNavigation();

    const validationSchema = Yup.object().shape({
        newPassword: Yup.string().min(6, t('PasswordValidation').toString()).required(t('RequireField').toString()),
        repeatPassword: Yup.string().min(6, t('PasswordValidation').toString()).required(t('RequireField').toString()),
    });

    
    const handleSubmit = async (passwords:FormikValues) => {
        try{
            const {newPassword, repeatPassword} = passwords;
            
            if (newPassword !== repeatPassword) {
                CustomAlert({
                    title: 'Error',
                    desc: t('ErrorPasswordsInfo')
                })
                return;
            }
            CustomAlert({
                title: t('UserPasswordUpdatedTitle'),
                desc: t('UserPasswordUpdated'),
                
            })
            navigation.navigate('LoginView' as never);
            }catch(error){}
    }; 
    
    return (
        <SafeAreaView style={Styles.container}>
            <ScrollView>
                <Circles
                    position='top'
                    quantity={2}
                />
                    <View style={{flex:1}}>
                        <View>
                            <Text style={{...Styles.textStyle, top:10, left:10, fontSize:30}}>{t('RecoveryPasswordTitle')}</Text>
                        </View>
                    </View>    
                    <View style={StylePasswordView.containerLong} >
                        <View style={StylePasswordView.containerImgLong}>
                            {i18n.language === 'es-MX'
                                ?   <Image source={require('../Assets/Images/Es.png')} style={{width: 25, height: 25, borderRadius: 15}} />
                                :   <Image source={require('../Assets/Images/En.png')} style={{width: 25, height: 25, borderRadius: 15}} />
                            }
                        </View>
                        <View style={{width: '10%', bottom:35, left:2}}>
                            <PickerButton/>
                        </View>   
                    </View>
                <Image
                    style={{...Styles.imageStyle, left: -124, top:16}}
                    source={require('../Assets/Images/logo_located.png')}
                />
                <View style={{...StylePasswordView.viewContainer}}>
                <Formik
                        initialValues={{
                            newPassword: "",
                            repeatPassword: "",
                        }}
                        onSubmit={(values) => {handleSubmit(values)}}
                        validationSchema={validationSchema}
                >
                    {({ handleChange, handleSubmit, values, errors }) => (
                        <View>
                        <Text style={StylePasswordView.text}>{t('NewPasswordText')}</Text>
                        <TextInput style={[StylePasswordView.textInput, errors.newPassword ? StylePasswordView.addProperty : null]}
                            value={values.newPassword}
                            onChangeText={handleChange('newPassword')}
                            secureTextEntry>
                        </TextInput>
                        {errors.newPassword && 
                            <IconWithText 
                                NameIcon='exclamation-circle' 
                                text={errors.newPassword} 
                                ColorIcon={Colors.Yellow} 
                                IconSize={15} 
                                textStyle={{color: Colors.Yellow}}
                            />}
                        <Text style={StylePasswordView.text}>{t('RepeatPasswordText')}</Text>
                        <TextInput style={[StylePasswordView.textInput, errors.repeatPassword ? StylePasswordView.addProperty : null]}
                            value={values.repeatPassword}
                            secureTextEntry
                            onChangeText={handleChange('repeatPassword')}>
                        </TextInput>
                        {errors.repeatPassword && 
                            <IconWithText 
                                NameIcon='exclamation-circle' 
                                text={errors.repeatPassword} 
                                ColorIcon={Colors.Yellow} 
                                IconSize={15} 
                                textStyle={{color: Colors.Yellow}}
                            />
                        }
                    <TouchableOpacity style={StylePasswordView.buttonSend} 
                        onPress={handleSubmit}>
                            <Text style={StylePasswordView.txtBtn}>{t('Recovery')}</Text>
                        </TouchableOpacity>
                    </View>
                    )}
                    </Formik>
                </View>
            </ScrollView>
        </SafeAreaView> 
    )
}

const StylePasswordView = StyleSheet.create({
    
    containerLong:{
        flexDirection: 'row', 
        justifyContent: 'flex-end',
    },
    containerImgLong:{
        bottom:35,
        left:-5, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    containerLogo:{
        justifyContent: 'center', 
        alignItems: 'center', 
    },
    container:{
        flex: 1,
        alignItems:'center',
    },
    viewContainer:{
        padding:25,
        width:'90%',
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
        width: '110%',
        backgroundColor: 'white',
        borderColor: '#ccc',
        borderRadius: 8,
        borderWidth: 2,
        paddingLeft: 5,
        fontSize:17,
    },
    buttonSend:{
        backgroundColor: Colors.Yellow,
        height:40,
        borderRadius: 8,  
        width: '110%',
        marginVertical: 30,
    },
    txtBtn:{
        textAlign: 'center',
        letterSpacing:0,
        ...FontStyles.SubTitles,
        top: 1,
        color:'black',
        fontWeight:'bold',       
    },
    addProperty: {
        borderColor: Colors.Yellow
    }
});