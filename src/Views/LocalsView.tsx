import React, { useContext, useState, useEffect } from 'react';
import { Dimensions, Image, StyleSheet, Text, View, FlatList, LayoutAnimation, TouchableOpacity, useWindowDimensions } from 'react-native';
import { Circles } from '../Components/Circles';
import { Colors, FontStyles } from '../Themes/Styles';
import { AuthContext } from '../Context/AuthContext';
import { LoadingOverlay } from '../Components/LoadingOverlay';
import { searchByUser } from '../Api/searchLocalsApi';
import { CustomAlert } from '../Components/CustomAlert';
import { ErrorMessage } from 'formik';
import { CardLocalView } from '../Components/CardLocalView';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

interface Props extends NativeStackScreenProps<any, any>{};

const windowWidth = Dimensions.get('window').width;

export const LocalsView = ({navigation}:Props) => {
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [userLocals, setUserLocals] = useState([]);
    const [error, setError] = useState(false);
    const {width, height} = useWindowDimensions();

    useEffect(() => {
        setLoading(true);
        setError(false);
        searchByUser()
            .then((value) => {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
                const { locals } = value.data;
                console.log(locals);
                setUserLocals(locals);
                setLoading(false);
            })
            .catch(() => {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
                CustomAlert({
                    title: 'No locals were found',
                    desc: 'Was not possible to retrieve your locals. Please try again!'
                });
                setError(true);
                setLoading(false);
            });
    }, []);

    return (
        <View style={styles.container}>
            <Circles position='top' quantity={2} />
            <View style={styles.topContainer}>
                <View style={styles.containerImgEdit}>
                    <Image
                        style={styles.img}
                        source={user?.image !== '' ? { uri: user?.image } : require('../Assets/Images/Img_User.png')}
                    />
                </View>
                <Text style={styles.textNameUser}>{user?.name}</Text>
                <Text style={styles.textEmailUser}>{user?.email}</Text>
                <Text style={{...FontStyles.Title, justifyContent: 'center', marginTop: 5}} >My locals</Text>
            </View>
            <View style={styles.bottomContainer}>
            {!loading ? (!error ? (
                    <FlatList
                        data={userLocals}
                        renderItem={({item}:any) => 
                            <CardLocalView 
                                uri={item.uriImage} 
                                name={item.name}
                                titleStyles={styles.cardTitle}
                                containerStyle={{...styles.cardContainer, width: width * 0.90, height: height * 0.25}}
                                Action={() => navigation.navigate('StoreView')}
                            />
                        }
                        keyExtractor={(item: any) => item._id.toString()} // Replace 'id' with your unique identifier
                    />
                ) : (
                    <ErrorMessage message="Error: No se pudieron cargar los datos." />
                )) : (
                    <LoadingOverlay />
            )}
            </View>
            <TouchableOpacity onPress={() =>  navigation.navigate('LocalCreatorView') } style={styles.buttonContainer}>
                <View style={styles.button}>
                    <Icon name='plus' size={25}  light color={Colors.white}/>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    topContainer: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomContainer: {
        flex: 6,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    containerImgEdit: {
        width: windowWidth * 0.33,
        height: windowWidth * 0.33,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightgray',
        borderRadius: windowWidth / 2
    },
    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        borderRadius: windowWidth / 2
    },
    textNameUser: {
        fontFamily: 'Outfit.SemiBold',
        fontSize: 30,
        color: Colors.black,
        fontWeight: 'bold'
    },
    textEmailUser: {
        fontFamily: 'Outfit.SemiBold',
        fontSize: 20,
        color: Colors.black,
        fontWeight: '600'
    },
    cardContainer: {
        marginVertical: 10,
        borderRadius: 20,
        overflow: 'hidden',
    },
    cardTitle: {
        fontSize: 20,
        textAlign: 'center',
        padding: 10,
        backgroundColor: Colors.YellowOpacity,
        fontWeight: 'bold',
        color: Colors.darkGray,
        justifyContent: 'center',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: Colors.Yellow,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10,
        shadowColor: 'black'
    },
    button: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },

});
