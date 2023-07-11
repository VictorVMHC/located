import React, { useState } from 'react'
import { View, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Colors } from '../Themes/Styles';

export const SendComment = () => {
    const [text, setText] = useState('');
    const [textInputHeight, setTextInputHeight] = useState(0);
    
    return (
        <View style={{...StyleSecdComments.containerAddComments,height: Math.max(50, textInputHeight)}}>
                <View style={StyleSecdComments.ContainerImg}>
                    <Image 
                        resizeMode='cover'
                        style={StyleSecdComments.Img}
                        source={{uri: 'https://ih1.redbubble.net/image.1740228166.8974/flat,750x1000,075,f.jpg'}}
                        />
                </View>
                <View style={{...StyleSecdComments.containerTextComment, height: Math.max(35, textInputHeight)}}>
                <TextInput style={{...StyleSecdComments.textInput, height: Math.max(35, textInputHeight) }}  placeholder="Añadir Comentario" placeholderTextColor={Colors.black}  value={text} onChange={({nativeEvent: { text }}) => setText(text)} maxLength={256} multiline onContentSizeChange={(event) => setTextInputHeight(event.nativeEvent.contentSize.height)} >
                </TextInput>
                {text !== '' && (
                    <TouchableOpacity >
                        <Icon name='paper-plane' size={20} color="#8A8E9B" solid/>
                    </TouchableOpacity>
                )}
                </View>
            </View>
    )
}

const StyleSecdComments = StyleSheet.create({
    containerAddComments:{
        flexDirection: 'row',
        paddingLeft: 20,
        alignItems: 'center',
        paddingBottom: 25,
    },
    ContainerImg:{
        width: 40,
        height: 40,
    },
    Img:{
        width: '100%',
        height: '100%',
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
