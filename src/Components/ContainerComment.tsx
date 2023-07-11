import React, { useState } from 'react'
import { Image, Text, View, StyleSheet, useWindowDimensions } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Colors } from '../Themes/Styles';
import { SendComment } from './SendComment';
import { ListComents } from './ListComents';
import { useTranslation } from 'react-i18next';

interface Props{
    ImgUser: string,
    NameUser: string,
    Comment: string,
    Likes?: boolean,
    dislike?: boolean,
    score?: string,
    reply?: boolean,
    answers?: boolean,
    NumberOfComments?: Number,
    ToggleVisibility?: () => void;
}


export const ContainerComment = ({ImgUser, NameUser, Comment, score,ToggleVisibility,Likes,dislike,reply,answers}:Props) => {
    const [expanded, setExpanded] = useState(false);
    const [expandedComments, setexpandedComments] = useState(false);
    const { t} = useTranslation();

    const toggle = () => {
            setExpanded(!expanded );
    }

    const toggleExpandedComments = () => {
        setexpandedComments(!expandedComments );
}

    return (
        <View style={[StyleContainerComment.Container]} >
            <View style={StyleContainerComment.ContainerImgAndName}>
                <View style={StyleContainerComment.ContainerImg}>
                    <Image
                    resizeMode='cover'
                    style={StyleContainerComment.Img}
                    source={{uri: ImgUser}}
                    ></Image>
                </View>
                <Text style={StyleContainerComment.Name}>{NameUser}</Text>
            </View>
            <ScrollView style={StyleContainerComment.ConteinerText}>
                <Text style={StyleContainerComment.TextComment}>{Comment}</Text>
            </ScrollView>
            <View style={StyleContainerComment.ContainerLikeAndDeslike}>
                {
                    Likes &&
                    <TouchableOpacity>
                        <Icon name='thumbs-up' size={20} color={Colors.Yellow} />
                    </TouchableOpacity>
                }
                    <Text>{score}</Text>

                {
                    dislike &&
                    <TouchableOpacity style={{marginLeft: 15}} >
                        <Icon name='thumbs-down' size={20} color={Colors.Yellow} />
                    </TouchableOpacity>

                }
                {
                    reply &&
                    <TouchableOpacity style={{marginLeft: 10}} onPress={toggle} >
                        <Text style={{color: Colors.black}}>{t('Reply')}</Text>
                    </TouchableOpacity>
                }
                {
                    answers &&
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity style={{ marginLeft: 10}}  onPress={toggleExpandedComments} >
                            <Text style={{color: Colors.black}}>{t('Answers')}</Text>
                        </TouchableOpacity>
                        <Icon style={{marginTop: 2, marginLeft: 2}} name='chevron-down' size={15} color='black' />
                    </View>

                }
            </View>
            {
            expanded &&
            <View style={{marginTop: 30}}>
                <SendComment/>
            </View>
            } 
            {
                expandedComments &&
                <ListComents/> 
            }  
        </View>
    )
}

const StyleContainerComment = StyleSheet.create({
    Container:{
        marginBottom: 30,
    },
    ContainerImgAndName:{
        flexDirection: 'row',
        marginTop: 10,
        marginLeft: 10
    },
    ContainerImg:{
        width: 60,
        height: 60,
    },
    Img:{
        width: '100%',
        height: '100%',
        resizeMode:'contain',
        borderRadius: 50,
        
    },
    Name:{
        fontFamily: 'Outfit-SemiBold',
        fontSize: 20,
        textAlignVertical: 'center',
        marginLeft: 10,
        color: Colors.black
    },
    ConteinerText:{
        marginHorizontal: 18,
        marginTop: 10,
    },
    TextComment:{
        fontSize: 16,
        borderBottomWidth: 1, 
        borderBottomColor: '#C1C1C1',
        color: Colors.black
    },
    ContainerLikeAndDeslike:{
        flexDirection: 'row',
        marginHorizontal: 20,
        marginTop: 5

    }
    
});
