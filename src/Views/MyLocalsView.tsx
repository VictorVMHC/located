import React from 'react'
import { Text, View, Image, TouchableOpacity, StyleSheet} from 'react-native'
import { useTranslation } from 'react-i18next';

export const MyLocalsView = () => {
    const {t} = useTranslation();

    return (
        <View style={styles.container}>
            <View style={styles.boxImg}>
            <Image source={require('../Assets/Images/local3D.png')} style={{width: 240, height: 225, borderRadius: 5,}} />
                <Text style={styles.firstText}>{t('MyLocalsTitleText')}</Text>
                <View>
                <Text style={styles.msgText}>{t('MyLocalsDescriptionText')}</Text>
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
        flex: 2,
        alignItems:'center',
        padding: 23,
    },
    boxImg:{
        width:310,
        height:520,
        padding: 17,
        alignItems: 'center',
        borderRadius:40,
        backgroundColor:'rgba(255,198,0,0.4)',
    },
    btn:{
        backgroundColor: '#c47f30',
        width:265,
        height: 35,
        borderRadius: 20,
        top: 79,
        alignItems:'center',
        padding:6,
        right: 10,
        left: 7,
    },
    btnText:{
        color:'white',
        fontSize: 18,
        textAlign:'center',
    },
    firstText:{
        fontSize: 20,
        fontWeight: 'bold',
        textAlign:'center',
        top:10,
        marginBottom: 16,
        color:'black',
    },
    msgText:{
        fontSize: 18,
        top:32,
        textAlign:'center',
    },
});