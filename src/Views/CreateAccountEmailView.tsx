import { Formik } from 'formik';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Circles } from '../Components/Circles';
import { ModalVerifyUser } from '../Components/ModalVerifyUser';
import { PickerButton } from '../Components/PickerButton';
import { Colors, Styles } from '../Themes/Styles';
import * as Yup from 'yup';
import { IconWithText } from '../Components/IconWithText';

interface formValues {
    name: string,
    email: string,
    phone: string,
    password: string,
    userName: string,
    age: string
}

export const CreateAccountEmailView = () => {
    const {t, i18n } = useTranslation();

    const [modalVisible, setModalVisible] = useState(false);
    const [modalConfirm, setModalConfirm] = useState(false);

    const validationSchema = Yup.object().shape({
        name: Yup.string().required(t('RequireField').toString()),
        userName: Yup.string().required(t('RequireField').toString()),
        email: Yup.string().email(t('ValidEmail').toString()).required(t('RequireField').toString()),
        password: Yup.string().min(6, t('PasswordValidation').toString()).required(t('RequireField').toString()),
        phone: Yup.string().required(t('RequireField').toString()).min(10,t('PhoneValidation').toString()),
        age: Yup.string().required(t('RequireField').toString()),
    });
    const handleSubmit = (values: formValues) => {

        console.log( JSON.stringify(values))
    }
    const handleOpenModal = () => {
        setModalVisible(true);
        console.log("open modal");
    };
    
    const handleCloseModal = () => {
        console.log("close modal");
        setModalVisible(false);
        setModalConfirm(true);      
    };

    const handleCloseModalConfirm = () => {
        console.log("close modal");
        setModalConfirm(false);      
    };
    return (
        <SafeAreaView style={Styles.container}>
            <ScrollView>
                <Circles
                position='top'
                quantity={2}
                />
                <View style={StyleSingleText.contentOne}>
                    <View style={{}}>
                        <View style={StyleSingleText.containerWelcome}>
                            <Text style={{...Styles.textStyle, top:5}}>{t('CreateAccount')}</Text>
                        </View>
                    </View>    
                    <View style={StyleSingleText.containerLang} >
                        <View style={StyleSingleText.containerImgLang}>
                            {i18n.language === 'es-MX'
                                ?   <Image source={require('../Assets/Images/Es.png')} style={{width: 25, height: 25, borderRadius: 15}} />
                                :   <Image source={require('../Assets/Images/En.png')} style={{width: 25, height: 25, borderRadius: 15}} />
                            }
                        </View>
                        <View style={{width: 125}}>
                            <PickerButton/>
                        </View>   
                    </View>
                </View>
                <Image
                    style={{...Styles.imageStyle, left: -100, top:'9%'}}
                    source={require('../Assets/Images/logo_located.png')}
                />
                <View style={StyleSingleText.bodyView}>
                    <Text style={StyleSingleText.onlyText}>{t('PersonalInfo')}</Text>
                    <Formik
                        initialValues={{
                            name: "",
                            email: "",
                            phone: "",
                            password: "",
                            userName: "",
                            age: "",
                        }}
                        onSubmit={handleSubmit}
                        validationSchema={validationSchema}
                    >
                        {({ handleChange, handleSubmit, values, errors }) => (
                            <View>
                                <TextInput 
                                    style={[Styles.input, errors.name ? StyleSingleText.addProperty : null]}
                                    onChangeText={handleChange('name')}
                                    placeholder={`${t('Name')}`}
                                    value={values.name}
                                />
                                {errors.name && 
                                    <IconWithText 
                                        NameIcon='exclamation-circle' 
                                        text={errors.name} 
                                        ColorIcon={Colors.Yellow} 
                                        IconSize={15} 
                                        textStyle={{color: Colors.Yellow}}
                                    />}
                                <TextInput 
                                    style={[Styles.input, errors.name ? StyleSingleText.addProperty : null]}
                                    placeholder={`${t('Email')}`}
                                    keyboardType='email-address'
                                    onChangeText={handleChange('email')}
                                    value={values.email}
                                />
                                {errors.email && 
                                    <IconWithText 
                                        NameIcon='exclamation-circle' 
                                        text={errors.email} 
                                        ColorIcon={Colors.Yellow} 
                                        IconSize={15} 
                                        textStyle={{color: Colors.Yellow}}
                                    />}
                                <TextInput 
                                    style={[Styles.input, errors.name ? StyleSingleText.addProperty : null]}
                                    onChangeText={handleChange('userName')}
                                    placeholder={`${t('UserName')}`}
                                    value={values.userName}
                                />
                                {errors.userName && 
                                    <IconWithText 
                                        NameIcon='exclamation-circle' 
                                        text={errors.userName} 
                                        ColorIcon={Colors.Yellow} 
                                        IconSize={15} 
                                        textStyle={{color: Colors.Yellow}}
                                    />}
                                <TextInput 
                                    style={[Styles.input, errors.name ? StyleSingleText.addProperty : null]}
                                    placeholder={`${t('Password')}`}
                                    keyboardType="phone-pad"
                                    value={values.password}
                                    onChangeText={handleChange('password')}
                                />
                                {errors.password && 
                                    <IconWithText 
                                        NameIcon='exclamation-circle' 
                                        text={errors.password} 
                                        ColorIcon={Colors.Yellow} 
                                        IconSize={15} 
                                        textStyle={{color: Colors.Yellow}}
                                    />}
                                <TextInput 
                                    style={[Styles.input, errors.name ? StyleSingleText.addProperty : null]}
                                    placeholder={`${t('PhoneNumber')}`}
                                    maxLength={12}
                                    keyboardType="phone-pad"
                                    value={values.phone}
                                    onChangeText={handleChange('phone')}
                                />
                                {errors.phone && 
                                    <IconWithText 
                                        NameIcon='exclamation-circle' 
                                        text={errors.phone} 
                                        ColorIcon={Colors.Yellow} 
                                        IconSize={15} 
                                        textStyle={{color: Colors.Yellow}}
                                    />}
                                <TextInput 
                                    style={[Styles.input, errors.name ? StyleSingleText.addProperty : null]}
                                    placeholder={`${t('Age')}`}
                                    keyboardType='number-pad'
                                    value={values.age}
                                    maxLength={3}
                                    onChangeText={handleChange('age')}
                                />
                                {errors.age && 
                                    <IconWithText 
                                        NameIcon='exclamation-circle' 
                                        text={errors.age} 
                                        ColorIcon={Colors.Yellow} 
                                        IconSize={15} 
                                        textStyle={{color: Colors.Yellow}}
                                    />}
                                <TouchableOpacity style={StyleSingleText.boton}
                                    onPress={handleSubmit}
                                >
                                    <Text style={Styles.txtbtn}>{t('Registrar')}</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </Formik>
                </View>
                <ModalVerifyUser
                    isVisible={modalVisible}
                    closeModal={handleCloseModal}
                >
                    <View style={StyleSingleText.container}>
                    <View style={StyleSingleText.subContainer}>
                        <Text style={StyleSingleText.texts}>{t('ModalMsgInicio')}</Text>
                        <Text style={StyleSingleText.texts}>{t('ModalMsgCheckEmail')}</Text>
                    </View>
                    <Text style={{...StyleSingleText.texts,textAlign:'center', top:15}}>{t('ModalEnterCodeMsg')}</Text> 
                    <View style={StyleSingleText.row}>
                        <TextInput style={StyleSingleText.internText}
                        placeholder="__"
                        keyboardType="phone-pad"   
                        />
                        <TextInput style={StyleSingleText.internText}
                        placeholder="__"
                        keyboardType="phone-pad"   
                        />
                        <TextInput style={StyleSingleText.internText}
                        placeholder="__"
                        keyboardType="phone-pad"   
                        />
                        <TextInput style={StyleSingleText.internText}
                        placeholder="__"
                        keyboardType="phone-pad"   
                        />
                        <TextInput style={StyleSingleText.internText}
                        placeholder="__"
                        keyboardType="phone-pad"   
                        />
                        <TextInput style={StyleSingleText.internText}
                        placeholder="__"
                        keyboardType="phone-pad"   
                        />
                        </View>
                        <TouchableOpacity style={StyleSingleText.boton}
                        onPress={handleCloseModal}
                        >
                            <Text style={Styles.txtbtn}>{t('ModalBtnVerify')}</Text>
                        </TouchableOpacity>
                    </View>
                </ModalVerifyUser>
                <ModalVerifyUser
                    isVisible={modalConfirm}
                    closeModal={handleCloseModalConfirm}
                >
                    <View style={StyleSingleText.container}>
                    <View style={StyleSingleText.subContainer}>
                        
                    </View>
                    <Text style={{...StyleSingleText.fail, top:15}}>{t('ModalEnterCodeMsgFail')}</Text> 
                    <View style={StyleSingleText.row}>
                        <TextInput style={StyleSingleText.internText}
                        placeholder="__"
                        keyboardType="phone-pad"   
                        />
                        <TextInput style={StyleSingleText.internText}
                        placeholder="__"
                        keyboardType="phone-pad"   
                        />
                        <TextInput style={StyleSingleText.internText}
                        placeholder="__"
                        keyboardType="phone-pad"   
                        />
                        <TextInput style={StyleSingleText.internText}
                        placeholder="__"
                        keyboardType="phone-pad"   
                        />
                        <TextInput style={StyleSingleText.internText}
                        placeholder="__"
                        keyboardType="phone-pad"   
                        />
                        <TextInput style={StyleSingleText.internText}
                        placeholder="__"
                        keyboardType="phone-pad"   
                        />
                        </View>
                        <TouchableOpacity style={StyleSingleText.boton}
                        onPress={handleCloseModalConfirm}
                        >
                            <Text style={Styles.txtbtn}>{t('ModalBtnVerify')}</Text>
                        </TouchableOpacity>
                    </View>
                </ModalVerifyUser>
            </ScrollView>
        </SafeAreaView>
    )
}

const StyleSingleText = StyleSheet.create({
    onlyText:{
        ...Styles.textos,
        width: 340,
        textAlign: 'center',
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
    containerWelcome:{
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    containerLang:{
        flexDirection: 'row', 
        justifyContent: 'flex-end',
        width: 218,
    },
    containerImgLang:{
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
    container:{
        width: 350,
        height: 250,
        top: 190,
        left: 30,
        backgroundColor: 'rgba(255,255,255,0.9)',
        borderRadius:10,
        borderColor: 'black',
        borderWidth: 2,
        padding: 20,  
    },
    subContainer:{
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
        flexWrap:'wrap',
    },
    row:{
        flexDirection:'row',
        flexWrap:'wrap',
        top: 30,
    },
    internText:{
        left: 10,
        height: 40,
        width: 50,
        color:'blue',
    },
    texts:{
        color:'blue',
        fontSize:20,
        fontFamily:'bold',
    },
    boton:{
        ...Styles.boton,
        alignSelf: 'center',
        alignItems: 'center',
        alignContent: 'center', 
    },
    fail:{
        color:'red',
        fontSize:21,
        fontFamily:'bold',
        textAlign:'center',  
    },
    addProperty: {
        borderColor: Colors.Yellow
    }
});
