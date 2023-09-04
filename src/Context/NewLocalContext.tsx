import React, { createContext, useState } from 'react';
import { Location } from '../Interfaces/MapInterfaces';
import { NewLocal } from '../Interfaces/LocalInterfaces';

const initialLocation: Location = {
    latitude: 0,
    longitude: 0,
}

export const LocalInitialState: NewLocal ={
    name: '',
    description: '',
    businessType: '',
    country:  '',
    state: '',
    town: '',
    uriImage: '',
    schedules: [],
    tags: [],
    location: initialLocation,
    postalCode: '',
    contact: [],
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