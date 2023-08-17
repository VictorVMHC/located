import React, {useState, useEffect} from 'react'
import { Text, View, Image, TouchableOpacity, StyleSheet,TextInput, KeyboardAvoidingView} from 'react-native'
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import {Accordion} from '../Components/Accordion';
import { Colors, Styles } from '../Themes/Styles'
import { Item } from 'react-native-paper/lib/typescript/src/components/Drawer/Drawer';

interface Data {
    id: number;
    question: string;
    answer: string;
}

const listArray: Data[] = [
    { id: 1, question: '¿POR QUÉ NO PUEDO ACCEDER A TODAS LAS FUNCIONES DE LA APP?', answer: 'Si no puedes ingresar a todas las funciones de la app necesitas estar registrado o haber iniciado sesion '},
    { id: 2, question: '¿POR QUÉ NO PUEDO ACCEDER A TODAS LAS FUNCIONES DE LA APP?', answer: 'Si no puedes ingresar a todas las funciones de la app necesitas estar registrado o haber iniciado sesion '},
    { id: 3, question: '¿POR QUÉ NO PUEDO ACCEDER A TODAS LAS FUNCIONES DE LA APP?', answer: 'Si no puedes ingresar a todas las funciones de la app necesitas estar registrado o haber iniciado sesion '},
];

const rendererData = ({ item }: { item: Data }) => {
    return (
        <Accordion
            question = {item.question}
            answer ={item.answer}
        />
    );
}

export const HelpView = () => {
    const {t} = useTranslation();


    return (
        <SafeAreaView style={{flex:1}}>
            <ScrollView>
            <View style={StylesFAQ.container}>
                    <Image source={require('../Assets/Images/helpImage.png')} style={{width: 200, height: 190, borderRadius: 5, top:5}} />
                <Text style={StylesFAQ.titleText}>{t('FAQ')}</Text>
            </View>
                    <View>
                        {listArray.map((Data)=>{
                                return(
                                    
                                    <Accordion key={Data.id} question={Data.question} answer={Data.answer}/>
                                    
                                );
                            })
                        }
                    </View>
                    <View style={StylesFAQ.secondContainer}>
                        <Text style={StylesFAQ.secondText}>{t('InfoForAsk')}</Text>
                        <TextInput style={{...Styles.input, width:310, fontSize:20, top:1}}
                            placeholderTextColor={Colors.blueText}
                            placeholder={`${t('WriteQuestion')}`}   
                        />
                        <TextInput style={{...Styles.input, width:310, fontSize:20, top:1}}
                            placeholderTextColor={Colors.blueText}
                            placeholder={`${t('PlaceHoldEnterEmail')}`}   
                        />
                        <TouchableOpacity style={{...Styles.boton,top:4, borderRadius:10,width:310}}>
                            <Text style={{...Styles.txtBtn,top:1}}>{t('Send')}</Text>
                        </TouchableOpacity>
                    </View>
                    </ScrollView>
        </SafeAreaView>
    )
}

const StylesFAQ = StyleSheet.create({
    container:{
        alignItems:'center',
        padding:10,
    },
    titleText:{
        fontSize:22,
        color:'black',
        fontWeight:'bold',
        padding:4,
        top:-10,
    },
    secondContainer:{
        alignItems:'center',
        padding:10,
        top:-20,
    },
    secondText:{
        fontSize:20,
        fontFamily:'Outfit.Regular',
        color:'black',
        padding:4,
    },
})