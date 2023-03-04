import React from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { default as FontAwsome } from 'react-native-vector-icons/FontAwesome5';
import { default as IonIcon } from 'react-native-vector-icons/Ionicons';
import { Colors, FontStyles } from '../Themes/Styles';
import { useHeartHook } from '../Hooks/useHeartHook';


export const Card = () => {
    const { width, height} = useWindowDimensions();
    const {isActive, check} = useHeartHook();

    return (
    <View style={styles.container}>
        <TouchableOpacity style={{width: width - (width/15), height: height - (height/1.8) , ...styles.tochableCard}}
            onPress={() => console.log('tochable card')}
        >
            <View style={{flex:4}}>                
                <ImageBackground 
                    source={{uri:"https://i.blogs.es/87930e/comidas-ricas/840_560.jpg"}} 
                    style={styles.imageBackground} 
                    resizeMode='cover' 
                    borderTopRightRadius={20} 
                    borderTopLeftRadius={20}
                >
                    <View style={styles.ratingTag}>
                        <Text>4.5</Text>
                        <Text> * </Text>
                        <Text>(999+)</Text>
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
                        <Text style={styles.titleStyle}>Taco House </Text>
                        <FontAwsome name={'check-circle'} size={17} color={Colors.blueAqua}  />
                    </View>
                    <View style={styles.locationStyles}>
                        <FontAwsome name={'map-marked-alt'} size={20} color={Colors.blueAqua} style={{marginHorizontal: 5}} />
                        <Text style={styles.textLocation}>Río reforma #1720</Text>
                    </View>
                    <View style={styles.calendarStyles}>
                        <View style={styles.iconCalendarStyles}>
                            <IonIcon name={'calendar-outline'} size={50} color={Colors.blueAqua} />
                        </View>
                        <View style={{ flex: 8}}>
                            <Text style={styles.textSchedule}>Lunes-jueves: 11:00-15:00 </Text>
                            <Text style={styles.textSchedule}>viernes-sabado: 11:00-5:00  </Text>
                            <Text style={styles.textSchedule}>domingo: cerrado</Text>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 1.5, flexDirection: 'row', paddingHorizontal: 10, justifyContent:'flex-start', marginBottom: 10}}>
                    <View  style={styles.tagStyle} >
                        <Text style={styles.textTag} >Mexicana</Text>
                    </View>
                    <View style={styles.tagStyle} >
                        <Text style={styles.textTag}>Fonda</Text>
                    </View>
                    <View style={styles.tagStyle} >
                        <Text style={styles.textTag}>Antojito</Text>
                    </View>
                </View> 
            </View> 
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        marginVertical: 10,
        padding: 10, 
    },
    tochableCard:{
        alignSelf: 'center', 
        margin:10,
        borderColor: 'black', 
        borderWidth: 1,
        borderRadius: 20, 
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 50,  
    },
    imageBackground:{   
        width:'100%',  
        height:'100%', 
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