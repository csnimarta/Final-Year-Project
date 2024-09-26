import {createContext, useEffect, useState} from "react";


const UserCnicContext = createContext({});

export const UserCnicProvider = ({children}) => {

    const [userCnic, setUserCnic] = useState("");

    return (
        <UserCnicContext.Provider value={{userCnic, setUserCnic}}>
            {children}
        </UserCnicContext.Provider>
    );
};

export default UserCnicContext;