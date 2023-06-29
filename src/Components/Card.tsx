import React from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View, Image } from 'react-native';
import { default as FontAwsome } from 'react-native-vector-icons/FontAwesome5';
import { default as IonIcon } from 'react-native-vector-icons/Ionicons';
import { Colors, FontStyles } from '../Themes/Styles';
import { useHeartHook } from '../Hooks/useHeartHook';
import { Local, Schedule } from '../Interfaces/DbInterfaces';

interface Props{
    cardWidth?: number,
    cardHeight?: number,
    like: boolean,
    local: Local, 
    rutStore?: () => void 
}



export const Card = ({  cardWidth = 0, cardHeight= 5, like = false, local,rutStore}: Props) => {
    const { width, height} = useWindowDimensions();
    const {isActive, check} = useHeartHook(like);
    const {name, adress, uriImage, isVerify, schedules, rate, quantityRate, tags} = local;

    return (
    <View style={styles.container} key={local.id} >
        <TouchableOpacity style={{width: width - (width/15) + cardWidth, height: height - (height/1.8) + cardHeight , ...styles.tochableCard}}
            onPress={rutStore}
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
                        <Text>{rate}</Text>
                        <IonIcon name='star' size={15} color={Colors.Yellow} style={{marginHorizontal:2}}/>
                        <Text>({quantityRate})</Text>
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
                        <Text style={styles.titleStyle}>{name}</Text>
                        {isVerify && <FontAwsome name={'check-circle'} size={17} color={Colors.blueAqua}/>}
                    </View>
                    <View style={styles.locationStyles}>
                        <FontAwsome name={'map-marked-alt'} size={20} color={Colors.blueAqua} style={{marginHorizontal: 5}} />
                        <Text style={styles.textLocation}>{adress}</Text>
                    </View>
                    <View style={styles.calendarStyles}>
                        <View style={styles.iconCalendarStyles}>
                            <IonIcon name={'calendar-outline'} size={50} color={Colors.blueAqua} />
                        </View>
                        <View style={{ flex: 8, alignContent: 'center', justifyContent: 'center'}}>
                            {schedules.map( ({ day1, day2, open, close }: Schedule, index) => 
                                <Text key={index} style={styles.textSchedule}>{day1}{day2 && `- ${day2}`}: {open}-{close}</Text>) 
                            }
                        </View>
                    </View>
                </View>
                <View style={{ flex: 1.5, flexDirection: 'row', paddingHorizontal: 10, justifyContent:'flex-start', marginBottom: 10}}>
                    {tags && tags.map((item, index) => 
                            <View  key={index} style={styles.tagStyle} >
                                <Text  style={styles.textTag} >{item}</Text>
                            </View>
                        )
                    }
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
    tochableCard:{
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
        backgroundColor:Colors.whiteOpcaity,
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
        flex:6,backgroundColor: 'white', 
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
        flex: 2
    },
    titleStyle:{
        ...FontStyles.Title,
        fontSize: 20,
        top: -5,
        marginRight: 7,
        color: Colors.black
    },
    locationStyles:{
        flexDirection: 'row', 
        margin: 2, 
        flex: 2
    },
    textLocation:{ 
        marginHorizontal: 2, 
        width: '100%', 
        height: 20,
        ...FontStyles.SubTitles,
        fontSize: 17,
    },
    calendarStyles:{
        flexDirection: 'row', 
        margin: 2, 
        flex: 4
    },
    iconCalendarStyles:{
        flex: 2,  
        justifyContent: 'flex-start', 
        alignItems: 'flex-start'
    },
    textSchedule:{
        marginHorizontal: 2, 
        width: '100%', 
        height: 20
    },
    tagStyle: {
        backgroundColor: '#F6F6F6',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginHorizontal: 5
    },
    textTag:{
        ...FontStyles.Information,
    }
});