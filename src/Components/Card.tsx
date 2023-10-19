import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { default as FontAwesome } from 'react-native-vector-icons/FontAwesome5';
import { default as IonIcon } from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../Context/AuthContext';
import { useHeartHook } from '../Hooks/useHeartHook';
import { Local, Schedule } from '../Interfaces/DbInterfaces';
import { Colors, FontStyles } from '../Themes/Styles';

interface Props {
    cardWidth?: number,
    cardHeight?: number,
    like: boolean,
    navigation?: any,
    local: Local,
    updateLike: () => void,
}

export const Card = ({  cardWidth = 0, cardHeight= 5, navigation, local, updateLike}: Props) => {
    const {t} = useTranslation();
    const { width, height} = useWindowDimensions();
    const {_id, name, description, address, country, town, postalCode, schedules, tags, uriImage, localLikes, liked} = local;
    const [url, setUrl] = useState( );
    const {isActive, check} = useHeartHook(liked);
    const [valueLocalLikes, setValueLocalLikes] = useState(localLikes);
    const [isProcessingLike, setIsProcessingLike] = useState(false);

    const handleLikePress = async () => {
        if (!isProcessingLike) {
            setIsProcessingLike(true);
            await check( _id);
            updateLike();
            if (!isActive) {
                setValueLocalLikes(prevLikes => prevLikes + 1);
            } else {
                setValueLocalLikes(prevLikes => prevLikes - 1);
            }
            setIsProcessingLike(false);
        }
    };

    return (
    <View style={styles.container} >
        <TouchableOpacity style={{width: width - (width/15) + cardWidth, height: height - (height/1.8) + cardHeight , ...styles.touchableCard}}
            onPress={() => navigation.navigate('StoreView', { local })}
        >
            <View style={{flex:4}}>
                <ImageBackground 
                    source={{ uri: uriImage || 'https://www.creaxid.com.mx/blog/wp-content/uploads/2017/12/Local-Marketing.jpg' }}
                    style={styles.imageBackground} 
                    resizeMode='cover'
                    borderTopRightRadius={20} 
                    borderTopLeftRadius={20}
                >
                    <View style={styles.ratingTag}>
                        <Text style={FontStyles.Information} adjustsFontSizeToFit>{valueLocalLikes}</Text>
                        <IonIcon name='star' size={15} color={Colors.Yellow} style={{marginHorizontal:2}}/>
                    </View>
                    <TouchableOpacity 
                        style={styles.heartBtn}
                        onPress={handleLikePress}
                        disabled={isProcessingLike}
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
                            {/*{isVerify && <FontAwesome name={'check-circle'} size={25} color={Colors.blueAqua} />}*/}
                        </Text>
                    </View>
                    <View style={styles.locationStyles}>
                        <FontAwesome name={'map-marked-alt'} size={20} color={Colors.blueAqua} style={{marginHorizontal: 5}} />
                        <Text style={[FontStyles.SubTitles, {flexWrap: 'wrap', maxWidth: '90%'}]} adjustsFontSizeToFit numberOfLines={2}>{address + ',' + postalCode +',' + town + ',' + country }</Text>
                    </View>
                    <View style={styles.middleSection}>
                        <View style={{flex: 1}}>
                            <View style={{flex: 1, alignSelf: 'stretch'}}>
                                <Text style={FontStyles.SubTitles} adjustsFontSizeToFit >{t('DescriptionText')}</Text>
                            </View>
                            <View style={{flex: 2}}>
                                <Text style={FontStyles.Text} adjustsFontSizeToFit>{description}</Text>
                            </View>
                        </View>
                        <View style={{flex: 1,justifyContent: 'center', alignItems: 'center',}}>
                            <View style={{flex: 1, alignSelf: 'stretch'}}>
                                <Text style={[FontStyles.SubTitles, { textAlign: 'center' }]} adjustsFontSizeToFit >
                                    <IonIcon name={'calendar-outline'} size={20} color={Colors.blueAqua} />  {t('ScheduleTitle')}
                                </Text>
                            </View>
                            <View style={{flex: 2}}>
                                {schedules.map(({ day1, day2, open, close }: Schedule, index) => (
                                    <View key={index} style={{alignItems: 'flex-end'}}>
                                        <View>
                                            <View style={styles.internalDayView}>
                                                <Text style={{color: Colors.black}} adjustsFontSizeToFit>{day1}{' '}</Text>
                                                {day2 && <Text style={{color: Colors.black}} adjustsFontSizeToFit >-{' '}{day2}{' '}</Text>}
                                            </View>
                                        </View>
                                        <View>
                                            <Text style={{color: Colors.black}} adjustsFontSizeToFit>
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
        flex: 3,
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
    },
    viewDay: {
        alignSelf: 'flex-start',
        flex: 5
    },
    internalDayView: {
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