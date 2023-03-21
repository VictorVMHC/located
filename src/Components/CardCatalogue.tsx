import React, { useState } from 'react'
import { View, StyleSheet, Text, Image, TouchableOpacity, useWindowDimensions, TouchableHighlight, TouchableNativeFeedback, Button } from 'react-native';
import { Styles, FontStyles, Colors } from '../Themes/Styles';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { default as IonIcon } from 'react-native-vector-icons/Ionicons';
import { DescriptionBox } from './DescriptionBox';
import { useHeartHook } from '../Hooks/useHeartHook';

interface Props {
    ProductName: string,
    Price: string,
    Img: string,
    punctuation: string,
    children ?: any,
    DescripcionB ?: string,
    like: boolean,
    action?: () => {},
}

export const CardCatalogue = ({ProductName = '', Price = '', Img = '', punctuation = '', DescripcionB  = '',action, children, like = false }: Props) => {
    const {width, height} = useWindowDimensions();
    const [expanded, setExpanded] = useState(false);
    const {isActive, check} = useHeartHook(like);

    const toggle = () => {
        if(DescripcionB == ''){
           
        }else{
            setExpanded(!expanded );

        }

    };

    
    return (
    <View style={styles.ContainerCard}>
        <TouchableOpacity activeOpacity={1} onPress={toggle} style={{...styles.ChartCard, borderRadius: expanded ? 0 : 15,borderBottomWidth: expanded ? 0 : 1, width: width - (width * 0.1), height: height - (height * 0.85)}} >
            <View style={styles.ChartImg}>
                <Image
                style={styles.CardImg}
                source={{uri: Img}}></Image>
            </View>
            <View style={styles.ChartText}>
                <View style={styles.boxText}>
                <Text style={styles.Text}>{ProductName}</Text>
                </View>
                <Text style={styles.price}> $ {Price} MX</Text>
            </View>
            <TouchableOpacity style={styles.heartBtn}
                            onPress={() => {check()} }
                    >
                        {!isActive 
                            ? <IonIcon name='heart-outline' size={35} color={Colors.black} />
                            : <IonIcon name='heart' size={35} color={Colors.red} />
                        }
                </TouchableOpacity>
            <View style={styles.ChartQualification}>
            <Icon name='star' size={20} color="#FF5C28" solid/>
            <Text style={styles.TestQualification}>{punctuation}</Text>
            </View>
        </TouchableOpacity>
            {expanded && <View style={styles.cardContent}>{
            <DescriptionBox 
            Descripcion = {DescripcionB} />
        }</View>}
    </View>
    )
}

const styles = StyleSheet.create({
    ContainerCard:{
        justifyContent: 'center',
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,
        borderColor: '796D6D',
        borderRadius: 15,
        borderWidth: 0.5,
    }, 
    ChartCard:{
        flexDirection: 'row',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '796D6D',
        borderTopEndRadius: 15,
        borderTopStartRadius: 15,
        borderWidth: 0.5,
        padding: 10,

    },
    ChartImg:{
        flex: 3,
        height: '100%',
    },
    CardImg:{
        width: '100%',
        height: '100%',
        resizeMode:'cover',
        borderRadius: 10
    },
    ChartText:{
        flex: 4,
        height: '100%',
        justifyContent: 'space-between',
    },
    boxText:{
        flex:1,
        justifyContent: 'center',
        paddingLeft: 10
    },
    Text:{
        fontFamily: 'Outfit.Regular', 
        fontSize: 22, 
        fontWeight: '900',
        color : 'black',
    },
    price:{
        fontFamily: 'Outfit.Regular', 
        fontSize: 20, 
        color: '#128807',
        bottom: -2,
        left:10
    },
    heartBtn:{
        backgroundColor:Colors.gray,
        width: 35,
        height:35,
        position: 'absolute',
        top: 4,
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
    TestQualification:{
        fontSize: 17,
        marginTop: 10,
        fontWeight: "900",
        color: 'black'
    },
    cardContent:{

    }
});