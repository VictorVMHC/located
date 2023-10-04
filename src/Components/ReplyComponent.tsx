import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Colors } from '../Themes/Styles';


interface Props {
    userImage: string,
    userName: string,
    reply: string,
    like: boolean,
    likes: number,
    label: string,    
}

export const ReplyComponent = ({userImage, userName, reply, like, likes, label}:Props) => {
    const { t } = useTranslation();
    const [liked, setLike] = useState(like);

    const isLiked = () => {
        setLike(!like);
    }

    return (
        <View style={styles.container} >
            <View
                style={{
                    ...styles.ContainerComment, 
                    borderBottomColor: label === 'neutral' 
                        ? Colors.Yellow 
                        : label === 'positive' 
                            ? Colors.greenSuccess 
                            : Colors.red
                }}
            >
                <View style={{...styles.ContainerImg}} >
                    <Image
                        resizeMode='cover'
                        style={styles.Img}
                        source={{uri: userImage}}
                    />
                </View>
                <View style={{width: '75%'}}>
                    <Text style={styles.Name}>{userName}</Text>
                    <View style={styles.ContainerText}>
                        <Text style={styles.TextComment}>{reply}</Text>
                    </View>
                </View>
                <View style={{width: '10%', alignItems: 'center', justifyContent: 'center'}} >
                    <TouchableOpacity onPress={()=> isLiked }>
                        <Icon name='thumbs-up' size={20} color={!liked ? Colors.black : Colors.Yellow} />                    
                    </TouchableOpacity>
                    <Text style={{color: 'black'}}>{likes}</Text>
                </View>
            </View>
            <TouchableOpacity 
                style={{margin: 5, alignSelf: 'flex-end' }} 
                onPress={()=> console.log('hola')} 
            >
                <Text style={{color: Colors.black}}>{t('Reply')} to {userName}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    ContainerComment:{
        width: '100%', 
        paddingBottom: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        borderBottomWidth: 2, 
    },
    ContainerImg:{
        width: '15%',
        height: 60,
        alignItems: 'center'
    },
    Img:{
        width: '100%',
        height: '100%',
        resizeMode:'contain',
        aspectRatio: 1,
        borderRadius: 50,
        
    },
    Name:{
        fontFamily: 'Outfit-SemiBold',
        fontSize: 20,
        textAlignVertical: 'center',
        marginLeft: 10,
        color: Colors.black
    },
    ContainerText:{
        paddingLeft: 10,
    },
    TextComment:{
        fontSize: 16,
        color: Colors.black
    },
});