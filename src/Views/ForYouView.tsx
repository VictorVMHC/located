import React, { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { searchLocalsRad } from '../Api/searchLocalsApi';
import {Locals} from '../Interfaces/DbInterfaces';



export const ForYouView = () => {
    const latitudReferencia = 20.722242050154833;
    const longitudReferencia = -103.32044364317514;
    const radioKm = 0.2;
    const [latitudMaxima,setlatitudMaxima] = useState(0);
    const [latitudMinima, setlatitudMinima] =useState(0);
    const [longitudMaxima, setlongitudMaxima] = useState(0);
    const [longitudMinima, setlongitudMinima] = useState(0);
    const [datosLocales, setDatosLocales] = useState<Locals[]>([]);


    
    const calcularRango =() =>{
        const radioTierraKm = 6371.0;

        const latitudReferenciaRad = latitudReferencia *(Math.PI/180);
        const longitudReferenciaRad = longitudReferencia * (Math.PI / 180);

        const latitudMaximaRad = latitudReferenciaRad + (radioKm / radioTierraKm);
        const latitudMinimaRad = latitudReferenciaRad - (radioKm / radioTierraKm);

        const longitudMaximaRad = longitudReferenciaRad + (radioKm / (radioTierraKm * Math.cos(latitudReferenciaRad)));
        const longitudMinimaRad = longitudReferenciaRad - (radioKm / (radioTierraKm * Math.cos(latitudReferenciaRad)));

        setlatitudMaxima(latitudMaximaRad * (180 / Math.PI));
        setlatitudMinima(latitudMinimaRad * (180 / Math.PI));
        setlongitudMaxima(longitudMaximaRad * (180 / Math.PI));
        setlongitudMinima(longitudMinimaRad * (180 / Math.PI));

        console.log('\n latitudMaxima: ' + latitudMaxima + '\n latitudMinima:' +latitudMinima + '\n longitudMaxima:' + longitudMaxima + '\n longitudMinima:' +longitudMinima)
    }
    
    const fetchData = async () => {
        try {
          const resultados = await searchLocalsRad('locals', latitudReferencia, longitudReferencia, radioKm);
          const paginatedResults = resultados.data.results;
          setDatosLocales(paginatedResults);
        } catch (error) {
          console.error(error);
        }
      };
    return (
        <View style={{ flex: 1 }}>
            <Text>Para ti view </Text>
            <TouchableOpacity onPress={() => calcularRango()}>
                <Text>Dale</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ backgroundColor: 'orange' }} onPress={() => fetchData()}>
                <Text>Dale</Text>
            </TouchableOpacity>

            <ScrollView style={{ flex: 1, backgroundColor: 'pink' }}>
                <Text>Hola</Text>
                 {/* Renderiza los datos locales en tu componente */}
                    {datosLocales.map((local) => (
                        <View key={local._id}>
                        <Text>{local._id}</Text>
                        <Text>{local.name}</Text>
                        <Text>{local.latitude}</Text>
                        <Text>{local.longitude}</Text>
                        {/* Renderiza otras propiedades del objeto Local según sea necesario */}
                        </View>
                    ))}
            </ScrollView>
        </View>
    )
}