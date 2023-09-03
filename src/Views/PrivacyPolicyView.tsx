import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Colors, Styles } from '../Themes/Styles';
import { QuestionsEn, QuestionsEs } from '../Utils/QuestionsData';

export const PrivacyPolicyView = () => {
    const {t, i18n} = useTranslation();
    const {width, height} = useWindowDimensions();

    const listArray = i18n.language === 'es-MX' ? QuestionsEs : QuestionsEn;

    return (
        <ScrollView style={{flexGrow: 1}}>
            <View style={StylesPrivacyPolicy.container}>
                <View >
                    <Image
                        source={require('../Assets/Images/helpImage.png')}
                        style={{ flex: 1, resizeMode: 'contain', width: width * .80, height: height * .25 }}
                    />
                </View>
            </View>
        </ScrollView>
    )
}

const StylesPrivacyPolicy = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
    }
})