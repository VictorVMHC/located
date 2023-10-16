import React, { useRef, useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { default as IonIcon } from 'react-native-vector-icons/Ionicons';
import { useHeartHook } from '../Hooks/useHeartHook';
import { Colors } from '../Themes/Styles';
import { DescriptionBox } from './DescriptionBox';
import { deleteProduct } from '../Api/productsApi';
import { CustomAlert } from './CustomAlert';
import { useTranslation } from 'react-i18next';

const windowWidth = Dimensions.get('window').width;
interface Props {
    ProductName: string,
    Price: string,
    Img: string,
    children ?: any,
    Description ?: string,
    like?: boolean,
    buttonIcon?: () => void,
    Action: () => void,
    showLike: boolean,
    flagEdit?: boolean,
    setRefreshedList?: (newValue: boolean) => void,
    productId?: string
}

export const CardCatalogue = ({ ProductName = '', Price = '', Img = '', Description = '',Action, children, like = false, showLike, flagEdit = false, productId, setRefreshedList }: Props) => {
    const {width, height} = useWindowDimensions();
    const [expanded, setExpanded] = useState(false);
    const {isActive, check} = useHeartHook(like);
    const viewRef = useRef(null);
    const { t } = useTranslation();

    const toggle = () => {
        if(Description != ''){
            setExpanded(!expanded );
        }
    }

    const deleteProducts = async (id: string) => {
        const product = await deleteProduct(id);
        setRefreshedList(true)
        if(product.status === 200){
            CustomAlert({
                title: t('UserPasswordUpdatedTitle'),
                desc: t('UserPasswordUpdated'),
            })
        }
    }

    return (
    <View style={styles.ContainerCard}>
         <TouchableOpacity ref={viewRef} activeOpacity={1} onPress={toggle} style={{...styles.ChartCard, borderTopStartRadius: expanded ? 15 : 15, borderTopEndRadius: expanded ? 15 : 15, borderBottomEndRadius: expanded ? 0 : 15, borderBottomStartRadius: expanded ? 0 : 15 ,borderBottomWidth: expanded ? 0 : 1, width: width - (width * 0.1), height: height - (height * 0.82)}} >
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
            {showLike && <TouchableOpacity style={styles.heartBtn}
                onPress={() => {check()} }
            >
                {!isActive 
                    ? <IonIcon name='heart-outline' size={35} color={Colors.black} />
                    : <IonIcon name='heart' size={35} color={Colors.red} />
                }
            </TouchableOpacity>}
            <View style={styles.ChartQualification}>
            <Icon name='star' size={20} color="#FF5C28" solid/>
            </View>
            {!flagEdit
                ?<View></View>
                :<View>
                    <TouchableOpacity onPress={()=>{Action();}}>
                        <Icon name='edit' size={33} color={Colors.black} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginTop: windowWidth*0.03}} onPress={()=>{deleteProducts(productId || '');}}>
                        <Icon name='trash-alt' size={33} color={Colors.red} />
                    </TouchableOpacity>
                </View>
            }
        </TouchableOpacity>
        {
            expanded &&
                <DescriptionBox
                    Description= {Description} 
                />
        }      
    </View>
)
}

const styles = StyleSheet.create({
    ContainerCard:{
        justifyContent: 'center',
        marginBottom: 20,
        
    }, 
    ChartCard:{
        flexDirection: 'row',
        borderWidth: 0.5,
        padding: 10, 
        backgroundColor: 'white',
        shadowColor: "#000000",
        shadowOffset: {
        width: 0,
        height: 8,
        },
        shadowOpacity:  0.21,
        shadowRadius: 8.19,
        elevation: 11
        
    },
    ChartImg:{
        flex: 3,
    },
    boxText:{
        flex:1,
        justifyContent: 'center',
        paddingLeft: 10
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
    chartlike:{
        width: 35,
        height:35,
        backgroundColor: 'white',
        position: 'absolute',
        top: 4,
        right: 10,
        borderRadius: 15,
        borderColor: '#D9D9D9',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
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
        color: 'black'
    }
});