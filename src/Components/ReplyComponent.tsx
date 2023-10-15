import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Colors } from '../Themes/Styles';
import { Reply } from '../Interfaces/CommentsInterfaces';
import { deleteLikeReply, likeReply } from '../Api/likeReplyApi';
import { CustomAlert } from './CustomAlert';



interface Props {
    reply: Reply,  
}

export const ReplyComponent = ({reply}:Props) => {
    const { t } = useTranslation();
    const {userRepliedId, replied, userId, likes, liked, label, _id} = reply;

    const [like, setLike] = useState(liked);
    const [likeCountState, setLikeCountState ] = useState(likes);
    const [ likeable, setLikeable ] = useState(true);

    const checkLike = () => {
    
        if(likeable === false){
            return;
        }

        if (!like) {
            setLikeable(false);
            likeReply(_id)
            .then(() => {
                setLikeCountState(likeCountState + 1);
                setLike(true);
                setTimeout(() => {
                    setLikeable(true);
                }, 5000); 
            })
            .catch(() => {
                CustomAlert({
                    title: 'Error',
                    desc: 'Was not possible to un like the comment'
                })
            });

        } else {
            deleteLikeReply(_id)
            .then(() => {
                setLikeCountState(likeCountState - 1);
                setLike(false);
            })
            .catch(() => {
                CustomAlert({
                    title: 'Error',
                    desc: 'Was not possible to like the comment'
                })
            });
        }
    };

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
                        source={{uri: userId.image}}
                    />
                </View>
                <View style={{width: '75%', justifyContent: 'center',  alignContent: 'center'}}>
                    <View style={{flexDirection: 'row', width: '100%'}}>
                        <Text style={styles.Name} ellipsizeMode='middle' adjustsFontSizeToFit >{(userId.name.length / 2 < 10 ? userId.name : userId.name.substring(0,userId.name.length / 2 ) + '...' )} <Icon name='chevron-right' light color={'red'}/> {(userRepliedId.name.length / 2 < 10 ? userRepliedId.name : userRepliedId.name.substring(0,userRepliedId.name.length / 2) + '...' )} </Text>
                    </View>
                    <View style={styles.ContainerText}>
                        <Text style={styles.TextComment}>{replied}</Text>
                    </View>
                </View>
                <View style={{width: '10%', alignItems: 'center', justifyContent: 'center'}} >
                    <TouchableOpacity onPress={() => checkLike }>
                        <Icon name='thumbs-up' size={20} color={!liked ? Colors.black : Colors.Yellow} />                    
                    </TouchableOpacity>
                    <Text style={{color: 'black'}}>{likes}</Text>
                </View>
            </View>
            <TouchableOpacity 
                style={{margin: 5, alignSelf: 'flex-end' }} 
                onPress={()=> console.log('hola')} 
            >
                <Text style={{color: Colors.black}}>{t('Reply')} to {(userId.name.length / 2 < 15 ? userId.name : userId.name.substring(0,userId.name.length / 2) + '...' )}</Text>
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