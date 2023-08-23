import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ScheduleSection } from '../Components/ScheduleSection';
import { Schedule } from '../Interfaces/DbInterfaces';
import { Colors } from '../Themes/Styles';
import { CustomPicker } from '../Components/CustomPicker';
import { addCategory, getCategories } from '../Api/categories';
import { CustomAlert } from '../Components/CustomAlert';
import { useTranslation } from 'react-i18next';

export const Step4View = () => {
    const initialSchedule: Schedule[] = [
        {day1: '', day2: '', open:`${new Date().getHours()} : ${new Date().getMinutes()}` , close: `${new Date().getHours()} : ${new Date().getMinutes()}` }, 
    ];

    const [schedule, setSchedule] = useState<Schedule[]>(initialSchedule);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categoryOptions, setCategoryOptions] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const { t } = useTranslation();
    
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
                setSelectedCategory(newCategory);
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
    
    const handleSelected = (selected: string) =>{
        setSelectedCategory(selected)
    }

    const handleLoadMore = async () => {
        if (currentPage <= totalPages) {
            fetchCategories();
        }
    };

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container} >
            <ScrollView contentContainerStyle={{ flexGrow: 1}}>
                <View style={styles.containerSchedule}>
                    <ScheduleSection  schedule={schedule} setSchedule={setSchedule} updateScheduleItem={updateScheduleItem} />
                </View>
                <View style={styles.containerCategories}>
                    <View>
                        <CustomPicker
                            modalInputTItle={ selectedCategory || 'Add category'}
                            placeHolder='add other category'
                            data={categoryOptions}
                            ActionSelected={handleSelected}
                            buttonTitle='Agregar categoria'
                            onEndAction={handleLoadMore}
                            ActionSubmit={handleAddNewCategory}
                            borderColor={Colors.gray}
                            modalVisible={modalVisible}
                            setModalVisible={setModalVisible}
                        />
                    </View>
                    <View>

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
        backgroundColor: 'red'
    },
    containerCategories:{
        flex:1,
        backgroundColor: 'red'
    }

});