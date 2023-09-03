import React, { useContext, useEffect, useState } from 'react'
import { View, StyleSheet, Image, Dimensions, Text, TouchableHighlight, Alert } from 'react-native';
import { Circles } from '../Components/Circles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Colors } from '../Themes/Styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthContext } from '../Context/AuthContext';
import { deleteUser } from '../Api/userApi';
import { CustomAlert } from '../Components/CustomAlert';
import { useTranslation } from 'react-i18next';

interface Props extends NativeStackScreenProps<any, any>{};

const windowWidth = Dimensions.get('window').width;

export const EditProfileView = ({navigation}: Props) => {
    const contextoAutenticacion = useContext(AuthContext);
    const [url, setUrl] = useState('');
    const { t } = useTranslation();

    const { user, logOut } = contextoAutenticacion;

    useEffect(() => {
        if (user?.image) {
            setUrl(user.image);
        }
    });

    const deleteProfile = () => {
        Alert.alert(
            `${t('confirmDelete')}`,
            `${t('description')}`,
            [
                {
                    text: `${t('Cancel')}`,
                    onPress:() => console.log('Cancelado'),
                    style: 'cancel',
                },
                {
                    text:  `${t('Accept')}`,
                    onPress: () => {deleteUser(user?.email || ''), logOut();},
                },
            ],
            {cancelable: false}
        );
    };

    return (
        <View style={StyleEditProfile.container}>
            <Circles
                position='top'
                quantity={2}
            />
            <View style={StyleEditProfile.topContainer}>
                <View style={StyleEditProfile.containerImgEdit}>
                    <Image
                        style={StyleEditProfile.img}
                            source={ user?.image ?{ uri: user.image }: require('../Assets/Images/Img_User.png')}
                        />
                </View>
                <Text style={StyleEditProfile.textNameUser}>{user?.username}</Text>
                <Text style={StyleEditProfile.textEmailUser}>{user?.email}</Text>
            </View>
            <View style={StyleEditProfile.bottomContainer}>
                <View style={StyleEditProfile.buttonsContainer}>
                    <TouchableHighlight style={StyleEditProfile.button} underlayColor="lightgray" onPress={() => navigation.navigate("EditUserView")}>
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
                    <TouchableHighlight style={StyleEditProfile.button} underlayColor="lightgray" 
                    onPress={deleteProfile}>
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
        alignItems: 'center',
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
        alignItems: 'center', 
        backgroundColor: 'lightgray',
        borderRadius: windowWidth/2
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
    img:{
        width: '100%', 
        height: '100%', 
        resizeMode: 'contain',
        borderRadius: windowWidth/2
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
