import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Colors, Styles } from '../Themes/Styles';
import { PPAccordion} from '../Components/PrivacyPolicyAccordion'
import { PpDataEs, PpDataEn,PpData2En,PpData2Es, PpData3Es, PpData3En, PpData4En,PpData4Es} from '../Utils/PrivacyPolicyData';

export const PrivacyPolicyView = () => {
    const {t, i18n} = useTranslation();
    const {width, height} = useWindowDimensions();

    const listArray = i18n.language === 'es-MX' ? PpDataEs : PpDataEn;
    const listArray2 = i18n.language === 'es-MX' ? PpData2Es : PpData2En;
    const listArray3 = i18n.language === 'es-MX' ? PpData3Es : PpData3En;
    const listArray4 = i18n.language === 'es-MX' ? PpData4Es : PpData4En;

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
    }
})