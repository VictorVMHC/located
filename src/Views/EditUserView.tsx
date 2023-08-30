import React, { useState, useContext } from 'react'
import { Dimensions, Image, StyleSheet, Text, TextInput, TouchableHighlight, View, KeyboardAvoidingView, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { AuthContext } from '../Context/AuthContext';
import { Formik } from 'formik';
import { User, createNewUser } from '../Interfaces/UserInterface';
import { putUser } from '../Api/userApi';
import { compareUsers } from '../Utils/HandleUser';

const windowWidth = Dimensions.get('window').width;

export const EditUserView = () => {
    const contextAuthentication = useContext(AuthContext);
    const [errorMessage, setErrorMessages] = useState('');

    const { user } = contextAuthentication;

    const handleSubmit = async (userUpdate: User) => {
        try {
            if (user === null) {
                console.log('El usuario es nulo, no se puede actualizar');
                return;
            }
    
            const response = compareUsers(user, userUpdate);
            console.log(response);
    
            const updatedFields: Partial<User> = {};
    
            if (response.name && userUpdate.name !== undefined) {
                updatedFields.name = userUpdate.name;
            }
            if (response.username && userUpdate.username !== undefined) {
                updatedFields.username = userUpdate.username;
            }
            if (response.email && userUpdate.email !== undefined) {
                updatedFields.email = userUpdate.email;
            }
            if (response.phone && userUpdate.phone !== undefined) {
                updatedFields.phone = userUpdate.phone;
            }
            if (response.age && userUpdate.age !== undefined) {
                updatedFields.age = userUpdate.age;
            }
    
            // Solo realizamos la solicitud si hay campos actualizados para enviar
            if (Object.keys(updatedFields).length > 0) {
                const data = await putUser(user.email!, updatedFields as User);
                if (data.status === 200) {
                    console.log('Usuario actualizado exitosamente');
                }
            } else {
                console.log('No hay cambios para actualizar');
            }
        } catch (error: any) {
            console.log(JSON.stringify(error));
        }
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={StyleEditUser.container}>
                    <View style={StyleEditUser.topContainer}>
                        <View style={StyleEditUser.containerImgEdit}>
                                <View style={StyleEditUser.containerImg}>
                                    <Image
                                        style={StyleEditUser.img}
                                        source={require('../Assets/Images/Lisa.png')}
                                    />
                                </View>
                                    <TouchableHighlight  style={StyleEditUser.containerEditIcon} underlayColor="lightgray" onPress={()=>{}}>
                                        <Icon name='pen' size={20} color="black" light/>
                                    </TouchableHighlight>
                        </View>
                    </View>
                    <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', justifyContent: 'space-evenly' }}>
                        <View  style={StyleEditUser.centerContainer}>
                            <Formik
                                initialValues={{
                                    name: user?.name || '',
                                    email: user?.email || '',
                                    phone: user?.phone || '',
                                    username: user?.username || '',
                                    age: user?.age || 0,
                                }}
                                onSubmit={(User)=>{handleSubmit(User)}}
                            >
                                {({ handleChange, handleSubmit, values }) => (
                                    <View>
                                        <View style={StyleEditUser.containerTextInput}>
                                            <Text style={StyleEditUser.text}>Name</Text>
                                            <TextInput 
                                            style={StyleEditUser.textInput} 
                                            placeholder={user?.name}
                                            onChangeText={handleChange('name')}
                                            value={values.name}
                                            ></TextInput>
                                        </View>
                                        <View style={StyleEditUser.containerTextInput}>
                                            <Text style={StyleEditUser.text}>User Name</Text>
                                            <TextInput 
                                            style={StyleEditUser.textInput} 
                                            placeholder={user?.username}
                                            onChangeText={handleChange('username')}
                                            value={values.username}
                                            ></TextInput>
                                        </View>
                                        <View style={StyleEditUser.containerTextInput}>
                                            <Text style={StyleEditUser.text}>Email</Text>
                                            <TextInput 
                                            style={StyleEditUser.textInput} 
                                            placeholder={user?.email}
                                            onChangeText={handleChange('email')}
                                            value={values.email}
                                            ></TextInput>
                                        </View>
                                        <View style={StyleEditUser.containerTextInput}>
                                            <Text style={StyleEditUser.text}>Telefono</Text>
                                            <TextInput 
                                            style={StyleEditUser.textInput} 
                                            placeholder={user?.phone}
                                            onChangeText={handleChange('phone')}
                                            value={values.phone}
                                            ></TextInput>
                                        </View>
                                        <View style={StyleEditUser.containerTextInput}>
                                            <Text style={StyleEditUser.text}>Edad</Text>
                                            <TextInput 
                                            style={StyleEditUser.textInput} 
                                            placeholder={`${user?.age}`}
                                            onChangeText={handleChange('age')}
                                            
                                            ></TextInput>
                                        </View>
                                        <View style={StyleEditUser.bottomContainer}>
                                            <TouchableHighlight style={StyleEditUser.button} underlayColor= 'rgba(255,198,0,1)' onPress={handleSubmit}>
                                                <Text style={StyleEditUser.textButton}>Actualizar</Text>
                                            </TouchableHighlight>
                                        </View>
                                    </View>
                                )}
                            </Formik>
                        </View>
                    </ScrollView>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
        
    )
}

const StyleEditUser = StyleSheet.create({
    container:{
        flex:1,
    },
    topContainer:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
       // backgroundColor: 'blue'
    },
    centerContainer:{
        flex:2,
        alignItems: 'center',
        justifyContent: 'space-evenly',
       // backgroundColor: 'red'
    },
    bottomContainer:{
        flex:0.5,
        justifyContent: 'center',
        alignItems: 'center',
       // backgroundColor: 'orange'
    },
    containerImgEdit:{
        width: windowWidth * 0.33, 
        height: windowWidth * 0.33,
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerEditIcon:{
        width: windowWidth * 0.12,
        height: windowWidth * 0.12,
        borderRadius: windowWidth * 0.12 / 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.94)',
        position: 'absolute',
        alignSelf: 'flex-end',
        bottom: windowWidth * 0.01,
        right: windowWidth * 0.01,
        
    },
    containerImg:{
        width: windowWidth * 0.32, 
        height: windowWidth * 0.32,
        borderRadius: (windowWidth * 0.4) / 2, 
        overflow: 'hidden', 
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightgray',
    },
    img:{
        flex: 1,
        resizeMode: 'contain'
    },
    containerTextInput:{
        width: windowWidth * 0.85,
        height: windowWidth * 0.20,
        justifyContent: 'flex-end'
    },
    text:{
        fontFamily: 'Outfit.Regular',
        fontSize: 23,
        color: 'black'
    },
    textInput:{
        borderColor: 'rgba(0,0,0,0.5)',
        borderWidth: 1,
        borderRadius: 7,
        color: 'black',
        fontSize: 19,
        fontFamily: 'Outfit.Regular'
    },
    button:{
        width: windowWidth * 0.85,
        height: windowWidth * 0.13,
        backgroundColor: 'black',
        justifyContent: 'center',
        borderRadius: 11
    },
    textButton:{
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Outfit.SemiBold',
        fontSize: 23
    }
});
