import React, { useState } from 'react'
import { KeyboardAvoidingView, LayoutAnimation, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, FontStyles } from '../Themes/Styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Step1View } from './Step1View';
import { Step2View } from './Step2View';
import { Step3View } from './Step3View';
import { Step4View } from './Step4View';
import { Step5View } from './Step5View';
import { Step6View } from './Step6View ';
import { useTranslation } from 'react-i18next';

type stepDto = {
    name: string;
    component: any;
};

export const LocalCreatorView = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const { t } = useTranslation();
    const [canGoNext, setCanGoNext] = useState(false)

    const steps: stepDto[] = [
        {name: t('localStep1'), component: <Step1View setCanGoNext={setCanGoNext} />},
        {name: t('localStep2'), component: <Step2View setCanGoNext={setCanGoNext} />},
        {name: t('localStep3'), component: <Step3View setCanGoNext={setCanGoNext}/>},
        {name: t('localStep4'), component: <Step4View/>},
        {name: t('localStep5'), component: <Step5View/>},
        {name: t('localStep6'), component: <Step6View/>},
    ];

    const handleNext = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
        if (currentStep < steps.length - 1) {
            setCanGoNext(false);
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrev = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
        if (currentStep > 0) {
        setCurrentStep(currentStep - 1);
        }
    };

    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.headerView}>
                    <View style={styles.headerTitleView}>
                        <Text style={styles.headerTitle} adjustsFontSizeToFit={true} >{t('localCreatorTitle')}</Text>
                    </View>
                    <View style={styles.stepTitleView}>
                        <Text style={styles.stepTitle} adjustsFontSizeToFit={true} >{`Step ${currentStep + 1}: ${steps[currentStep].name}`}</Text>
                    </View>
                    <View style={styles.progressBar}>
                        {steps.map((_, index) => (
                            <View
                                key={index}
                                style={[styles.progressBarItem, index <= currentStep ? styles.active : null]}
                            />
                        ))}
                    </View>
                </View>
                <View style={styles.bodyView}>
                    {steps[currentStep].component}
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity 
                        style={{...styles.button, justifyContent: 'space-between', backgroundColor: currentStep === 0 ?  Colors.grayOpacity : Colors.blueSteps }} 
                        onPress={handlePrev} 
                        disabled={currentStep === 0}
                    >
                        <Icon name='chevron-left' size={15} color={Colors.white} />
                        <Text style={styles.buttonText} adjustsFontSizeToFit={true} >{t('localCreatorPrevious')}</Text>
                    </TouchableOpacity>
                    {currentStep === steps.length - 1 
                        ? (
                            <TouchableOpacity 
                                style={{...styles.button, justifyContent: 'center', backgroundColor: Colors.greenSuccess }} 
                                onPress={handleNext} 
                            >
                                <Text style={{...styles.buttonText}} adjustsFontSizeToFit={true} >{t('localCreatorCreate')}</Text>
                            </TouchableOpacity>
                        )
                        : (
                            <TouchableOpacity 
                                style={{...styles.button, justifyContent: 'space-between', backgroundColor: (currentStep === steps.length - 1 || !canGoNext) ? Colors.grayOpacity :Colors.blueSteps }} 
                                onPress={handleNext} 
                                disabled={currentStep === steps.length - 1 || !canGoNext }>
                                <Text style={styles.buttonText} adjustsFontSizeToFit={true}>{t('localCreatorNext')} </Text>
                                <Icon name='chevron-right' size={15} color={Colors.white}/>
                            </TouchableOpacity>
                        ) 
                    }
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerView:{
        flex: 2,
        marginHorizontal: 5,
        justifyContent: 'center',
    },
    headerTitleView: {
        flex:1,
    },
    headerTitle: {
        ...FontStyles.Title,
        fontWeight: 'bold',
    },
    stepTitleView: {
        flex: 1,
        marginTop: 5,
        justifyContent: 'center'
    },
    stepTitle: {
        ...FontStyles.SubTitles,
        fontSize: 20,
    },
    progressBar: {
        flex: 1,
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center'
    },
    progressBarItem: {
        flex: 1,
        height: 8,
        backgroundColor: '#ccc',
        marginHorizontal: 2,
        borderRadius: 10,
    },
    active: {
        backgroundColor: '#007bff',
    },
    bodyView:{
        flex: 11,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        width: '25%',
        marginHorizontal: 10,
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        marginHorizontal: 2,
    },
});