import React, { createContext, useState } from 'react';
import { Location } from '../Interfaces/MapInterfaces';
import { NewLocal } from '../Interfaces/LocalInterfaces';

const initialLocation: Location = {
    latitude: 0,
    longitude: 0,
}

export const LocalInitialState: NewLocal ={
    name: 'local_3',
    description: 'hola',
    businessType: 'hola',
    address: 'hola',
    country:  'hola',
    state: 'hola',
    town: 'hola',
    uriImage: '',
    rate: 4,
    quantityRate: 10,
    schedules:  [{"close": "6 : 12", "day1": "Jueves", "day2": "Sábado", "open": "6 : 12"}],
    tags: ["HLLA", "AADSGDFAGADFGAD","Farmacia"],
    location: {"latitude": 20.72264017896672, "longitude": -103.32121031003345},
    postalCode: '54645',
    contact: {"Facebook": {"info": "asfgafg"}},
}

type LocalContextProps = {
    localState: NewLocal;
    updateLocal: (updatedFields: Partial<NewLocal>) => void;
    cleanLocalContext: () => void;
}

export const LocalContext = createContext({} as LocalContextProps);

export const LocalProvider = ({ children }: any) => {
    const [localState, setLocalState] = useState<NewLocal>(LocalInitialState);

    const updateLocal = (updatedFields: Partial<NewLocal>) => {
        setLocalState((prevState) => ({ ...prevState, ...updatedFields }));
    };

    const cleanLocalContext = () => {
        setLocalState(LocalInitialState);
    };

    return (
        <LocalContext.Provider 
            value={{ 
                localState, 
                updateLocal,
                cleanLocalContext
            }
        }>
        {children}
        </LocalContext.Provider>
    );
};