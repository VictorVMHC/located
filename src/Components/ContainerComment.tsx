import React, { useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, Text, View, VirtualizedList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Colors } from '../Themes/Styles';
import { ReplyComponent } from './ReplyComponent';
import { getReliesByCommentId } from '../Api/repliesApi';
import { AuthContext } from '../Context/AuthContext';
import { Comment } from '../Interfaces/CommentsInterfaces';
import { deleteLikeComment, likeComment } from '../Api/likeCommentApi';
import { CustomAlert } from './CustomAlert';

interface Props{
    commentItem: Comment,
    blocking?: boolean,
    onCallback:  (value: number ) => void;
}

export const ContainerComment = ({ commentItem, onCallback , blocking}:Props) => {
    const {_id, countReplies, liked, label, userId, comment, likeCount } = commentItem;
    const {image, name} = userId;
    const [expandedReplies, setExpandedComments] = useState(false);
    const { t } = useTranslation();
    const [inputValue, setInputValue] = useState(0);
    const [like, setLike] = useState(liked);
    const [replies, setReplies] = useState<string[]>([]);
    const {user} = useContext(AuthContext);
    const [ page, setPage ] = useState(1);
    const [ totalPages, setTotalPages ] = useState(1);
    const [ fetching, setFetching ] = useState(false);
    const [ error, setError ] = useState(false)
    const [likeable, setLikeable ] = useState(true);
    const [likeCountState, setLikeCountState ] = useState(likeCount);
    
    useEffect(() => {
        if(!countReplies){
            return;
        }

    }, [])

    const fetchReplies = () => {
        if(page > totalPages || fetching){
            return;
        }

        setFetching(true);

        getReliesByCommentId(_id)
        .then((response) => {
            setReplies(response.data.reply);
        })
        .catch(() => {
            setError(true);
        })
        .finally(() => {
            setFetching(false);
        });
    };

    const handleLoadMore = () => {
        fetchReplies();
    } 

    const handleSendValue = (idUser: string) => {
        setInputValue(parseInt(idUser));
        onCallback(inputValue);
    };

    const toggleExpandedComments = () => {
        setExpandedComments(!expandedReplies );
    }

    const checkLike = () => {
        
        if(likeable === false){
            return;
        }

        if (!like) {
            setLikeable(false);
            likeComment(_id, userId._id)
            .then(() => {
                setLikeCountState(likeCountState + 1);
                setLike(true);
                setTimeout(() => {
                    setLikeable(true);
                }, 10000); 
            })
            .catch(() => {
                CustomAlert({
                    title: 'Error',
                    desc: 'Was not possible to un like the comment'
                })
            });

        } else {
            deleteLikeComment(_id)
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
        return replies.length; 
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

    const handleDeleteComment   = () => {
        console.log("hola"); 
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
                        source={ image ? {uri: image} : require('../Assets/Images/Img_User.png') }
                    />
                </View>
                <View style={{width: '75%'}}>
                    <Text style={styles.Name}>{ name }</Text>
                    <View style={styles.ContainerText}>
                        <Text style={styles.TextComment}>{ comment }</Text>
                    </View>
                </View>
                <View style={{width: '10%', alignItems: 'center', justifyContent: 'center'}} >
                    <TouchableOpacity onPress={checkLike}>
                        <Icon name='thumbs-up' size={20} color={!like ? Colors.black : Colors.Yellow} />                    
                    </TouchableOpacity>
                    <Text style={{color: 'black'}}>{ likeCountState }</Text>
                </View>
            </View>
            <View style={styles.ContainerReplies}>
                <View style={{flexDirection: 'row', alignSelf: 'flex-end' }}>
                    {
                        user?._id === userId._id  
                        ?   <TouchableOpacity 
                                disabled={blocking} 
                                style={{margin: 5, alignSelf: 'flex-end', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} 
                                onPress={handleDeleteComment} 
                            >
                                <Text style={{color: Colors.black, marginRight: 5 }}>Delete</Text>
                                <Icon name='trash' color={'red'}/>
                            </TouchableOpacity>
                        : null
                    }
                    
                    <TouchableOpacity 
                        disabled={blocking} 
                        style={{margin: 5, alignSelf: 'flex-end' }} 
                        onPress={()=>(handleSendValue(userId._id))} 
                    >
                        <Text style={{color: Colors.black}}>{t('Reply')} to { user?._id === userId._id ? "me" : name }</Text>
                    </TouchableOpacity>
                </View>
                {
                    countReplies > 0 && !expandedReplies &&
                    <View style={{flexDirection: 'row', alignSelf: 'flex-end' }}>
                        <TouchableOpacity disabled={blocking} style={{ marginLeft: 10}}  onPress={toggleExpandedComments} >
                            <Text style={{color: Colors.black}}> See { countReplies } {t('Answers')}</Text>
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
