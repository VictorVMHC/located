import React, { useState } from 'react'
import { Image, Text, View, StyleSheet, useWindowDimensions } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Colors } from '../Themes/Styles';
import { DescriptionBox } from './DescriptionBox';
import { SendComment } from './SendComment';

interface Props{
    ImgUser: string,
    NameUser: string,
    Comment: string,
    score?: string,
    NumberOfComments?: Number
}


export const ContainerComment = ({ImgUser, NameUser, Comment, score,NumberOfComments}:Props) => {
    const [expanded, setExpanded] = useState(false);

    const toggle = () => {
        if(NumberOfComments  != 0){
            setExpanded(!expanded );
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
                <TouchableOpacity>
                    <Icon name='thumbs-up' size={20} color={Colors.Yellow} />
                </TouchableOpacity>
                    <Text>{score}</Text>
                <TouchableOpacity style={{marginLeft: 15}} >
                    <Icon name='thumbs-down' size={20} color={Colors.Yellow} />
                </TouchableOpacity>
                <TouchableOpacity style={{marginLeft: 10}} onPress={toggle} >
                    <Text>Responder</Text>
                </TouchableOpacity>
            </View>
            {
            expanded &&
            <View style={{marginTop: 30}}>
                <SendComment/>
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
    },
    ConteinerText:{
        marginHorizontal: 18,
        marginTop: 10,
    },
    TextComment:{
        fontSize: 16,
        borderBottomWidth: 1, 
        borderBottomColor: '#C1C1C1',
    },
    ContainerLikeAndDeslike:{
        flexDirection: 'row',
        marginHorizontal: 20,
        marginTop: 5

    }
    
});
