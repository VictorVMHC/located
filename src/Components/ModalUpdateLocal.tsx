import React, { ReactNode, useContext } from 'react'
import { Dimensions, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors } from '../Themes/Styles';
import { Formik } from 'formik';
import { Local } from '../Interfaces/DbInterfaces';
import { CustomAlert } from './CustomAlert';
import { compareLocal } from '../Utils/HandleLocals';
import { t } from 'i18next';
import { putLocal } from '../Api/localApi';
import { postImage } from '../Api/imageApi';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { boolean } from 'yup';

const windowWidth = Dimensions.get('window').width;

interface Props {
    flagValue: string,
    local: Local,
    img: string,
    isVisible: boolean;
    children?:ReactNode,
    onClose: () => void;
    onUpdate: (localUpdate: Local) => void;
    flagsImg:boolean
}

export const  ModalUpdateLocal= ({ flagValue, local, img, isVisible, onClose, onUpdate, flagsImg }: Props) =>{

    const urlCloudinary = async (image: string) => {
        try{
            console.log(image)
            const formData = new FormData();
            formData.append('image',{
                uri: image,
                type: 'image/jpeg', 
                name: 'uploaded_image.jpg',
            });
            const response = await postImage(formData);
            console.log(response) 
            return response.data.response.url;
        }catch(error: any){
            console.log(JSON.stringify(error));
            
            CustomAlert({
                title: "Error",
                desc: 'Error: ' + error.message
            });
            throw new Error('upload failed')
        }
        
    }

    const handleSubmit = async (localUpdate: Local) => {
        try {
            const partialLocal = compareLocal(local, localUpdate);
            if (Object.keys(partialLocal).length > 0) {   
                    if(flagsImg == true){
                        console.log(img)
                        const urlImg = await  urlCloudinary(img);
                        console.log(urlImg)
                        partialLocal.uriImage = urlImg;
                    }
                if (local._id) {  
                    const dataLocal = await putLocal({localId: local._id, updatedLocal: partialLocal as Local });
                    if (dataLocal && dataLocal.status === 200) {
                        CustomAlert({
                            title: t('ProductUpdatedTitle'), 
                            desc: t('ProductUpdated'),
                        });
                        onUpdate(localUpdate);
                    }
                }
            }
        } catch (error: any) {
            console.error(error);
            CustomAlert({
                title: "Error",
                desc: 'Error: ' + error.message
            });
        }     
    }
    
    const viewUpdateImg = () => {
        return(
            <View style={{justifyContent: 'center', alignItems: 'center', width: windowWidth*0.8, height: windowWidth*1 }} >
                <View style={StyleModal.viewTextInput}>
                </View>
            </View>
        );
    }

    const viewUpdateDataLocal = ( values: any, handleChange: any, handleBlur: any) => {
        return(
            <View style={{...StyleModal.centeredContainer,...StyleModal.viewsContainer}}>
                <View style={StyleModal.viewTextInput}>
                    <Text style={StyleModal.textInput}>{t('EditLocalName')}</Text>
                    <TextInput
                        style={StyleModal.textInputModal}
                        onChangeText={handleChange('name')}
                        onBlur={handleBlur('name')}
                        value={values.name}
                    />
                </View>
                <View style={StyleModal.viewTextInput}>
                    <Text style={StyleModal.textInput}>{t('BusinessType')}</Text>
                    <TextInput
                        style={StyleModal.textInputModal}
                        onChangeText={handleChange('businessType')}
                        onBlur={handleBlur('businessType')}
                        value={values.businessType}
                    />
                </View>
                <View style={StyleModal.viewTextInput}>
                    <Text style={StyleModal.textInput}>{t('Town')}</Text>
                    <TextInput
                        style={StyleModal.textInputModal}
                        onChangeText={handleChange('town')}
                        onBlur={handleBlur('town')}
                        value={values.town}
                    />
                </View>
                <View style={StyleModal.viewTextInput}>
                    <Text style={StyleModal.textInput}>{t('Country')}</Text>
                    <TextInput
                        style={StyleModal.textInputModal}
                        onChangeText={handleChange('country')}
                        onBlur={handleBlur('country')}
                        value={values.country}
                    />
                </View>
            </View>
        );
    }

    const viewUpdateDirectionLocal = ( values: any, handleChange: any, handleBlur: any) => {
        return(
            <View>
                <View style={{...StyleModal.viewDirection,...StyleModal.viewsContainer}}>
                    <Text style={{color: Colors.white, fontSize: windowWidth*0.07, textAlign: 'center'}}>{t('AddressData')}</Text>
                    <View style={StyleModal.viewTextInput}>
                        <Text style={StyleModal.textInput}>{t('Address')}</Text>
                        <TextInput
                            style={StyleModal.textInputModal}
                            onChangeText={handleChange('address')}
                            onBlur={handleBlur('address')}
                            value={values.address}
                        />
                    </View>
                    <View style={StyleModal.viewTextInput}>
                        <Text style={StyleModal.textInput}>{t('Town')}</Text>
                        <TextInput
                            style={StyleModal.textInputModal}
                            onChangeText={handleChange('town')}
                            onBlur={handleBlur('town')}
                            value={values.town}
                        />
                    </View>
                    <View style={StyleModal.viewTextInput}>
                        <Text style={StyleModal.textInput}>{t('State')}</Text>
                        <TextInput
                            style={StyleModal.textInputModal}
                            onChangeText={handleChange('state')}
                            onBlur={handleBlur('state')}
                            value={values.state}
                        />
                    </View>
                    <View style={StyleModal.viewTextInput}>
                        <Text style={StyleModal.textInput}>{t('Country')}</Text>
                        <TextInput
                            style={StyleModal.textInputModal}
                            onChangeText={handleChange('country')}
                            onBlur={handleBlur('country')}
                            value={values.country}
                        />
                    </View>
                </View>
                <View style={{...StyleModal.viewContact,...StyleModal.viewsContainer}}>
                    <Text style={{color: Colors.white, fontSize: windowWidth*0.07, textAlign: 'center'}}>{t('Contacts')}</Text>
                    <View style={StyleModal.viewTextInput}>
                            <Text style={StyleModal.textInput}>Facebook</Text>
                            <TextInput
                                style={StyleModal.textInputModal}
                                onChangeText={(value) => handleChange('contact.Facebook.info')(value)}
                                onBlur={(value) => handleBlur('contact.Facebook.info')(value)}
                                value={values.contact['Facebook'].info}
                            />
                    </View>
                    <View style={StyleModal.viewTextInput}>
                            <Text style={StyleModal.textInput}>{t('Email')}</Text>
                            <TextInput
                                style={StyleModal.textInputModal}
                                onChangeText={(value) => handleChange('contact.Email.info')(value)}
                                onBlur={(value) => handleBlur('contact.Email.info')(value)}
                                value={values.contact['Email'].info}
                            />
                    </View>
                    <View style={StyleModal.viewTextInput}>
                            <Text style={StyleModal.textInput}>Instagram</Text>
                            <TextInput
                                style={StyleModal.textInputModal}
                                onChangeText={(value) => handleChange('contact.Instagram.info')(value)}
                                onBlur={(value) => handleBlur('contact.Instagram.info')(value)}
                                value={values.contact['Instagram'].info}
                            />
                    </View>
                    {/*<View style={StyleModal.viewTextInput}>
                            <Text style={StyleModal.textInput}>{t('WebPage')}</Text>
                            <TextInput
                                style={StyleModal.textInputModal}
                                onChangeText={handleChange('country')}
                                onBlur={handleBlur('country')}
                                value={local.contact['Web page'].info}
                            />
                    </View>*/}
                    <View style={StyleModal.viewTextInput}>
                            <Text style={StyleModal.textInput}>Whatsapp</Text>
                            <TextInput
                                style={StyleModal.textInputModal}
                                onChangeText={(value) => handleChange('contact.Whatsapp.info')(value)}
                                onBlur={(value) => handleBlur('contact.Whatsapp.info')(value)}
                                value={values.contact['Whatsapp'].info}
                            />
                    </View>
                </View>
            </View>
        );
    }
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
        >
            <ScrollView style={StyleModal.container}>
                <Formik
                    initialValues={{
                        _id: local._id || '',
                        name: local.name || '',
                        description: local.description || '',
                        address: local.address || '',
                        uriImage: local.uriImage ||'',
                        isVerify: local.isVerify || false, 
                        country: local.country || '',
                        state: local.state ||'',
                        town: local.town ||'',
                        postalCode: local.postalCode ||'',
                        contact: {
                            Facebook: { info: (local.contact && local.contact.Facebook && local.contact.Facebook.info) ||  '' },
                            Email: { info: (local.contact && local.contact.Email && local.contact.Email.info) ||  '' },
                            Instagram: { info: (local.contact && local.contact.Instagram && local.contact.Instagram.info) ||  ''},
                        /* webPageInfo : { info:local.contact['Web page'] ? local.contact['Web page'].info :'' },*/
                            Whatsapp: { info: (local.contact && local.contact.Whatsapp && local.contact.Whatsapp.info) ||  '' },
                        },
                        schedules: local.schedules || [],
                        rate: local.rate ||0,
                        quantityRate: local.quantityRate || 0,
                        tags: local.tags || [],
                        location: { latitude: local.location.latitude || 0 , longitude: local.location.longitude || 0 },
                        open: local.open || false,
                        businessType: local.businessType || '',
                        localLikes: local.localLikes || 0,
                        liked: local.liked || false,
                    }}
                    onSubmit={(values) => {
                        handleSubmit(values);
                        onClose();
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values }) => (
                        <View style={StyleModal.containerTextInput}>
                            <View style={{justifyContent: 'center', alignItems: 'flex-end', width: windowWidth*1, padding: windowWidth*0.02}}>
                                <TouchableOpacity onPress={()=>onClose()}>
                                    <Icon name='times' size={30}  light color={Colors.white}/>
                                </TouchableOpacity>
                            </View>
                            {flagValue === '1' && (
                                viewUpdateImg()
                            )}
                            {flagValue === '2' && (
                                viewUpdateDataLocal(values,  handleChange, handleBlur)
                            )}
                            {flagValue === '3' && (
                                viewUpdateDirectionLocal(values,  handleChange, handleBlur)
                            )} 
                            <View style={StyleModal.viewTextInput}>
                                <TouchableOpacity style={StyleModal.buttonModal} onPress={()=>{handleSubmit()}}>
                                    <Text style={StyleModal.textButtonModal}>{t('Update')}</Text>
                                </TouchableOpacity>
                            </View>    
                        </View>
                    )}
                </Formik>
            </ScrollView>
        </Modal>
    )
}

