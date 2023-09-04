import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { PPAccordion, PPText} from '../Components/PrivacyPolicyAccordion'
import { PpDataEs, PpDataEn,PpData2En,PpData2Es, PpData3Es, PpData3En, PpData4En,PpData4Es, PpData5En, PpData5Es,PPinfoEn,PPinfoEs} from '../Utils/PrivacyPolicyData';

export const PrivacyPolicyView = () => {
    const {t, i18n} = useTranslation();

    const listArray = i18n.language === 'es-MX' ? PpDataEs : PpDataEn;
    const listArray2 = i18n.language === 'es-MX' ? PpData2Es : PpData2En;
    const listArray3 = i18n.language === 'es-MX' ? PpData3Es : PpData3En;
    const listArray4 = i18n.language === 'es-MX' ? PpData4Es : PpData4En;
    const listArray5 = i18n.language === 'es-MX' ? PpData5Es : PpData5En;
    const listInfoArray = i18n.language === 'es-MX'? PPinfoEs : PPinfoEn;

    return (
        <ScrollView style={{flexGrow: 1}}>
            <View style={StylesPrivacyPolicy.container}>
                <Text style={StylesPrivacyPolicy.titleText}>{t('PrivacyTitle')}</Text>
                <Text style={StylesPrivacyPolicy.subtitleText}>{t('PrivacySubtitle')}</Text>
                    { listArray.map( Data => <PPAccordion key={Data.id} title={Data.title} info={Data.info}/> ) }
                <Text style={StylesPrivacyPolicy.subtitleText}>{t('privacySubtitle2')}</Text>
                    { listArray2.map( Data => <PPAccordion key={Data.id} title={Data.title} info={Data.info}/> ) }
                <Text style={StylesPrivacyPolicy.subtitleText}>{t('privacySubtitle3')}</Text>
                    { listArray3.map( Data => <PPAccordion key={Data.id} title={Data.title} info={Data.info}/> ) }
                <Text style={StylesPrivacyPolicy.subtitleText}>{t('privacySubtitle4')}</Text>
                    { listArray4.map( Data => <PPAccordion key={Data.id} title={Data.title} info={Data.info}/> ) }
                <Text style={StylesPrivacyPolicy.subtitleText}>{t('privacySubtitle5')}</Text>           
                    { listArray5.map( Data => <PPAccordion key={Data.id} title={Data.title} info={Data.info}/> ) }
            </View>
            <View>
                <Text style={StylesPrivacyPolicy.subtitleText}>{t('privacySubtitle6')}</Text>
                { listInfoArray.map( Data => <PPText key={Data.id} text={Data.text} text2={Data.text2} text3={Data.text3}/> ) }
            </View>
            <View style={StylesPrivacyPolicy.finalView}>
                <Text style={StylesPrivacyPolicy.textEmail}>locatedapp@gmail.com</Text>
            </View>
        </ScrollView>
    )
}

const StylesPrivacyPolicy = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 8,
    },
    titleText:{
        fontSize:28,
        color:'black',
        fontWeight:'bold',
        padding:4,
        textAlign:'center',
    },
    subtitleText:{
        paddingVertical:10,
        fontSize:20,
        color:'black',
        fontFamily:'Outfit.Regular',
        fontWeight:'bold',
        textAlign:'center',
        marginVertical:5,
    },
    textEmail:{
        fontFamily: 'Outfit-ExtraLight', 
        textAlign:'center',
        fontWeight:'bold',
        fontSize: 22, 
        color: '#c47f30',
        bottom:15,
    },
    finalView:{
        paddingVertical:30,
    },
})