import React, { useContext, useEffect, useState } from 'react';
import { KeyboardAvoidingView, LayoutAnimation, StyleSheet, Text, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { ScheduleSection } from '../Components/ScheduleSection';
import { Schedule } from '../Interfaces/DbInterfaces';
import { Colors } from '../Themes/Styles';
import { CustomPicker } from '../Components/CustomPicker';
import { addCategory, getCategories } from '../Api/categories';
import { CustomAlert } from '../Components/CustomAlert';
import { useTranslation } from 'react-i18next';
import { Chip } from 'react-native-paper';
import { LocalContext } from '../Context/NewLocalContext';

interface Props{
    setCanGoNext: React.Dispatch<React.SetStateAction<boolean>>
}

export const Step4View = ({ setCanGoNext }:Props) => {
    const initialSchedule: Schedule[] = [
        {day1: '', day2: '', open:`${new Date().getHours()} : ${new Date().getMinutes()}` , close: `${new Date().getHours()} : ${new Date().getMinutes()}` }, 
    ];
    const { localState, updateLocal } = useContext(LocalContext)
    const [schedule, setSchedule] = useState<Schedule[]>(localState.schedules.length ? localState.schedules : initialSchedule);
    const [modalVisible, setModalVisible] = useState(false);
    const [categoryOptions, setCategoryOptions] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [add, setAdd] = useState<boolean>(localState.categories ? true : false);
    const [placeHolder, setPlaceHolder] = useState('');
    const { t } = useTranslation();
    
    useEffect(()=> {
        
        if(localState.schedules.length !== 0 && localState.categories.length !== 0){            
            setCanGoNext(true);
        }

    }, [localState]);
    
    useEffect(() => {       
        if( categoryOptions.length === 0 ){
            fetchCategories();
        }
    }, []);
    
    const updateScheduleItem = (scheduleNumber: number, updateData: Partial<Schedule>) => {
        const updatedSchedule = [...schedule];
        updatedSchedule[scheduleNumber] = {
            ...updatedSchedule[scheduleNumber],
            ...updateData,
        };
        updateLocal({schedules: updatedSchedule})
        setSchedule(updatedSchedule);
    };

    const fetchCategories = async () => {
        getCategories(currentPage).then((response) => {
            
            if(response.status !== 200){
                CustomAlert({
                    title: `${t('step2AlertError')}`, 
                    desc: `${t('step2AlertErrDescGet')}`, 
                    action: () => setModalVisible(false)
                })
            }
            const { business_options, total_pages  } = response.data;
            setCategoryOptions([...categoryOptions, ...business_options]);
            setCurrentPage(currentPage + 1);
            setTotalPages(total_pages);
        }
        ).catch(() => {
            CustomAlert({
                title: `${t('step2AlertError')}`, 
                desc: `${t('step2AlertErrDescGet')}`, 
                action: () => setModalVisible(false)
            })
        }) 
    };

    const handleAddNewCategory = async (newCategory: string) => {
        if (newCategory && !categoryOptions.includes(newCategory)) {
            addCategory(newCategory).then((response) => {

                if(response.status !== 200){
                    CustomAlert({
                        title: `${t('step2AlertError')}`, 
                        desc: `${t('step2AlertErrDescSave')}`, 
                        action: () => setModalVisible(false)
                    })
                }

                setCategoryOptions([...categoryOptions, newCategory]);
                updateLocal({categories: [...localState.categories, newCategory]});

                setPlaceHolder(newCategory)
                setModalVisible(false);
                
            }
            ).catch(() => {
                CustomAlert({
                    title: `${t('step2AlertError')}`, 
                    desc: `${t('step2AlertErrDescSave')}`, 
                    action: () => setModalVisible(false)
                })
            })
        }
        
    };

    const handleSelected = (selected: string[]) =>{
        updateLocal({categories: selected})
        setPlaceHolder(selected.toString())
    }

    const handleLoadMore = async () => {
        if (currentPage <= totalPages) {
            fetchCategories();
        }
    };
    
    const handleChipClose = (itemToRemove: string) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
        const updatedSelectedCategory = localState.categories.filter(item => item !== itemToRemove);
        updateLocal({ categories:  updatedSelectedCategory});
    };

    const onPressOpenModal = () => {
        setAdd(false);
    }

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container} >
            <ScrollView contentContainerStyle={{ flexGrow: 1}}>
                <View style={styles.containerSchedule}>
                    <ScheduleSection  schedule={schedule} setSchedule={setSchedule} updateScheduleItem={updateScheduleItem} />
                </View>
                <View style={styles.containerCategories}>
                    <View style={styles.pickerSection}>
                        <View style={{flex: 7}} >
                            <CustomPicker
                                modalInputTItle={ placeHolder || 'Add category'}
                                placeHolder='add other category'
                                data={categoryOptions}
                                ActionMultiSelected={handleSelected}
                                buttonTitle='Agregar categoria'
                                onEndAction={handleLoadMore}
                                ActionSubmit={handleAddNewCategory}
                                borderColor={Colors.darkGray}
                                modalVisible={modalVisible}
                                setModalVisible={setModalVisible}
                                multiSelection
                                actionOnPressOpenModal={onPressOpenModal}
                            />
                        </View>
                        <View style={{flex: 3}} >
                            <TouchableOpacity style={styles.button}
                                onPress={() => {LayoutAnimation.configureNext(LayoutAnimation.Presets.linear); setAdd(true); setPlaceHolder('');
                                }}
                            >
                                <Text style={styles.buttonText}  adjustsFontSizeToFit disabled={add} >Add</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.chipContainer}>
                        {add ? (
                            <View style={styles.chipsWrapper}>
                                {
                                    localState.categories.map((item, index) => (
                                    <Chip
                                        key={index}
                                        closeIcon="close"
                                        mode='outlined'
                                        elevated
                                        onClose={() => {
                                            handleChipClose(item);
                                        }}
                                        compact style={{ margin: 5 }}>
                                        {item}
                                    </Chip>
                                ))}
                            </View>
                        ) : null}
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: '5%',
    },
    containerSchedule: {
        flex: 1,
    },
    containerCategories:{
        flex: 4,
        top: 10,
        width: '90%',
        alignItems: 'center',
        alignSelf: 'center'
    },
    pickerSection:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginLeft: 5,
        borderRadius: 5,
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.greenSuccess
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        marginHorizontal: 2,
    },
    chipContainer: {
        marginVertical: 20,
        borderRadius: 8,
        borderColor: Colors.darkGray,
        borderWidth: 1,
        paddingHorizontal: 10,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    chipsWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        maxWidth: '100%',
    },
    
});