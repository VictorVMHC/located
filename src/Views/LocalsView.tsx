import React, { useContext, useState, useEffect } from 'react';
import { Dimensions, Image, StyleSheet, Text, View, FlatList, LayoutAnimation, TouchableOpacity } from 'react-native';
import { Circles } from '../Components/Circles';
import { Colors } from '../Themes/Styles';
import { AuthContext } from '../Context/AuthContext';
import { LoadingOverlay } from '../Components/LoadingOverlay';
import { searchByUser } from '../Api/searchLocalsApi';
import { CustomAlert } from '../Components/CustomAlert';

const windowWidth = Dimensions.get('window').width;

export const LocalsView = () => {
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [userLocals, setUserLocals] = useState([]);
    const [error, setError] = useState(false);

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

    const renderItem = ({ item }: any) => {
        return (
            
        );
    };

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
            </View>
            <View style={styles.bottomContainer}>
                {!loading ? (!error ? <FlatList
                    data={userLocals}
                    renderItem={renderItem}
                    keyExtractor={(item: any) => item._id.toString()}
                /> : null) : <LoadingOverlay />}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    topContainer: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomContainer: {
        flex: 6,
        alignItems: 'center',
        backgroundColor: 'red',
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
        fontSize: 18,
        textAlign: 'center',
        padding: 10,
        backgroundColor: 'white',
        fontWeight: 'bold',
    }
});
