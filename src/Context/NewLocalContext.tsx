import React, { createContext, useState } from 'react';
import { LocalInitialState, NewLocal } from '../Interfaces/LocalInterfaces';

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