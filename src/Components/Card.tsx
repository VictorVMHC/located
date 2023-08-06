import React from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View, Image } from 'react-native';
import { default as FontAwesome } from 'react-native-vector-icons/FontAwesome5';
import { default as IonIcon } from 'react-native-vector-icons/Ionicons';
import { Colors, FontStyles } from '../Themes/Styles';
import { useHeartHook } from '../Hooks/useHeartHook';
import { Local, Schedule } from '../Interfaces/DbInterfaces';
import { useTranslation } from 'react-i18next';

interface Props{
    cardWidth?: number,
    cardHeight?: number,
    like: boolean,
    local: Local, 
    routeToStore?: () => void 
}



export const Card = ({  cardWidth = 0, cardHeight= 5, like = false, local, routeToStore: routeToStore}: Props) => {
    const {t} = useTranslation();
    const { width, height} = useWindowDimensions();
    const {isActive, check} = useHeartHook(like);
    const {name, address: address, uriImage, isVerify, schedules, rate, quantityRate, tags, description} = local;

    return (
    <View style={styles.container} key={local.id} >
        <TouchableOpacity style={{width: width - (width/15) + cardWidth, height: height - (height/1.8) + cardHeight , ...styles.touchableCard}}
            onPress={routeToStore}
        >
            <View style={{flex:4}}>                
                <ImageBackground 
                    source={{ uri: uriImage }} 
                    style={styles.imageBackground} 
                    resizeMode='cover'
                    borderTopRightRadius={20} 
                    borderTopLeftRadius={20}
                >
                    <View style={styles.ratingTag}>
                        <Text style={FontStyles.Information} adjustsFontSizeToFit>{rate}</Text>
                        <IonIcon name='star' size={15} color={Colors.Yellow} style={{marginHorizontal:2}}/>
                        <Text style={FontStyles.Information} adjustsFontSizeToFit >({quantityRate})</Text>
                    </View>
                    <TouchableOpacity style={styles.heartBtn}
                            onPress={() => {check()} }
                    >
                        {!isActive 
                            ? <IonIcon name='heart-outline' size={35} color={Colors.black} />
                            : <IonIcon name='heart' size={35} color={Colors.red} />
                        }
                    </TouchableOpacity>
                </ImageBackground>        
            </View>
            <View style={styles.bodyCard}>
                <View style={styles.bodyCardHeader}>
                    <View style={styles.titleSection}>
                        <Text style={FontStyles.Title} adjustsFontSizeToFit>{name}{' '}
                            {isVerify && <FontAwesome name={'check-circle'} size={25} color={Colors.blueAqua} />}
                        </Text>
                    </View>
                    <View style={styles.locationStyles}>
                        <FontAwesome name={'map-marked-alt'} size={20} color={Colors.blueAqua} style={{marginHorizontal: 5}} />
                        <Text style={FontStyles.SubTitles} adjustsFontSizeToFit>{address}</Text>
                    </View>
                    <View style={styles.middleSection}>
                        <View style={{flex: 5}}>
                            <View style={{flex: 3}}>
                                <Text style={FontStyles.Title} adjustsFontSizeToFit >{t('DescriptionText')}</Text>
                            </View>
                            <View style={{flex: 8}}>
                                <Text style={FontStyles.Text} adjustsFontSizeToFit>{description}</Text>
                            </View>
                        </View>
                        <View style={{ flex: 5,  justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={FontStyles.SubTitles}>
                                <IonIcon name={'calendar-outline'} size={20} color={Colors.blueAqua} />  {t('ScheduleTitle')}
                            </Text>
                            {schedules.map(({ day1, day2, open, close }: Schedule, index) => (
                                <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{ flex: 5 }}>
                                        <View style={styles.internalDayView}>
                                            <Text style={styles.textSchedule} adjustsFontSizeToFit>{day1}{' '}</Text>
                                            {day2 && <Text style={styles.textSchedule} adjustsFontSizeToFit >-{' '}{day2}{' '}</Text>}
                                        </View>
                                    </View>
                                    <View style={styles.viewHour}>
                                        <Text style={styles.textSchedule} adjustsFontSizeToFit>
                                            <IonIcon name={'time-outline'} size={10} color={Colors.blueAqua} />
                                            {' '}
                                            {open}{' '}-{' '}{close}
                                        </Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>
                <View style={{ flex: 2, flexDirection: 'row', paddingHorizontal: 10, justifyContent: 'flex-start', marginBottom: 10 }}>
                    {tags && tags.map((item, index) => (
                        <View key={index} style={styles.tagStyle}>
                        <Text style={styles.textTag}>{item}</Text>
                        </View>
                    ))}
                </View>
            </View> 
        </TouchableOpacity>
    </View>
    )
}

const styles = StyleSheet.create({
    container:{
        marginVertical: 5,
    },
    touchableCard:{
        alignSelf: 'center', 
        borderColor: 'black', 
        borderWidth: 1,
        borderRadius: 20, 
        shadowColor: Colors.black,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 50,  
    },
    imageBackground:{   
        flex: 1,
    },
    ratingTag: {
        flexDirection: 'row',
        position: 'absolute', 
        backgroundColor: 'white', 
        borderRadius: 20, 
        width: 90, 
        height:25, 
        left: 10, 
        top:15, 
        alignItems: 'center', 
        justifyContent: 'center',
    },
    heartBtn:{
        backgroundColor:Colors.whiteOpacity,
        width: 40, 
        height: 40, 
        borderRadius: 100, 
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
        top: 10,
        right: 10,
    },
    bodyCard:{
        flex:6,
        backgroundColor: 'white', 
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20, 
        borderTopColor: Colors.blueText, 
        borderTopWidth:1
    },
    bodyCardHeader:{
        margin: 10, 
        flex: 6
    },
    titleSection:{
        flexDirection: 'row', 
        marginHorizontal: 5, 
        flex: 2,
        alignContent: 'center',
        alignItems: 'center',
    },
    locationStyles:{
        flexDirection: 'row', 
        margin: 2, 
        flex: 2,
        alignItems: 'center',
    },
    middleSection:{
        flexDirection: 'row', 
        margin: 2, 
        flex: 6,
        alignItems: 'center',
    },
    iconCalendarStyles:{
        flex: 1.5,  
    },
    textSchedule: {
        fontFamily: 'Outfit-SemiBold', 
        color: Colors.blueText
    },
    viewHour: {
        alignSelf: 'flex-start',
        flex: 5
    },
    viewDay: {
        alignSelf: 'flex-start',
        flex: 5
    },
    internalDayView: {
        alignSelf: 'flex-end', 
        flexDirection: 'row'
    },
    tagStyle: {
        backgroundColor: '#F6F6F6',
        borderRadius: 5,
        marginRight: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        lineHeight: 20,
    },
    textTag: {
        ...FontStyles.Information,
        fontSize: 16,
        textAlign: 'center',
    },
});