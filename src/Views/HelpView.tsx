import React, {useState, useEffect} from 'react'
import { Text, View, Image, TouchableOpacity, StyleSheet,TextInput} from 'react-native'
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import {Accordion} from '../Components/Accordion';
import { Colors, Styles } from '../Themes/Styles'

interface Data {
    id: number;
    question: string;
    answer: string;
}

const listArray: Data[] = [
    { id: 1, question: '¿POR QUÉ NO PUEDO ACCEDER A TODAS LAS FUNCIONES DE LA APP?', answer: 'Si no puedes ingresar a todas las funciones de la app necesitas estar registrado o haber iniciado sesion '},
    { id: 2, question: '¿POR QUÉ NO PUEDO ACCEDER A TODAS LAS FUNCIONES DE LA APP?', answer: 'Si no puedes ingresar a todas las funciones de la app necesitas estar registrado o haber iniciado sesion '},
    { id: 3, question: '¿POR QUÉ NO PUEDO ACCEDER A TODAS LAS FUNCIONES DE LA APP?', answer: 'Si no puedes ingresar a todas las funciones de la app necesitas estar registrado o haber iniciado sesion '},
    { id: 4, question: '¿POR QUÉ NO PUEDO ACCEDER A TODAS LAS FUNCIONES DE LA APP?', answer: 'Si no puedes ingresar a todas las funciones de la app necesitas estar registrado o haber iniciado sesion '},
    { id: 5, question: '¿POR QUÉ NO PUEDO ACCEDER A TODAS LAS FUNCIONES DE LA APP?', answer: 'Si no puedes ingresar a todas las funciones de la app necesitas estar registrado o haber iniciado sesion '},
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
        <SafeAreaView>
            <ScrollView>
        <View  style={StylesFAQ.container}>
            <View>
                <Image source={require('../Assets/Images/helpImage.png')} style={{width: 200, height: 190, borderRadius: 5,}} />
            </View>
            <Text style={StylesFAQ.titleText}>{t('FAQ')}</Text>
            <View>
                <FlatList data={listArray} renderItem={rendererData}/>
            </View>
        </View>
                <View style={StylesFAQ.secondContainer}>
                    <Text style={StylesFAQ.secondText}>{t('InfoForAsk')}</Text>
                    <TextInput style={{...Styles.input, width:310, fontSize:20, top:1}}
                        placeholderTextColor={Colors.blueText}
                        placeholder={`${t('WriteQuestion')}`}   
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
        flex:1,
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
    separate:{
        backgroundColor:'rgba(255,198,0,0.4)',
        height:3,
        width:"98%",
    },
    secondContainer:{
        flex:1,
        alignItems:'center',
        padding:10,
        top:-8,
    },
    secondText:{
        fontSize:20,
        fontFamily:'Outfit.Regular',
        color:'black',
        padding:4,
    },
})