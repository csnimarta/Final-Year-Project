import {createContext, useEffect, useState} from "react";


const ServiceContext = createContext({});

export const ServiceProvider = ({children}) => {

    const [service, setService] = useState({});

    return (
        <ServiceContext.Provider value={{service, setService}}>
            {children}
        </ServiceContext.Provider>
    );
};

export default ServiceContext;