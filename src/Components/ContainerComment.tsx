import React, { useRef, useState } from 'react'
import { Image, Text, View, StyleSheet, TextInput, Button, VirtualizedList} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Colors, Styles } from '../Themes/Styles';
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
    label: string,
    onCallback:  (value: number ) => void;
}

const firstPage = ["hola", "hola2", "hola3", "hola4", "hola5", "hola6","hola7", "hola8"]
const secondPage = ["secondHola", "secondHola2", "secondHola3", "secondHola4", "secondHola5", "secondHola6","secondHola7", "secondHola8"]


export const ContainerComment = ({idUser, ImgUser, NameUser, Comment, score,onCallback ,likes ,dislikes,reply,blocking,answers: replies, label}:Props) => {
    const [expandedReplies, setExpandedComments] = useState(false);
    const { t} = useTranslation();
    const [inputValue, setInputValue] = useState(0);
    const [like, setLike] = useState(likes);
    const [dislike, setDislike] = useState(dislikes);
    const [pages, setPages] = useState(firstPage);

    const handleLoadMore = () => {
        setPages([...pages, ...secondPage]);
    } 

    const handleSendValue = (idUser: number) => {
        setInputValue(idUser);
        onCallback(inputValue);
    };

    const toggleExpandedComments = () => {
        setExpandedComments(!expandedReplies );
    }

    const checkLike =() =>{
        if(like || dislike)
        {
            setLike(false)
        }else{
            setLike(true)
        }
    }

    function renderItem({ item }: any) {
        return <Text style={{ fontSize: 25, color: 'black' }}>hola{item}</Text>;
    }
    
    function keyExtractor(index: string) {
        return index.toString();
    }
    
    function getItemCount() {
        return pages.length; 
    }

    return (
        <View style={[styles.Container]} >
            <View style={{
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
                        source={{uri: ImgUser}}
                    />
                </View>
                <View style={{width: '75%'}}>
                    <Text style={styles.Name}>{NameUser}</Text>
                    <View style={styles.ContainerText}>
                        <Text style={styles.TextComment}>{Comment}</Text>
                    </View>
                </View>
                <View style={{width: '10%', alignItems: 'center', justifyContent: 'center'}} >
                    <TouchableOpacity onPress={()=>{checkLike()}}>
                        <Icon name='thumbs-up' size={20} color={!like ? Colors.black : Colors.Yellow} />                    
                    </TouchableOpacity>
                    <Text style={{color: 'black'}}>59</Text>
                </View>
            </View>
            <View style={styles.ContainerReplies}>
                <TouchableOpacity 
                    disabled={blocking} 
                    style={{margin: 5, alignSelf: 'flex-end' }} 
                    onPress={()=>(handleSendValue(idUser))} 
                >
                    <Text style={{color: Colors.black}}>{t('Reply')} to {NameUser}</Text>
                </TouchableOpacity>
                {
                    replies && !expandedReplies &&
                    <View style={{flexDirection: 'row', alignSelf: 'flex-end' }}>
                        <TouchableOpacity disabled={blocking} style={{ marginLeft: 10}}  onPress={toggleExpandedComments} >
                            <Text style={{color: Colors.black}}>Ses {replies} {t('Answers')}</Text>
                        </TouchableOpacity>
                        <Icon style={{marginTop: 2, marginLeft: 2}} name='chevron-down' size={15} color='black' />
                    </View>

                }
                {
                    expandedReplies &&
                    <>
                        <VirtualizedList
                            data={pages}
                            getItem={(pages, index) => pages[index]}
                            getItemCount={getItemCount}
                            keyExtractor={keyExtractor}
                            renderItem={renderItem}
                            ListFooterComponent={() => <TouchableOpacity>
                                <Text>Load more replies</Text>
                            </TouchableOpacity> 
                            }
                        />
                        <TouchableOpacity onPress={handleLoadMore}>
                            <Text style={{color: 'black'}}>Load more replies</Text>
                        </TouchableOpacity>
                    </>
                }  
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    Container:{
        marginBottom: 30,
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
    ContainerReplies:{
        alignSelf: 'flex-end',
        paddingHorizontal: 20,
        width:'85%',
    }
});
