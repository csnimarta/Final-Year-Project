import {createContext, useEffect, useState} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';


const UserContext = createContext({});

export const UserProvider = ({children}) => {

    const [user, setUser] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const value = await AsyncStorage.getItem('@user');
                if (value) {
                    setUser(JSON.parse(value));
                }
            } catch (error) {
                console.log('AsyncStorage Error: ' + error);
            }
        };
        fetchData();
    }, []);

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;