import React, { createContext, useState, ReactNode, useContext } from 'react';

interface MyContextType {
    selectedState: string | null;
    selectedModel: string | null;
    setSelectedState: React.Dispatch<React.SetStateAction<string | null>>;
    setSelectedModel: React.Dispatch<React.SetStateAction<string | null>>;
}

const DEFAULT_VALUE: MyContextType = {
    selectedState: '',
    selectedModel: '',
    setSelectedState: () => {},
    setSelectedModel: () => {},
};

export const MyContext = createContext<MyContextType>(DEFAULT_VALUE);

const MyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [selectedState, setSelectedState] = useState<string | null>(null);
    const [selectedModel, setSelectedModel] = useState<string | null>(null);

    return (
        <MyContext.Provider value={{
            selectedState,
            selectedModel,
            setSelectedState,
            setSelectedModel
        }}>
            {children}
        </MyContext.Provider>
    );
};

export const useContextData = () => {
    return useContext(MyContext);
};

export default MyProvider;
