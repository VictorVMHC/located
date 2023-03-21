import React from 'react'
import { View, StyleSheet, useWindowDimensions, Image, TouchableOpacity, Text } from 'react-native';
import { useHeartHook } from '../Hooks/useHeartHook';
import { Colors, Styles } from '../Themes/Styles';
import { default as IonIcon } from 'react-native-vector-icons/Ionicons';

interface Props{
    Img: string,
    Name: string,
    giro: string,
    like: boolean,
}

export const CardCloseToMe = ({Img = '', Name = '', giro = '', like = false }:Props) => {
    const {width, height} = useWindowDimensions();
    const {isActive, check} = useHeartHook(like);
    return (

   <TouchableOpacity style={{...styles.chart, width: width - (width * 0.53), height: height - (height * 0.70)}}>
    <View style={styles.ChartImg}>
        <Image 
        style ={styles.imgen}
        source={{uri: Img}} 
        />

    </View>
    <View style={styles.ChartText}>
        <Text numberOfLines={3} style={styles.textName}>{Name}</Text>
        <Text numberOfLines={2} style={styles.textgiro}>{giro}</Text>
    </View>
    <TouchableOpacity style={styles.heartBtn}
                            onPress={() => {check()} }
                    >
                        {!isActive 
                            ? <IonIcon name='heart-outline' size={25} color={Colors.black} />
                            : <IonIcon name='heart' size={25} color={Colors.red} />
                        }
                </TouchableOpacity>
    
    </TouchableOpacity>
        

    )
}

const styles = StyleSheet.create({
    chart:{
        borderRadius: 20,
        marginBottom: 2,

    },
    ChartImg:{
        flex:6,
        borderRadius: 20,
        marginBottom: 1,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
	    width: 0,
	    height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,

        
    },
    ChartText:{
        flex:4,
        alignItems: 'center',
        paddingHorizontal: 2,

    },
    imgen:{
        width: '95%',
        height: '95%',
        resizeMode:'contain',
        borderRadius: 20,
       
    },
    chartTextName:{
        overflow: 'hidden', 
        flex: 3

    },
    textName:{
        fontFamily: 'Outfit.Regular',
        fontSize: 20,
        textAlign: 'center',
        fontWeight: '900',
        color: 'black'
      
    },
    chartTextgiro:{
        overflow: 'hidden', 
        flex: 1

    },
    textgiro:{
        fontFamily: 'Outfit.Regular',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: '500'
    },
    heartBtn:{
        backgroundColor:Colors.gray,
        width: 30,
        height:30,
        position: 'absolute',
        top: 10,
        right: 10,
        borderRadius: 100, 
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,
    },
    ChartQualification:{
        width: 50,
        height: 30,
        position: 'absolute',
        bottom: 13,
        right: 10,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'flex-end',
    },
})
