import React, { useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, Text, View, VirtualizedList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Colors } from '../Themes/Styles';
import { ReplyComponent } from './ReplyComponent';
import { getReliesByCommentId } from '../Api/repliesApi';
import { AuthContext } from '../Context/AuthContext';

interface Props{
    idUser: number,
    commentId: string,
    repliesCount?: number,
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


export const ContainerComment = ({idUser, ImgUser, NameUser, commentId,Comment, repliesCount ,onCallback ,likes ,dislikes,reply,blocking,answers: replies, label}:Props) => {
    const [expandedReplies, setExpandedComments] = useState(false);
    const { t } = useTranslation();
    const [inputValue, setInputValue] = useState(0);
    const [like, setLike] = useState(likes);
    const [repliess, setReplies] = useState<string[]>([]);
    const {user} = useContext(AuthContext);

    useEffect(() => {
        if(!repliesCount){
            return;
        }

        getReliesByCommentId(commentId).then((response) => {
            setReplies(response.data.reply);
        })
    }, [])

    const handleLoadMore = () => {
        
    } 

    const handleSendValue = (idUser: number) => {
        setInputValue(idUser);
        onCallback(inputValue);
    };

    const toggleExpandedComments = () => {
        setExpandedComments(!expandedReplies );
    }

    const checkLike =() =>{
        setLike(!like)
    }

    function renderItem({ item }: any) {
        return (
            <ReplyComponent 
                userImage={'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80'} 
                userName={item} 
                reply={'hola amigos de youtube'} 
                like={false} 
                likes={10} 
                label={'negative'}                
            />
        )
    }
    
    function keyExtractor(index: string) {
        return index.toString();
    }
    
    function getItemCount() {
        return repliess.length; 
    }

    const footerReplies = () => {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity
                    onPress={handleLoadMore}
                >
                    <Text style={{ color: 'black' }}>Load more replies</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: 'row'}} >
                    <Text style={{ color: 'black' }}>Close replies</Text>
                    <Icon style={{marginLeft: 5, alignSelf: 'center'}} name='chevron-up' color='black' />
                </TouchableOpacity> 
            </View>
        )
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
                            <Text style={{color: Colors.black}}>See { repliesCount } {t('Answers')}</Text>
                        </TouchableOpacity>
                        <Icon style={{marginTop: 2, marginLeft: 2}} name='chevron-down' size={15} color='black' />
                    </View>

                }
                {
                    expandedReplies &&
                    <>
                        <VirtualizedList
                            data={replies}
                            getItem={(pages, index) => pages[index]}
                            getItemCount={getItemCount}
                            keyExtractor={keyExtractor}
                            renderItem={renderItem}
                            ListFooterComponent={ footerReplies }
                        />
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
