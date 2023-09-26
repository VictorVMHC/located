import React from 'react'
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { FontStyles } from '../Themes/Styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
interface Props extends NativeStackScreenProps<any, any>{};

export const CreateProductAlertView = ({navigation}: Props) => {
    const {height, width} = useWindowDimensions();
    const {t} = useTranslation();
    return (
        <View style={styles.container}>
            <View style={{...styles.boxImg, width: width * 0.8,  height: height * 0.69,}}>
                <Image source={require('../Assets/Images/local3D.png')} style={styles.img}  />
                <Text style={styles.firstText} adjustsFontSizeToFit >It looks that your local don't have products yet</Text>
                <Text style={styles.msgText} adjustsFontSizeToFit >Your local do not have local registered yet, but you are able to add products by clicking create button </Text>
                <View style={styles.btnView}>
                    <TouchableOpacity style={styles.btn}
                        onPress={() => navigation.navigate("LocalCreatorView")}
                    >
                        <Text style={styles.btnText}>Create new product</Text>
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