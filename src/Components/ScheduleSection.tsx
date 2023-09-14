import React, { SetStateAction, useState } from 'react'
import { Animated, LayoutAnimation, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { PickerDayButton } from './PickerDayButton'
import DatePicker from 'react-native-date-picker'
import { Schedule } from '../Interfaces/DbInterfaces'
import { Colors, Styles } from '../Themes/Styles';
import Icon  from 'react-native-vector-icons/FontAwesome5';
import { CustomDatePicker } from './CustomDatePicker'
import { useTranslation } from 'react-i18next';

interface Props {
    schedule: Schedule[];
    setSchedule: React.Dispatch<SetStateAction<Schedule[]>>
    updateScheduleItem: (scheduleNumber: number, updateData: Partial<Schedule>) => void;
}
export const ScheduleSection = ({updateScheduleItem, schedule, setSchedule}: Props) => {
    const { t } = useTranslation();
    const [index, setIndex] = useState<number>(0);

    const handleAddSchedule = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        if(index < 2){
            setIndex( index + 1);
            setSchedule([
                ...schedule, 
                {
                    day1: '',
                    day2: '', 
                    open:`${new Date().getHours()} : ${new Date().getMinutes()}`, 
                    close: `${new Date().getHours()} : ${new Date().getMinutes()}` 
                }
            ]);
        }
    }

    const handleDeleteSchedule = (scheduleIndex: number) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        const updatedSchedule = schedule.filter((_, index) => index !== scheduleIndex);
        setSchedule(updatedSchedule);
        setIndex(index - 1);
    };

    return (
        <View style={{...styles.containerSchedule}}>
            { schedule.map( ( element: Schedule, idx: number ) => (
                <View key={idx}>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Text style={{color: 'black', fontWeight: 'bold'}}>{t('ScheduleInfoSection')}{`${idx + 1}`}</Text>
                        {    
                            index >= 1 &&
                            <TouchableOpacity
                                onPress={ () => handleDeleteSchedule(idx) }
                                style={{padding: 5}}
                            >
                                <Icon name={'trash-alt'} size={20} color={'red'} light />
                            </TouchableOpacity>
                        }
                    </View>
                    <View style={{flex: 1}}>
                        <View style={styles.containerDays}>
                            <View style={styles.containerPickerButton} >
                                <PickerDayButton
                                    title={element.day1 === '' ? t('FromDay'): element.day1 }
                                    day='day1'
                                    action={updateScheduleItem}
                                    index={idx}
                                />
                            </View>
                            <View style={styles.containerPickerButton}>
                                <PickerDayButton
                                    title={element.day2 === '' ? t('ToDay'): element.day2 }
                                    day='day2'
                                    action={updateScheduleItem}
                                    index={idx}
                                />
                            </View>
                        </View>
                        <View style={styles.containerHours}>
                            <CustomDatePicker
                                type='open'
                                modalTitle={t('OpeningTime')}
                                leftTag={t('From')}
                                action={updateScheduleItem}
                                index={idx}
                                currentHour={element.open}
                            />
                            <CustomDatePicker
                                type='close'
                                modalTitle={t('ClosingTime')}
                                leftTag={t('To')}
                                action={updateScheduleItem}
                                index={idx}
                                currentHour={element.close}
                            />
                        </View>
                    </View>
                </View>
            ))
            }
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.touchablePlus}
                    onPress={handleAddSchedule}
                >
                    <Icon name={'plus'} size={20} color={'black'} />
                </TouchableOpacity>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    containerSchedule: {
        borderColor: Colors.darkGray,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        width: '90%',
        alignSelf: 'center'
        
    },
    containerDays: {
        flexDirection: 'row',
        height: '50%'
    },
    containerHours: {
        flexDirection: 'row',
        height: '50%'
    },
    containerPickerButton:{
        flex: 5, 
        margin: 5,
        justifyContent: 'center',
        borderColor: Colors.darkGray,
        borderWidth: 1,
        borderRadius: 10,
    },
    containerHourOpen:{
        flex: 5, 
        margin: 5,
        borderColor: Colors.greenSuccess,
        borderWidth: 1,
        borderRadius: 10,
    },
    containerHourClose:{
        flex: 5, 
        margin: 5,
        borderColor: Colors.red,
        borderWidth: 1,
        borderRadius: 10,
    },
    stylesTouchable: {
        flexDirection: 'row',
        alignItems:'center',
        height: '100%',
        justifyContent: 'center',
        borderRadius: 10
    },
    touchablePlus: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.YellowOpacity,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: -16,
        right: -16,
        backgroundColor: Colors.gray,
    },
});