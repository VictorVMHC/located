import React, {  useRef, useState } from 'react'
import { View, Image, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import { Circles } from '../Components/Circles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PickerButton } from '../Components/PickerButton';
import { Colors, Styles, FontStyles } from '../Themes/Styles'
import { IconWithText } from '../Components/IconWithText';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { ViewStackParams } from '../Navigation/MainStackNavigator';

interface Code {
    v1: string,
    v2: string,
    v3: string,
    v4: string,
    v5: string,
    v6: string,
}
interface Props extends StackScreenProps<ViewStackParams, 'ForgotPasswordView'>{};

export const ForgotPasswordView = ({ navigation }: Props) => {
    const { t ,i18n } = useTranslation();
    const [code, setCode] = useState<Code>({v1: '', v2: '', v3: '', v4: '', v5: '', v6: ''});
    const textInputRefs = Array.from({ length: 6 }, () => useRef<TextInput>(null));

    const validationSchema = Yup.object().shape({
        email: Yup.string().email(t('ValidEmail').toString()).required(t('RequireField').toString()),
    });

    const updateValue = (name: string, newValue: string) => {
        setCode((prevData) => ({
            ...prevData,
            [name]: newValue,
        }));     
    };

    const handleTextInputChange = (index: number, text: string) => {
        const fieldName = `v${index + 1}`as keyof typeof code;
        updateValue(fieldName, text);
        if (text.length > 0 && index < textInputRefs.length - 1) {
            textInputRefs[index + 1].current?.focus();
        } 
    };


    const handleSubmit =(email:string) =>{
        if(email){
        console.log(email);
        navigation.navigate('RecoveryPasswordView', {email: 'holaaa'});
        }else{
            console.log('error');
        }
    };
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
                    <Formik
                        initialValues={{
                            email: "",
                        }}
                        onSubmit={(Value) => {handleSubmit(Value.email)}}
                        validationSchema={validationSchema}
                    >
                    {({ handleChange, handleSubmit, values, errors }) => (
                        <View>
                    <TextInput 
                        style={[Styles.input, errors.email ? StyleSingleText.addProperty : null, FontStyles.SubTitles]}
                        placeholderTextColor={Colors.blueText}
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
                    <TouchableOpacity style={{...Styles.boton,top:4, borderRadius:15}}
                        onPress={handleSubmit}
                    >
                        <Text style={{...Styles.txtBtn,top:1}}>{t('Recovery')}</Text>
                    </TouchableOpacity>
                    </View>
                    )}
                    </Formik>
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
    addProperty: {
        borderColor: Colors.Yellow
    }
});