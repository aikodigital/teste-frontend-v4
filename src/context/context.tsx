import React, { createContext, useState, ReactNode, useContext } from 'react';
import { MyContextType } from '../interfaces/interfaces';


const DEFAULT_VALUE: MyContextType = {
    selectedState: '',
    selectedModel: '',
    searchTag: '',
    setSelectedState: () => {},
    setSelectedModel: () => {},
    setSearchTag: () => {},
};

export const MyContext = createContext<MyContextType>(DEFAULT_VALUE);

const MyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [selectedState, setSelectedState] = useState<string | null>(null);
    const [selectedModel, setSelectedModel] = useState<string | null>(null);
    const [searchTag, setSearchTag] = useState<string | null>(null);

    return (
        <MyContext.Provider value={{
            selectedState,
            selectedModel,
            setSelectedState,
            setSelectedModel,
            searchTag,
            setSearchTag,
        }}>
            {children}
        </MyContext.Provider>
    );
};

export const useContextData = () => {
    return useContext(MyContext);
};

export default MyProvider;
