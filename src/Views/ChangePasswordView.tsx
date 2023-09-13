import React, {  useState,useContext, useEffect } from 'react'
import { View, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontStyles, Styles } from '../Themes/Styles';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { UpdateUserPassword,  } from '../Interfaces/UserInterface';
import { IconWithText } from '../Components/IconWithText';
import { AuthContext } from '../Context/AuthContext';
import { putUserPassword } from '../Api/userApi';
import { CustomAlert } from '../Components/CustomAlert';

export const ChangePasswordView = () => {
    const { t ,i18n } = useTranslation();
    const { user, UpdateUserPass }  = useContext(AuthContext);

    const validationSchema = Yup.object().shape({
        password: Yup.string().min(6, t('PasswordValidation').toString()).required(t('RequireField').toString()),
        newPassword: Yup.string().min(6, t('PasswordValidation').toString()).required(t('RequireField').toString()),
        confirmNewPassword: Yup.string().min(6, t('PasswordValidation').toString()).required(t('RequireField').toString()),

    });

    const handleSubmit = async (UpdateUserPass:UpdateUserPassword) => {
        if (UpdateUserPass.newPassword !== UpdateUserPass.confirmNewPassword) {
            console.log('Las contraseñas nuevas no coinciden');
            return;
        }
        const oldPassword = UpdateUserPass.password;
        const newPassword = UpdateUserPass.newPassword;
        const data = await putUserPassword( UserUpdatePassword);
                if (data.status === 200) {
                    UpdateUserPass({ oldPassword,newPassword}, data.data.token);
                    CustomAlert({
                        title: "User updated successfully", 
                        desc: "User data has been updated successfully",
                    })
                }
            } catch (error: any) {
            console.log(JSON.stringify(error));
        }
    };    

    return (
        <SafeAreaView style={StylePasswordView.container}>
            <ScrollView>
                <View>
                    <Text style={StylePasswordView.textTitle}>{t('security')}</Text>
                </View>
                <View style={StylePasswordView.viewContainer}>
                <Formik
                        initialValues={{
                            password: "",
                            newPassword: "",
                            confirmNewPassword: "",
                        }}
                        onSubmit={(User)=>{handleSubmit(User)}}
                        validationSchema={validationSchema}
                >
                    {({ handleChange, handleSubmit, values, errors }) => (
                        <View>
                            <Text style={StylePasswordView.text}>{t('Password')}</Text>
                            <TextInput style={[StylePasswordView.textInput, errors.password ? StylePasswordView.addProperty : null, ]}
                            placeholderTextColor={Colors.blueText}
                            placeholder={`${t('CurrentPassword')}`}
                            value={values.password}
                            onChangeText={handleChange('password')}
                            secureTextEntry>
                        </TextInput>
                        {errors.password && 
                                    <IconWithText 
                                        NameIcon='exclamation-circle' 
                                        text={errors.password} 
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
                                    />}
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
        paddingHorizontal: 8,
        alignItems:'center',
    },
    viewContainer:{
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
        paddingLeft: 5,
        fontSize:17,
    },
    buttonSend:{
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
    },
    addProperty: {
        borderColor: Colors.Yellow
    }
});