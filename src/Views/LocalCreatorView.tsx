import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, FontStyles } from '../Themes/Styles';
import Icon from 'react-native-vector-icons/FontAwesome5';

type stepDto = {
    name: string;
    component: any;
};

const steps: stepDto[] = [
    {name: 'Name and Description', component: 'hello'},
    {name: 'Datos del local', component: 'hello'},
    {name: 'Ubicación', component: 'hello'},
    {name: 'Horaio y categorias', component: 'hello'},
    {name: 'Redes sociales y contacto ', component: 'hello'},
    {name: 'Foto de tu local', component: 'hello'},
];

export const LocalCreatorView = () => {
    const [currentStep, setCurrentStep] = useState(0);

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
        setCurrentStep(currentStep - 1);
        }
    };
    return (
        <View style={styles.container}>
            <View style={styles.headerView}>
                <View style={styles.headerTitleView}>
                    <Text style={styles.headerTitle} adjustsFontSizeToFit={true} >Creando local</Text>
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
                <Text>Body</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={{...styles.button, justifyContent: 'space-between', backgroundColor: currentStep === 0 ?  Colors.grayOpacity : Colors.blueSteps }} onPress={handlePrev} disabled={currentStep === 0}>
                    <Icon name='chevron-left'/>
                    <Text style={styles.buttonText} adjustsFontSizeToFit={true} >Previous</Text>
                </TouchableOpacity>
                
                    {currentStep === steps.length - 1 
                        ? (
                            <TouchableOpacity style={{...styles.button, justifyContent: 'center', backgroundColor: Colors.greenSuccess }} onPress={handleNext} disabled={currentStep === steps.length - 1}>
                                <Text style={{...styles.buttonText}} adjustsFontSizeToFit={true} >Finish</Text>
                            </TouchableOpacity>
                        )
                        : (
                            <TouchableOpacity style={{...styles.button, justifyContent: 'space-between', backgroundColor: Colors.blueSteps }} onPress={handleNext} disabled={currentStep === steps.length - 1}>
                                <Text style={styles.buttonText} adjustsFontSizeToFit={true}>Next</Text>
                                <Icon name='chevron-right'/>
                            </TouchableOpacity>
                        ) 
                    }
                
            </View>
        </View>
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
        backgroundColor: 'red'
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
       // backgroundColor: 'yell',
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
    },
});