const StyleModal = StyleSheet.create({
    container:{
        flex: 1, 
        backgroundColor: 'rgba(0,0,0,0.8)',
    },
    centeredContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerTextInput:{
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    viewTextInput:{
        justifyContent:'space-between',
        padding: windowWidth*0.03,
    },
    textInput:{
        color: Colors.white,
        fontSize: windowWidth*0.05,
        fontWeight: 'bold'
    },
    textInputModal:{
        width: windowWidth*0.85,
        height: windowWidth*0.12,
        backgroundColor: Colors.white,
        color: Colors.black,
        borderRadius: 10
    },
    updateButton:{
        width: windowWidth*0.8,
        height: windowWidth*0.15,
        backgroundColor: Colors.Yellow,
    },
    buttonModal:{
        width: windowWidth*0.80,
        height: windowWidth*0.12,
        borderRadius: 15,
        backgroundColor: Colors.Yellow,
        justifyContent: 'center',
    },
    textButtonModal:{
        color: Colors.white,
        textAlign: 'center',
        fontSize: windowWidth*0.07,
        fontWeight: 'bold'
    },
    viewsContainer:{
        backgroundColor: Colors.grayOpacity,
        marginVertical: windowWidth*0.1,
        borderRadius: 20
    },
    viewDirection:{
        width: windowWidth*0.9,
        height: windowWidth* 1.15,
    },
    viewContact:{
        width: windowWidth*0.9,
        height: windowWidth* 1.4,
    }
})