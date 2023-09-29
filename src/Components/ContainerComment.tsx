import React, { useRef, useState } from 'react'
import { Image, Text, View, StyleSheet, TextInput, Button} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Colors } from '../Themes/Styles';
import { useTranslation } from 'react-i18next';

interface Props{
    idUser: number,
    ImgUser: string,
    NameUser: string,
    Comment: string,
    likes?: boolean,
    dislikes?: boolean,
    score?: string,
    reply?: boolean,
    blocking?: boolean,
    answers?: boolean,
    NumberOfComments?: Number,
    onCallback:  (value: number ) => void;
}


export const ContainerComment = ({idUser, ImgUser, NameUser, Comment, score,onCallback ,likes ,dislikes,reply,blocking,answers}:Props) => {
    const [expanded, setExpanded] = useState(false);
    const [expandedComments, setExpandedComments] = useState(false);
    const { t} = useTranslation();
    const [inputValue, setInputValue] = useState(0);
    const [like, setLike] = useState(likes);
    const [dislike, setDislike] = useState(dislikes);


    const handleSendValue = (idUser: number) => {
        setInputValue(idUser);
        onCallback(inputValue);
    };

    const toggleExpandedComments = () => {
        setExpandedComments(!expandedComments );
    }

    const checkLike =() =>{
        if(like || dislike)
        {
            setLike(false)
        }else{
            setLike(true)
        }
    }

    const checkdislike =() =>{
        if(dislike || like)
        {
            setDislike(false)
        } else {
            setDislike(true)
        }
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
                    <TouchableOpacity onPress={()=>{checkLike()}}>
                    {!like 
                        ? <Icon name='thumbs-up' size={20} color={Colors.black}/>
                        :  <Icon name='thumbs-up' size={20} color={Colors.Yellow}/>
                    }
                    </TouchableOpacity>
                    <Text>{score}</Text>
                    <TouchableOpacity style={{marginLeft: 15}}  onPress={()=>{checkdislike()}} >
                    {!dislike 
                        ? <Icon name='thumbs-down' size={20} color={Colors.black}/>
                        :   <Icon name='thumbs-down' size={20} color={Colors.Yellow} />
                    }
                    </TouchableOpacity>

                {
                    reply &&
                    <TouchableOpacity disabled={blocking} style={{marginLeft: 10}} onPress={()=>(handleSendValue(idUser))} >
                        <Text style={{color: Colors.black}}>{t('Reply')}</Text>
                    </TouchableOpacity>
                }
                {
                    answers &&
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity disabled={blocking} style={{ marginLeft: 10}}  onPress={toggleExpandedComments} >
                            <Text style={{color: Colors.black}}>{t('Answers')}</Text>
                        </TouchableOpacity>
                        <Icon style={{marginTop: 2, marginLeft: 2}} name='chevron-down' size={15} color='black' />
                    </View>

                }
            </View>
            {
            expanded &&
            <View style={{marginTop: 30}}>
                <Text></Text>
            </View>
            } 
            {
                expandedComments &&
                <View style={{backgroundColor: 'red'}}>
                    <Text>Comentarios</Text>
                </View>
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
        borderBottomWidth: 2, 
        borderBottomColor: Colors.Yellow,
        color: Colors.black
    },
    ContainerLikeAndDeslike:{
        flexDirection: 'row',
        marginHorizontal: 20,
        marginTop: 5
    }
});
