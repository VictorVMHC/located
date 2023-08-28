import React from 'react'
import { View, StyleSheet, Image, Dimensions, Text, Pressable, TouchableHighlight, Platform } from 'react-native';
import { Circles } from '../Components/Circles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Colors } from '../Themes/Styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

const windowWidth = Dimensions.get('window').width;

export const EditProfileView = () => {
    return (
        <View style={StyleEditProfile.container}>
            <Circles
                position='top'
                quantity={2}
            />
            <View style={StyleEditProfile.topContainer}>
                <View style={StyleEditProfile.containerImgEdit}>
                    <View style={StyleEditProfile.containerImg}>
                        <Image
                            style={StyleEditProfile.img}
                            source={require('../Assets/Images/Lisa.png')}
                        />
                    </View>
                        <TouchableHighlight  style={StyleEditProfile.containerEditIcon} underlayColor="lightgray" onPress={()=>console.log('hola')}>
                            <Icon name='pen' size={20} color="black" light/>
                        </TouchableHighlight>
                </View>
                <Text style={StyleEditProfile.textNameUser}>Jose Perez</Text>
                <Text style={StyleEditProfile.textEmailUser}>jose_perez12@gmail.com</Text>
            </View>
            <View style={StyleEditProfile.bottomContainer}>
                <View style={StyleEditProfile.buttonsContainer}>
                    <TouchableHighlight style={StyleEditProfile.button} underlayColor="lightgray" onPress={()=>console.log('hola')}>
                        <View style={{flexDirection: 'row',}}>
                            <Icon name='id-card' size={25} color="black" light/>
                            <Text style={StyleEditProfile.textButton}>Edit profile information</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight style={StyleEditProfile.button} underlayColor="lightgray" onPress={()=>console.log('hola')}>
                        <View style={{flexDirection: 'row',}}>
                            <Icon name='bell' size={25} color="black" light/>
                            <Text style={StyleEditProfile.textButton}>Notifications</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <View style={StyleEditProfile.buttonsContainer}>
                    <TouchableHighlight style={StyleEditProfile.button} underlayColor="lightgray" onPress={()=>console.log('hola')}>
                        <View style={{flexDirection: 'row',}}>
                            <Icon name='edit' size={25} color="black" light/>
                            <Text style={StyleEditProfile.textButton}>Edit Local</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <View style={StyleEditProfile.buttonsContainer}>
                    <TouchableHighlight style={StyleEditProfile.button} underlayColor="lightgray" onPress={()=>console.log('hola')}>
                        <View style={{flexDirection: 'row',}}>
                            <Icon name='shield-alt' size={25} color="black" light/>
                            <Text style={StyleEditProfile.textButton}>Security</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight style={StyleEditProfile.button} underlayColor="lightgray" onPress={()=>console.log('hola')}>
                        <View style={{flexDirection: 'row',}}>
                            <Icon name='user-secret' size={25} color="black" light/>
                            <Text style={StyleEditProfile.textButton}>Privacy policy</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight style={StyleEditProfile.button} underlayColor="lightgray" onPress={()=>console.log('hola')}>
                        <View style={{flexDirection: 'row',}}>
                            <Icon name='question-circle' size={25} color="black" light/>
                            <Text style={StyleEditProfile.textButton}>Comments and replys</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <View style={StyleEditProfile.buttonsContainer}>
                    <TouchableHighlight style={StyleEditProfile.button} underlayColor="lightgray" onPress={()=>console.log('hola')}>
                        <View style={{flexDirection: 'row',}}>
                            <Icon name='sign-out-alt' size={25} color="black" light/>
                            <Text style={StyleEditProfile.textButton}>Delete profile</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        </View>
    )
}

const StyleEditProfile = StyleSheet.create({
    container:{
        flex: 1
    },
    topContainer:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomContainer:{
        flex:1.7,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    containerImgEdit:{
        width: windowWidth * 0.33, 
        height: windowWidth * 0.33,
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerEditIcon:{
        width: windowWidth * 0.12,
        height: windowWidth * 0.12,
        borderRadius: windowWidth * 0.12 / 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.94)',
        position: 'absolute',
        alignSelf: 'flex-end',
        bottom: windowWidth * 0.01,
        right: windowWidth * 0.01,
        
    },
    containerImg:{
        width: windowWidth * 0.32, 
        height: windowWidth * 0.32,
        borderRadius: (windowWidth * 0.4) / 2, 
        overflow: 'hidden', 
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightgray',
    },
    img:{
        flex: 1,
        resizeMode: 'contain'
    },
    textNameUser:{
        fontFamily:'Outfit.SemiBold',
        fontSize: 30,
        color: Colors.black,
        fontWeight: 'bold'
    },
    textEmailUser:{
        fontFamily:'Outfit.SemiBold',
        fontSize: 20,
        color: Colors.black,
        fontWeight: '600'
    },
    buttonsContainer:{
        width: windowWidth * 0.88, 
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 0.3,
        borderRadius: 10,
        elevation: 3,
    },
    button:{
        width: '100%',
        height: windowWidth * 0.12,
        justifyContent: 'center',
        paddingHorizontal: '6%'
        
    },
    textButton:{
        fontFamily: 'Outfit.SemiBold',
        fontSize: 20,
        color: 'black',
        marginHorizontal: '4%'
    }
});
