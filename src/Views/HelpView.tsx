import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Accordion } from '../Components/Accordion';
import { Colors, Styles } from '../Themes/Styles';
import { QuestionsEn, QuestionsEs } from '../Utils/QuestionsData';

export const HelpView = () => {
    const {t, i18n} = useTranslation();
    const {width, height} = useWindowDimensions();

    const listArray = i18n.language === 'es-MX' ? QuestionsEs : QuestionsEn;

    return (
        <ScrollView style={{flexGrow: 1}}>
            <View style={StylesFAQ.container}>
                <View style={StylesFAQ.containerImage}>
                    <Image
                        source={require('../Assets/Images/helpImage.png')}
                        style={{ flex: 1, resizeMode: 'contain', width: width * .80, height: height * .25 }}
                    />
                    <Text style={StylesFAQ.titleText}>{t('FAQ')}</Text>
                </View>
                <View style={StylesFAQ.containerQAndA} >
                    { listArray.map( Data => <Accordion key={Data.id} question={Data.question} answer={Data.answer}/> ) }
                </View>
                <View style={StylesFAQ.containerAsk}>
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
            </View>
        </ScrollView>
    )
}

const StylesFAQ = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    containerImage:{
        flex: 2,
        alignItems: 'center',
    },
    containerQAndA: {
        flex: 6,
    },
    containerAsk: {
        flex: 4,
        alignItems: 'center', 
    },
    titleText:{
        fontSize:22,
        color:'black',
        fontWeight:'bold',
        padding:4,
    },
    secondText:{
        fontSize:20,
        fontFamily:'Outfit.Regular',
        color:'black',
        padding:4,
    },
})