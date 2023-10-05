import React, { useEffect, useRef, useState } from 'react'
import { View, StyleSheet, Button, TextInput, Image, TouchableOpacity, Keyboard, KeyboardAvoidingView, VirtualizedList } from 'react-native';
import { FlatList} from 'react-native-gesture-handler'
import { Text } from 'react-native-paper'
import { ContainerComment } from '../Components/ContainerComment';
import { Colors, FontStyles } from '../Themes/Styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useTranslation } from 'react-i18next';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Comment } from '../Interfaces/CommentsInterfaces';
import { getCommentsByLocalId } from '../Api/commentsApi';
import { ViewStackParams } from '../Navigation/MainStackNavigator';
import { CustomAlert } from '../Components/CustomAlert';

interface Props extends NativeStackScreenProps<ViewStackParams, 'CommentsView'>{};

export const CommentsView = ({ navigation, route }: Props) => {
    const { localId } = route.params;
    const {t} = useTranslation();
    const [receivedValue, setReceivedValue] = useState(0);
    const inputRef = useRef<TextInput>(null);
    const [text, setText] = useState('');
    const [textInputHeight, setTextInputHeight] = useState(0);
    const [isKeyboardOpen, setKeyboardOpen] = useState(false);
    const [buttonLocked, setButtonLocked] = useState(false);
    const [ comments, setComments ] = useState<Comment[]>([])
    const [ page, setPage ] = useState(1);
    const [ totalPages, setTotalpages ] = useState(1);
    const [ fetching, setFetching ] = useState(false);

    const handleKeyboardDidShow = () => {
        setText('');
        setButtonLocked(true);
        setKeyboardOpen(true);  
    };

    const handleKeyboardDidHide = () => {
        setReceivedValue(0);
        Keyboard.dismiss();
        setButtonLocked(false);
        setKeyboardOpen(false);
    };

    useEffect(() => {
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', handleKeyboardDidHide);
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', handleKeyboardDidShow);
        return () =>{
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        }
    }, []);

    const fetchComments = () => {

        if(page > totalPages || fetching ){
            return;
        }

        setFetching(true);

        getCommentsByLocalId(localId, page)
        .then((response) =>{
            setComments(response.data.comments);
            setPage(page + 1);
            setTotalpages(response.data.totalPages);
        })
        .catch(() => {
            CustomAlert({
                title: "Not Comments",
                desc: "Sorry we could not been able to grab the comment for this local"
            })
        })
        .finally(() => {
            setFetching(false);
        });
    }

    useEffect(() => {
        if(comments.length > 0){
            return;
        }
        fetchComments();
    }, []);

    const handleLoadMore = () => {
        fetchComments();
    }

    const handleChildCallback = (value: number) => {
        setReceivedValue(value);
        inputRef.current?.focus();
    };

    const placeholderValue: any = receivedValue !== 0 ? receivedValue : "Añadir Comentario";

    const renderComment = (comment: Comment) => {
        return(
            <ContainerComment
                idUser={item._id}
                ImgUser={item.}
                NameUser={item.nameUser}
                Comment={item.text}
                likes={false}
                dislikes={false}
                reply={true}
                blocking={buttonLocked}
                answers={true}
                label='neutral'
                onCallback={() => handleChildCallback(item.id)} 
                commentId={''}                        
            />
        )
    }

    return (
        <KeyboardAvoidingView style={StylesCommentsView.container}>
            <View style={[StylesCommentsView.container, isKeyboardOpen && StylesCommentsView.overlay]}>
                <View style={StylesCommentsView.containerFlatlist}>
                    <VirtualizedList
                        data={comments}
                        getItemCount={(data) => data.length}
                        getItem={(data, index) => data[index]}
                        initialNumToRender={10}
                        ListHeaderComponent={() => (
                            <View style={StylesCommentsView.containerText}>
                                <Text style={{ ...StylesCommentsView.TextComments, ...FontStyles.SubTitles }}>
                                    {t('Comments')}
                                </Text>
                            </View>
                        )}
                        renderItem={({ item }) => (
                            
                        )}
                        keyExtractor={(item) => item.id.toString()}
                        onEndReached={handleLoadMore}
                        onEndReachedThreshold={0.3}
                    />
                </View>
            </View>
            <View style={{...StylesCommentsView.containerAddComments, height: textInputHeight + 50, backgroundColor: 'white'}}>
                <View style={{flex:1, flexDirection: 'row', paddingTop: 10, justifyContent: 'center', alignItems: 'center'}}>
                    <View style={StylesCommentsView.ContainerImg}>
                        <Image 
                            resizeMode='cover'
                            style={StylesCommentsView.Img}
                            source={{uri: 'https://ih1.redbubble.net/image.1740228166.8974/flat,750x1000,075,f.jpg'}}
                            />
                    </View>
                    <View style={{...StylesCommentsView.containerTextComment, height: Math.max(35, textInputHeight)}}>
                        <TextInput   
                            ref={inputRef}  
                            style={{...StylesCommentsView.textInput, height: Math.max(35, textInputHeight) }}  
                            placeholder={placeholderValue} 
                            placeholderTextColor={Colors.black}  
                            value={text} 
                            onChange={({nativeEvent: { text }}) => setText(text)} 
                            maxLength={256} 
                            multiline 
                            onContentSizeChange={(event) => setTextInputHeight(event.nativeEvent.contentSize.height)}
                        >
                        </TextInput>
                        {text !== '' && (
                            <TouchableOpacity >
                                <Icon name='paper-plane' size={20} color="#8A8E9B" solid/>
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
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    containerText:{
        marginTop:0,
        backgroundColor: '#F7E091',
        marginBottom: 10,
    },
    TextComments:{
        fontSize: 27,
        fontWeight: 'bold',
        fontFamily: 'Outfit-SemiBold',
        marginLeft: 20,
        marginTop: 5
    },
    containerFlatlist:{
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
