import React, {useState, useEffect} from 'react'
import { Text, View, Image, TouchableOpacity, StyleSheet, LayoutAnimation} from 'react-native'
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import {Accordion} from '../Components/Accordion';

interface Data {
    id: number;
    question: string;
    answer: string;
}

const listArray: Data[] = [
    { id: 1, question: '¿POR QUÉ NO PUEDO ACCEDER A TODAS LAS FUNCIONES DE LA APP? ', answer: 'Si no puedes ingresar a todas las funciones de la app necesitas estar registrado o haber iniciado sesion '},
    { id: 2, question: '¿POR QUÉ NO PUEDO ACCEDER A TODAS LAS FUNCIONES DE LA APP?  +', answer: 'Si no puedes ingresar a todas las funciones de la app necesitas estar registrado o haber iniciado sesion '},
    { id: 3, question: '¿POR QUÉ NO PUEDO ACCEDER A TODAS LAS FUNCIONES DE LA APP?  +', answer: 'Si no puedes ingresar a todas las funciones de la app necesitas estar registrado o haber iniciado sesion '},
    { id: 4, question: '¿POR QUÉ NO PUEDO ACCEDER A TODAS LAS FUNCIONES DE LA APP?  +', answer: 'Si no puedes ingresar a todas las funciones de la app necesitas estar registrado o haber iniciado sesion '},
    { id: 5, question: '¿POR QUÉ NO PUEDO ACCEDER A TODAS LAS FUNCIONES DE LA APP?  +', answer: 'Si no puedes ingresar a todas las funciones de la app necesitas estar registrado o haber iniciado sesion '},
    { id: 6, question: '¿POR QUÉ NO PUEDO ACCEDER A TODAS LAS FUNCIONES DE LA APP?  +', answer: 'Si no puedes ingresar a todas las funciones de la app necesitas estar registrado o haber iniciado sesion '},
    { id: 7, question: '¿POR QUÉ NO PUEDO ACCEDER A TODAS LAS FUNCIONES DE LA APP?  +', answer: 'Si no puedes ingresar a todas las funciones de la app necesitas estar registrado o haber iniciado sesion '},
    { id: 8, question: '¿POR QUÉ NO PUEDO ACCEDER A TODAS LAS FUNCIONES DE LA APP?  +', answer: 'Si no puedes ingresar a todas las funciones de la app necesitas estar registrado o haber iniciado sesion '},
    { id: 9, question: '¿POR QUÉ NO PUEDO ACCEDER A TODAS LAS FUNCIONES DE LA APP?  +', answer: 'Si no puedes ingresar a todas las funciones de la app necesitas estar registrado o haber iniciado sesion '},
    { id: 10, question: '¿POR QUÉ NO PUEDO ACCEDER A TODAS LAS FUNCIONES DE LA APP?  +', answer: 'Si no puedes ingresar a todas las funciones de la app necesitas estar registrado o haber iniciado sesion '},
    { id: 11, question: '¿POR QUÉ NO PUEDO ACCEDER A TODAS LAS FUNCIONES DE LA APP?  +', answer: 'Si no puedes ingresar a todas las funciones de la app necesitas estar registrado o haber iniciado sesion '},
    { id: 12, question: '¿POR QUÉ NO PUEDO ACCEDER A TODAS LAS FUNCIONES DE LA APP?  +', answer: 'Si no puedes ingresar a todas las funciones de la app necesitas estar registrado o haber iniciado sesion '},
    { id: 13, question: '¿POR QUÉ NO PUEDO ACCEDER A TODAS LAS FUNCIONES DE LA APP?  +', answer: 'Si no puedes ingresar a todas las funciones de la app necesitas estar registrado o haber iniciado sesion '},
    { id: 14, question: '¿POR QUÉ NO PUEDO ACCEDER A TODAS LAS FUNCIONES DE LA APP?  +', answer: 'Si no puedes ingresar a todas las funciones de la app necesitas estar registrado o haber iniciado sesion '},
    
    
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
        <View style={StylesFAQ.container}>
            <View>
                <Image source={require('../Assets/Images/helpImage.png')} style={{width: 200, height: 190, borderRadius: 5, left:'21%'}} />
            </View>
            <View>
                <FlatList data={listArray} renderItem={rendererData}/>
            </View>
        </View>
    )
}

const StylesFAQ = StyleSheet.create({
    container:{
        flex:2,
        alignItems:'center',
        padding:10,
    },
    titleText:{
        fontSize:30,
        fontWeight:'bold',
        padding:10,
        marginVertical:10,
        top:-10,
    },
    titleQuestion:{
        fontSize:14,
        fontWeight:'bold',
        color:'black',
        width:320,
    },
    answer:{
        fontSize:22,
        fontFamily:'Outfit.Light',
        textAlign:'left',
        width:320,
    },
    separate:{
        backgroundColor:'rgba(255,198,0,0.4)',
        height:3,
        width:"98%",
    }
})