import React from 'react'
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { FontStyles } from '../Themes/Styles';

export const CreateLocalAlert = () => {
    const {height, width} = useWindowDimensions();
    const {t} = useTranslation();
    return (
        <View style={styles.container}>
            <View style={{...styles.boxImg, width: width * 0.8,  height: height * 0.69,}}>
                <Image source={require('../Assets/Images/local3D.png')} style={styles.img}  />
                <Text style={styles.firstText} adjustsFontSizeToFit >{t('MyLocalsTitleText')}</Text>
                <Text style={styles.msgText} adjustsFontSizeToFit >{t('MyLocalsDescriptionText')}</Text>
                <View style={styles.btnView}>
                    <TouchableOpacity style={styles.btn}>
                        <Text style={styles.btnText}>{t('Create')}</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems:'center',
        justifyContent: 'center',
        padding: 23,
    },
    boxImg:{
        flex: 1,
        alignItems: 'center',
        borderRadius:20,
        backgroundColor:'rgba(255,198,0,0.4)',
    },
    img:{
        flex: 5,
        resizeMode: 'center',
        margin: 5,
    },
    firstText:{
        flex: 2,
        ...FontStyles.Title,
        fontWeight: 'bold',
        textAlign:'center',
        paddingHorizontal: 10,
    },
    msgText:{
        flex: 3,
        ...FontStyles.SubTitles,
        textAlign:'center',
        padding: 10,
    },
    btnView: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 6,
        width: '100%',
        height: '100%',
    },
    btn: {
        backgroundColor: '#c47f30',
        borderRadius: 20,
        padding: 6,
        width: '90%',
        height: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
    },

});