import React, { useContext } from 'react';
import {
    Image , 
    StyleSheet , 
    Text , 
    TouchableOpacity , 
    useWindowDimensions , 
    View
} from 'react-native';
import { default as IonIcon } from 'react-native-vector-icons/Ionicons';
import { useHeartHook } from '../Hooks/useHeartHook';
import { Colors } from '../Themes/Styles';
import { Local } from '../Interfaces/DbInterfaces';
import { AuthContext } from '../Context/AuthContext';


interface Props{
    Img: string,
    Name: string,
    categories: string,
    like: boolean,
    navigation?: any,
    local: Local,
}

export const CardCloseToMe = ({ Img = '', Name = '', categories = '', like , navigation, local }: Props ) => {
    const {height} = useWindowDimensions();
    const {isActive, check} = useHeartHook(like);
    const { user}  = useContext(AuthContext);
    const {_id} = local;
    return (
    <TouchableOpacity style={{...styles.chart, height: height - (height * 0.70)}}  activeOpacity={0.8} onPress={() => navigation.navigate('StoreView', {local})} >
            <View style={styles.ChartImg}>
                <Image 
                    style ={styles.image}
                    source={{uri: Img}} 
                />
            </View>
            <View style={styles.ChartText}>
                <Text numberOfLines={3} style={styles.textName}>{Name}</Text>
                <Text numberOfLines={2} style={styles.categories}>{categories}</Text>
            </View>
            <TouchableOpacity style={styles.heartBtn}
                onPress={() => { if (user?._id) {
                    check(user._id, _id);
                }} }
            >
                {!isActive 
                    ? <IonIcon name='heart-outline' size={25} color={Colors.black} />
                    : <IonIcon name='heart' size={25} color={Colors.red} />
                }
            </TouchableOpacity>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    chart:{
        width: '45%',
        borderRadius: 20,
        marginHorizontal: '2%',
        marginVertical: '2%'
        
    },
    ChartImg:{
        flex:6,
        shadowColor: "#000",
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: {
	        width: 0,
	        height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4, 
    },
    ChartText:{
        flex:4,
        alignItems: 'center',
        paddingHorizontal: 2,
    },
    image:{
        width: '95%',
        height: '95%',
        borderRadius: 20,
    },
    chartTextName:{
        overflow: 'hidden', 
        flex: 3

    },
    textName:{
        fontFamily: 'Outfit.Regular',
        fontSize: 20,
        textAlign: 'center',
        fontWeight: '900',
        color: 'black'
    },
    categories:{
        fontFamily: 'Outfit.Regular',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: '500',
        color: 'black'
    },
    heartBtn:{
        backgroundColor:Colors.gray,
        width: 30,
        height:30,
        position: 'absolute',
        top: 10,
        right: 10,
        borderRadius: 100, 
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,
    },
    ChartQualification:{
        width: 50,
        height: 30,
        position: 'absolute',
        bottom: 13,
        right: 10,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'flex-end',
    },
})
