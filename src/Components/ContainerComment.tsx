import React, { useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, Text, View, VirtualizedList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Colors } from '../Themes/Styles';
import { ReplyComponent } from './ReplyComponent';
import { deleteReply, getRepliesByCommentId } from '../Api/repliesApi';
import { AuthContext } from '../Context/AuthContext';
import { Comment, Reply } from '../Interfaces/CommentsInterfaces';
import { deleteLikeComment, likeComment } from '../Api/likeCommentApi';
import { CustomAlert } from './CustomAlert';
import { deleteComment } from '../Api/commentsApi';
import { ActivityIndicator } from 'react-native-paper';
import { deleteLikeReply } from '../Api/likeReplyApi';

interface Props{
    commentItem: Comment,
    deleteAction: (id: string) => void,
    blocking?: boolean,
    onCallback:  (value: number ) => void;
    replies: Reply[];
    setReplies: (commentId: string, replies: Reply[]) => void;
    handleReply: (userRepliedName: string, CommentId: string, userRepliedId: string) => void
}

export const ContainerComment = ({ commentItem, deleteAction, blocking, replies, setReplies, handleReply}:Props) => {

    const {_id, countReplies, liked, label, userId, comment, likeCount } = commentItem;
    const { image, name} = userId;
    const [ expandedReplies, setExpandedReplies] = useState(false);
    const { t } = useTranslation();
    const [ inputValue, setInputValue] = useState(0);
    const [ like, setLike] = useState(liked);
    const { user} = useContext(AuthContext);
    const [ page, setPage ] = useState(1);
    const [ totalPages, setTotalPages ] = useState(1);
    const [ fetching, setFetching ] = useState(false);
    const [ error, setError ] = useState(false)
    const [ likeable, setLikeable ] = useState(true);
    const [ likeCountState, setLikeCountState ] = useState(likeCount);
    
    const handleDeleteReply = (replyId: string) => {
        deleteReply(replyId)
        .then(() => {
            var repliesUpdated = replies.filter(item => item._id !== replyId);
            setReplies(_id,repliesUpdated)
        })
        .catch(() => {
            CustomAlert({
                title: 'Error',
                desc: 'Was not possible to delete the comment'
            })
        })
    }
    
    useEffect(() => {
        if(!countReplies){
            return;
        }
        fetchReplies();
    }, [replies])
    
    const fetchReplies = () => {
        if(page > totalPages || fetching){
            return;
        }

        setFetching(true);

        getRepliesByCommentId(_id, page)
        .then((response) => {

            setReplies(_id, [...replies, ...response.data.reply]);
            setPage(page + 1);
            setTotalPages(response.data.totalPages);
            console.log(totalPages);
            console.log(page);
            
            
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

    const handleReplyTo = () => {
        handleReply(name, _id, userId._id);
    };

    const toggleExpandedComments = () => {
        setExpandedReplies(!expandedReplies );
    }

    const checkLike = () => {
        
        if(likeable === false){
            return;
        }

        if (!like) {
            setLikeable(false);
            likeComment(_id)
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

    function renderItem({ item }: any) {
        return (
            <ReplyComponent 
                reply={item}
                handleReply={handleReply}
                deleteReplyAction={handleDeleteReply}           
            />
        )
    }
    
    function keyExtractor(item: Reply) {
        return item._id;
    }
    
    function getItemCount() {
        return replies.length; 
    }

    const footerReplies = () => {
        return (
            <View 
                style={{ 
                        flexDirection: 'row', 
                        justifyContent: 
                            page <= totalPages 
                                ? 'space-between' 
                                : 'flex-end', 
                        alignContent: 'flex-end' 
                    }
                }>
                {page <= totalPages &&
                    <TouchableOpacity
                        onPress={handleLoadMore}
                        style={{flexDirection: 'row', alignContent: 'center', justifyContent: 'center'}}
                    >
                        <Text style={{ color: 'black' }}>Load more replies  </Text>
                        {fetching && <ActivityIndicator color={Colors.blueAqua} size={'small'} />}
                    </TouchableOpacity>
                }
                <TouchableOpacity 
                    style={{ flexDirection: 'row', alignContent: 'flex-end'}}
                    onPress={() => setExpandedReplies(false)}
                >
                    <Text style={{ color: 'black' }}>Hide replies</Text>
                    <Icon style={{marginLeft: 5, alignSelf: 'center'}} name='chevron-up' color='black' />
                </TouchableOpacity> 
            </View>
        )
    }

    const handleDeleteComment   = () => {
        deleteAction(_id);
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
                        onPress={handleReplyTo} 
                    >
                        <Text style={{color: Colors.black}}>{t('Reply')} to { user?._id === userId._id ? "me" : name }</Text>
                    </TouchableOpacity>
                </View>
                {
                    countReplies > 0  &&
                    <View style={{flexDirection: 'row', alignSelf: 'flex-end' }}>
                        <TouchableOpacity 
                            disabled={blocking} 
                            style={{ marginLeft: 10, flexDirection: 'row'}}  
                            onPress={toggleExpandedComments} 
                        >
                            <Text style={{ color: Colors.black }}>
                                {expandedReplies ? "Hide" : "See"} {countReplies} {t("Answers")}
                            </Text>                            
                            <Icon
                                style={{ marginTop: 2, marginLeft: 2 }}
                                name={expandedReplies ? "chevron-up" : "chevron-down"}
                                size={15}
                                color="black"
                            />
                            </TouchableOpacity>
                    </View>

                }
                {
                    expandedReplies && replies.length > 0  && (
                        <VirtualizedList
                            data={replies}
                            getItem={(pages, index) => pages[index]}
                            getItemCount={getItemCount}
                            keyExtractor={keyExtractor}
                            renderItem={renderItem}
                            ListFooterComponent={footerReplies}
                        />
                    )
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
