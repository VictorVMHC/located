import { Formik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Yup from 'yup';
import { putUserPassword } from '../Api/userApi';
import { CustomAlert } from '../Components/CustomAlert';
import { IconWithText } from '../Components/IconWithText';
import { UpdateUserPassword, } from '../Interfaces/UserInterface';
import { Colors, FontStyles } from '../Themes/Styles';
import { useNavigation } from '@react-navigation/native';

export const ChangePasswordView = () => {
    const { t } = useTranslation();
    const navigation = useNavigation();

    const validationSchema = Yup.object().shape({
        oldPassword: Yup.string().min(6, t('PasswordValidation').toString()).required(t('RequireField').toString()),
        newPassword: Yup.string().min(6, t('PasswordValidation').toString()).required(t('RequireField').toString()),
        confirmNewPassword: Yup.string().min(6, t('PasswordValidation').toString()).required(t('RequireField').toString()),
    });


    const handleSubmit = async (updateUserPass:UpdateUserPassword) => {
        try{
            const {newPassword, confirmNewPassword} = updateUserPass;
            
            if (newPassword !== confirmNewPassword) {
                CustomAlert({
                    title: 'Error',
                    desc: t('ErrorPasswordsInfo')
                })
                return;
            }

            const response = await putUserPassword(updateUserPass);

            if (response.status === 200) {
                CustomAlert({
                    title: t('UserPasswordUpdatedTitle'),
                    desc: t('UserPasswordUpdated'),
                    
                })
                return navigation.goBack();
            }
        }catch (error: any) {            
            CustomAlert({
                title: "Error", 
                desc: t('ErrorToUpdatePassword'),
        })
        }
    };    

    return (
        <SafeAreaView style={StylePasswordView.container}>
            <ScrollView>
                <View>
                    <Text style={StylePasswordView.textTitle}>{t('security')}</Text>
                </View>
                <View style={{...StylePasswordView.viewContainer, width:320}}>
                <Formik
                        initialValues={{
                            oldPassword: "",
                            newPassword: "",
                            confirmNewPassword: "",
                        }}
                        onSubmit={(passwords) => {handleSubmit(passwords)}}
                        validationSchema={validationSchema}
                >
                    {({ handleChange, handleSubmit, values, errors }) => (
                        <View>
                            <Text style={StylePasswordView.text}>{t('Password')}</Text>
                            <TextInput style={[StylePasswordView.textInput, errors.oldPassword ? StylePasswordView.addProperty : null, ]}
                            placeholderTextColor={Colors.blueText}
                            placeholder={`${t('CurrentPassword')}`}
                            value={values.oldPassword}
                            onChangeText={handleChange('oldPassword')}
                            secureTextEntry>
                        </TextInput>
                        {errors.oldPassword && 
                            <IconWithText 
                                NameIcon='exclamation-circle' 
                                text={errors.oldPassword} 
                                ColorIcon={Colors.Yellow} 
                                IconSize={15} 
                                textStyle={{color: Colors.Yellow}}
                            />}
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
                        <Text style={StylePasswordView.text}>{t('NewPasswordConfirmText')}</Text>
                        <TextInput style={[StylePasswordView.textInput, errors.confirmNewPassword ? StylePasswordView.addProperty : null]}
                            value={values.confirmNewPassword}
                            secureTextEntry
                            onChangeText={handleChange('confirmNewPassword')}>
                        </TextInput>
                        {errors.confirmNewPassword && 
                            <IconWithText 
                                NameIcon='exclamation-circle' 
                                text={errors.confirmNewPassword} 
                                ColorIcon={Colors.Yellow} 
                                IconSize={15} 
                                textStyle={{color: Colors.Yellow}}
                            />
                        }
                        <TouchableOpacity style={StylePasswordView.buttonSend} 
                        onPress={handleSubmit}>
                            <Text style={StylePasswordView.txtBtn}>{t('UpdateButton')}</Text>
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
    container:{
        flex: 1,
        alignItems:'center',
    },
    viewContainer:{
        padding:5,
        width:'100%',
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
        width: '100%',
        backgroundColor: 'white',
        borderColor: '#ccc',
        borderRadius: 8,
        borderWidth: 2,
        paddingLeft: 5,
        fontSize:17,
    },
    buttonSend:{
        backgroundColor:'black',
        height:40,
        borderRadius: 8,  
        width: '100%',
        marginVertical: 30,
    },
    txtBtn:{
        textAlign: 'center',
        letterSpacing:0,
        ...FontStyles.SubTitles,
        top: 1,
        color:'white',
        fontWeight:'bold',       
    },
    addProperty: {
        borderColor: Colors.Yellow
    }
});