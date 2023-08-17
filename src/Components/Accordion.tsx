import React, { useState } from 'react'
import { LayoutAnimation, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Colors } from '../Themes/Styles';

interface Props {
    question: string,
    answer: string,
}

export const Accordion = ({question, answer,}:Props) => {
    const [expanded, setExpanded] = useState(false);

    const toggle = () => {
        setExpanded(!expanded );
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }
    return (
        <View style={StylesFAQ.container}>
            <TouchableOpacity onPress={toggle}>
            {!expanded
                ?<Text style={StylesFAQ.titleQuestion}>{question}
                    <Icon name='chevron-down' size={20} color={Colors.black}/></Text>
                :<Text style={StylesFAQ.titleQuestion}>{question} 
                <Icon name='chevron-up' size={20} color={Colors.black}/></Text>
            }
                {expanded && <View>{
                    <Text style={StylesFAQ.answer}>{answer}</Text>
        }</View>}
            </TouchableOpacity>
            <View style={StylesFAQ.separate}></View>
        </View>
    )
}

const StylesFAQ = StyleSheet.create({
    container:{
        alignItems:'center',
        padding:5,
        top:-15,
    },
    titleQuestion:{
        fontSize:14,
        fontWeight:'bold',
        color:'black',
        width:320,
    },
    answer:{
        fontSize:22,
        fontFamily:'Outfit.Light',
        textAlign:'left',
        width:300,
    },
    separate:{
        backgroundColor:'rgba(255,198,0,0.4)',
        height:3,
        width:"95%",
    }
})
