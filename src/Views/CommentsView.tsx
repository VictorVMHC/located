import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useContext, useEffect, useRef, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Keyboard, KeyboardAvoidingView, ListRenderItem, StyleSheet, TextInput, TouchableOpacity, View, VirtualizedList } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { addComment, deleteComment, getCommentsByLocalId } from '../Api/commentsApi';
import { ContainerComment } from '../Components/ContainerComment';
import { CustomAlert } from '../Components/CustomAlert';
import { AuthContext } from '../Context/AuthContext';
import { Comment, Reply } from '../Interfaces/CommentsInterfaces';
import { ViewStackParams } from '../Navigation/MainStackNavigator';
import { Colors, FontStyles } from '../Themes/Styles';
import { CommentsAlertView } from './CommentsAlertView';
import { addReply } from '../Api/repliesApi';

interface Props extends NativeStackScreenProps<ViewStackParams, 'CommentsView'>{};

export const CommentsView = ({ navigation, route }: Props) => {
    const { localId } = route.params;

    const { t } = useTranslation();

    const { user } = useContext(AuthContext);
    const inputRef = useRef<TextInput>(null);
    const [ textInputHeight, setTextInputHeight] = useState(0);
    const [ isKeyboardOpen, setKeyboardOpen] = useState(false);
    const [ buttonLocked, setButtonLocked] = useState(false);

    const [ comment, setComment] = useState('');
    const [ comments, setComments ] = useState<Comment[]>([]);
    const [ page, setPage ] = useState(1);
    const [ totalPages, setTotalPages ] = useState(1);
    const [ fetching, setFetching ] = useState(false);
    const [ haveComments, setHaveComments ] = useState(true);

    const [ sending, setSending ] = useState(false);

    const [ isReplying, setIsReplying ] = useState(false);
    const [ replyCommentId, setReplyCommentId ] = useState("");
    const [ commentReplies, setCommentReplies ] = useState<{ [commentId: string]: Reply[] }>({});
    const [ userRepliedId, setUserRepliedId ] = useState("");
    const [ userRepliedName, setUserRepliedName ] = useState("");

    const fetchComments = () => {
        if(page > totalPages || fetching || !haveComments){
            return;
        }

        setFetching(true);

        getCommentsByLocalId(localId, page)
        .then((response) => {
            setComments([...comments, ...response.data.comments]);
            setPage(page + 1);
            setTotalPages(response.data.totalPages);            
            setHaveComments(true);
        })
        .catch((error) => {
            console.log(error.response.status );
            if(error.response.status  === 404){
                setComments([]);
                setTotalPages(1);
                setPage(1);
                setHaveComments(false);
                return;
            }

            if(error.response.status  === 500){
                
                CustomAlert({
                    title: "Not Comments",
                    desc: "Sorry we could not been able to grab the comment for this local"
                })

                navigation.goBack();
            }

        })
        .finally(() => {
            setFetching(false);
        });
    }

    useEffect(() => {       
        if(comments.length > 0 || fetching){
            return;
        }
        fetchComments();
    }, [comments]);

    const handleLoadMore = () => {
        fetchComments();
    }
    
    const handleReplyComment = (userName: string, CommentId: string, userRepliedId: string) => {
        setComment("");
        setIsReplying(true);
        setReplyCommentId(CommentId);
        setUserRepliedName(userName);
        setUserRepliedId(userRepliedId);
        setComment(`${userName}: `);        
        inputRef.current?.focus();
    };
    
    const placeholderValue: any = comment !== "" ? comment : "Add Comment";

    const handleDeleteComment = (id: string) => {
        deleteComment(id)
        .then(() => {            
            const filteredArray = comments.filter(item => item._id !== id);

            setComments([...filteredArray]);
        })
        .catch(() => {
            CustomAlert({
                title: 'Error',
                desc: 'Was not possible to delete your comment'
            })
        })
    }

    const renderComment: ListRenderItem<Comment> = useMemo(() => {
        return ({ item }) => (
            <ContainerComment
                commentItem={item}
                deleteAction={handleDeleteComment}
                blocking={buttonLocked}
                onCallback={() => {
                    console.log("hello");
                }}
                replies={commentReplies[item._id] || []}
                setReplies={(commentId, updatedReplies: Reply[]) => {
                    setCommentReplies((prevReplies) => ({
                        ...prevReplies,
                        [commentId]: updatedReplies,
                    }));
                }}
                handleReply={handleReplyComment}
            />
        );
    }, [handleDeleteComment, comments]);

    const getKey = useMemo(() => {
        return (item: Comment) => item._id;
    }, []);

    const getItemsCount = useMemo(() => {
        return (data: Comment[]) => data.length;
    }, []);

    const getComment = useMemo(() => {
        return (data: Comment[], item: number) => data[item];
    }, []);

    const handleSendComment = () => {
        addComment(localId, comment )
        .then((response: any) => {
            const newComment = {
                ...response.data.newComment, 
                likeCount: 0, 
                liked: false, 
                countReplies: 0, 
                userId: { 
                    _id: response.data.newComment.userId, 
                    name: user?.name, 
                    image: user?.image
                },
            };    

            setComments([...comments, newComment])
            setComment('');
            
            Keyboard.dismiss();
        })
        .catch(() => {
            CustomAlert({
                title: "Comment not Delivery",
                desc: "Try to send again your comment"
            });
        })
        .finally(() => {
            setSending(false);
        })
    }

    const handleSendReply = () => {
        console.log('in send reply');
        console.log(userRepliedId);
        

        addReply(replyCommentId, userRepliedId, comment )
        .then((response: any) => {
            const newReply = {
                ...response.data.replyResponse, 
                likes: 0, 
                liked: false, 
                countReplies: 0, 
                userId: { 
                    _id: response.data.replyResponse.userId, 
                    name: user?.name, 
                    image: user?.image
                },
                userRepliedId: {
                    _id: userRepliedId,
                    name: userRepliedName
                }

            };
            const updatedReplies = commentReplies[replyCommentId] || [];
                updatedReplies.push(newReply);
            setCommentReplies((prevReplies) => {
                return {
                    ...prevReplies,
                    [replyCommentId]: updatedReplies
                };
            });

            setComment('');
            console.log(commentReplies);
            
            console.log(' all ok');
            Keyboard.dismiss();
            console.log(commentReplies);
            
        })
        .catch(() => {
            CustomAlert({
                title: "Reply not Delivery",
                desc: "Try to send again your reply"
            });
        })
        .finally(() => {
            console.log('finished');
            setComment('');
            setUserRepliedId('');
            setIsReplying(false);
            setReplyCommentId("");
            setUserRepliedName('');
            setSending(false);
        })
    }

    const send  = () => {
        setSending(true);
        console.log(isReplying);
        
        isReplying ? handleSendReply() : handleSendComment();
    }
    
    return (
        <KeyboardAvoidingView style={StylesCommentsView.container}>
                <View style={StylesCommentsView.containerText}>
                    <Text style={{ ...StylesCommentsView.TextComments, ...FontStyles.SubTitles }}>
                        {t('Comments')}
                    </Text>
                    {fetching && <ActivityIndicator color={Colors.blueAqua} size={'small'} />}
                </View>
                <View style={StylesCommentsView.containerFlatList}>
                    {haveComments ? (
                        <VirtualizedList
                            data={comments}
                            getItemCount={getItemsCount}
                            getItem={getComment}
                            renderItem={renderComment}
                            keyExtractor={getKey}
                            onEndReached={handleLoadMore}
                        />
                    ) : (
                        <CommentsAlertView />
                    )}
                </View>
            <View style={{...StylesCommentsView.containerAddComments, height: textInputHeight + 50, backgroundColor: 'white'}}>
                <View style={{flex:1, flexDirection: 'row', paddingTop: 10, justifyContent: 'center', alignItems: 'center'}}>
                    <View style={StylesCommentsView.ContainerImg}>
                        <Image 
                            resizeMode='cover'
                            style={StylesCommentsView.Img}
                            source={ user?.image ? {uri:  user?.image } : require('../Assets/Images/Img_User.png')}
                            />
                    </View>
                    <View style={{...StylesCommentsView.containerTextComment, height: Math.max(35, textInputHeight)}}>
                    <TextInput
                        ref={inputRef}  
                        style={{ ...StylesCommentsView.textInput, height: Math.max(35, textInputHeight) }}  
                        placeholder={placeholderValue} 
                        placeholderTextColor={Colors.black}  
                        onChange={({ nativeEvent: { text } }) => setComment(text)}
                        maxLength={256} 
                        multiline
                        onContentSizeChange={(event) => setTextInputHeight(event.nativeEvent.contentSize.height)}
                    >
                        <Text>
                            <Text style={{ color: Colors.blueAqua }}>{userRepliedName}</Text>
                            {comment.substring(userRepliedName.length)}
                        </Text>
                    </TextInput>
                        {comment !== '' && (
                            <TouchableOpacity 
                                onPress={send}
                            >
                                {   sending 
                                    ?   <ActivityIndicator color={Colors.Yellow} />
                                    :   <Icon name='paper-plane' size={20} color="#8A8E9B" solid/>
                                    
                                }
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

const StylesCommentsView = StyleSheet.create({
    container:{
        flex: 1,
    },
    containerText:{
        marginTop:0,
        backgroundColor: Colors.YellowOpacity,
        marginBottom: 10,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    TextComments:{
        fontSize: 27,
        fontWeight: 'bold',
        fontFamily: 'Outfit-SemiBold',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 5
    },
    containerFlatList:{
        flex: 7,
        alignItems: 'center'
    },
    Button:{
        backgroundColor: Colors.YellowOpacity,
        borderRadius: 15,
        justifyContent: 'center'
    },
    TextButton:{
        fontSize: 20,
        textAlign: 'center',
    }, 
    containerAddComments:{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        paddingBottom: 25,
        borderTopWidth:2,
        borderTopColor: Colors.darkGray,
    },
    ContainerImg:{
        width: 40,
        height: 40,
    },
    Img:{
        width: '100%',
        height: '100%',
        borderWidth: 1,
        borderColor: Colors.darkGray,
        resizeMode:'contain',
        borderRadius: 50,
    },
    containerTextComment:{
        backgroundColor: '#DBDBDB',
        flexDirection: 'row', 
        alignItems: 'center',
        width: '80%',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 17,
        marginLeft: 15,
    },
    textInput:{
        width: '90%',
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        color: Colors.black,
    },

});
